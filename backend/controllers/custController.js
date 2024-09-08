const { User, Type, Lodging, History, Bookmark, sequelize } = require("../models");
const { Sequelize, Op } = require("sequelize");
const { matchPassword, encrypt } = require("../helpers/password");
const { signToken } = require("../helpers/jwt");
const {OAuth2Client, auth} = require('google-auth-library');
const client = new OAuth2Client();
const axios = require('axios');

class Controller {

  static test(message) {
    return (req, res) => {
      res.send(message);
    }
  }
  
  static async commitHistory(tableName, method, commitMessage, authorId) {
    try {
      await History.create({
        name: tableName, 
        description: `${method}: ${commitMessage}`,
        updatedBy: authorId
      })
      console.log("Commit history", tableName, commitMessage);
    } catch (err) {
      console.log(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      // console.log(username, email, password, phoneNumber, address);
      const user = await User.create({
        username, email, password, phoneNumber, address,
        role: "User"
      }, {returning: true});
      delete user.dataValues.password;
      res.status(201).json({
        message: "Success to add user",
        data: user
      });
      await Controller.commitHistory("Users", "POST", `New user with id ${user.id} created`, user.id);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw {name: "InvalidCredentials", message: "Email is required"};
      if (!password) throw {name: "InvalidCredentials", message: "Password is required"};
      const user = await User.findOne({where: {email}});
      if (!user) throw {name: "InvalidLogin", message: `Invalid user/password`};
      
      const isPasswordValid = matchPassword(password, user.password);
      if (!isPasswordValid) throw {name: "InvalidLogin", message: `Invalid user/password`};
      
      const { id, username, role } = user;
      if (role !== 'User') throw {name: 'InvalidLogin', message: `Invalid user/password`};
      const accessToken = signToken({id, username, role}, '7d');
      res.status(200).json({
        access_token: accessToken
      });
    } catch (err) {
      next(err);
    }
  }

  static async glogin(req, res, next) {
    try {

      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {email: payload.email},
        defaults: {
          username: payload.name,
          email: payload.email,
          role: "User",
          password: encrypt("google-login")
        },
        hooks: false
      })
      const { id, username, role } = user;
      if (role !== 'User') throw {name: 'InvalidLogin', message: `Invalid user/password`};
      const accessToken = signToken({id, username, role}, '7d');
      // req.headers.access_token = accessToken;
      res.status(200).json({
        username,
        access_token: accessToken
      });
      // res.status(200).json({id, email});
      if (created) await Controller.commitHistory("Users", "POST", `New user with id ${id} created`, id);
    } catch (err) {
      next(err);
    }
  }

  static async generateQRCode(req, res, next) {
    try {
      const { url, name } = req.body;
      const { data } = await axios.post(
        `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_CODE_ACCESS_TOKEN}`,
        {
          qr_code_text: url,
          image_format: "SVG",
          background_color: "#EEE5C2",
          foreground_color: "#530038",
          qr_code_logo: "scan-me",
          marker_left_template: "version8",
          marker_right_template: "version7",
          marker_bottom_template: "version6",
          frame_name: "bottom-tooltip",
          frame_color: "#E6BC95",
          frame_icon_name: "business",
          frame_text: name,
          frame_text_color: "#530038"
        }
      );
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }

  static async listLodgings(req, res, next) {
    try {

      let { search, minRoomCapacity, roomType, maxPrice, status, limit, offset } = req.query;
      offset = +offset || 0;
      limit = limit || 20;
      if (isNaN(limit) || isNaN(offset)) throw {name: 'BadCredentials'};
      if (limit > 100) limit = 100;

      const options = {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          { model: Type, attributes: ["id", "name"] }, 
          { model: User, attributes: ["id", "username", "email"] }
        ],
        where: {
          status: 'Active'
        },
        order: [["id", "DESC"]],
        limit, offset
      };
      if (req?.user?.id) {
        // options.include.push({ model: Bookmark, attributes: ['id'] });
        options.attributes.include = [[
          sequelize.literal(`(
            SELECT CAST(COUNT(*) != '0' AS BOOLEAN)
            FROM "Bookmarks" AS "Bookmark"
            WHERE "Bookmark"."userId" = ${req.user.id} 
            AND "Bookmark"."lodgingId" = "Lodging"."id"
          )`),
          'isBookmarked'
        ]]
      }

      if (search) {
        options.where = {
          [Op.or]: [
            {name: {[Op.iLike]: `%${search}%`}},
            {facility: {[Op.iLike]: `%${search}%`}},
            {location: {[Op.iLike]: `%${search}%`}}
          ]
        };
      }
      if (minRoomCapacity) options.where['roomCapacity'] = {[Op.gte]: +minRoomCapacity};
      if (roomType) options.where['typeId'] = roomType;
      if (maxPrice) options.where['price'] = {[Op.lte]: +maxPrice};
      if (status) options.where['status'] = status;

      const lodgings = await Lodging.findAndCountAll(options);
      res.status(200).json({
        message: "Success to get data",
        count: lodgings.count,
        offset,
        data: lodgings.rows
      });

    } catch (err) {
      next(err);
    }
  }

  static async getLodging(req, res, next) {
    try {
      const { id } = req.params;
      const options = {
        include: [
          { model: Type }, 
          { model: User, attributes: { exclude: ["password"] } }
        ]
      };
      if (req?.user?.id) {
        // options.include.push({ model: Bookmark, attributes: ['id'] });
        options.attributes = { include: null };
        options.attributes.include = [[
          sequelize.literal(`(
            SELECT CAST(COUNT(*) != '0' AS BOOLEAN)
            FROM "Bookmarks" AS "Bookmark"
            WHERE "Bookmark"."userId" = ${req.user.id} 
            AND "Bookmark"."lodgingId" = "Lodging"."id"
          )`),
          'isBookmarked'
        ]]
      }

      const lodging = await Lodging.findByPk(+id, options);
      if (!lodging) throw { name: "NotFoundError", message: `Lodging with id ${id} not found` };
      res.status(200).json({
        message: "Success to get data",
        data: lodging
      });
    } catch (err) {
      next(err);
    }
  }

  static async listTypes(req, res, next) {
    try {
      const types = await Type.findAll(
        {order: [['id', 'ASC']]}
      );
      res.status(200).json({
        message: "Success to get data",
        data: types
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBookmarks(req, res, next) {
    try {
      const { id: userId } = req.user;

      let { limit, offset } = req.query;
      offset = +offset || 0;
      limit = limit || 20;
      if (isNaN(limit) || isNaN(offset)) throw {name: 'BadCredentials'};
      if (limit > 100) limit = 100;

      const lodgings = await Lodging.findAndCountAll({
        include: [
          {
            model: Bookmark,
            attributes: [],
            where: { userId }
          },
          { model: Type, attributes: ["id", "name"] }, 
          { model: User, attributes: ["id", "username", "email"] }
        ],
        limit, offset
      });

      res.status(200).json({
        message: "Success to get data",
        count: lodgings.count,
        offset,
        data: lodgings.rows
      });

    } catch(err) {
      next(err);
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const lodging = await Lodging.findOne({where: {id: +id}});
      if (!lodging) throw {name: 'NotFoundError', message: `Lodging with id ${id} not found`};
      const [bookmark, created] = await Bookmark.findOrCreate({
        where: {userId, lodgingId: lodging.id}
      });
      res.status(201).json({message: 'Added bookmark'});
    } catch(err) {
      next(err);
    }
  }

  static async removeBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const bookmark = await Bookmark.findOne(
        {where: {userId, lodgingId: +id}}
      );
      if (!bookmark) throw {name: 'NotFoundError', message: `Bookmark not found`};
      await Bookmark.destroy({where: {id: bookmark.id}});
      res.status(200).json({message: 'Removed bookmark'});
    } catch(err) {
      next(err);
    }
  }

}

module.exports = Controller;

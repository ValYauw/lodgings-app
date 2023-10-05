const { User, Type, Lodging, History } = require("../models");
const { Sequelize, Op } = require("sequelize");
const { matchPassword, encrypt } = require("../helpers/password");
const { signToken } = require("../helpers/jwt");
const {OAuth2Client, auth} = require('google-auth-library');
const client = new OAuth2Client();

class Controller {

  static test(message) {
    return (req, res) => {
      res.send(message);
    }
  }

  static async getDataSummary(req, res, next) {
    try {

      const typeCount = await Type.count();
      const userCount = await User.count();
      const queryLodgings = await Lodging.findAll({
        attributes: [
          "status", 
          [Sequelize.cast(Sequelize.fn("COUNT", Sequelize.col("id")), "INTEGER"), "count"]
        ],
        order: [["status", "ASC"]],
        group: ["status"]
      });
      const lodgingCount = queryLodgings.reduce((obj, lodging) => {
        const { status, count } = lodging.dataValues;
        // console.log("In reduce", status, count, obj);
        obj[status] = count;
        return obj;
      }, {})
      // console.log(lodgingCount);
      res.status(200).json({
        message: "Success to get data",
        data: {
          types: typeCount,
          users: userCount,
          lodgings: lodgingCount
        }
      })
    } catch (err) {
      next(err);
    }
  }

  static async listStaffAndAdmin(req, res, next) {
    try {
      const options = {
        attributes: { exclude: ['password'] },
        where: {
          role: {
            [Op.or]: ['Admin', 'Staff']
          }
        },
        order: [["id", "ASC"]]
      };
      const users = await User.findAll(options);
      res.status(200).json({
        message: "Success to get data",
        data: users
      })
    } catch (err) {
      next(err);
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
        role: "Admin"
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
      if (role !== 'Admin' && role !== 'Staff') throw {name: 'InvalidLogin', message: `Invalid user/password`};
      const accessToken = signToken({id, username, role}, '30d');
      res.status(200).json({
        id, username, role,
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
          role: "Staff",
          password: encrypt("google-login")
        },
        hooks: false
      })
      const { id, username, role } = user;
      if (role !== 'Admin' && role !== 'Staff') throw {name: 'InvalidLogin', message: `Invalid user/password`};
      const accessToken = signToken({id, username, role}, '30d');
      // req.headers.access_token = accessToken;
      res.status(200).json({
        id, username, role,
        access_token: accessToken
      });
      // res.status(200).json({id, email});
      if (created) await Controller.commitHistory("Users", "POST", `New user with id ${id} created`, id);
    } catch (err) {
      next(err);
    }
  }

  static async listLodgings(req, res, next) {
    try {
      const options = {
        attributes: [
          "id", "name", "facility", "roomCapacity", "imgUrl", "location", "price", "status"
        ],
        include: [
          { model: Type, attributes: ["id", "name"] }, 
          { model: User, attributes: ["id", "username", "email"] }
        ],
        order: [["id", "ASC"]]
      };
      const lodgings = await Lodging.findAll(options);
      res.status(200).json({
        message: "Success to get data",
        data: lodgings
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

  static async addLodging(req, res, next) {
    try {
      const { name, facility, roomCapacity, imgUrl, location, price, typeId } = req.body;
      const authorId = req.user.id;
      const lodging = await Lodging.create({
        name, facility, roomCapacity, imgUrl, authorId, location, price, typeId
      }, {returning: true});
      res.status(201).json({
        message: "Success to add lodging",
        data: lodging
      });
      await Controller.commitHistory("Lodgings", "POST", `New lodging with id ${lodging.id} created`, authorId);
    } catch (err) {
      next(err);
    }
  }

  static async addType(req, res, next) {
    try {
      const { name } = req.body;
      const authorId = req.user.id;
      const type = await Type.create(
        {name}, 
        {returning: true}
      );
      res.status(201).json({
        message: "Success to add type",
        data: type
      });
      await Controller.commitHistory("Types", "POST", `New type with id ${type.id} created`, authorId);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, phoneNumber, address } = req.body;
      const [numRecordsUpdated, users] = await User.update({
        username, email, phoneNumber, address
      }, {
        where: {id: +id},
        returning: true
      });
      if (numRecordsUpdated === 0) {
        throw { name: "NotFoundError", message: `User with id ${id} not found` }
      }
      const user = users[0];
      delete user.dataValues.password;
      res.status(201).json({
        message: "Success to update user",
        data: user
      });
      await Controller.commitHistory("Users", "PUT", `User with id ${id} updated`, id);
    } catch (err) {
      next(err);
    }
  }

  static async updateLodging(req, res, next) {
    try {
      const { id } = req.params;
      const { name, facility, roomCapacity, imgUrl, location, price, typeId } = req.body;
      const authorId = req.user.id;
      const [numRecordsUpdated, lodgings] = await Lodging.update({
        name, facility, roomCapacity, imgUrl, authorId, location, price, typeId
      }, {
        where: {id: +id},
        returning: true
      });
      if (numRecordsUpdated === 0) {
        throw { name: "NotFoundError", message: `Lodging with id ${id} not found` }
      }
      res.status(201).json({
        message: "Success to update lodging",
        data: lodgings[0]
      });
      await Controller.commitHistory("Lodgings", "PUT", `Lodging with id ${id} updated`, authorId);
    } catch (err) {
      next(err);
    }
  }

  static async updateType(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const authorId = req.user.id;
      const [numRecordsUpdated, types] = await Type.update({
        name
      }, {
        where: {id: +id},
        returning: true
      });
      if (numRecordsUpdated === 0) {
        throw { name: "NotFoundError", message: `Type with id ${id} not found` }
      }
      res.status(201).json({
        message: "Success to update type",
        data: types[0]
      });
      await Controller.commitHistory("Types", "PUT", `Type with id ${id} updated`, authorId);
    } catch (err) {
      next(err);
    }
  }

  static async changeLodgingStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const authorId = req.user.id;

      if (!status) throw { name: "SequelizeValidationError", errors: [{message: "Status is required"}] }

      const findLodging = await Lodging.findOne({where: {id: +id}});
      if (!findLodging) {
        throw { name: "NotFoundError", message: `Lodging with id ${id} not found` }
      };
      const oldStatus = findLodging.status;

      const [numRecordsUpdated, lodgings] = await Lodging.update(
        {status}, {where: {id: +id}, returning: true}
      );

      res.status(201).json({
        message: "Success to update lodging status",
        data: lodgings[0]
      });
      await Controller.commitHistory("Lodgings", "PATCH", `Lodging with id ${id} has been updated from "${oldStatus}" to "${status}"`, authorId);

    } catch (err) {
      next(err);
    }
  }

  static async deleteLodging(req, res, next) {
    try {
      const { id } = req.params;
      await Lodging.destroy({where: {id: +id}});
      res.status(200).json({
        message: `Lodging success to delete`
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await User.destroy({where: {id: +id}});
      res.status(200).json({
        message: `User success to delete`
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteType(req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findOne({where: {id: +id}});
      if (!type) throw {name: "NotFoundError", message: `Lodging type with id ${id} not found`}
      await Type.destroy({where: {id: +id}});
      res.status(200).json({
        message: `Type success to delete`
      });
    } catch (err) {
      next(err);
    }
  }

  static async getHistory(req, res, next) {
    try {

      // let { limit, offset } = req.query;
      // offset = offset || 0;
      // limit = limit || 20;
      // if (isNaN(limit) || isNaN(offset)) throw {name: 'BadCredentials'};
      // if (limit > 100) limit = 100;

      const histories = await History.findAndCountAll({
        include: {
          model: User, 
          attributes: ['id', 'username', 'email']
        },
        order: [['createdAt', 'DESC']],
        // limit, offset
      });

      res.status(200).json({
        message: "Success to get history",
        // count: histories.count, 
        // offset: +offset,
        data: histories.rows
      })

    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(+id, {
        attributes: {exclude: ['password']}
      });
      if (!user) throw { name: "NotFoundError", message: `User with id ${id} not found` };
      res.status(200).json({
        message: "Success to get data",
        data: user
      });
    } catch (err) {
      next(err);
    }
  }

  static async getLodging(req, res, next) {
    try {
      const { id } = req.params;
      const lodging = await Lodging.findByPk(+id, {
        include: [
          { model: Type }, 
          { model: User, attributes: { exclude: ["password"] } }
        ]
      });
      if (!lodging) throw { name: "NotFoundError", message: `Lodging with id ${id} not found` };
      res.status(200).json({
        message: "Success to get data",
        data: lodging
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = Controller;

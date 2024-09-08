const { verifyToken, decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

const getUserDetails = async function (req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) return next();
    const decoded = decodeToken(access_token);
    if (!decoded || !decoded.id || isNaN(decoded.id)) return next();
    req.user = { id: +decoded.id };
    next();
  } catch(err) {
    next(err);
  }
}

const authentication = async function (req, res, next) {
  try {

    const { access_token } = req.headers;
    // console.log(access_token);
    if (!access_token) throw { name: "Unauthenticated", message: "No access token available" };
    const decoded = verifyToken(access_token);
    // console.log(decoded);
    if (!decoded.id || !decoded.username) throw { name: "Unauthenticated", message: "Invalid access token" };
    const findUser = await User.findOne({
      where: {
        id: decoded.id,
        username: decoded.username,
      },
    });
    if (!findUser) throw { name: "Unauthenticated", message: "No user found" };
    req.user = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserDetails, authentication };

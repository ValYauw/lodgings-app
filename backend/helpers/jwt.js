const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET_KEY || "SECRET";

const signToken = (payload, expiresIn) => {
  // console.log(new Date());
  return jwt.sign(payload, SECRET, {expiresIn});
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

const decodeToken = (token) => {
  return jwt.decode(token);
}

module.exports = { signToken, verifyToken, decodeToken };
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function encrypt(password) {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function matchPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { encrypt, matchPassword };
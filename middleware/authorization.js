const { User, Type, Lodging } = require("../models/index");

const authorizeStaff = (req, res, next) => {
  if (req.user.role === "Admin" || req.user.role === "Staff") {
    next();
  } else {
    next({ name: "Forbidden" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    next({ name: "Forbidden" });
  }
};

const authorizeDeleteUser = async (req, res, next) => {

  const {id} = req.params;
  const user = await User.findByPk(+id);
  if (!user) return next({ name: "NotFoundError", message: `User with id ${id} not found` });

  if (req.user.role === "Admin") {
    next();
  } else if (req.user.role === "Staff" && user.id === req.user.id) {
    next();
  } else {
    next({ name: "Forbidden" });
  }
};

const authorizeDeleteLodging = async (req, res, next) => {

  const {id} = req.params;
  const lodging = await Lodging.findByPk(+id);
  if (!lodging) return next({ name: "NotFoundError", message: `Lodging with id ${id} not found` });

  if (req.user.role === "Admin") {
    next();
  } else if (req.user.role === "Staff") {
    if (lodging.authorId !== req.user.id) return next({ name: "Forbidden"});
    next();
  } else {
    next({ name: "Forbidden" });
  }
}

module.exports = { authorizeStaff, authorizeAdmin, authorizeDeleteUser, authorizeDeleteLodging };
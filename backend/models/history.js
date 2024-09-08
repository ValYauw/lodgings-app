'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, { foreignKey: 'updatedBy' });
    }
  }
  History.init({
    name: {
      type: DataTypes.ENUM,
      values: ["Users", "Types", "Lodgings"],
      allowNull: false,
      validate: {
        notEmpty: {msg: "Table name is required"},
        notNull: {msg: "Table name is required"},
        isIn: {
          msg: "Must be one of the tables 'Users', 'Types', 'Lodgings'",
          args: [["Users", "Types", "Lodgings"]]
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};
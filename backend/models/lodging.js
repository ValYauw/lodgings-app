'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lodging.belongsTo(models.User, {
        foreignKey: 'authorId'
      });
      Lodging.belongsTo(models.Type, {
        foreignKey: 'typeId'
      });
      Lodging.hasMany(models.Bookmark, {
        foreignKey: 'lodgingId'
      });
    }
  }
  Lodging.init({
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Name is required"},
        notNull: {msg: "Name is required"}
      }
    },
    facility:  {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Facility description is required"},
        notNull: {msg: "Facility description is required"}
      }
    },
    roomCapacity:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Room capacity is required"},
        notNull: {msg: "Room capacity is required"}
      }
    },
    imgUrl:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Image URL is required"},
        notNull: {msg: "Image URL is required"},
        isUrl: {msg: "Image URL is invalid"}
      }
    },
    authorId: DataTypes.INTEGER,
    location:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Location is required"},
        notNull: {msg: "Location is required"}
      }
    },
    price:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Price is required"},
        notNull: {msg: "Price is required"},
        min: {
          msg: "Price must be at least Rp100.000",
          args: 100_000
        }
      }
    },
    typeId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Lodging type is required"},
        notNull: {msg: "Lodging type is required"}
      }
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Active", "Inactive", "Archived"],
      defaultValue: "Active",
      validate: {
        notEmpty: {msg: "Status is required"},
        notNull: {msg: "Status is required"},
        isIn: {
          msg: "Status can only be 'Active', 'Inactive', or 'Archived'",
          args: [["Active", "Inactive", "Archived"]]
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Lodging',
  });
  return Lodging;
};
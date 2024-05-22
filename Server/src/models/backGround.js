const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Background",
    {
      backgroundId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      imageUrl1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      imageUrl2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      imageUrl3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      }
    },
    {
      tableName: 'background',
      timestamps: true
    }
  );
};

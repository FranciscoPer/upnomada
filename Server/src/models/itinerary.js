const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Itinerary",
    {
      itineraryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.JSON,
        allowNull: false,
      }
    },
    {
      tableName: 'itineraries',
      timestamps: true,
    }
  );
};

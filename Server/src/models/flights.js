const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Flight",
    {
      flightId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      departureDate: {
        type: DataTypes.DATEONLY, // Cambiado a DATEONLY para almacenar solo la fecha
        allowNull: false
      },
      returnDate: {
        type: DataTypes.DATEONLY, // Cambiado a DATEONLY para almacenar solo la fecha
        allowNull: true  // Puede ser null para vuelos de solo ida
      },
      type: {
        type: DataTypes.ENUM('round-trip', 'one-way'),
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,  
          min: 0          
        }
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true  
      },
      bookingLink: {
        type: DataTypes.STRING,
        allowNull: false,  
        validate: {
          isURL: true   
        }
      }
    },
    {
      tableName: 'flights',
      timestamps: true
    }
  );
};

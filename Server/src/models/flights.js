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
      originAirport: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destinationAirport: {
        type: DataTypes.STRING,
        allowNull: false
      },
      departureDates: {
        type: DataTypes.ARRAY(DataTypes.DATEONLY), // Varias fechas de salida
        allowNull: false
      },
      returnDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      type: {
        type: DataTypes.ENUM('round-trip', 'one-way'),
        allowNull: false
      },
      priceRegular: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0
        }
      },
      offerPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          min: 0
        }
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
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      imageUrl3: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      bookingLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      publicationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    },
    {
      tableName: 'flights',
      timestamps: true
    }
  );
};

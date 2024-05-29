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
        allowNull: true
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destinationAirport: {
        type: DataTypes.STRING,
        allowNull: true
      },
      departureDate1: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      urlLink1: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      departureDate2: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      urlLink2: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      departureDate3: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      urlLink3: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      departureDate4: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      urlLink4: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      departureDate5: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      urlLink5: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      departureDate6: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      urlLink6: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      publicationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'flights',
      timestamps: true
    }
  );
};

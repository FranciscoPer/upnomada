const { Flight } = require('../../db');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const getFlightsController = async (filters) => {
  const query = {
    where: {}
  };

  if (filters.flightId) {
    query.where.flightId = filters.flightId; 
  }

  if (filters.destination) {
    query.where.destination = Sequelize.where(
      Sequelize.fn('lower', Sequelize.col('destination')),
      Sequelize.fn('lower', filters.destination)
    );
  }

  if (filters.origin) {
    query.where.origin = Sequelize.where(
      Sequelize.fn('lower', Sequelize.col('origin')),
      Sequelize.fn('lower', filters.origin)
    );
  }

  if (filters.departureDate) {
    query.where.departureDate = {
      [Op.eq]: new Date(filters.departureDate)
    };
  }

  if (filters.returnDate) {
    query.where.returnDate = {
      [Op.eq]: new Date(filters.returnDate)
    };
  }

  if (filters.type) {
    query.where.type = filters.type.toLowerCase();
  }

  try {
    const flights = await Flight.findAll(query);
    return flights;
  } catch (error) {
    console.error("Error en getFlightsController:", error);
    throw error;
  }
};

module.exports = {getFlightsController}
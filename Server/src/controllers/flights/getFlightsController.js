const { Flight } = require('../../db');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const getFlightsController = async (filters) => {
  const query = {
    where: {},
    order: []
  };

  // Excluir vuelos con fecha pasada
  query.where.departureDate = { [Op.gt]: new Date() };

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
    query.where.departureDate[Op.eq] = new Date(filters.departureDate);
  }

  if (filters.returnDate) {
    query.where.returnDate = {
      [Op.eq]: new Date(filters.returnDate)
    };
  }

  if (filters.type) {
    query.where.type = filters.type.toLowerCase();
  }

  // Ordenamiento
  if (filters.sortByPrice) {
    query.order.push(['price', filters.sortByPrice]); // 'asc' o 'desc'
  }

  if (filters.sortByDepartureDate) {
    query.order.push(['departureDate', filters.sortByDepartureDate]); // 'asc' o 'desc'
  }

  try {
    const flights = await Flight.findAll(query);
    return flights;
  } catch (error) {
    console.error("Error en getFlightsController:", error);
    throw error;
  }
};

module.exports = {getFlightsController};
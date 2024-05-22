const { Flight } = require('../../db');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const getFlightsController = async (filters) => {
  const query = {
    where: {},
    order: []
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
    query.where.departureDates = { [Op.contains]: [filters.departureDate] };
  } else {
    // Si no se especifica una fecha de salida, no filtramos por fechas
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
    query.order.push(['priceRegular', filters.sortByPrice]); // 'asc' o 'desc'
  }

  if (filters.sortByDepartureDate) {
    query.order.push(['departureDates', filters.sortByDepartureDate]); // 'asc' o 'desc'
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
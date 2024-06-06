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
    const departureDate = new Date(filters.departureDate).toISOString().split('T')[0]; // Ensure correct format
    query.where = {
      ...query.where,
      [Op.or]: [
        { departureDate1: departureDate },
        { departureDate2: departureDate },
        { departureDate3: departureDate },
        { departureDate4: departureDate },
        { departureDate5: departureDate },
        { departureDate6: departureDate }
      ]
    };
  }

  if (filters.returnDate) {
    query.where.returnDate = {
      [Op.eq]: new Date(filters.returnDate).toISOString().split('T')[0] // Ensure correct format
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
    query.order.push(['departureDate1', filters.sortByDepartureDate]); // 'asc' o 'desc'
    query.order.push(['departureDate2', filters.sortByDepartureDate]);
    query.order.push(['departureDate3', filters.sortByDepartureDate]);
    query.order.push(['departureDate4', filters.sortByDepartureDate]);
    query.order.push(['departureDate5', filters.sortByDepartureDate]);
    query.order.push(['departureDate6', filters.sortByDepartureDate]);
  }

  try {
    const flights = await Flight.findAll(query);
    return flights;
  } catch (error) {
    console.error("Error en getFlightsController:", error);
    throw error;
  }
};

module.exports = { getFlightsController };

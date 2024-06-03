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
    const departureDate = new Date(filters.departureDate);
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
    query.order.push([Sequelize.literal(`GREATEST(
      CASE WHEN "departureDate1" IS NOT NULL THEN 1 ELSE 0 END,
      CASE WHEN "departureDate2" IS NOT NULL THEN 2 ELSE 0 END,
      CASE WHEN "departureDate3" IS NOT NULL THEN 3 ELSE 0 END,
      CASE WHEN "departureDate4" IS NOT NULL THEN 4 ELSE 0 END,
      CASE WHEN "departureDate5" IS NOT NULL THEN 5 ELSE 0 END,
      CASE WHEN "departureDate6" IS NOT NULL THEN 6 ELSE 0 END
    )`), filters.sortByDepartureDate]); // 'asc' o 'desc'
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
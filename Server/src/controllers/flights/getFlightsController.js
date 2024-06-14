const { Flight } = require('../../db');
const Sequelize = require('sequelize');
const { Op } = Sequelize;


function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const getFlightsController = async (filters) => {
  const query = {
    where: {},
    order: []
  };

  if (filters.flightId) {
    query.where.flightId = filters.flightId;
  }

  if (filters.destination) {
    const normalizedDestination = removeAccents(filters.destination.toLowerCase());
    query.where.destination = {
      [Op.iLike]: `%${normalizedDestination}%`
    };
    console.log("Destination filter applied:", query.where.destination);
  }

  if (filters.origin) {
    const normalizedOrigin = removeAccents(filters.origin.toLowerCase());
    query.where.origin = {
      [Op.iLike]: `%${normalizedOrigin}%`
    };
    console.log("Origin filter applied:", query.where.origin);
  }

  if (filters.originAirport) {
    const normalizedOriginAirport = removeAccents(filters.originAirport.toLowerCase());
    query.where.originAirport = {
      [Op.iLike]: `%${normalizedOriginAirport}%`
    };
  }

  if (filters.destinationAirport) {
    const normalizedDestinationAirport = removeAccents(filters.destinationAirport.toLowerCase());
    query.where.destinationAirport = {
      [Op.iLike]: `%${normalizedDestinationAirport}%`
    };
  }

  if (filters.departureDate) {
    const departureDate = new Date(filters.departureDate);
    const departureDateUTC = departureDate.toISOString().split('T')[0];

    query.where = {
      ...query.where,
      [Op.or]: [
        { departureDate1: departureDateUTC },
        { departureDate2: departureDateUTC },
        { departureDate3: departureDateUTC },
        { departureDate4: departureDateUTC },
        { departureDate5: departureDateUTC },
        { departureDate6: departureDateUTC }
      ]
    };
    console.log("Departure date filter applied:", query.where);
  }

  if (filters.returnDate) {
    query.where.returnDate = {
      [Op.eq]: new Date(filters.returnDate).toISOString().split('T')[0]
    };
  }

  if (filters.type) {
    query.where.type = filters.type.toLowerCase();
  }

  // Ordenamiento
  if (filters.sortByPrice) {
    query.order.push(['priceRegular', filters.sortByPrice]);
  }

  if (filters.sortByDepartureDate) {
    query.order.push(['departureDate1', filters.sortByDepartureDate]);
    query.order.push(['departureDate2', filters.sortByDepartureDate]);
    query.order.push(['departureDate3', filters.sortByDepartureDate]);
    query.order.push(['departureDate4', filters.sortByDepartureDate]);
    query.order.push(['departureDate5', filters.sortByDepartureDate]);
    query.order.push(['departureDate6', filters.sortByDepartureDate]);
  }

  console.log("Final query:", query);

  try {
    const flights = await Flight.findAll(query);
    console.log("Query result:", flights);
    return flights;
  } catch (error) {
    console.error("Error en getFlightsController:", error);
    throw error;
  }
};

module.exports = { getFlightsController };

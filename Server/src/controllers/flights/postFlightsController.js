const {Flight} = require("../../db")

const postFlightController = async (flightDetails) => {
  const {
    origin,
    originAirport,
    destination,
    destinationAirport,
    departureDate1,
    urlLink1,
    departureDate2,
    urlLink2,
    departureDate3,
    urlLink3,
    departureDate4,
    urlLink4,
    departureDate5,
    urlLink5,
    departureDate6,
    urlLink6,
    returnDate,
    type,
    priceRegular,
    offerPrice,
    imageUrl1,
    imageUrl2,
    imageUrl3,
    bookingLink,
    description,
    publicationDate
  } = flightDetails;

  const today = new Date();

  const departureDates = [departureDate1, departureDate2, departureDate3, departureDate4, departureDate5, departureDate6].filter(date => date);
  if (departureDates.some(date => new Date(date) < today)) {
    throw new Error("Alguna fecha de salida es anterior a la fecha actual.");
  }

  if (returnDate && new Date(returnDate) < new Date(departureDates[0])) {
    throw new Error("La fecha de regreso no puede ser anterior a la primera fecha de salida.");
  }

  try {
    const newFlight = await Flight.create({
      origin,
      originAirport,
      destination,
      destinationAirport,
      departureDate1,
      urlLink1,
      departureDate2,
      urlLink2,
      departureDate3,
      urlLink3,
      departureDate4,
      urlLink4,
      departureDate5,
      urlLink5,
      departureDate6,
      urlLink6,
      returnDate,
      type,
      priceRegular,
      offerPrice,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      bookingLink,
      description,
      publicationDate
    });
    return newFlight;
  } catch (error) {
    console.error("Error en postFlightController:", error);
    throw error;
  }
};

  module.exports = {postFlightController}
  
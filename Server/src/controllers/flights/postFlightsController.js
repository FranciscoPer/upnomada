const {Flight} = require("../../db")

const postFlightController = async (flightDetails) => {
  const {
    origin,
    originAirport,
    destination,
    destinationAirport,
    departureDates,
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
      departureDates,
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
  
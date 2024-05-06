const {Flight} = require("../../db")

const postFlightController = async (flightDetails) => {
    const { origin, destination, departureDate, returnDate, type, price, imageUrl, bookingLink } = flightDetails;
    try {
      const newFlight = await Flight.create({
        origin,
        destination,
        departureDate,
        returnDate,
        type,
        price,
        imageUrl,
        bookingLink
      });
      return newFlight;
    } catch (error) {
      console.error("Error en postFlightController:", error);
      throw error;
    }
  };
  
  module.exports = {postFlightController}
  
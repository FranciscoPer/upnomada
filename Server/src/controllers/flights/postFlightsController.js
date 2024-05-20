const {Flight} = require("../../db")

const postFlightController = async (flightDetails) => {
  const { origin, destination, departureDate, returnDate, type, price, imageUrl, bookingLink } = flightDetails;

  const departure = new Date(departureDate);
  const returnD = new Date(returnDate);
  const today = new Date();

  if (departure < today) {
    throw new Error("La fecha de salida no puede ser anterior a la fecha actual.");
  }

  if (returnD < departure) {
    throw new Error("La fecha de regreso no puede ser anterior a la fecha de salida.");
  }

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
  
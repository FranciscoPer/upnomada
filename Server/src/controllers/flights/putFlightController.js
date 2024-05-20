const { Flight } = require("../../db");

const putFlightController = async (flightId, updateData) => {
  const existingFlight = await Flight.findByPk(flightId);
  if (!existingFlight) {
    throw new Error("El vuelo no existe");
  }

  const { departureDate, returnDate } = updateData;

  if (departureDate) {
    const departure = new Date(departureDate);
    const today = new Date();

    if (departure < today) {
      throw new Error("La fecha de salida no puede ser anterior a la fecha actual.");
    }
  }

  if (returnDate) {
    const returnD = new Date(returnDate);
    const departure = new Date(departureDate || existingFlight.departureDate);

    if (returnD < departure) {
      throw new Error("La fecha de regreso no puede ser anterior a la fecha de salida.");
    }
  }

  await existingFlight.update(updateData);

  return existingFlight;
};

module.exports = { putFlightController };

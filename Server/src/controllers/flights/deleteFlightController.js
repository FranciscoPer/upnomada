const { Flight } = require('../../db');

const deleteFlightController = async (flightId) => {
  const flight = await Flight.findByPk(flightId);
  if (!flight) {
    throw new Error('Flight not found');
  }

  await flight.destroy();
  return { message: 'Flight successfully deleted' };
};

module.exports = { deleteFlightController };

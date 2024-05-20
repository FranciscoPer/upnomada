const { Router } = require ("express");

const { postFlightHandler } = require("../handlers/flights/postFlightsHandler")
const { getFlightsHandler } = require('../handlers/flights/getFlightsHandler');
const { deleteFlightHandler } = require("../handlers/flights/deleteFlightHandler")
const { putFlightHandler } = require("../handlers/flights/putFlightHandler")

const flightsRouter = Router();

flightsRouter.post("/", postFlightHandler)
flightsRouter.get('/', getFlightsHandler)
flightsRouter.delete('/:id', deleteFlightHandler);
flightsRouter.put('/', putFlightHandler)


module.exports = flightsRouter;
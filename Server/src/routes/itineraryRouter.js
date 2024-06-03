const { Router } = require ("express");
const {getItinerariesHandler} = require("../handlers/itinerary/itineraryHandler")

const itineraryRouter = Router();

itineraryRouter.get("/:userId", getItinerariesHandler);

module.exports = itineraryRouter;
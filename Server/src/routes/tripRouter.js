const { Router } = require ("express");
const {tripPlannerHandler} = require("../handlers/tripPlanner/tripPlannerHandler")

const tripRouter = Router();

tripRouter.get("/", tripPlannerHandler)

module.exports = tripRouter;
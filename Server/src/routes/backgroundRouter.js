const { Router } = require("express");
const { updateBackgroundHandler } = require("../handlers/backGround/updateBackgroundHandler");
const { getBackgroundHandler } = require("../handlers/backGround/getBackgroundHandler");

const backgroundRouter = Router();

backgroundRouter.post("/", updateBackgroundHandler);
backgroundRouter.get("/", getBackgroundHandler);

module.exports = backgroundRouter;

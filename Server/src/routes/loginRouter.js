const { Router } = require ("express");
const {loginHandler} = require("../handlers/login/loginHandler")
const { googleLoginHandler } = require("../handlers/login/googleLoginHandler")
const loginRouter = Router();

loginRouter.post("/", loginHandler)
loginRouter.post("/google", googleLoginHandler);


module.exports = loginRouter;
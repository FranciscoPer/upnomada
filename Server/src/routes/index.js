const { Router } = require("express");

const loginRouter = require('./loginRouter')
const userRouter = require ("./userRouter")
const flightsRouter = require ("./flightsRouter")
const tripRouter = require("./tripRouter")

const router = Router();

router.use("/login", loginRouter);
router.use("/user", userRouter)
router.use("/flights", flightsRouter)
router.use("/trip", tripRouter)




module.exports = router;
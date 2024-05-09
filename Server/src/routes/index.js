const { Router } = require("express");

const loginRouter = require('./loginRouter')
const userRouter = require ("./userRouter")
const flightsRouter = require ("./flightsRouter")
const tripRouter = require("./tripRouter")
const stripeRouter = require("./stripeRouter")

const router = Router();

router.use("/login", loginRouter);
router.use("/user", userRouter)
router.use("/flights", flightsRouter)
router.use("/trip", tripRouter)
router.use("/stripe", stripeRouter)



module.exports = router;
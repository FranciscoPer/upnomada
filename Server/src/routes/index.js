const { Router } = require("express");

const loginRouter = require('./loginRouter')
const userRouter = require ("./userRouter")
const flightsRouter = require ("./flightsRouter")

const router = Router();

router.use("/login", loginRouter);
router.use("/user", userRouter)
router.use("/flights", flightsRouter)




module.exports = router;
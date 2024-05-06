const { Router } = require ("express");
const {postUserHandler} = require ("../handlers/user/postUserHandler")
const {putUserHandler} = require("../handlers/user/putUserHandler")
const {putAdminHandler} = require("../handlers/user/putAdminHandler")
const {deleteUserHandler} = require ("../handlers/user/deleteUserHandler")
const {getAllUserHandler} = require("../handlers/user/getAllUserHandler")


const userRouter = Router();

userRouter.post("/", postUserHandler);
userRouter.put("/:id", putUserHandler);
userRouter.put("/isAdmin/:id", putAdminHandler)
userRouter.delete("/:id", deleteUserHandler)
userRouter.get("/", getAllUserHandler)

module.exports = userRouter;
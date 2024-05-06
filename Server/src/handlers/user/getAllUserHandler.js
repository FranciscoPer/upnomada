const {getAllUserController} = require("../../controllers/user/getAllUserController")

const getAllUserHandler = async (req, res) => {
    try {
        const users = await getAllUserController()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = {getAllUserHandler}

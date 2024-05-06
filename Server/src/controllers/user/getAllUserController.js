const { User } = require("../../db")

const getAllUserController = async () => {
    try {
        const users = await User.findAll();
        return users
    } catch (error) {
        throw new Error ("Failed to retrieve users")
    }
}

module.exports = {getAllUserController}
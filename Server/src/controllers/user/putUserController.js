const { User} = require("../../db")

const putUserController = async (userId, updateData) => {
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
        throw new Error ("User doesn't exist ")
    }
    
    await existingUser.update(updateData)

    return existingUser;
}

module.exports = {putUserController}
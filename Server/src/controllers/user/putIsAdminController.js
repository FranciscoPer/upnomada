const { User } = require ("../../db")

const putIsAdminController = async (userId, data) => {
    const existingUser = await User.findByPk(userId, data)

    if(!existingUser) {
        throw new Error ("User Not Found")
    }
    await existingUser.update(data);

    return existingUser
}

module.exports = {putIsAdminController}
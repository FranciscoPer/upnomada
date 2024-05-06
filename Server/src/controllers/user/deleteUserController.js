const {User} = require("../../db")

const deleteUserController = async (userId) => {
    
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User Not Found");
    }
    await user.destroy();

    return "User deleted successfully"
}

module.exports = {deleteUserController}
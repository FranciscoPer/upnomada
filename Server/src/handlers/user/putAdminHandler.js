const {putIsAdminController} = require("../../controllers/user/putIsAdminController")

const putAdminHandler = async (req, res) => {
    const userId = req.params.id
    const data = req.body
    
    try {
        const isAdmin = await putIsAdminController(userId, data);
        res.status(200).json(isAdmin);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {putAdminHandler}
const {putUserController} = require ("../../controllers/user/putUserController")

const putUserHandler = async (req, res) => {
    const userId = req.params.id;
    const { email,isAdmin, ...updatedData } = req.body; 
  
    if (email) {
      return res.status(400).json({ message: "Email cannot be modified." });
    }
  
    try {
      const updatedUser = await putUserController(userId, updatedData);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    putUserHandler,
  };
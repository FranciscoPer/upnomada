const { postUserController } = require('../../controllers/user/postUserController');

const postUserHandler = async (req, res) => {
  const { name, lastName, email, phone, password, dob } = req.body;

  try {
    const user = await postUserController(name, lastName, email, phone, password, dob);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postUserHandler };

const { getAllUserController } = require("../../controllers/user/getAllUserController");

const getAllUserHandler = async (req, res) => {
  const filters = {
      email: req.query.email,
      name: req.query.name,
      lastName: req.query.lastName,
      isAdmin: req.query.isAdmin === 'true',
      subscriptionStatus: req.query.subscriptionStatus === 'true',
      dob: req.query.dob,
      sortByName: req.query.sortByName, // 'asc' o 'desc'
      sortByLastName: req.query.sortByLastName // 'asc' o 'desc'
  };

  console.log("Filters:", filters);

  try {
      const users = await getAllUserController(filters);
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUserHandler };

const { User } = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (email, password) => {
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new Error("Incorrect user or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Incorrect user or password");
  }

  const userInfo = {
    userId: user.userId,
    name: user.name,
    lastName: user.lastName,
    email: user.email
  };

  const token = jwt.sign(
    { userInfo, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    isAdmin: user.isAdmin,
    userInfo,
  };
};

module.exports = { loginController };

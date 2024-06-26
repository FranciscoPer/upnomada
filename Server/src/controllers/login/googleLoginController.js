const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require("../../db");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const googleLoginController = async (accessToken) => {
  console.log("Access token recibido para verificación:", accessToken);

  let userInfo;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
    );
    userInfo = response.data;
  } catch (error) {
    throw new Error(
      "Error al obtener datos del usuario de Google: " + error.message
    );
  }

  // Busca si ya existe un usuario con el Google ID.
  let user = await User.findOne({ where: { googleID: userInfo.id } });
  if (!user) {
    user = await User.findOne({ where: { email: userInfo.email } });
    if (user) {
      user.googleID = userInfo.id;
      await user.save();
    }
  }

  if (!user) {
    const randomPassword = crypto.randomBytes(16).toString("hex"); // genera una contraseña aleatoria segura
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);
    const defaultDob = new Date().toISOString().split("T")[0];

    user = await User.create({
      name: userInfo.given_name,
      email: userInfo.email,
      lastName: userInfo.family_name,
      googleID: userInfo.id,
      password: hashedPassword,
      dob: defaultDob,
      phone: "",
    });
  }

  const jwtPayload = {
    userId: user.userId,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token: jwtToken,
    userInfo: {
      userId: user.userId,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      phone: user.phone,
    },
    isAdmin: user.isAdmin,
  };
};

module.exports = { googleLoginController };

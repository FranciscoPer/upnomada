const { User } = require("../../db");

const postUserController = async (name, lastName, email, phone, password, dob) => {
  try {
    const existingUser = await User.findOne({
      where: { email: email }
    });

    if (existingUser) {
      throw new Error("Ya existe un usuario asociado a ese email, por favor inicie sesión.");
    } else {
      const newUser = await User.create({
        name,
        lastName,
        dob,
        email,
        phone,
        password
      });
      return newUser;
    }
  } catch (error) {
    console.error("Error en postUserController:", error);
    throw error;  // Re-lanza el error para manejarlo más arriba en la cadena
  }
};

module.exports = { postUserController };


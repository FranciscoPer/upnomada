const { User } = require("../../db")
const Sequelize = require('sequelize');
const { Op } = Sequelize;

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const getAllUserController = async (filters) => {
  const query = {
    where: {},
    order: []
  };

  if (filters.email) {
    query.where.email = {
      [Op.iLike]: `%${removeAccents(filters.email.toLowerCase())}%`
    };
  }

  if (filters.name) {
    query.where.name = {
      [Op.iLike]: `%${removeAccents(filters.name.toLowerCase())}%`
    };
  }

  if (filters.lastName) {
    query.where.lastName = {
      [Op.iLike]: `%${removeAccents(filters.lastName.toLowerCase())}%`
    };
  }

  if (filters.isAdmin !== undefined) {
    query.where.isAdmin = filters.isAdmin;
  }

  if (filters.subscriptionStatus !== undefined) {
    query.where.subscriptionStatus = filters.subscriptionStatus;
  }

  if (filters.dobMonth) {
    const month = filters.dobMonth.padStart(2, '0');
    query.where = {
      ...query.where,
      [Op.and]: [
        Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "dob"')), month)
      ]
    };
  }

  if (filters.sortByName) {
    query.order.push(['name', filters.sortByName]);
  }

  if (filters.sortByLastName) {
    query.order.push(['lastName', filters.sortByLastName]);
  }

  try {
    const users = await User.findAll(query);
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve users");
  }
};

module.exports = { getAllUserController };
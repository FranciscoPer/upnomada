const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  }
);

const basename = path.basename(__filename);
const modelDefiners = [
  require('./models/user'),
  require('./models/itinerary')
];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, '/models', file));
    modelDefiner(sequelize);
  });
  const { User, Itinerary } = sequelize.models;

User.hasMany(Itinerary, { foreignKey: 'userId' });
Itinerary.belongsTo(User, { foreignKey: 'userId' });
  console.log(sequelize.models); 

sequelize.models = sequelize.models || {};



module.exports = {
  conn: sequelize,
  User: sequelize.models.User,
  Itinerary: sequelize.models.Itinerary,
  Flight: sequelize.models.Flight, // Asegúrate de que este nombre coincida con lo que importas
  Background: sequelize.models.Background
};
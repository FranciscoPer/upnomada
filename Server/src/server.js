require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes")

const server = express();

server.use(morgan("dev"));
// server.use(express.json());
server.use(cors());
server.use((req, res, next) => {
    if (req.originalUrl.startsWith('/webhook')) {  // Asegúrate de que esta sea la ruta correcta
        next();  // Salta express.json() y permite que express.raw() en la ruta del webhook maneje el cuerpo
    } else {
        express.json()(req, res, next);
    }
});
server.use(router);

module.exports = server;



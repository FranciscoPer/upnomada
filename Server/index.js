const { conn } = require("./src/db");
const server = require('./src/server')
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    })
    }).catch(error => console.error(error))


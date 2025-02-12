const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

const express = require("express");
const cors = require("cors");
const path = require('path');
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use("/routes", userRoutes);

// Rotas
app.use(userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './public/register.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, './public/game.html'));
});

// Inicialização do servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
const express = require("express");
const cors = require("cors");
const path = require('path');
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes.js");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './midia')));
app.use("/routes", userRoutes);

// Rotas da API
app.use(userRoutes);
app.use(commentRoutes);

// Rotas para servir as páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/login', (req, res) => {
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
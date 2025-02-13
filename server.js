const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");

const { User } = require('./models');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/login', async (req, res) => {
    const { email, senha, tipo } = req.body;

try {
        // Verifique se o usuário existe e se a senha está correta
        const usuario = await User.findOne({
            where: {
                email: email,
                tipo: tipo
            }
        });

        if (usuario && usuario.senha === senha) {
            res.json({ mensagem: "Login bem-sucedido!" });
        } else {
            res.status(401).json({ mensagem: "Credenciais inválidas." });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  });
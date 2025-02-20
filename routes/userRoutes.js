const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const router = express.Router();

// Método para comparar senhas no modelo User
User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Criar um usuário (Cadastro)
router.post('/register', async (req, res) => {
    const { email, password, role, username } = req.body;

    if (!email || !password || !role || !username) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        console.log('Tentando criar usuário com os dados:', { email, password, role, username });
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword, role, username });

        // Retorna apenas a mensagem, sem dados sensíveis
        return res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Autenticação (Login)
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const user = await User.findOne({ where: { email, role } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        res.json({ message: "Login bem-sucedido!", userId: user.id, username: user.username });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login", details: error.message });
    }
});

// Listar usuários cadastrados (somente para administradores)
router.get("/", async (req, res) => {
    try {
        // Buscar todos os usuários retornando apenas id, email e role
        const users = await User.findAll({ attributes: ["id", "email", "role", "username"] });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
});

// Deletar usuário (somente para administradores)
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar usuário pelo ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Deletar usuário
        await user.destroy();
        res.json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover usuário." });
    }
});

module.exports = router;

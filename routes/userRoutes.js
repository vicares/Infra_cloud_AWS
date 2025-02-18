const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta";

// Método para comparar senhas no modelo User
User.prototype.checksenha = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Criar um usuário (Cadastro)
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    // Verificação para garantir que todos os campos foram preenchidos
    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verificar se o email já está cadastrado
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'Email já está em uso.' });
        }

        // Criando o novo usuário
        const newUser = await User.create({ email, password, role });

        // Retornando resposta de sucesso
        res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
        // Caso ocorra um erro, retornamos uma mensagem
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar conta.' });
    }
});

// Autenticação (Login)
router.post('/index', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const user = await User.findOne({ where: { email, role } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        res.json({ message: "Login bem-sucedido!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login", details: error.message });
    }
});

// Listar usuários cadastrados (somente para administradores)
router.get("/", async (req, res) => {
    try {
        // Busca todos os usuários, retornando apenas os campos id, email e role
        const users = await User.findAll({ attributes: ["id", "email", "role"] });
        res.json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

// Deletar usuário (somente para administradores)
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Busca o usuário pelo ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Deleta o usuário
        await user.destroy();

        // Retorna sucesso
        res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
});

module.exports = router;
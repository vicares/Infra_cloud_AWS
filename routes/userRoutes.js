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
router.post("/register", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validação dos campos
        if (!email || !password || !role) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        // Criptografa a password antes de salvar no banco de dados
        const senha = await bcrypt.hash(password, 10);

        // Cria o usuário no banco de dados
        const newUser = await User.create({ email, password: senha, role });

        // Retorna sucesso
        res.status(201).json({ message: "Usuário cadastrado com sucesso", id: newUser.id });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
});

// Autenticação (Login)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validação dos campos
        if (!email || !password) {
            return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
        }

        // Busca o usuário no banco de dados
        const user = await User.findOne({ where: { email } });

        // Verifica se o usuário existe e se a senha está correta
        if (!user || !(await user.checksenha(password))) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

        // Retorna o token
        res.json({ message: "Login bem-sucedido", token });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login" });
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
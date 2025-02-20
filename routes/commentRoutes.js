const express = require("express");
const { Comment, User } = require("../models");
const router = express.Router();

// Rota para obter comentários
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar comentários", details: error.message });
    }
});

// Rota para enviar comentários
router.post('/comments', async (req, res) => {
    try {
        const { text, id_user } = req.body;

        if (!text || !id_user) {
            return res.status(400).json({ error: "O comentário e o ID do usuário são obrigatórios." });
        }

        const newComment = await Comment.create({ text, id_user });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar comentário", details: error.message });
    }
});

module.exports = router;
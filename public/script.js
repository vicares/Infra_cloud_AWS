document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById('tipo').value;

    const resposta = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha, tipo })
    });

    const resultado = await resposta.json();

    const mensagem = document.getElementById('mensagem');
    if (resposta.ok) {
        mensagem.style.color = "green";
        mensagem.textContent = "Login realizado com sucesso!";
    } else {
        mensagem.style.color = "red";
        mensagem.textContent = resultado.mensagem || "Erro ao fazer login.";
    }
});
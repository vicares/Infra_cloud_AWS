// Função para registrar um novo usuário
document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que a página recarregue

    const email = document.getElementById("registerEmail").value;
    const senha = document.getElementById("registerSenha").value;
    const tipo = document.getElementById("registerTipo").value;

    if (!email || !senha || !tipo) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha, tipo })
    });

    const data = await response.json();
    
    if (response.ok) {
        alert(data.message); // Mensagem de sucesso
        window.location.href = "/index"; // Redireciona para login
    } else {
        alert(data.message); // Mensagem de erro
    }
});





// Função para fazer login
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userRole', role); // Armazena o tipo de usuário
            window.location.href = 'game.html'; // Redireciona para a página de jogos
        } else {
            alert(data.error || 'Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});




// Função para exibir o tipo de usuário na página de jogos
document.getElementById('userRole')?.textContent = localStorage.getItem('userRole') || 'usuário';

// Função para fazer logout
document.getElementById('logoutButton')?.addEventListener('click', () => {
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
});
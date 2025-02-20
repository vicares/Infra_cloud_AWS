// Função para registrar um novo usuário
document.getElementById('registerForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Pega os valores dos campos
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerSenha').value;
    const role = document.getElementById('registerTipo').value;
    const username = document.getElementById('registerUsername').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role, username })
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || 'Erro ao criar conta.');
        }

        // Exibe pop-up de sucesso
        alert('Conta criada com sucesso! Redirecionando para login...');

        // Redireciona para a página de login
        window.location.href = '/';
    } catch (error) {
        alert(error.message);
    }
});

// Função para fazer login
document.getElementById('loginForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('userRole', role); // Armazena o tipo de usuário
            localStorage.setItem('id_user', data.id_user); // Armazena o ID do usuário
            localStorage.setItem('username', data.username); // Armazena o username do usuário
            window.location.href = 'game.html'; // Redireciona para a página do jogo
        } else {
            const data = await response.json();
            alert(data.error || 'Credenciais inválidas.');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor.');
    }
});

// Exibir o tipo de usuário na página de jogos
if (document.getElementById('userRole')) {
    document.getElementById('userRole').textContent = localStorage.getItem('userRole') || 'usuário';
}

// Função para fazer logout
document.getElementById('logoutButton')?.addEventListener('click', () => {
    localStorage.removeItem('userRole');
    window.location.href = '/';
});

// Função para carregar comentários
async function loadComments() {
    try {
        const response = await fetch('/comments');
        const comments = await response.json();

        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = '';

        comments.forEach(comment => {
            const li = document.createElement('li');
            li.textContent = comment.text;
            commentsList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Carrega os comentários ao carregar a página
if (document.getElementById('commentsList')) {
    loadComments();
}
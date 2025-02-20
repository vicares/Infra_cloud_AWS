document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("comment-form");
    const commentsContainer = document.getElementById("comments-container");

    // Função para carregar comentários
    async function loadComments() {
        try {
            const response = await fetch('/comments');
            const comments = await response.json();

            commentsContainer.innerHTML = '';

            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment");

                commentElement.innerHTML = `
                    <span class="username">${comment.User.username}:</span>
                    <span>${comment.text}</span>
                `;

                commentsContainer.appendChild(commentElement);
            });
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // Carrega os comentários ao carregar a página
    loadComments();

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const userName = document.getElementById("user-name").value;
        const userComment = document.getElementById("user-comment").value;
        const userId = localStorage.getItem('userId'); // Assumindo que o ID do usuário está armazenado no localStorage

        if (userName && userComment && userId) {
            try {
                const response = await fetch('/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: userComment, userId })
                });

                if (response.ok) {
                    loadComments(); // Recarrega os comentários após adicionar um novo
                    document.getElementById("user-name").value = "";
                    document.getElementById("user-comment").value = "";
                } else {
                    const result = await response.json();
                    alert(result.error || 'Erro ao enviar comentário.');
                }
            } catch (error) {
                alert('Erro ao conectar com o servidor.');
            }
        }
    });
});

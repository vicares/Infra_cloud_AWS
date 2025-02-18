document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("comment-form");
    const commentsContainer = document.getElementById("comments-container");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const userName = document.getElementById("user-name").value;
        const userComment = document.getElementById("user-comment").value;

        if (userName && userComment) {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            commentElement.innerHTML = `
                <span class="username">${userName}:</span>
                <span>${userComment}</span>
            `;

            commentsContainer.appendChild(commentElement);

            // Limpar os campos após envio
            document.getElementById("user-name").value = "";
            document.getElementById("user-comment").value = "";
        }
    });
});

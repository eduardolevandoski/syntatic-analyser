
function ScrollAutomatico() {
    window.scrollTo(0, document.body.scrollHeight);
}

function copiarTexto() {
    var textToCopy = $("#sentencaGerador").val();
    navigator.clipboard.writeText(textToCopy).then(function () {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");

            setTimeout(() => {
                main.removeChild(toast);
            }, 2000);

            toast.classList.add("toast");
            toast.style.animation = `slideInLeft 0.3s ease, fadeOut 1s 1s forwards`;

            toast.innerHTML = `
          <div class="toast__icon">
            <i class="material-icons">content_copy</i>
          </div>
          <div class="toast__body">
            <p class="toast__msg">Copiado para a área de transferência</p>
          </div>
        `;
            main.appendChild(toast);
        }
    }).catch(function (err) {
        console.error('Não foi possível copiar o texto: ', err);
    });
}
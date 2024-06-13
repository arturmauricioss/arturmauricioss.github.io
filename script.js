function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.classList.toggle('active');
}

window.addEventListener('load', function() {
    setTimeout(function() {
        const avallon = document.getElementById('avallon');
        avallon.style.animation = 'fadeOut 0.5s forwards';
        
        setTimeout(function() {
            document.querySelector('header').style.display = 'block';
            document.querySelector('main').style.display = 'block';
        }, 1000);

        setTimeout(function() {
            const portfolio = document.getElementById('portfolio');
            portfolio.style.animation = 'fadeOut 0.5s forwards';
            
            setTimeout(function() {
                portfolio.style.display = 'none';
            }, 500);
        }, 500); // Atraso de 500ms (0.5 segundo) para ocultar o portfolio
    }, 3500);
});

function handleSubmit(event) {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente

    // Coletar os dados do formulário
    const formData = new FormData(event.target);

    // Criar uma instância do objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Configurar a requisição
    xhr.open('POST', event.target.action);

    // Definir o cabeçalho da requisição
    xhr.setRequestHeader('Accept', 'application/json');

    // Definir a função de callback quando a requisição estiver concluída
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        // Verificar se a requisição foi bem-sucedida
        if (xhr.status === 200) {
            // Exibir uma mensagem de sucesso
            alert('Formulário enviado com sucesso!');
        } else {
            // Exibir uma mensagem de erro
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
        }
    };

    // Enviar os dados do formulário
    xhr.send(formData);
}

// Adicionando um event listener para o formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

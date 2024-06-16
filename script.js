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

// proj1
document.addEventListener('DOMContentLoaded', function() {
    const svgCodeTextarea = document.querySelector('#svgCode textarea');
    const svgPreview = document.getElementById('svgPreview');
    const fileInput = document.createElement('input'); // Criamos o campo de entrada de arquivo aqui fora

    // Função para atualizar o preview com o código SVG
    function updatePreview(svgCode) {
        svgPreview.innerHTML = ''; // Limpa o conteúdo anterior
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.innerHTML = svgCode;
        svgPreview.appendChild(svgElement);
    }

    // Evento de input na textarea
    svgCodeTextarea.addEventListener('input', function() {
        const svgCode = svgCodeTextarea.value;
        updatePreview(svgCode); // Atualiza o preview com o novo código SVG
    });

    // Evento de clique no campo de preview para carregar arquivo SVG
    svgPreview.addEventListener('click', function() {
        // Configuramos o campo de entrada de arquivo
        fileInput.type = 'file';
        fileInput.accept = '.svg';

        // Adiciona um evento de mudança ao campo de entrada de arquivo
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function() {
                const svgCode = reader.result;
                svgCodeTextarea.value = svgCode; // Definimos o código SVG na textarea
                updatePreview(svgCode); // Atualizamos o preview com o novo código SVG
            };

            reader.readAsText(file);
        });

        // Clicamos no campo de entrada de arquivo
        fileInput.click();
    });

    // Evento de clique no botão para compilar SVG
    document.getElementById('botaosvg').addEventListener('click', function() {
        const svgCode = svgCodeTextarea.value;
        const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.setAttribute('download', 'generated-image.svg');
        a.setAttribute('href', url);
        a.click();

        URL.revokeObjectURL(url);
    });

    // Evento de clique no botão para baixar PNG
    document.getElementById('botaopng').addEventListener('click', function() {
        const svgCode = svgCodeTextarea.value;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Cria um elemento SVG temporário para obter suas dimensões
        const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tempSvg.innerHTML = svgCode;
        document.body.appendChild(tempSvg); // Adiciona ao body para garantir que seja renderizado

        // Define as dimensões do canvas com base no tamanho do bounding box do SVG
        const bbox = tempSvg.getBBox();
        canvas.width = bbox.width;
        canvas.height = bbox.height;

        // Limpa o canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Função para renderizar SVG em canvas
        function renderSVGToCanvas(svg, canvas) {
            return new Promise((resolve, reject) => {
                const svgData = new XMLSerializer().serializeToString(svg);
                const img = new Image();
                img.onload = function() {
                    context.drawImage(img, 0, 0);
                    resolve(canvas);
                };
                img.onerror = reject;
                img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
            });
        }

        // Renderiza o SVG no canvas
        renderSVGToCanvas(tempSvg, canvas).then(() => {
            // Converte o conteúdo do canvas em uma imagem PNG
            const dataURL = canvas.toDataURL('image/png');

            // Remove o elemento SVG temporário
            document.body.removeChild(tempSvg);

            // Cria um link para baixar a imagem PNG
            const a = document.createElement('a');
            a.setAttribute('download', 'generated-image.png');
            a.setAttribute('href', dataURL);
            a.click();
        });
    });
});


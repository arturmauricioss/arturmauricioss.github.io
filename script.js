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
            
            // Focar no main após a animação inicial
            const mainElement = document.querySelector('main');
            mainElement.style.display = 'block'; // Garante que o main esteja visível
            mainElement.focus(); // Foca no main
            
        }, 1000);

        setTimeout(function() {
            const portfolio = document.getElementById('portfolio');
            portfolio.style.animation = 'fadeOut 0.5s forwards';
            
            setTimeout(function() {
                portfolio.style.display = 'none';
            }, 500);
        }, 500);
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
            showAlert('Dados enviados com sucesso!', true);
        } else {
            // Exibir uma mensagem de erro
            showAlert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.', false);
        }
    };

    // Enviar os dados do formulário
    xhr.send(formData);
}

function showAlert(message, success, formType) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.textContent = message;
    alertBox.style.backgroundColor = success ? '#226d43f8' : '#e74c3cf8'; 
    alertBox.style.borderColor = success ? '#00ff00' : '#ff0000'; 
    alertBox.style.color = success ? '#ffffff' : '#ffffff'; 
    

    alertBox.classList.remove('hidden');
   // --c11: #226d43;
   // --c22: #6a0dad;
    // Fechar automaticamente após 2 segundos
    setTimeout(function() {
        closeAlert();
    }, 2000);
}


function closeAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.classList.add('hidden');
}


// Adicionando um event listener para o formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

// Inicio PROJETOS
function redirectToNewPage(url) {
    // Adicione a classe 'clicked' ao elemento clicado
    this.classList.add('clicked');
    setTimeout(() => {
        // Redireciona para a URL fornecida em uma nova aba ou janela
        window.open(url, '_blank');
    }, 300);
}

// Captura todos os elementos com a classe 'proj' e adiciona o evento de clique
document.addEventListener('DOMContentLoaded', function() {
    var projects = document.querySelectorAll('.proj');
    projects.forEach(function(project) {
        project.addEventListener('click', function() {
            // Obtenha o atributo 'data-url' para redirecionar para a URL correta
            var url = this.getAttribute('data-url');
            redirectToNewPage.call(this, url);
        });
    });
});
// Array com as IDs das partes do SVG e suas cores correspondentes em hover
const svgHoverColors = {
    'svgp4': '#800080',
    'svgp5': '#FFA500',
    'svgp6': '#90EE90',
    'svgp7': '#FFFF00',
    'svgp8': '#1E90FF',
    'svgp9': '#b80000'
};

// Função para selecionar uma parte do SVG aleatoriamente
function getRandomSvgId() {
    const ids = Object.keys(svgHoverColors);
    return ids[Math.floor(Math.random() * ids.length)];
}

// Função para mudar a cor de uma parte do SVG para a cor de hover correspondente
function changeRandomPartColor() {
    const randomSvgId = getRandomSvgId();
    const svgElement = document.getElementById(randomSvgId);
    svgElement.style.fill = svgHoverColors[randomSvgId];
    
    // Define um timeout para voltar a cor para branco após 100ms
    setTimeout(function() {
        svgElement.style.fill = '#ffffff'; // Branco
    }, 100);
}

// Intervalo para mudar aleatoriamente as cores das partes do SVG
let intervalId;

// Função para iniciar o efeito de pisca pisca
function startBlinking() {
    intervalId = setInterval(changeRandomPartColor, 500);
}

// Função para parar o efeito de pisca pisca
function stopBlinking() {
    clearInterval(intervalId);
}

// Adiciona eventos ao elemento .logo para iniciar/parar o efeito de pisca pisca
const logo = document.querySelector('.logo');
logo.addEventListener('focus', startBlinking);
logo.addEventListener('blur', stopBlinking);

document.addEventListener('scroll', function() {
    const footerInfo = document.getElementById('footer-info');
    const worksSection = document.getElementById('works');
    const worksRect = worksSection.getBoundingClientRect();

    if (worksRect.top <= window.innerHeight && worksRect.bottom >= 0) {
        footerInfo.style.display = 'block'; // Mostra a div quando a última seção estiver visível
    } else {
        footerInfo.style.display = 'none'; // Oculta a div quando a última seção não estiver visível
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.input-single .input');

    inputs.forEach(input => {
        // Verifica se o campo já está preenchido ao carregar a página
        if (input.value) {
            input.classList.add('filled');
        }

        // Adiciona ou remove a classe 'filled' ao focar ou desfocar o campo
        input.addEventListener('focus', () => {
            input.classList.add('filled');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.classList.remove('filled');
            }
        });
    });
});

//Fim de PROJETOS

// proj1 scripts antes da mudança


// document.addEventListener('DOMContentLoaded', function() {
//     const textarea = document.getElementById('svgCodeTextarea');

//     // Inicializa o CodeMirror na textarea
//     const editor = CodeMirror.fromTextArea(textarea, {
//         mode: 'xml',
//         lineNumbers: true,
//         theme: 'default', 
//         lineWrapping: true 
//     });

//     const svgPreview = document.getElementById('svgPreview');
//     const fileInput = document.createElement('input');

//     // Função de atualizar o preview apartir do código SVG
//     function updatePreview(svgCode) {
//         svgPreview.innerHTML = '';
//         const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//         svgElement.innerHTML = svgCode;
//         svgPreview.appendChild(svgElement);
//     }

//     // Evento de input no CodeMirror
//     editor.on('change', function() {
//         const svgCode = editor.getValue();
//         updatePreview(svgCode);
//     });

//     // Evento de clique no campo de preview para carregar arquivo SVG
//     svgPreview.addEventListener('click', function() {
//         fileInput.type = 'file';
//         fileInput.accept = '.svg';

//         fileInput.addEventListener('change', function(event) {
//             const file = event.target.files[0];
//             const reader = new FileReader();

//             reader.onload = function() {
//                 const svgCode = reader.result;
//                 editor.setValue(svgCode);
//                 updatePreview(svgCode);
//             };

//             reader.readAsText(file);
//         });

//         fileInput.click();
//     });

//     // Evento de clique no botão para compilar SVG
//     document.getElementById('botaosvg').addEventListener('click', function() {
//         const svgCode = editor.getValue();
//         const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
//         const url = URL.createObjectURL(blob);

//         const a = document.createElement('a');
//         a.setAttribute('download', 'generated-image.svg');
//         a.setAttribute('href', url);
//         a.click();

//         URL.revokeObjectURL(url);
//     });

//     // Evento de clique no botão para baixar PNG
//     document.getElementById('botaopng').addEventListener('click', function() {
//         const svgCode = editor.getValue();
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');

//         const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//         tempSvg.innerHTML = svgCode;
//         document.body.appendChild(tempSvg);

//         const bbox = tempSvg.getBBox();
//         canvas.width = bbox.width;
//         canvas.height = bbox.height;

//         context.clearRect(0, 0, canvas.width, canvas.height);

//         function renderSVGToCanvas(svg, canvas) {
//             return new Promise((resolve, reject) => {
//                 const svgData = new XMLSerializer().serializeToString(svg);
//                 const img = new Image();
//                 img.onload = function() {
//                     context.drawImage(img, 0, 0);
//                     resolve(canvas);
//                 };
//                 img.onerror = reject;
//                 img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
//             });
//         }

//         renderSVGToCanvas(tempSvg, canvas).then(() => {
//             const dataURL = canvas.toDataURL('image/png');
//             document.body.removeChild(tempSvg);

//             const a = document.createElement('a');
//             a.setAttribute('download', 'generated-image.png');
//             a.setAttribute('href', dataURL);
//             a.click();
//         });
//     });
// });

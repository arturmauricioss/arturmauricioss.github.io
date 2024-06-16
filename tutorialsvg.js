document.addEventListener('DOMContentLoaded', () => {
    const editorConfig = {
        mode: 'xml',
        lineNumbers: true,
        lineWrapping: true,  // Habilitar quebra automática de linha
        theme: 'default'
    };

    const svgCodeEditor = CodeMirror.fromTextArea(document.getElementById('svg-code'), editorConfig);
    const svgCodeOutputEditor = CodeMirror.fromTextArea(document.getElementById('svg-code-output'), editorConfig);

    document.getElementById('generate-svg').addEventListener('click', () => {
        const svgCode = svgCodeEditor.getValue();
        const svgOutput = document.getElementById('svg-output');
        svgOutput.innerHTML = svgCode;
    });

    document.getElementById('upload-svg').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            svgCodeOutputEditor.setValue(e.target.result);
        }
        reader.readAsText(file);
    });

    document.getElementById('save-png').addEventListener('click', () => {
        const svgElement = document.getElementById('svg-output').firstElementChild;
        if (!svgElement) {
            alert('Por favor, gere uma imagem SVG primeiro.');
            return;
        }

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = pngFile;
            link.download = 'image.png';
            link.click();

            const pngOutput = document.getElementById('png-output');
            pngOutput.innerHTML = `<img src="${pngFile}" alt="PNG gerado">`;
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    });
});

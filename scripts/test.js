function carregarScriptComTratamento(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true; // Boas práticas para scripts externos

        // Sucesso no carregamento (200 OK)
        script.onload = () => {
            console.log(`Script "${url}" carregado.`);
            resolve();
        };

        // Falha no carregamento (404, erro de rede, etc.)
        script.onerror = () => {
            const mensagem = `Falha ao carregar o script essencial: ${url}`;
            console.error(mensagem);

            // ⚠️ Ação de tratamento de erro:
            const containerErro = document.getElementById('container-de-erros');
            if (containerErro) {
                containerErro.innerHTML = `<div style="color: red;">${mensagem}</div>`;
            } else {
                alert(mensagem);
            }

            reject(new Error(mensagem));
        };

        // Anexa o script ao DOM para iniciar o download
        document.body.appendChild(script);
    });
}

// Chamar a função
carregarScriptComTratamento('https://www.gstatic.com/charts/loader.js')
    .then(() => {
        // Código para executar após o carregamento bem-sucedido
        // Ex: iniciarMeuApp();
    })
    .catch((erro) => {
        // O tratamento já foi feito no .onerror, mas você pode
        // fazer um log final ou outra ação aqui.
    });
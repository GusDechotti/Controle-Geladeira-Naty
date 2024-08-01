const apiUrl = 'http://localhost:3000/api/produto';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function addBtnProduto() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const container = document.getElementById('btnProduto');

        data.forEach(item => {
            const btn = document.createElement('button');
            var img = document.createElement('img');
            img.src = item.imagem;
            img.alt = item.nome;
            img.style.width = '100px';
            img.style.height = '100px';
            var text = document.createTextNode(item.nome);
            btn.appendChild(img);
            btn.appendChild(text);
            btn.createElement
            btn.addEventListener('click', () => {
                const urlPostBanco = 'http://localhost:3000/api/pedido';
                const urlMandarMensagem = 'http://localhost:3000/api/disparoNaty';
                const data = {
                    "id_pessoa": getQueryParam("id"),
                    "id_produto": item.id
                };
                fetch(urlPostBanco, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const newUrl = `/html/confirmaCompra.html`;
                        window.location.href = newUrl;
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
                fetch(urlMandarMensagem, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const newUrl = `/html/confirmaCompra.html`;
                        window.location.href = newUrl;
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
            });
            if(item.quantidade >= 0){
                container.appendChild(btn);   
            }
        });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}
addBtnProduto();

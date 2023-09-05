const produtos = [
    {
        id: "1",
        nome: "Informatica para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/1.png",
    },
    {
        id: "2",
        nome: "Informatica para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/3.png", 
    },
];

function renderizaProdutos() {
    let html = "";
    for (let i = 0; i < produtos.length; i++) {
        html = html + criaProduto(produtos[i], i);
    }
    return html;
}

function criaProduto(produto, index) {
    return `
    <div class = "curso">
    <img class='inicio' title="t" src="${produto.imagem}" />
    <div class="curso-info"> 
                    <h4>${produto.nome}</h4>
                    <p>${produto.prof}</p>
                    <p>${produto.descricao}</p>
    </div>
    <div class="curso-preco">
    <span class="preco-de">R$${produto.preco_de}</span>
    <span class="preco-de">R$${produto.preco_por}</span>
    <button class="btncar btn-add data-index=${index}"></button>
    </div>
    </div>
    `;
}
    const container = document.querySelector("#container")
    container.innerHTML = renderizaProdutos();

    const carrinhoItens = {};

    function renderizaCarrinho() {
        let html = "";
        for (let produtoId in carrinhoItens) {
            html = html + criaItemCarrinho(carrinhoItens[produtoId]);
        }
        document.querySelector('.carrinho_itens').innerHTML = html;
    }
    function criaItemCarrinho(produto) {
        return `
        <div class = "carrinho_compra">
                        <h4>${produto.nome}</h4>
                        <p>Preço Unidade${produto.preco_por}</p>
                        <p>Preço Unidade: ${produto.descricao}
                        | Quantidade: ${produto.quantidade}</p>
                        <p>VAlor:R$: ${produto.preco_por*produto.quantidade}</p>
        <button data-produto-id ="${produto.id}" class="btn-remove"></button>
        </div>
       `;
    }

    function criaCarrinhoTotal () {
        let total = 0;
        for (let produtoId in carrinhoItens) {
            total = total + carrinhoItens[produtoId].preco_por * 
            carrinhoItens[produtoId].quantidade;
        }
        document.querySelector('.carrinhoTotal').innerHTML = `
        <h4>Total: <strong> R$${total}</strong></h4>
        <a href="#" target="_blank">
        <ion-icon name="card-outline"></ion-icon>
        <strong>Comprar Agora</strong>
        </a>`;
    }
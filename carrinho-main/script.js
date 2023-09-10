// Seleciona o elemento #container e coloca o HTML dos produtos nele.
const container = document.querySelector("#container");
container.innerHTML = renderizaProdutos();

// Cria um objeto vazio para guardar os produtos no carrinho.
const carrinhoItens = {};

// Função para renderizar os itens do carrinho na página.
function renderizaCarrinho() {
    let html = '';
    // Para cada produto no carrinho, cria um item de carrinho e adiciona ao HTML.
    for (let produtoId in carrinhoItens) {
        html = html + criaItemCarrinho(carrinhoItens[produtoId]);
    }
    // Atualiza o HTML dos itens do carrinho na página.
    document.querySelector('.carrinho_itens').innerHTML = html;
}

// Função para criar um item de carrinho com base em um produto.
function criaItemCarrinho(produto) {
    // Retorna uma string de HTML que representa o item do carrinho.
    return `
    <div class="carrinho_compra">
    <h4>${produto.nome}</h4>
    <p>Preço Unidade:${produto.preco_por}| Quantidade: ${produto.quantidade}</p>
    <p>Valor: R$:${produto.preco_por*produto.quantidade}</p>
    <button data-produto-id="${produto.id}" class="btn-remove"></button>
    </div>
    `;
}

// Função para criar o total do carrinho.
function criaItemCarrinhoTotal() {
    let total = 0;
    // Calcula o total somando o preço de cada produto no carrinho.
    for (let produtoId in carrinhoItens) {
        total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade;
    }
    // Atualiza o HTML do total do carrinho na página.
    document.querySelector('.carrinho_total').innerHTML = `
    <h4>Total: <strong> R$${total}</strong></h4>
    <a href="#" target="_blank">
    <ion-icon name="card-outline"></ion-icon>
    <strong>Comprar Agora</strong>
    </a>
    `;
}

// Função para adicionar um item ao carrinho.
function adicionaItemNoCarrinho(produto) {
    // Se o produto não estiver no carrinho, adiciona-o.
    if (!carrinhoItens[produto.Id]) {
        carrinhoItens[produto.Id] = produto;
        // Define a quantidade inicial como 0.
        carrinhoItens[produto.id].quantidade = 0;
    }
    // Incrementa a quantidade do produto no carrinho.
    ++carrinhoItens[produto.id].quantidade;
    
    // Atualiza o carrinho e o total na página.
    renderizaCarrinho();
    criaCarrinhoTotal();
}

// Adiciona um ouvinte de eventos ao corpo do documento para lidar com cliques.
document.body.addEventListener('click', function (event) {
    
   const elemento = event.target;

   // Se o elemento clicado é um botão de adicionar, adiciona o produto correspondente ao carrinho.
   if (elemento.classList.contains('btn-add')) {
       const index = parseInt(elemento.getAttribute('data-index'), 10);
       const produto = produtos[index];
       adicionaItemNoCarrinho(produto);
   }

   // Se o elemento clicado é um botão de remover, remove o produto correspondente do carrinho.
   if (elemento.classList.contains('btn-remove')) {
       const produtoId = elemento.getAttribute('data-produto-id');
       if (carrinhoItens[produtoId].quantidade <= 1) {
           delete carrinhoItens[produtoId];
       } else {
           --carrinhoItens[produtoId];
       }
       // Atualiza o carrinho e o total na página.
       renderizaCarrinho();
       criaItemCarrinhoTotal();
   }
});

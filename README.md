# ApiGateway Pedidos

Esta é uma API para gerenciar pedidos e itens.

## Endpoints

### GET /api/v1/pedido

Retorna todos os pedidos.

### POST /api/v1/pedido

Cria um novo pedido. Deve ser enviado um objeto JSON no corpo da requisição com as seguintes propriedades:
- `numero`: O número do pedido (String)
- `cliente`: O cliente associado ao pedido (String)

### GET /api/v1/pedido/{numero}

Retorna um pedido pelo número. O parâmetro `numero` deve ser substituído pelo número do pedido desejado.

### POST /api/v1/pedido/{numero}/item

Adiciona um item a um pedido. O parâmetro `numero` deve ser substituído pelo número do pedido ao qual o item será adicionado. Deve ser enviado um objeto JSON no corpo da requisição com as seguintes propriedades:
- `indice`: O índice do item no pedido (Número inteiro)
- `SKU`: O SKU (Stock Keeping Unit) do item (String)
- `produto`: O nome do produto (String)
- `preco`: O preço do item (Número)
- `quantidade`: A quantidade do item (Número inteiro)

### GET /api/v1/pedido/{numero}/item/{indice}

Retorna um item de um pedido pelo número e índice. Os parâmetros `numero` e `indice` devem ser substituídos pelo número do pedido e índice do item desejado, respectivamente.

### GET /api/v1/pedido/{numero}/item

Retorna todos os itens de um pedido pelo número. O parâmetro `numero` deve ser substituído pelo número do pedido desejado.

### GET /api/v1/pedido/item?produto={produto}

Retorna todos os itens de um pedido pelo produto. O parâmetro `produto` deve ser substituído pelo nome do produto desejado.

## Executando a API

1. Instale as dependências necessárias:
   
    npm install

2. Inicie o servidor:
   
    npm start

O servidor será iniciado e a API estará disponível em http://localhost:3000/api/v1.

## Observações

- Certifique-se de enviar as requisições utilizando o formato JSON adequado nos corpos das requisições.
- Todos os endpoints que esperam dados no corpo da requisição estão configurados para receber dados no formato JSON.


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Dados fictícios para simular armazenamento de pedidos e itens em memória
let pedidos = [];

// Endpoint para criar um novo pedido
app.post('/api/v1/pedido', (req, res) => {
  const novoPedido = req.body;
  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
});

// Endpoint para obter um pedido pelo número
app.get('/api/v1/pedido/:numero', (req, res) => {
  const numeroPedido = req.params.numero;
  const pedido = pedidos.find((p) => p.numero === numeroPedido);
  if (!pedido) {
    res.status(404).json({ error: 'Pedido não encontrado' });
  } else {
    res.json(pedido);
  }
});

// Endpoint para obter todos os pedidos com paginação de 20 em 20
app.get('/api/v1/pedido', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;
  const paginatedPedidos = pedidos.slice(startIndex, endIndex);
  res.json(paginatedPedidos);
});

// Endpoint para adicionar um item a um pedido existente
app.post('/api/v1/pedido/:numero/item', (req, res) => {
  const numeroPedido = req.params.numero;
  const novoItem = req.body;
  const pedido = pedidos.find((p) => p.numero === numeroPedido);
  if (!pedido) {
    res.status(404).json({ error: 'Pedido não encontrado' });
  } else {
    pedido.itens.push(novoItem);
    res.status(201).json(novoItem);
  }
});

// Endpoint para obter um item de um pedido pelo número e índice
app.get('/api/v1/pedido/:numero/item/:indice', (req, res) => {
  const numeroPedido = req.params.numero;
  const indiceItem = parseInt(req.params.indice);
  const pedido = pedidos.find((p) => p.numero === numeroPedido);
  if (!pedido || !pedido.itens[indiceItem]) {
    res.status(404).json({ error: 'Item do pedido não encontrado' });
  } else {
    res.json(pedido.itens[indiceItem]);
  }
});

// Endpoint para obter todos os itens de um pedido pelo número
app.get('/api/v1/pedido/:numero/item', (req, res) => {
  const numeroPedido = req.params.numero;
  const pedido = pedidos.find((p) => p.numero === numeroPedido);
  if (!pedido) {
    res.status(404).json({ error: 'Pedido não encontrado' });
  } else {
    res.json(pedido.itens);
  }
});

// Endpoint para obter todos os itens de um pedido pelo produto
app.get('/api/v1/pedido/item', (req, res) => {
  const produto = req.query.produto;
  const itens = pedidos.reduce((acc, pedido) => {
    const itensPedido = pedido.itens.filter((item) => item.produto === produto);
    return acc.concat(itensPedido);
  }, []);
  res.json(itens);
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('API em execução na porta 3000');
});
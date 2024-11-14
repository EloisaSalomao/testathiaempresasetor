const express = require('express');
const dotenv = require('dotenv');
const rotas = require('./routes');
const cors = require('cors');

dotenv.config();

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(rotas);

server.use((req, res) => {
    res.send('Rota não encontrada');
});

server.listen(process.env.PORTA, () => {
  console.log(`Servidor rodando na porta ${process.env.PORTA}`);
});

# testathiaempresasetor
Olá, esse projeto foi feito para o processo seletivo do Grupo Athia, foi solicitado para o banco de dados o MySQL Workbench e o Seenode, para a API e para o APP foram usados a linguagem javascript, por meio do vscode. Na branch master se encontra a API e na branch app estão as telas da aplicação.

## Segue modelo do banco de dados:
BANCO DE DADOS testeathiaempresasetor

CREATE TABLE "empresa" (
  "id" int NOT NULL AUTO_INCREMENT,
  "razao_social" varchar(50) NOT NULL,
  "nome_fantasia" varchar(250) DEFAULT NULL,
  "cnpj" varchar(14) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "empresa_setor" (
  "empresa_id" int NOT NULL,
  "setor_id" int NOT NULL,
  PRIMARY KEY ("empresa_id","setor_id"),
  KEY "fk_setor_idx" ("setor_id"),
  CONSTRAINT "fk_empresa" FOREIGN KEY ("empresa_id") REFERENCES "empresa" ("id"),
  CONSTRAINT "fk_setor" FOREIGN KEY ("setor_id") REFERENCES "setor" ("id")
);

CREATE TABLE "setor" (
  "id" int NOT NULL AUTO_INCREMENT,
  "descricao" varchar(250) NOT NULL,
  PRIMARY KEY ("id")
);

## PARA RODAR O API - BRANCH MASTER

1. Clone este repositório: https://github.com/EloisaSalomao/testathiaempresasetor.git

2. Navegue até o diretório do projeto: cd testathiaempresasetor

3. Instalar as dependências: npm install

4. Para rodar o projeto localmente: npm run start-dev

## PARA RODAR O APP - BRANCH APP

1. Clone este repositório: https://github.com/EloisaSalomao/testathiaempresasetor.git

2. Navegue até o diretório do projeto: cd testathiaempresasetor

3. Instalar as dependências: npm install

4. Para rodar o projeto localmente: npm start



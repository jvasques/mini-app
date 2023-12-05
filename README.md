# Mini App - Projeto CRUD com Vue.js e Nest.js

Este é um projeto simples que utiliza Vue.js para o frontend e Nest.js para o backend, implementando operações CRUD em um cadastro de pessoas.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/)
- Certifique-se de ter um servidor MySQL em execução

## Configuração do Backend (Nest.js)

1. Abra um terminal na pasta do frontend:

   ```bash
   cd front-end
2. Instale as dependências:

   ```bash
   npm install
3. Configure o arquivo 'ormconfig.js' com as configurações do banco de dados:

   ```bash
    module.exports = {  type: 'mysql',  host: 'localhost',  port: 3306,  username: 'root',  password: 'senha',  database: 'nome_do_banco',  entities: ['dist/**/*.entity{.ts,.js}'],  synchronize: true,};
4. Execute o back-end:

   ```bash
   npm run start:dev
   ```

O servidor estará disponível em http://localhost:3000


## Configuração do Frontend (Vue.js)
1. Abra um terminal na pasta do front-end:

   ```bash
   cd front-end
2. Instale as dependências:

   ```bash
   npm install
3. Execute o front-end:

   ```bash
    npm run serve
    ```

O aplicativo Vue.js estará disponível em http://localhost:8080

Agora você pode acessar o aplicativo no navegador. Certifique-se de ter um servidor MySQL em execução e configurado corretamente no arquivo "ormconfig.js" do backend.
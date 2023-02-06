# Trybe-Futebol-Clube
Um aplicação com back-end em Typescript que gerencia resultados de um campeonato de futebol

Projeto individual que consiste em desenvolver uma API para ser consumida pelo front-end previamente fornecido pela Trybe

Ferramentas e linguagens utilizadas:
* Node.js, Express, Typescript, MySQL, Sequelize
* O desenvolimento utilizou o padrão SOLID e Programação Orientada a Objetos
* Arquitetura MSC: Model, Service e Controller
* Testes de Integração: Mocha, Chai e Sinon

### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize o comando a seguir para inicializar o Docker (front-end, back-end e banco de dados):

```
npm run compose:up
npm run compose:down // para parar completamente a aplicação
```

E utilize os comandos a seguir para executar os testes de integração criado:

```
npm install // para instalar as dependências
cd app/backend && npm test
```

### Demonstração

<p align="center">
  <img src="https://github.com/guilherme-ac-fernandes/trybe-futebol-clube/blob/main/tfc_classificacao.png" alt="Trybe Futebol Clube - Demostração"/>
</p>

### Endpoints

#### Login

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o login do usuário | http://localhost:3001/login |
| `GET` | Avalia se o usuário é o administrador | http://localhost:3001/login/validate |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "email": "Nome do Usuário",
  "password": "senha_secreta"
}
```


#### Times

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os times cadastrados | http://localhost:3001/teams |
| `GET` | Retorna um time específico | http://localhost:3001/teams/:id |


#### Partidas

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos as partidas cadastradas | http://localhost:3001/matches |
| `GET` | Retorna todos as partidas cadastradas em progresso | http://localhost:3001/matches?inProgress=true |
| `GET` | Retorna todos as partidas cadastradas finalizadas | http://localhost:3001/matches?inProgress=false |
| `POST` | Criação de uma nova partida | http://localhost:3001/matches |
| `PATCH` | Atualiza a chave 'inProgress' para finalidado de uma partida específica | http://localhost:3001/matches/:id/finish |
| `PATCH` | Atualiza os gols de uma partida específica | http://localhost:3001/matches/:id |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

e na requisição PATCH para atualizar os gols realizados é necessário informar o seguinte JSON:

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

#### Placar

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna a classificação geral dos times | http://localhost:3001/leaderboard |
| `GET` | Retorna a classificação dos times mandantes | http://localhost:3001/leaderboard/home |
| `GET` | Retorna a classificação dos times visitantes | http://localhost:3001/leaderboard/away |

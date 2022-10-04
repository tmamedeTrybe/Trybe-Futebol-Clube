import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// import { Response } from 'superagent';
import { IMatchTeams } from '../interfaces/IMatch';
import Match from '../database/models/Match';

chai.use(chaiHttp);

// const { expect } = chai;

const matchesListMock = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
  }
];

const resultMatchesListMock:IMatchTeams[] = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 3,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 43,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
]

const matchesInProgressListMock:IMatchTeams[] =[
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 43,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
]

const newMatchMock = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const newMatchWrongTeamMock = {
  homeTeam: 16,
  awayTeam: '',
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const newMatchEqualTeamsMock = {
  homeTeam: 16,
  awayTeam: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const newMatchResultMock = {
  id: 49,
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
}

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzcGxheU5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY0OTA4NjQ3LCJleHAiOjE2NjQ5OTUwNDd9.xGRKQG75qz9DurlnXHbWI6VrqCzKb7tyCewZHMswY4w';

const wrongTokenMock = 'hahahaha';

describe('/matches' , () => {
  describe('GET', () => {

  before(async () => {
    sinon.stub(Match, 'findAll').resolves(resultMatchesListMock as any as Match[]);
  })
  after(async () => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it ('Deve retornar uma lista de todas as partidas', async () => {
    const response = await chai.request(app).get('/matches');
    chai.expect(response.status).to.equal(200);
    chai.expect(response.body).to.deep.equal(resultMatchesListMock);
  })
  });

  describe ('GET na rota inProgress', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(matchesInProgressListMock as any as Match[]);
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it ('Deve retornar uma lista de partidas em andamento' , async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(matchesInProgressListMock);
    })
  
  })

  describe ('POST', () => {

    before(async () => {
      sinon.stub(Match, 'create').resolves(newMatchResultMock as Match);
    })
    after(() => {
      (Match.create as sinon.SinonStub).restore();
    })

    it ( 'Deve salvar uma partida com o status de inProgress como true', async () => {
      const response  = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', tokenMock)
      .send(newMatchMock);
      chai.expect(response.status).to.equal(201);
      chai.expect(response.body).to.deep.equal(newMatchResultMock);
    })

    it ('Não seja possível inserir uma partida com times iguais', async () => {
      const response  = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', tokenMock)
      .send(newMatchEqualTeamsMock);
      chai.expect(response.status).to.equal(401);
      chai.expect(response.body.message).to.be
        .equal("It is not possible to create a match with two equal teams");
    })

    it ('Não deve ser possível inserir uma partida com um time inexistente', async () => {
      const response  = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', tokenMock)
      .send(newMatchWrongTeamMock);
      chai.expect(response.status).to.equal(404);
      chai.expect(response.body.message).to.be.equal("There is no team with such id!");
    })

    it ('Não deve ser possível inserir uma partida sem um token válido', async () => {
      const response  = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', wrongTokenMock)
      .send(newMatchWrongTeamMock);
      chai.expect(response.status).to.equal(401);
      chai.expect(response.body.message).to.be.equal("Token must be a valid token");
    })

  })
  
  describe('PATCH', () => {

    before(async () => {
      sinon.stub(Match, 'update').resolves();
    })
    after(() => {
      (Match.update as sinon.SinonStub).restore();
    })

    it ( 'Deve alterar o status de uma partida para false e retorna "finished"', async () => {
      const response  = await chai.request(app).patch('/matches/1/finish');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body.message).to.be.equal("Finished");
    })

  })

})
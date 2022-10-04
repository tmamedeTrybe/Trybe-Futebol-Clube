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
    "id": 42,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  }
]

describe('/matches' , () => {
  describe('GET', () => {

  before(async () => {
    sinon.stub(Match, 'findAll').resolves(resultMatchesListMock as unknown as Match[]);
  })
  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it ('Deve retornar uma lista de todas as partidas', async () => {
    const response = await chai.request(app).get('/matches');
    chai.expect(response.status).to.equal(200);
    chai.expect(response.body).to.deep.equal(resultMatchesListMock as IMatchTeams[]);
  })
  })

  it ('Deve retornar uma lista de partidas em andamento' , async () => {
    const response = await chai.request(app).get('/matches/inProgress=true');
    chai.expect(response.status).to.equal(200);
    chai.expect(response.body).to.deep.equal(matchesInProgressListMock as IMatchTeams[]);
  })

})
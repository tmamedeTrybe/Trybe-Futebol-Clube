import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');


import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import IUserLogin from '../interfaces/IUserLogin';
import User from '../database/models/User';
import Team from '../database/models/Team';

chai.use(chaiHttp);


describe('/login', () => {
  const userLoginMock = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  };

  const userLoginMockNoEmail: IUserLogin = {
    email: '',
    password: 'secret_admin',
  };

  const userMock = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  };

  const userLoginMockNoPassword: IUserLogin = {
    email: 'admin@admin.com',
    password: '',
  };

  const userLoginMockWrongEmail: IUserLogin = {
    email: 'adminadmin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  };

  const userLoginMockWrongPassword: IUserLogin = {
    email: 'admin@admin.com',
    password: '000',
  };

  const result = {
    code:200,
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.
  XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc`,
  }

  before(async () => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
  });

  after(()=>{
      (User.findOne as sinon.SinonStub).restore();
  });

  // req. 02 e 03
 it ('ao fazer login deve retornar um token e código 200 ', async () => {
  const response = await chai.request(app).post('/login').send(userLoginMock);
  chai.expect(response.status).to.equal(200);
 });

 //req. 04 e 05
 it ('Não é possível fazer o login sem informar o email', async () => {
  const response = (await chai.request(app).post('/login').send(userLoginMockNoEmail));
  chai.expect(response.status).to.equal(400);
 });

  //req. 06 e 07
  it ('Não é possível fazer o login sem informar a senha', async () => {
    const response = (await chai.request(app).post('/login').send(userLoginMockNoPassword));
    chai.expect(response.status).to.equal(400);
  });

  //req. 08 e 09
  it ('Não é possível fazer o login se o email estiver incorreto', async () => {
    const response = (await chai.request(app).post('/login').send(userLoginMockWrongEmail));
    chai.expect(response.status).to.equal(401);
  });

  //req. 10 e 11
  it ('Não é possível fazer o login se a senha estiver incorreta', async () => {
    const response = (await chai.request(app).post('/login').send(userLoginMockWrongPassword));
    chai.expect(response.status).to.equal(401);
  });
})

const teamsListMock = [
  {
    id: 1,
    teamName: 'Cruzeiro',
  },
  {
    id: 2,
    teamName: 'Atletico',
  },
];

const teamMock = {
  id: 1,
  teamName: 'Cruzeiro',
}

describe('/teams', () => {

  describe('GET', () => {

    before(async () => {
      sinon.stub(Team, 'findAll').resolves(teamsListMock as Team[]);
    })

    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Deve exibir uma lista de todos os times e código 200', async () => {
      const response = await chai.request(app).get('/teams');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(teamsListMock);
    })
  })

  describe('GET/:id', () => {

    before(async () => {
      sinon.stub(Team, 'findByPk').resolves(teamMock as Team);
    })

    after(()=>{
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('Deve retornar um time buscado pelo seu id', async () => {
      const response =  await chai.request(app).get('/teams/1')
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(teamMock);
    })
  })
})

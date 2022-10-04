import { Router } from 'express';
import TeamService from '../services/teamService';
import TeamsController from '../controllers/teamsController';
import Team from '../database/models/Team';

const teamsRoutes = Router();

const teamsController = new TeamsController(new TeamService(Team));

teamsRoutes.get('/teams', teamsController.getAll);
teamsRoutes.get('/teams/:id', teamsController.getById);

export default teamsRoutes;

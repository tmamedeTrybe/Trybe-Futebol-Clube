import { Router } from 'express';
import MatchController from '../controllers/matchController';
import Match from '../database/models/Match';
import MatchService from '../services/matchService';

const matchesRoutes = Router();

const matchesController = new MatchController(new MatchService(Match));

matchesRoutes.get('/matches', () => matchesController.getAll);
matchesRoutes.get('/matches', () => matchesController.getMatchesByProgress);
matchesRoutes.post('/matches', () => matchesController.createMatch);

export default matchesRoutes;

import { Router } from 'express';
import Match from '../database/models/Match';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardController from '../controllers/leaderboardController';
import Team from '../database/models/Team';

const leaderboardRoutes = Router();

const leaderboardController = new LeaderboardController(new LeaderboardService(Match, Team));

leaderboardRoutes.get('/leaderboard/home', leaderboardController.leaderboardHomeTeams);
leaderboardRoutes.get('/leaderboard/away', leaderboardController.leaderboardAwayTeams);
leaderboardRoutes.get('/leaderboard', leaderboardController.leaderboardGeneral);

export default leaderboardRoutes;

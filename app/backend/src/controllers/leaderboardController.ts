import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  leaderboardHomeTeams = async (req: Request, res: Response) => {
    const stats = await this.leaderboardService.leaderboardHomeTeams();
    res.status(200).json(stats);
  };

  leaderboardAwayTeams = async (req: Request, res: Response) => {
    const stats = await this.leaderboardService.leaderboardAwayTeams();
    res.status(200).json(stats);
  };

  leaderboardGeneral = async (req: Request, res: Response) => {
    const stats = await this.leaderboardService.leaderboardGeneral();
    res.status(200).json(stats);
  };
}

export default LeaderboardController;

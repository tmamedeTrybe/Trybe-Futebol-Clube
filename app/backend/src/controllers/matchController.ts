import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  constructor(private matchService: MatchService) {}

  getAll = async (req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };

  getMatchesByProgress = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    if (!inProgress) next();

    if (inProgress === 'true') {
      const matches = await this.matchService.getMatchesByProgress(true);
      return res.status(200).json(matches);
    }
    if (inProgress === 'false') {
      const matches = await this.matchService.getMatchesByProgress(false);
      return res.status(200).json(matches);
    }
  };

  createMatch = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token must be a valid token' });
    const newMatch = await this.matchService.createMatch(req.body, token as string);
    if (newMatch.erro) return res.status(newMatch.code).json({ message: newMatch.erro });
    return res.status(newMatch.code).json(newMatch.match);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const finish = await this.matchService.finishMatch(Number(id));
    res.status(finish.code).json({ message: finish.message });
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = await this.matchService.updateMatch(Number(id), req.body);
    return res.status(update.code).json({ message: update.message });
  };
}

export default MatchController;

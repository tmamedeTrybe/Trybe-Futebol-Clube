import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  constructor(private matchService: MatchService) {}

  getAll = async (req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };

  getMatchesByProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    console.log('VEM DA QUERY', inProgress);

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
    const { match } = req.body;
    const newMatch = await this.matchService.createMatch(match, token as string);
    if (newMatch.erro) return res.status(newMatch.code).json({ message: newMatch.erro });
    return res.status(newMatch.code).json(newMatch.match);
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = await this.matchService.updateMatch(Number(id));
    res.status(update.code).json({ message: update.message });
  };
}

export default MatchController;

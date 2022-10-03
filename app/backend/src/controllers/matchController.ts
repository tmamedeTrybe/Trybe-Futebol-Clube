import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  constructor(private matchService: MatchService) {}

  getAll = async (req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };
}

export default MatchController;

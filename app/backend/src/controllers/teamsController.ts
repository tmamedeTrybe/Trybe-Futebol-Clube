import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class teamsController {
  constructor(private teamService: TeamService) {}

  getAll = async (req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };
}

export default teamsController;

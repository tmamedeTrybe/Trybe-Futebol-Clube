import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class teamsController {
  constructor(private teamService: TeamService) {}

  getAll = async (req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };

  getById = async (req:Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));
    if (team.erro) return res.status(team.code).json({ message: team.erro });
    return res.status(team.code).json(team.team);
  };
}

export default teamsController;

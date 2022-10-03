import ITeam from '../interfaces/ITeam';
import Team from '../database/models/Team';

class TeamService {
  constructor(private TeamModel: typeof Team) {}

  async getAll():Promise<ITeam[]> {
    const teams = await this.TeamModel.findAll();
    return teams;
  }

  async getById(id:number) {
    const team = await this.TeamModel.findByPk(id);
    if (!team) return { code: 400, erro: 'Team not found' };
    return { code: 200, team };
  }
}

export default TeamService;

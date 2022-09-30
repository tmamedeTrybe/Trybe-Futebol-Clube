import ITeam from '../interfaces/ITeam';
import Team from '../database/models/Team';

class TeamService {
  constructor(private TeamModel: typeof Team) {}

  async getAll():Promise<ITeam[]> {
    const teams = await this.TeamModel.findAll();
    return teams;
  }
}

export default TeamService;

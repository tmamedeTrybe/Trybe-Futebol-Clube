import Team from '../database/models/Team';
import Match from '../database/models/Match';
import INewMatch from '../interfaces/INewMatch';
import validateToken from '../validations/validateToken';

class MatchService {
  constructor(private matchModel: typeof Match) {}

  async getAll():Promise<Match[]> {
    const matches = await this.matchModel.findAll(
      {
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return matches;
  }

  async getMatchesByProgress(progress:boolean) {
    const matches = await this.matchModel.findAll(
      {
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
        where: { inProgress: progress },
      },
    );
    return matches;
  }

  async createMatch(match:INewMatch, token: string) {
    const tokenValid = await validateToken(token);
    if (tokenValid.erro) return { code: tokenValid.code, erro: tokenValid.erro };

    const result = await this.matchModel.create({
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    // const newMatch = { ...match, id: result.id };
    return { code: 201, match: result };
  }

  async updateMatch(id:number) {
    await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return { code: 200, message: 'updateMatch' };
  }
}

export default MatchService;

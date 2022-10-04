import Team from '../database/models/Team';
import Match from '../database/models/Match';
import INewMatch from '../interfaces/INewMatch';
import validateToken from '../validations/validateToken';

class MatchService {
  constructor(private matchModel: typeof Match) {}

  // TESTADA
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

  // TESTADA
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

  // TESTADA
  async createMatch({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }:INewMatch, token: string) {
    const tokenValid = await validateToken(token);
    if (tokenValid.erro) return { code: tokenValid.code, erro: tokenValid.erro };

    const result = await this.matchModel.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
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

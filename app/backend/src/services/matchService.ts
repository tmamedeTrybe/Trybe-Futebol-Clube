import Team from '../database/models/Team';
import Match from '../database/models/Match';
import INewMatch from '../interfaces/INewMatch';
import validateToken from '../validations/validateToken';
import validateMatches from '../validations/validateMatches';

class MatchService {
  constructor(private matchModel: typeof Match) {}

  // TESTADA
  async getAll() {
    const matches = await this.matchModel.findAll(
      {
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );
    console.log(matches.length);
    
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
  async createMatch(match:INewMatch, token: string) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = match;
    
    const tokenValid = await validateToken(token);
    if (tokenValid.erro) return { code: tokenValid.code, erro: tokenValid.erro };

    const matchValid = await validateMatches(match);
    if (matchValid.erro) return { code: matchValid.code, erro: matchValid.erro }

    const result = await this.matchModel.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return { code: 201, match: result };
  }

  // TESTE COM ERRO
  async updateMatch(id:number) {
    const log = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    console.log(log);
    
    return { code: 200, message: 'Finished' };
  }
}

export default MatchService;

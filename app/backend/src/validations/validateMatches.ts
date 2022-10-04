import { Op } from 'sequelize';
import Team from '../database/models/Team';
import INewMatch from '../interfaces/INewMatch';

const validateMatches = async (match:INewMatch) => {
  // REQ. 25 - TIMES IGUAIS
  if (match.homeTeam === match.awayTeam) {
    return {
      code: 401,
      erro: 'It is not possible to create a match with two equal teams',
    };
  }

  // REQ. 26  - TIME NAO EXISTE
  const teams = await Team.findAll({ where: {
    [Op.or]: [
      { id: match.awayTeam },
      { id: match.homeTeam },
    ],
  } });
  if (teams.length !== 2) return { code: 404, erro: 'There is no team with such id!' };

  return { code: 200 };
};

export default validateMatches;

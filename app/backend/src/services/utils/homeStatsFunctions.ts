import Match from '../../database/models/Match';

const totalVictoriesHome = (matches: Match[]) => {
  const totalVictories = matches
    .filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  return totalVictories.length;
};

const totalLossesHome = (matches: Match[]) => {
  const totalLosses = matches
    .filter((match) => match.homeTeamGoals < match.awayTeamGoals);
  return totalLosses.length;
};

const totalDrawsHome = (matches: Match[]) => {
  const totalDraws = matches
    .filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  return totalDraws.length;
};

const goalsFavorHome = (matches: Match[]) => {
  const goalsFavor = matches
    .reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  return goalsFavor;
};

const goalsOwnHome = (matches: Match[]) => {
  const goalsOwn = matches
    .reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  return goalsOwn;
};

const totalPointsHome = (matches: Match[]) => {
  const totalPoints = (totalVictoriesHome(matches) * 3)
    + (totalDrawsHome(matches));
  return totalPoints;
};

export {
  totalVictoriesHome,
  totalLossesHome,
  totalDrawsHome,
  goalsFavorHome,
  goalsOwnHome,
  totalPointsHome,
};

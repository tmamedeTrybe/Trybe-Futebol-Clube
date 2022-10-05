import Match from '../../database/models/Match';

const totalVictoriesAway = (matches: Match[]) => {
  const totalVictories = matches
    .filter((match) => match.awayTeamGoals > match.homeTeamGoals);
  return totalVictories.length;
};

const totalLossesAway = (matches: Match[]) => {
  const totalLosses = matches
    .filter((match) => match.awayTeamGoals < match.homeTeamGoals);
  return totalLosses.length;
};

const totalDrawsAway = (matches: Match[]) => {
  const totalDraws = matches
    .filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  return totalDraws.length;
};

const goalsFavorAway = (matches: Match[]) => {
  const goalsFavor = matches
    .reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  return goalsFavor;
};

const goalsOwnAway = (matches: Match[]) => {
  const goalsOwn = matches
    .reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  return goalsOwn;
};

const totalPointsAway = (matches: Match[]) => {
  const totalPoints = (totalVictoriesAway(matches) * 3)
    + (totalDrawsAway(matches));
  return totalPoints;
};

export {
  totalVictoriesAway,
  totalLossesAway,
  totalDrawsAway,
  goalsFavorAway,
  goalsOwnAway,
  totalPointsAway,
};

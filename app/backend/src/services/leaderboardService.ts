import Team from '../database/models/Team';
import Match from '../database/models/Match';
import ILeaderboard from '../interfaces/ILeaderboard';
import { totalVictoriesHome, totalLossesHome, totalDrawsHome,
  goalsFavorHome, goalsOwnHome, totalPointsHome } from './utils/homeStatsFunctions';
import { totalVictoriesAway, totalLossesAway, totalDrawsAway,
  goalsFavorAway, goalsOwnAway, totalPointsAway } from './utils/awayStatsFunctions';

class LeaderboardService {
  constructor(private model: typeof Match, private modelTeam: typeof Team) {}

  private async homeMatches(id:number) {
    const team = await Team.findByPk(id);
    const allHomeMatches = await this.model.findAll({ where: { homeTeam: id } });
    const finishedHomeMatches = allHomeMatches
      .filter((match) => match.inProgress === false);

    const totalGames = finishedHomeMatches.length;

    const statisticsHome = {
      name: team?.teamName,
      totalPoints: totalPointsHome(finishedHomeMatches),
      totalGames: finishedHomeMatches.length,
      totalVictories: totalVictoriesHome(finishedHomeMatches),
      totalDraws: totalDrawsHome(finishedHomeMatches),
      totalLosses: totalLossesHome(finishedHomeMatches),
      goalsFavor: goalsFavorHome(finishedHomeMatches),
      goalsOwn: goalsOwnHome(finishedHomeMatches),
      goalsBalance: goalsFavorHome(finishedHomeMatches) - goalsOwnHome(finishedHomeMatches),
      efficiency: ((totalPointsHome(finishedHomeMatches) / (totalGames * 3)) * 100).toFixed(2),
    };
    return statisticsHome;
  }

  private async awayMatches(id:number) {
    const team = await Team.findByPk(id);
    const allAwayMatches = await this.model.findAll({ where: { awayTeam: id } });
    const finishedAwayMatches = allAwayMatches
      .filter((match) => match.inProgress === false);

    const totalGames = finishedAwayMatches.length;

    const statisticsAway = {
      name: team?.teamName,
      totalPoints: totalPointsAway(finishedAwayMatches),
      totalGames: finishedAwayMatches.length,
      totalVictories: totalVictoriesAway(finishedAwayMatches),
      totalDraws: totalDrawsAway(finishedAwayMatches),
      totalLosses: totalLossesAway(finishedAwayMatches),
      goalsFavor: goalsFavorAway(finishedAwayMatches),
      goalsOwn: goalsOwnAway(finishedAwayMatches),
      goalsBalance: goalsFavorAway(finishedAwayMatches) - goalsOwnAway(finishedAwayMatches),
      efficiency: ((totalPointsAway(finishedAwayMatches) / (totalGames * 3)) * 100).toFixed(2),
    };
    return statisticsAway;
  }

  async allMatches(id:number) {
    const team = await Team.findByPk(id);
    const statsHome = await this.homeMatches(id);
    const statsAway = await this.awayMatches(id);

    const totalPoints = statsHome.totalPoints + statsAway.totalPoints;
    const totalGames = statsHome.totalGames + statsAway.totalGames;

    const stats = {
      name: team?.teamName,
      totalPoints: statsHome.totalPoints + statsAway.totalPoints,
      totalGames: statsHome.totalGames + statsAway.totalGames,
      totalVictories: statsHome.totalVictories + statsAway.totalVictories,
      totalDraws: statsHome.totalDraws + statsAway.totalDraws,
      totalLosses: statsHome.totalLosses + statsAway.totalLosses,
      goalsFavor: statsHome.goalsFavor + statsAway.goalsFavor,
      goalsOwn: statsHome.goalsOwn + statsAway.goalsOwn,
      goalsBalance: statsHome.goalsBalance + statsAway.goalsBalance,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
    return stats;
  }

  async leaderboardHomeTeams() {
    const teams = await this.modelTeam.findAll();
    const statsAllTeams = Promise.all(teams.map((team) => this.homeMatches(team.id)));
    const sort = this.order(await statsAllTeams);

    return sort;
  }

  async leaderboardAwayTeams() {
    const teams = await this.modelTeam.findAll();
    const statsAllTeams = Promise.all(teams.map((team) => this.awayMatches(team.id)));
    const sort = this.order(await statsAllTeams);

    return sort;
  }

  async leaderboardGeneral() {
    const teams = await this.modelTeam.findAll();
    const statsAllTeams = Promise.all(teams.map((team) => this.allMatches(team.id)));
    const sort = this.order(await statsAllTeams);

    return sort;
  }

  private order = (leaderboard:ILeaderboard[]) => {
    const leaderboardOrder = leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return leaderboardOrder;
  };
}

export default LeaderboardService;

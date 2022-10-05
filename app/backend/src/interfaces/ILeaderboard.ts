interface ILeaderboard {
  name: string | undefined;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  totalPoints: number;
  efficiency: string;
}

export default ILeaderboard;

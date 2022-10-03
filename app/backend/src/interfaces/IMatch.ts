interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface IMatchTeams extends IMatch {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export {
  IMatch,
  IMatchTeams,
};

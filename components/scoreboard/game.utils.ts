import { type Team }
from './types';

export function getWinner(
  teams: Team[]
) {

  return teams.reduce(
    (prev, curr) =>
      curr.score > prev.score
        ? curr
        : prev
  );
}

export function isTieGame(
  teams: Team[]
) {

  return (
    teams[0].score ===
    teams[1].score
  );
}

export function isEmptyGame(
  teams: Team[]
) {

  return (
    teams[0].score === 0 &&
    teams[1].score === 0
  );
}

export function resetTeams(
  teams: Team[]
) {

  return teams.map(team => ({
    ...team,
    score: 0,
    history: [],
  }));
}


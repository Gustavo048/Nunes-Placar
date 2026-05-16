
export const GAME_MODES = {
  CANASTRA: { label: 'Canastra' },
  TRUCO: { label: 'Truco' },
  DOMINO: { label: 'Dominó' }
} as const;

export type GameMode = keyof typeof GAME_MODES;

export type Team = {
  id: string;
  name: string;
  score: number;
  history: number[];
};


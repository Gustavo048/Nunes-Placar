'use client';

import { useState, useEffect } from 'react'; // ADICIONADO: useEffect
import TeamColumn from './TeamColumn';
import { recordVictory } from '@/app/actions/ranking';

const GAME_MODES = {
  CANASTRA: { label: 'Canastra' },
  TRUCO: { label: 'Truco' },
  DOMINO: { label: 'Dominó' }
} as const;

type GameMode = keyof typeof GAME_MODES;

type Team = {
  id: string;
  name: string;
  score: number;
  history: number[];
};

// ✅ UPDATE: Agora recebemos onModeChange do componente pai (page.tsx)
interface ScoreBoardProps {
  onModeChange?: (mode: GameMode) => void;
}

export default function ScoreBoard({ onModeChange }: ScoreBoardProps) {
  const [gameMode, setGameMode] = useState<GameMode>('CANASTRA');

  const [teams, setTeams] = useState<Team[]>([
    { id: 'A', name: 'Equipe A', score: 0, history: [] },
    { id: 'B', name: 'Equipe B', score: 0, history: [] }
  ]);

  // ✅ ADICIONADO: Notifica o pai sempre que o modo local mudar
  useEffect(() => {
    if (onModeChange) {
      onModeChange(gameMode);
    }
  }, [gameMode, onModeChange]);

  const addPoints = (teamId: string, points: number) => {
    setTeams(prev =>
      prev.map(team =>
        team.id === teamId
          ? {
              ...team,
              score: team.score + points,
              history: [...team.history, points]
            }
          : team
      )
    );
  };

  const updateTeamName = (teamId: string, name: string) => {
    setTeams(prev =>
      prev.map(team =>
        team.id === teamId ? { ...team, name } : team
      )
    );
  };

  const getWinner = () => {
    return teams.reduce((prev, curr) =>
      curr.score > prev.score ? curr : prev
    );
  };

  const handleFinishGame = async () => {
    const [teamA, teamB] = teams;

    if (teamA.score === teamB.score) {
      return alert("O jogo está empatado!");
    }

    if (teamA.score === 0 && teamB.score === 0) {
      return alert("Inicie uma partida primeiro!");
    }

    const winner = getWinner();

    const confirm = window.confirm(
      `Finalizar partida de ${gameMode}? Vitória de ${winner.name}!`
    );

    if (confirm) {
      try {
        const result = await recordVictory(
          winner.name,
          winner.score,
          gameMode
        );

        if (result.success) {
          setTeams(prev =>
            prev.map(team => ({
              ...team,
              score: 0,
              history: []
            }))
          );

          alert("Partida registrada no Ranking!");
        }
      } catch (error) {
        console.error("Falha ao salvar no ranking:", error);
        alert("Erro ao salvar no banco de dados.");
      }
    }
  };

  const resetGame = () => {
    if (window.confirm("Deseja realmente zerar o placar da partida atual?")) {
      setTeams(prev =>
        prev.map(team => ({
          ...team,
          score: 0,
          history: []
        }))
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Barra de Ferramentas */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-black/40 p-4 rounded-2xl backdrop-blur-md border border-white/10">
        
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
          {Object.entries(GAME_MODES).map(([id, mode]) => (
            <button
              key={id}
              onClick={() => setGameMode(id as GameMode)}
              className={`px-4 md:px-6 py-2 rounded-lg font-bold text-xs md:text-sm transition-all ${
                gameMode === id
                  ? 'bg-yellow-600 text-black shadow-lg shadow-yellow-900/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="bg-zinc-800 hover:bg-red-900/40 text-red-500 px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-red-900/20"
          >
            Reset
          </button>

          <button
            onClick={handleFinishGame}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-900/20"
          >
            Nova Partida
          </button>
        </div>
      </div>

      {/* Grid de Placar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {teams.map(team => (
          <TeamColumn
            key={team.id}
            team={team}
            gameMode={gameMode}
            onAddPoints={(pts) => addPoints(team.id, pts)}
            onNameChange={(name) => updateTeamName(team.id, name)}
          />
        ))}

      </div>
    </div>
  );
}
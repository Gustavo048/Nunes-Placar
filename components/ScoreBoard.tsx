'use client';

import { useState } from 'react';
import TeamColumn from './TeamColumn';
import { recordVictory } from '@/app/actions/ranking';

export default function ScoreBoard() {
  const [gameMode, setGameMode] = useState<'TRUCO' | 'CANASTRA'>('CANASTRA');
  const [teamA, setTeamA] = useState({ name: 'Equipe A', score: 0, history: [] as number[] });
  const [teamB, setTeamB] = useState({ name: 'Equipe B', score: 0, history: [] as number[] });

  const addPoints = (team: 'A' | 'B', points: number) => {
    if (team === 'A') {
      setTeamA(prev => ({
        ...prev,
        score: prev.score + points,
        history: [...prev.history, points]
      }));
    } else {
      setTeamB(prev => ({
        ...prev,
        score: prev.score + points,
        history: [...prev.history, points]
      }));
    }
  };

  const handleFinishGame = async () => {
    // Validação de empate ou placar zerado
    if (teamA.score === teamB.score) return alert("O jogo está empatado!");
    if (teamA.score === 0 && teamB.score === 0) return alert("Inicie uma partida primeiro!");

    const winner = teamA.score > teamB.score ? teamA : teamB;
    const confirm = window.confirm(`Finalizar partida? Vitória de ${winner.name}!`);
    
    if (confirm) {
      try {
        const result = await recordVictory(winner.name, winner.score);
        if (result.success) {
          setTeamA({ name: teamA.name, score: 0, history: [] });
          setTeamB({ name: teamB.name, score: 0, history: [] });
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
      setTeamA(prev => ({ ...prev, score: 0, history: [] }));
      setTeamB(prev => ({ ...prev, score: 0, history: [] }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Barra de Ferramentas Superior */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-black/40 p-4 rounded-2xl backdrop-blur-md border border-white/10">
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
          <button 
            onClick={() => setGameMode('CANASTRA')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${gameMode === 'CANASTRA' ? 'bg-yellow-600 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Canastra
          </button>
          <button 
            onClick={() => setGameMode('TRUCO')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${gameMode === 'TRUCO' ? 'bg-yellow-600 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Truco
          </button>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={resetGame} 
            className="bg-zinc-800 hover:bg-red-900/40 text-red-500 px-4 py-2 rounded-xl transition-all text-xs font-black uppercase tracking-widest border border-red-900/20"
          >
            Reset
          </button>
          <button 
            onClick={handleFinishGame}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl transition-all text-xs font-black uppercase tracking-widest shadow-lg shadow-green-900/20"
          >
            Nova Partida
          </button>
        </div>
      </div>

      {/* Grid de Placar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamColumn 
          team={teamA} 
          gameMode={gameMode}
          onAddPoints={(pts) => addPoints('A', pts)} 
          onNameChange={(name) => setTeamA(prev => ({ ...prev, name }))}
        />
        <TeamColumn 
          team={teamB} 
          gameMode={gameMode}
          onAddPoints={(pts) => addPoints('B', pts)} 
          onNameChange={(name) => setTeamB(prev => ({ ...prev, name }))}
        />
      </div>
    </div>
  );
}
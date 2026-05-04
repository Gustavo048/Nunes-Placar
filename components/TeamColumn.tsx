'use client';

import { useState } from 'react';


interface TeamProps {
  team: { name: string; score: number; history: number[] };
  gameMode: 'TRUCO' | 'CANASTRA';
  onAddPoints: (pts: number) => void;
  onNameChange: (name: string) => void;
}

export default function TeamColumn({ team, gameMode, onAddPoints, onNameChange }: TeamProps) {
  const [val, setVal] = useState('');

  const handleAction = () => {
    const points = parseInt(val);
    if (!isNaN(points)) {
      onAddPoints(points);
      setVal('');
    }
  };

  // Pontuações padrão do Truco para botões de atalho
  const trucoShortcuts = [1, 3, 6, 9, 12];

  return (
    <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center shadow-2xl transition-all">
      {/* Nome da Equipe Editável */}
      <input 
        type="text" 
        value={team.name}
        onChange={(e) => onNameChange(e.target.value)}
        className="bg-transparent text-2xl md:text-3xl font-black text-center text-white border-b-2 border-transparent focus:border-yellow-500 outline-none mb-6 w-full uppercase tracking-widest transition-colors"
      />
      
      {/* Placar Principal */}
      <div className="text-7xl md:text-8xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] my-4">
        {team.score}
      </div>

      <div className="w-full mt-4 space-y-4">
        
        {/* Atalhos Rápidos: Renderiza apenas se for TRUCO */}
        {gameMode === 'TRUCO' && (
          <div className="grid grid-cols-5 gap-2">
            {trucoShortcuts.map((pts) => (
              <button
                key={pts}
                onClick={() => onAddPoints(pts)}
                className="bg-white/5 hover:bg-yellow-600 hover:text-black border border-white/10 py-3 rounded-xl text-xs font-bold transition-all"
              >
                +{pts}
              </button>
            ))}
          </div>
        )}

        {/* Input de Soma Automática */}
        <div className="flex flex-col gap-2">
          <input 
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAction()}
            placeholder={gameMode === 'CANASTRA' ? "Pontos da rodada..." : "Outro valor..."}
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white text-xl text-center focus:ring-4 focus:ring-yellow-500/50 outline-none transition-all placeholder:text-gray-500"
          />
          <button 
            onClick={handleAction}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-black py-4 rounded-2xl transition-all uppercase text-sm tracking-tighter shadow-lg"
          >
            Adicionar Pontos
          </button>
        </div>
      </div>

      {/* Histórico Local da Partida Atual */}
      <div className="mt-8 w-full border-t border-white/5 pt-6">
        <p className="text-[10px] font-bold text-gray-500 uppercase mb-3 tracking-[0.2em]">Rodadas Anteriores</p>
        <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
          {team.history.length === 0 && (
            <p className="text-gray-600 text-xs italic text-center py-2">Nenhuma jogada registrada</p>
          )}
          {team.history.map((pts, i) => (
            <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 animate-in fade-in slide-in-from-top-1">
              <span className="text-gray-500 text-[10px] font-mono">RD {i + 1}</span>
              <span className={`font-bold text-sm ${pts >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {pts > 0 ? `+${pts}` : pts}
              </span>
            </div>
          )).reverse()}
        </div>
      </div>
    </div>
  );
}
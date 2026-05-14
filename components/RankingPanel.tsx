'use client';

import React from 'react';

// --- Interfaces ---

export interface RankingItem {
  id: string;
  teamName: string;
  victories: number;
  totalPoints: number;
}

interface RankingPanelProps {
  data: RankingItem[];
  activeMode: 'TRUCO' | 'CANASTRA' | 'DOMINO';
}

// --- Helpers de Estilização ---

const getRankColor = (index: number): string => {
  const colors: Record<number, string> = {
    0: 'text-yellow-500',
    1: 'text-gray-300',
    2: 'text-orange-400',
  };
  return colors[index] ?? 'text-gray-600';
};

// --- Subcomponentes ---

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-40 border border-white/5 rounded-2xl bg-black/20">
    <p className="text-gray-400 text-xs uppercase tracking-widest italic">
      Aguardando resultados...
    </p>
  </div>
);

const RankingCard = ({ item, index }: { item: RankingItem; index: number }) => (
  <div
    className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl 
               hover:border-yellow-500/50 transition-all group animate-in fade-in slide-in-from-right-4"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="flex items-center gap-4">
      <span className={`text-xl font-black w-8 text-center ${getRankColor(index)}`}>
        {index + 1}º
      </span>

      <div>
        <p className="text-white uppercase text-sm group-hover:text-yellow-400 transition-colors truncate max-w-37">
          {item.teamName}
        </p>
        <p className="text-gray-400 text-[13px] uppercase tracking-tighter">
          {item.totalPoints.toLocaleString()} Pontos
        </p>
      </div>
    </div>
  </div>
);

// --- Componente Principal ---

export default function RankingPanel({ data, activeMode }: RankingPanelProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full flex flex-col shadow-2xl min-h-125">
      
      {/* CABEÇALHO */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.4)]" />
          <h2 className="text-xl text-white uppercase tracking-widest">
            Ranking {activeMode.toLowerCase()}
          </h2>
        </div>
      </header>

      {/* LISTA DE RANKING */}
      <main className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {data.length === 0 ? (
          <EmptyState />
        ) : (
          data.map((item, index) => (
            <RankingCard key={item.id} item={item} index={index} />
          ))
        )}
      </main>

      {/* RODAPÉ */}
      <footer className="mt-6 pt-4 border-t border-white/5 text-center">
        <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">
          Database: {activeMode}
        </p>
      </footer>
    </div>
  );
}
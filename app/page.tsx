'use client'; 

import { useState, useEffect } from 'react'; 
import RankingPanel, { RankingItem } from "@/components/RankingPanel";
import ScoreBoard from "@/components/ScoreBoard";
import { getRanking } from './actions/ranking';


export default function Home() {
  // Estados para controlar a modalidade ativa e os dados do ranking
  const [activeGameMode, setActiveGameMode] = useState<'CANASTRA' | 'TRUCO' | 'DOMINO'>('CANASTRA');
  const [rankingData, setRankingData] = useState<RankingItem[]>([]);

  // Effect para buscar o ranking sempre que a modalidade mudar no ScoreBoard
  useEffect(() => {
    const fetchRanking = async () => {
      const data = await getRanking(activeGameMode);
      setRankingData(data);
    };
    fetchRanking();
  }, [activeGameMode]);

  return (
    <main 
      className="min-h-screen relative flex flex-col items-center p-4 md:p-10 overflow-x-hidden"
      style={{
        backgroundImage: `url('/imagem-v1.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] -z-10" />

      {/* HEADER */}
      <header className="w-full max-w-7xl mb-12 flex justify-between items-end border-b border-white/5 pb-8">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
            NUNES <span className="text-yellow-500">PLACAR</span>
          </h1>
          <p className="text-gray-400 text-[10px] mt-3 tracking-[0.4em] font-light uppercase">
            Estatísticas em Tempo Real
          </p>
        </div>
        
        <div className="text-right hidden md:block">
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="h-px w-6 bg-yellow-500/20" />
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
              v1.0 Professional
            </span>
          </div>
          <span className="text-yellow-600/50 text-[9px] uppercase tracking-widest">
            Florianópolis • SC
          </span>
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* ÁREA DE JOGO (LADO ESQUERDO) */}
        <section className="lg:col-span-8 w-full order-2 lg:order-1">
          <div className="bg-white/3 border border-white/10 rounded-[2.5rem] p-1.5 shadow-2xl backdrop-blur-md">
             
             <ScoreBoard onModeChange={(mode) => setActiveGameMode(mode)} />
          </div>
          
          {/* Visual do modo ativo */}
          <div className="mt-6 ml-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
              Servidor Ativo: {activeGameMode} 
            </span>
          </div>
        </section>

        {/* RANKING (LADO DIREITO) */}
        <aside className="lg:col-span-4 w-full order-1 lg:order-2 sticky top-8">
          <div className="bg-black/20 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-2xl">
            {/* Recebe os dados filtrados e a informação da modalidade ativa */}
            <RankingPanel data={rankingData} activeMode={activeGameMode} />
          </div>
        </aside>
        
      </div>

      {/* FOOTER */}
      <footer className="mt-24 mb-10 pt-10 border-t border-white/5 w-full max-w-7xl text-center">
        <p className="text-white/30 text-[9px] font-medium uppercase tracking-[0.6em] hover:text-white/60 transition-all duration-500 cursor-default">
          Nunes Placar &copy; 2026 — Santa Catarina
        </p>
      </footer>
    </main>
  );
}
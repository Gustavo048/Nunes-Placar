import RankingPanel from "@/components/RankingPanel";
import ScoreBoard from "@/components/ScoreBoard";
import { getRanking } from './actions/ranking';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Busca os dados NeonDB
  const rankingInitialData = await getRanking();

  return (
    <main 
      className="min-h-screen relative flex flex-col items-center p-4 md:p-8 overflow-x-hidden"
      style={{
        backgroundImage: `url('/imagem-v1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 1. AJUSTE DE CONTRASTE: Escurecimento mais profundo para destacar os Cards de vidro */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] -z-10" />

      {/* 2. HEADER: Max-width corrigido e centralizado com borda suave */}
      <header className="w-full max-w-7xl mb-8 flex justify-between items-end border-b border-white/10 pb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
            NUNES <span className="text-yellow-500">PLACAR</span>
          </h1>
          <p className="text-gray-400 text-[10px] mt-2 tracking-[0.3em] font-light">ESTATÍSTICAS EM TEMPO REAL</p>
        </div>
        
        <div className="text-right hidden md:block">
          <span className="text-gray-500 text-[10px] uppercase tracking-widest block">
            v1.0 Professional
          </span>
          <span className="text-yellow-500/50 text-[9px] uppercase tracking-widest">
            Florianópolis • SC
          </span>
        </div>
      </header>

      {/* 3. GRID PRINCIPAL */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LADO ESQUERDO */}
        <section className="lg:col-span-8 w-full order-2 lg:order-1">
          <div className="bg-white/5 border border-white/5 rounded-3xl p-2 shadow-2xl">
             <ScoreBoard />
          </div>
        </section>

        {/* LADO DIREITO */}
        <aside className="lg:col-span-4 w-full order-1 lg:order-2 sticky top-8">
          <RankingPanel data={rankingInitialData} />
        </aside>
        
      </div>

      {/* 4. FOOTER */}
      <footer className="mt-20 mb-8 pt-10 border-t border-white/10 w-full max-w-7xl text-center">
        <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.5em] hover:text-white/70 transition-colors duration-300">
          Nunes Placar &copy; 2026 — Desenvolvido em Santa Catarina
        </p>
      </footer>
    </main>
  );
}
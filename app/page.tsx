import RankingPanel from "@/components/RankingPanel";
import ScoreBoard from "@/components/ScoreBoard";
import { getRanking } from './actions/ranking';

export default async function Home() {
  // Busca os dados  NeonDB
  const rankingInitialData = await getRanking();

  return (
    <main 
      className="min-h-screen relative flex flex-col items-center p-4 md:p-8"
      style={{
        backgroundImage: `url('/imagem-v1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Camada de escurecimento e desfoque para destacar o conteúdo */}
      <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm -z-10" />

      <header className="w-full max-w-[1400px] mb-6 flex justify-between items-center border-b border-white/10 pb-4">
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter">
          NUNES <span className="text-yellow-500">PLACAR</span>
        </h1>
        <span className="text-gray-500 text-[10px] uppercase tracking-widest hidden md:block">
          v1.0 Professional
        </span>
      </header>

      {/* Grid Principal: Responsivo para Celular */}
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LADO ESQUERDO: Placar Atual */}
        <section className="lg:col-span-8 space-y-6">
          <ScoreBoard />
        </section>

        {/* LADO DIREITO: Ranking  */}
        <aside className="lg:col-span-4 w-full">
          <RankingPanel data={rankingInitialData} />
        </aside>
        
      </div>

      <footer className="mt-auto pt-10 text-gray-600 text-[9px] uppercase tracking-[0.4em]">
        Nunes Placar &copy; 2026 - Florianópolis/SC
      </footer>
    </main>
  );
}
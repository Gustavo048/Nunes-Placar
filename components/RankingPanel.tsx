'use client';

export interface RankingItem {
  id: string;

  victories: number;
  totalPoints: number;

  user: {
    name: string;
  };
}

interface RankingPanelProps {
  data: RankingItem[];
  
  activeMode: 'TRUCO' | 'CANASTRA' | 'DOMINO';
}

export default function RankingPanel({ data, activeMode }: RankingPanelProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full flex flex-col shadow-2xl min-h-125">

      {/* Cabeçalho do Painel */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.4)]" />
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">
            Ranking {activeMode.toLowerCase()} {/* Exibe a modalidade dinamicamente */}
          </h2>
        </div>
        
        {/* Badge visual do modo ativo */}
        <span className="text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded-md font-black tracking-tighter">
          {activeMode}
        </span>
      </div>

      {/* Lista de Ranking */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 border border-white/5 rounded-2xl bg-black/20">
            <p className="text-gray-500 text-xs uppercase tracking-widest italic">Aguardando resultados...</p>
          </div>
        ) : (
          data.map((item, index) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-yellow-500/50 transition-all group animate-in fade-in slide-in-from-right-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className={`text-xl font-black w-8 text-center ${
                  index === 0 ? 'text-yellow-500' : 
                  index === 1 ? 'text-gray-300' : 
                  index === 2 ? 'text-orange-400' : 'text-gray-600'
                }`}>
                  {index + 1}º
                </span>
                
                <div>
                  <p className="text-white font-bold uppercase text-sm group-hover:text-yellow-500 transition-colors truncate max-w-37.5">
                    {item.user.name}
                  </p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-tighter">
                    {item.totalPoints.toLocaleString()} PONTOS ACUMULADOS
                  </p>
                </div>
              </div>

              <div className="text-right border-l border-white/10 pl-4">
                <p className="text-yellow-500 font-black text-xl leading-none">{item.victories}</p>
                <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest">Vitórias</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rodapé  */}
      <div className="mt-6 pt-4 border-t border-white/5 text-center">
        <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">
          Database: {activeMode} 
        </p>
      </div>
    </div>
  );
}
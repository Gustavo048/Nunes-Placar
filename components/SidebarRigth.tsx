"use client";

import { useEffect, useState } from "react";
import RankingPanel, { RankingItem } from "./RankingPanel";
import { getRanking } from "@/app/actions/ranking";

interface Props {
  gameMode: "CANASTRA" | "TRUCO" | "DOMINO";
}

export default function SidebarRight({ gameMode }: Props) {
  /* RANKING */

  const [rankingData, setRankingData] = useState<RankingItem[]>([]);

  /* FETCH RANKING */

  useEffect(() => {
    async function fetchRanking() {
      const data = await getRanking(gameMode);

      setRankingData(data);
    }

    fetchRanking();
  }, [gameMode]);

  return (
    <aside
      className="
        w-full
        flex
        flex-col
        gap-3
      "
    >
      {/* RANKING */}

      <div
        className="        
          rounded-[1.4rem]
          md:rounded-[1.7rem]
          border
          border-white/10
          bg-white/3
          backdrop-blur-2xl
          overflow-hidden
        "
      >
        <RankingPanel data={rankingData} activeMode={gameMode} />
      </div>

      {/* SPONSOR */}

      <div
        className="
    rounded-[1.4rem]
    md:rounded-[1.7rem]
    border
    border-yellow-500/10
    bg-linear-to-br
    from-yellow-500/10
    via-yellow-500/3
    to-transparent
    p-2.5
    backdrop-blur-2xl
    overflow-hidden
    relative
  "
      >
        {/* GLOW */}

        <div
          className="
      absolute
      top-0
      right-0
      w-32
      h-32
      bg-yellow-500/10
      blur-3xl
      rounded-full
    "
        />

        <div className="relative z-10">
          {/* HEADER */}

          <div
            className="
        flex
        items-center
        gap-2
        mb-3
      "
          >
            <div
              className="
          w-1.5
          h-1.5
          rounded-full
          bg-yellow-400       
        "
            />

            <span
              className="
          text-[10px]
          uppercase
          tracking-[0.3em]
          text-yellow-300/70
          font-black          
        "
            >
              Patrocinador
            </span>
          </div>

          {/* CONTENT */}

          <div
            className="
        rounded-2xl
        border
        border-white/10
        bg-black/20
        p-4
      "
          >
            <div
              className="
          text-base
          font-black
          text-white
          mb-2
        "
            >
              Sua marca aqui
            </div>
            <p
              className="
          text-xs 
          text-white/50
          leading-relaxed
          mb-4
        "
            >
              Alcance jogadores, campeonatos e eventos competitivos.
            </p>

            <button
              className="
          w-full
          py-3
          rounded-xl
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          text-[11px]
          uppercase
          tracking-[0.2em]
          font-black
          transition-all
        "
            >
              Anunciar
            </button>
          </div>
        </div>
      </div>

      {/* PREMIUM CTA */}

      {/* <div
        className="
          rounded-[1.7rem]
          border
          border-white/10
          bg-white/3
          p-4
          backdrop-blur-2xl
        "
      >

        <div
          className="
            text-lg
            font-black
            text-white
            mb-3
          "
        >
          Ranking Oficial
        </div>

        <p
          className="
            text-sm
            text-white/50
            leading-relaxed
            mb-5
          "
        >
          Crie sua conta gratuitamente
          para registrar partidas,
          acompanhar estatísticas
          e participar do ranking oficial.
        </p>

        <div
          className="
            flex
            gap-3
          "
        >

          <Link
            href="/login"

            className="
              flex-1
              py-2.5
              rounded-xl
              bg-white/5
              hover:bg-white/10
              border
              border-white/10
              text-center
              text-sm
              font-bold
              transition-all
            "
          >
            Login
          </Link>

          <Link
            href="/register"

            className="
              flex-1
              py-3
              rounded-xl
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              text-center
              text-sm
              font-black
              transition-all
            "
          >
            Criar Conta
          </Link>

        </div>
      </div> */}
    </aside>
  );
}

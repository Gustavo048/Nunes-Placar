'use client';

import { useState, useEffect } from 'react';
import RankingPanel, {
  RankingItem
} from "@/components/RankingPanel";
import ScoreBoard from "@/components/ScoreBoard";
import Header from "@/components/Header";
import { getRanking } from './actions/ranking';

export default function Home() {

  /*   STATES */

  const [
    activeGameMode,
    setActiveGameMode
  ] = useState<
    'CANASTRA' | 'TRUCO' | 'DOMINO'
  >('CANASTRA');

  const [
    rankingData,
    setRankingData
  ] = useState<RankingItem[]>([]);

  /*   FETCH RANKING */

  useEffect(() => {

    const fetchRanking = async () => {

      const data =
        await getRanking(activeGameMode);

      setRankingData(data);
    };

    fetchRanking();

  }, [activeGameMode]);


  return (

    <main
      className="
        min-h-screen

        relative

        overflow-x-hidden
      "
    >

      {/* BACKGROUND IMAGE */}

      <div
        className="
          absolute
          inset-0

          -z-20
        "
        style={{
          backgroundImage: `url('/imagem-v1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />


      {/* DARK OVERLAY */}

      <div
        className="
          absolute
          inset-0

          bg-black/80

          backdrop-blur-[2px]

          -z-10
        "
      />


      {/* ============================================
          MAIN CONTAINER
      ============================================ */}

      <div
        className="
          max-w-7xl
          mx-auto

          px-4
          md:px-6

          py-5
          md:py-8

          space-y-8
        "
      >

        {/* HEADER */}

        <Header />

        {/* MAIN GRID */}

        <div
          className="
            grid

            grid-cols-1

            xl:grid-cols-[1fr_360px]

            gap-8

            items-start
          "
        >

          {/* ============================================
              SCOREBOARD AREA
          ============================================ */}

          <section className="w-full">

            <div
              className="
                bg-white/[0.03]

                border
                border-white/10

                rounded-[2.5rem]

                p-1.5

                backdrop-blur-2xl

                shadow-[0_0_60px_rgba(0,0,0,0.45)]
              "
            >

              <ScoreBoard
                onModeChange={(mode) =>
                  setActiveGameMode(mode)
                }
              />

            </div>


            {/* ============================================
                STATUS BAR
            ============================================ */}

            <div
              className="
                mt-6

                flex
                items-center

                gap-3

                w-fit

                px-4
                py-3

                rounded-2xl

                bg-white/[0.03]

                border
                border-white/10

                backdrop-blur-xl

                shadow-[0_0_30px_rgba(0,0,0,0.35)]
              "
            >

              <div
                className="
                  w-2
                  h-2

                  rounded-full

                  bg-green-500

                  animate-pulse
                "
              />

              <span
                className="
                  text-[10px]

                  uppercase

                  tracking-[0.3em]

                  text-white/40

                  font-black
                "
              >
                Modalidade ativa:
              </span>

              <span
                className="
                  text-[10px]

                  uppercase

                  tracking-[0.3em]

                  text-yellow-500

                  font-black
                "
              >
                {activeGameMode}
              </span>
            </div>
          </section>


          {/* RANKING SIDEBAR */}

          <aside
            className="
              w-full

              sticky
              top-6
            "
          >

            <div
              className="
                bg-white/[0.03]

                border
                border-white/10

                rounded-[2.5rem]

                overflow-hidden

                backdrop-blur-2xl

                shadow-[0_0_60px_rgba(0,0,0,0.45)]
              "
            >

              <RankingPanel
                data={rankingData}
                activeMode={activeGameMode}
              />
            </div>
          </aside>
        </div>


        {/* FOOTER*/}

        <footer
          className="
            pt-12
            pb-6

            border-t
            border-white/5
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row

              items-center

              justify-between

              gap-4
            "
          >

            <p
              className="
                text-white/30

                text-[9px]

                font-medium

                uppercase

                tracking-[0.5em]

                hover:text-white/60

                transition-all
                duration-500
              "
            >
              Nunes Placar © 2026
            </p>


            <div
              className="
                flex
                items-center

                gap-2

                text-[9px]

                uppercase

                tracking-[0.35em]

                text-white/20
              "
            >

              <div
                className="
                  w-1.5
                  h-1.5
                  rounded-full                 
                "
              />
              Santa Catarina • Brasil

            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
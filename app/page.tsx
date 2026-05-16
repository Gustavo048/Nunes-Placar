
'use client';

import { useState } from 'react';

import SidebarRight from '@/components/SidebarRigth';
import ScoreBoard from "@/components/ScoreBoard";
import Header from "@/components/Header";

export default function Home() {

  /* STATES */

  const [
    activeGameMode,
    setActiveGameMode
  ] = useState<
    'CANASTRA' |
    'TRUCO' |
    'DOMINO'
  >('CANASTRA');

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
          backgroundImage:
            `url('/imagem-v1.jpg')`,

          backgroundSize:
            'cover',

          backgroundPosition:
            'center',

          backgroundAttachment:
            'fixed',
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

      {/* MAIN CONTAINER */}

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
            xl:grid-cols-[minmax(0,1fr)_380px]
            2xl:grid-cols-[minmax(0,1fr)_420px]
            gap-5
            xl:gap-6
            items-start
          "
        >

          {/* LEFT CONTENT */}

          <section
            className="
              min-w-0
              relative
            "
          >

            {/* AMBIENT GLOW */}

            <div
              className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[65%]
                h-[65%]
                rounded-full
                bg-yellow-500/10
                blur-[120px]
                pointer-events-none
                -z-10
              "
            />

            <div
              className="
                bg-white/3
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

          </section>

          {/* RIGHT SIDEBAR */}

          <aside
            className="
              w-full
              xl:sticky
              xl:top-6
            "
          >

            <SidebarRight
              gameMode={activeGameMode}
            />

          </aside>

        </div>

        {/* FOOTER */}

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
                  bg-green-400
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




'use client';

import React from 'react';

/* INTERFACES */

export interface RankingItem {
  id: string;
  teamName: string;
  victories: number;
  totalPoints: number;
}

interface RankingPanelProps {
  data: RankingItem[];

  activeMode:
    'TRUCO' |
    'CANASTRA' |
    'DOMINO';
}

/* HELPERS */

const getRankColor = (
  index: number
): string => {

  const colors:
    Record<number, string> = {

    0: 'text-yellow-500',
    1: 'text-gray-300',
    2: 'text-orange-400',
  };

  return (
    colors[index] ??
    'text-gray-600'
  );
};

/* EMPTY */

const EmptyState = () => (

  <div
    className="
      flex
      flex-col
      items-center
      justify-center
      h-32
      border
      border-white/5
      rounded-2xl
      bg-black/20
    "
  >

    <p
      className="
        text-gray-400
        text-[10px]
        uppercase
        tracking-[0.3em]
        italic
      "
    >
      Aguardando resultados...
    </p>

  </div>
);

/* CARD */

const RankingCard = ({
  item,
  index
}: {
  item: RankingItem;
  index: number;
}) => (

  <div
    className="
      flex
      items-center
      justify-between
      px-4
      py-3
      bg-black/30
      border
      border-white/5
      rounded-2xl
      hover:border-yellow-500/30
      transition-all
      group
      animate-in
      fade-in
      slide-in-from-right-4
    "

    style={{
      animationDelay:
        `${index * 40}ms`
    }}
  >

    <div
      className="
        flex
        items-center
        gap-3
        min-w-0
      "
    >

      {/* POSITION */}

      <span
        className={`
          text-lg
          font-black
          w-7
          text-center
          shrink-0

          ${getRankColor(index)}
        `}
      >
        {index + 1}º
      </span>

      {/* INFO */}

      <div className="min-w-0">
        <p
          className="
            text-white
            uppercase
            text-sm
            font-semibold
            group-hover:text-yellow-400
            transition-colors
            truncate
          "
        >
          {item.teamName}
        </p>

        <div
          className="
            flex
            items-center
            gap-2
            mt-0.5
          "
        >

          <span
            className="
              text-[11px]
              text-gray-500
              uppercase
              tracking-wide
            "
          >
            {item.victories} vitórias
          </span>

          <div
            className="
              w-1
              h-1
              rounded-full
              bg-white/10
            "
          />

          <span
            className="
              text-[11px]
              text-gray-400
              uppercase
              tracking-wide
            "
          >
            {item.totalPoints.toLocaleString()} pts
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* COMPONENT */

export default function RankingPanel({
  data,
  activeMode
}: RankingPanelProps) {

  return (

    <div
      className="
        bg-white/3
        backdrop-blur-xl
        border
        border-white/10
        rounded-[1.7rem]
        p-5
        h-full
        flex
        flex-col
        shadow-2xl
        min-h-102  //tamanho painel ranking
      "
    >

      {/* HEADER */}

      <header
        className="
          flex
          items-center
          justify-between

          mb-5
        "
      >

        <div
          className="
            flex
            items-center

            gap-3
          "
        >

          <div
            className="
              w-1.5
              h-7

              bg-yellow-500

              rounded-full

              shadow-[0_0_10px_rgba(234,179,8,0.35)]
            "
          />

          <div>

            <p
              className="
                text-[10px]

                uppercase

                tracking-[0.35em]

                text-white/30

                font-black

                mb-1
              "
            >
              Ranking
            </p>

            <h2
              className="
                text-lg

                text-white

                uppercase

                tracking-[0.15em]

                font-black
              "
            >
              {activeMode}
            </h2>

          </div>

        </div>

      </header>

      {/* LIST */}

      <main
        className="
          flex-1

          overflow-y-auto

          space-y-3

          pr-1

          custom-scrollbar
        "
      >

        {data.length === 0 ? (

          <EmptyState />

        ) : (

          data.map((
            item,
            index
          ) => (

            <RankingCard
              key={item.id}
              item={item}
              index={index}
            />
          ))
        )}

      </main>

      {/* FOOTER */}

      <footer
        className="
          mt-5
          pt-4
          border-t
          border-white/5
          text-center
        "
      >

        <p
          className="
            text-[9px]
            text-gray-500
            uppercase
            font-black
            tracking-[0.3em]
          "
        >
          Ranking Oficial
        </p>

      </footer>

    </div>
  );
}
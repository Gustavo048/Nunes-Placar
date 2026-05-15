'use client';

import { useState } from "react";

interface TeamProps {
  team: {
    name: string;
    score: number;
    history: number[];
  };

  gameMode:
    "TRUCO" |
    "CANASTRA" |
    "DOMINO";

  onAddPoints: (pts: number) => void;

  onNameChange: (name: string) => void;
}

export default function TeamColumn({
  team,
  gameMode,
  onAddPoints,
  onNameChange,
}: TeamProps) {

  const [val, setVal] =
    useState("");

  /* ACTION */

  const handleAction = () => {

    const points =
      parseInt(val);

    if (!isNaN(points)) {

      onAddPoints(points);

      setVal("");
    }
  };

  /* TRUCO SHORTCUTS */

  const trucoShortcuts = [
    1,
    3,
    6,
    9,
    12
  ];

  return (
    <div
      className="
        bg-black/30
        backdrop-blur-xl
        border
        border-white/10
        rounded-[1.4rem]
        md:rounded-[1.7rem]
        p-4
        md:p-5
        flex
        flex-col
        shadow-2xl
        transition-all
        hover:border-white/20
      "
    >

      {/* TEAM NAME */}

      <div
        className="
          w-full
          relative
          group
        "
      >

        <input
          type="text"

          value={team.name}

          onChange={(e) =>
            onNameChange(
              e.target.value
            )
          }

          className="
            bg-transparent
            text-xl
            md:text-2xl
            xl:text-3xl
            font-black
            text-center
            text-white
            border-b-2
            border-transparent
            focus:border-yellow-500
            outline-none
            mb-4
            w-full
            uppercase
            tracking-[0.18em]
            transition-all
            placeholder:text-white/20
          "

          placeholder="
            NOME DA EQUIPE
          "
        />

        <div
          className="
            absolute
            bottom-4
            left-0
            w-full
            h-px
            bg-white/5
            group-focus-within:hidden
          "
        />
      </div>

      {/* SCORE */}

      <div
        className="
          flex
          flex-col
          items-center
          py-8
          md:py-10
        "
      >

        <div className="relative">

          <div
            className="
              text-[58px]
              md:text-[72px]
              xl:text-[82px]
              leading-none
              font-black
              text-white
              drop-shadow-[0_0_25px_rgba(255,255,255,0.18)]
              tabular-nums
            "
          >
            {team.score}
          </div>

        </div>

      </div>

      {/* ACTIONS */}

      <div
        className="
          w-full
        "
      >

        {/* TRUCO */}

        {gameMode === "TRUCO" && (

          <div
            className="
              grid
              grid-cols-5
              gap-2
              mb-4
            "
          >

            {trucoShortcuts.map((pts) => (

              <button
                key={pts}

                onClick={() =>
                  onAddPoints(pts)
                }

                className="
                  bg-white/5
                  hover:bg-yellow-600
                  hover:text-black
                  border
                  border-white/10
                  py-2.5
                  rounded-xl
                  text-[11px]
                  font-black
                  text-white
                  transition-all
                  active:scale-95
                "
              >
                {pts}
              </button>
            ))}
          </div>
        )}

        {/* INPUT + BUTTON */}

        <div
          className="
            flex
            flex-col
            gap-3
          "
        >

          {/* INPUT */}

          <div className="relative">

            <input
              type="number"

              inputMode="numeric"

              value={val}

              onChange={(e) =>
                setVal(e.target.value)
              }

              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleAction()
              }

              placeholder="Pontuação"
              className="
                w-full
                bg-black/40
                border
                border-white/10
                rounded-2xl
                py-3
                md:py-4
                px-4
                text-white
                text-base
                md:text-lg
                text-center
                focus:ring-2
                focus:ring-yellow-500/50
                outline-none
                transition-all
                placeholder:text-gray-600
              "
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={handleAction}

            disabled={!val}

            className="
              w-full
              bg-yellow-600
              hover:bg-yellow-500
              disabled:opacity-50
              disabled:hover:bg-yellow-600
              text-black
              font-black
              py-3
              md:py-4
              rounded-2xl
              transition-all
              uppercase
              text-[10px]
              md:text-[11px]
              tracking-[0.22em]
              shadow-[0_10px_20px_rgba(202,138,4,0.15)]
              active:scale-[0.98]
            "
          >
            Confirmar Pontos
          </button>
        </div>
      </div>

      {/* HISTORY */}

      <div
        className="
          mt-5
          md:mt-6
          w-full
          border-t
          border-white/5
          pt-4
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            justify-between
            items-center
            mb-3
          "
        >

          <p
            className="
              text-[9px]
              md:text-[10px]
              font-black
              text-gray-500
              uppercase
              tracking-[0.28em]            
              "
          >
            Número de Rodadas
          </p>

          <span
            className="
              text-[9px]
              text-white/20
              px-2
              py-0.5
              border
              border-white/5
              rounded-md
              uppercase
              tracking-widest
            "
          >
            {team.history.length}
            {" "}
            JOGADAS
          </span>
        </div>

        {/* LIST */}

        <div
          className="
            space-y-2
            max-h-24
            md:max-h-32
            overflow-y-auto
            pr-1
            custom-scrollbar          "
        >

          {team.history.length === 0 ? (

            <div
              className="
                flex
                flex-col
                items-center
                py-4
                opacity-20
              "
            >

              <div
                className="
                  w-8
                  h-px
                  bg-white/50
                  mb-2
                "
              />

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-tight
                "
              >
                Aguardando início
              </p>

            </div>

          ) : (

            team.history.map((
              pts,
              index
            ) => (

              <div
                key={index}

                className="
                  flex
                  justify-between
                  items-center
                  bg-white/2
                  hover:bg-white/4
                  px-3
                  py-2
                  rounded-xl
                  border
                  border-white/5
                  transition-colors
                "
              >

                <span
                  className="
                    text-gray-600
                    text-[10px]
                    font-bold
                  "
                >
                  Rodada {index + 1}
                </span>

                <span
                  className={`
                    font-black
                    text-sm

                    ${
                      pts >= 0
                        ? "text-green-500/80"
                        : "text-red-500/80"
                    }
                  `}
                >
                  {pts}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

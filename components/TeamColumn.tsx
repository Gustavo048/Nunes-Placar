"use client";

import { useState } from "react";

interface TeamProps {
  team: { name: string; score: number; history: number[] };
  gameMode: "TRUCO" | "CANASTRA" | "DOMINO";
  onAddPoints: (pts: number) => void;
  onNameChange: (name: string) => void;
}

export default function TeamColumn({
  team,
  gameMode,
  onAddPoints,
  onNameChange,
}: TeamProps) {
  const [val, setVal] = useState("");

  const handleAction = () => {
    const points = parseInt(val);

    if (!isNaN(points)) {
      onAddPoints(points);
      setVal("");
    }
  };

  // ATALHOS TRUCO

  const trucoShortcuts = [1, 3, 6, 9, 12];

  return (
    <div
      className="
      bg-black/30
      backdrop-blur-xl
      border
      border-white/10
      rounded-[2rem]
      p-6
      md:p-8
      flex
      flex-col
      items-center
      shadow-2xl
      transition-all
      hover:border-white/20
    "
    >
      {/*  NOME DA EQUIPE  */}

      <div className="w-full relative group">
        <input
          type="text"
          value={team.name}
          onChange={(e) => onNameChange(e.target.value)}
          className="
            bg-transparent
            text-2xl
            md:text-3xl
            font-black
            text-center
            text-white
            border-b-2
            border-transparent
            focus:border-yellow-500
            outline-none
            mb-6
            w-full
            uppercase
            tracking-widest
            transition-all
            placeholder:text-white/20
          "
          placeholder="NOME DA EQUIPE"
        />

        <div
          className="
          absolute
          bottom-6
          left-0        
          w-full
          h-px
          bg-white/5
          group-focus-within:hidden
        "
        />
      </div>

      {/*  PLACAR PRINCIPAL  */}

      <div className="relative">
        <div
          className="
          text-7xl
          md:text-8xl
          font-black
          text-white
          drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]
          my-4
          tabular-nums
        "
        >
          {team.score}
        </div>
      </div>

      {/*  AÇÕES */}

      <div className="w-full mt-6">
        {/*  TRUCO SHORTCUTS  */}

        {gameMode === "TRUCO" && (
          <div className="grid grid-cols-5 gap-2 mb-4">
            {trucoShortcuts.map((pts) => (
              <button
                key={pts}
                onClick={() => onAddPoints(pts)}
                className="
                  bg-white/5
                  hover:bg-yellow-600
                  hover:text-black
                  border
                  border-white/10
                  py-3
                  rounded-xl
                  text-xs
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

        {/*  INPUT  */}

        <div className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAction()}
              placeholder="Pontuação"
              className="
                w-full
                bg-black/40
                border
                border-white/10
                rounded-2xl
                p-4
                text-white
                text-xl
                text-center
                focus:ring-2
                focus:ring-yellow-500/50
                outline-none
                transition-all
                placeholder:text-gray-600                
              "
            />
          </div>

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
              py-4
              rounded-2xl
              transition-all
              uppercase
              text-xs
              tracking-[0.2em]
              shadow-[0_10px_20px_rgba(202,138,4,0.2)]
              active:scale-[0.98]
            "
          >
            Confirmar Pontos
          </button>
        </div>
      </div>

      {/* HISTÓRICO  */}

      <div
        className="
        mt-10
        w-full
        border-t
        border-white/5
        pt-6
      "
      >
        <div className="flex justify-between items-center mb-4">
          <p
            className="
            text-[10px]
            font-black
            text-gray-500
            uppercase
            tracking-[0.3em]
          "
          >
            Número de Rodadas
          </p>

          <span
            className="
            text-[10px]
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
            {team.history.length} JOGADAS
          </span>
        </div>

        <div
          className="
          space-y-2
          max-h-36
          overflow-y-auto
          pr-1
          custom-scrollbar
        "
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
                tracking-tighter
              "
              >
                Aguardando início
              </p>
            </div>
          ) : (
            team.history.map((pts, index) => (
              <div
                key={index}
                className="
                  flex
                  justify-between
                  items-center

                  bg-white/2
                  hover:bg-white/5
                  p-3
                  rounded-xl
                  border
                  border-white/5
                  transition-colors
                  group
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

                  ${pts >= 0 ? "text-green-500/80" : "text-red-500/80"}
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

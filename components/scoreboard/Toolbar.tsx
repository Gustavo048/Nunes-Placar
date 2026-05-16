'use client';

import { motion } from 'framer-motion';
import { GAME_MODES, type GameMode } from './types';

interface ToolbarProps {
  gameMode: GameMode;

  guestBlocked: boolean;

  onModeChange: (
    mode: GameMode
  ) => void;

  onNewGame: () => void;

  onSaveGame: () => void;
}

export default function Toolbar({
  gameMode,
  guestBlocked,
  onModeChange,
  onNewGame,
  onSaveGame
}: ToolbarProps) {

  return (

    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
        mb-5
        bg-white/2.5
        px-4
        py-3
        rounded-[1.7rem]
        border
        border-white/5
        backdrop-blur-md
      "
    >

      {/* GAME MODES */}

      <div
        className="
          flex
          gap-1.5
          bg-white/5
          p-1
          rounded-xl
          relative
          w-full
          lg:w-auto
        "
      >

        {Object.entries(
          GAME_MODES
        ).map(([id, mode]) => (

          <button
            key={id}

            onClick={() =>
              onModeChange(
                id as GameMode
              )
            }

            className="
              relative
              flex-1
              lg:flex-none
              px-3
              md:px-5
              py-2.5
              rounded-lg
              font-bold
              text-[11px]
              md:text-sm
              transition-colors
              duration-300
              outline-none
            "
          >

            {gameMode === id && (

              <motion.div
                layoutId="activeTab"

                className="
                  absolute
                  inset-0
                  bg-yellow-600
                  rounded-lg
                  shadow-lg
                  shadow-yellow-900/40
                "

                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6
                }}
              />
            )}

            <span
              className={`
                relative
                z-10
                transition-colors
                duration-300

                ${
                  gameMode === id
                    ? 'text-black'
                    : 'text-gray-400 hover:text-white'
                }
              `}
            >
              {mode.label}
            </span>
          </button>
        ))}
      </div>

      {/* ACTIONS */}

      <div
        className="
          w-full
          grid
          grid-cols-2
          gap-3
          lg:flex
          lg:w-auto
        "
      >

        {/* NEW GAME */}

        <button
          onClick={onNewGame}

          className="
            bg-green-600
            hover:bg-green-500
            border
            border-white/10
            text-black
            px-6
            py-3
            rounded-xl
            transition-all
            text-[10px]
            font-black
            uppercase
            tracking-widest
            active:scale-95
          "
        >
          Nova Partida
        </button>

        {/* SAVE */}

        <button
          onClick={() => {

            if (guestBlocked) {
              return;
            }

            onSaveGame();
          }}

          className="
            bg-yellow-500
            hover:bg-yellow-400
            text-black
            px-6
            py-3
            rounded-xl
            transition-all
            text-[10px]
            font-black
            uppercase
            tracking-widest
            shadow-lg
            shadow-yellow-900/20
            active:scale-95
          "
        >
          Salvar
        </button>
      </div>
    </div>
  );
}




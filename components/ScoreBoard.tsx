'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import TeamColumn from './TeamColumn';
import { recordVictory } from '@/app/actions/ranking';
import { incrementGuestUsage, getGuestUsage } from "@/app/actions/guest";
import { getGuestId } from "@/lib/guest";

const GAME_MODES = {
  CANASTRA: { label: 'Canastra' },
  TRUCO: { label: 'Truco' },
  DOMINO: { label: 'Dominó' }
} as const;

type GameMode =
  keyof typeof GAME_MODES;

type Team = {
  id: string;
  name: string;
  score: number;
  history: number[];
};

interface ScoreBoardProps { onModeChange?: ( mode: GameMode ) => void; }

export default function ScoreBoard({ onModeChange }: ScoreBoardProps) {

  /* SESSION */

  const { data: session } = useSession();

  /* STATES */

  const [ guestBlocked, setGuestBlocked ] = useState(false);

  const [ guestGamesPlayed, setGuestGamesPlayed ] = useState(0);

  const [ loadingSave, setLoadingSave ] = useState(false);

  const [ showSaveModal, setShowSaveModal ] = useState(false);

  const [ showResetModal, setShowResetModal ] = useState(false);

  const remainingGames = Math.max( 0, 3 - guestGamesPlayed);

  const [ gameMode, setGameMode ] = useState<GameMode>('CANASTRA');

  const [ teams, setTeams ] = useState<Team[]>([
    {
      id: 'A',
      name: 'Equipe A',
      score: 0,
      history: []
    },
    {
      id: 'B',
      name: 'Equipe B',
      score: 0,
      history: []
    }
  ]);

  /* MODE CHANGE */

  useEffect(() => {

    if (onModeChange) {
      onModeChange(gameMode);
    }

  }, [gameMode, onModeChange]);

  /* CHECK GUEST USAGE */

  useEffect(() => {

    async function checkGuestUsage() {

      if (session?.user) {
        return;
      }

      const guestId = getGuestId();

      if (!guestId) {
        return;
      }

      const usage = await getGuestUsage(
          guestId
        );

      if (usage.success) {

        setGuestGamesPlayed(
          usage.gamesPlayed
        );

        if (
          usage.gamesPlayed >= 3
        ) {

          setGuestBlocked(true);
        }
      }
    }

    checkGuestUsage();

  }, [session]);

  /* ADD POINTS */

  const addPoints = (
    teamId: string,
    points: number
  ) => {

    setTeams(prev =>
      prev.map(team =>
        team.id === teamId
          ? {
              ...team,

              score:
                team.score + points,

              history: [
                ...team.history,
                points
              ]
            }
          : team
      )
    );
  };

  /* UPDATE TEAM NAME */

  const updateTeamName = (
    teamId: string,
    name: string
  ) => {

    setTeams(prev =>
      prev.map(team =>
        team.id === teamId
          ? {
              ...team,
              name
            }
          : team
      )
    );
  };

  /* GET WINNER */

  const getWinner = () => {

    return teams.reduce(
      (prev, curr) =>
        curr.score > prev.score
          ? curr
          : prev
    );
  };

  /* SAVE GAME */

  const handleSaveGame =
    async () => {

    const [
      teamA,
      teamB
    ] = teams;

    if (
      teamA.score ===
      teamB.score
    ) {

      toast.error(
        "O jogo está empatado!"
      );

      return;
    }

    if (
      teamA.score === 0 &&
      teamB.score === 0
    ) {

      toast.error(
        "Inicie uma partida primeiro!"
      );

      return;
    }

    setShowSaveModal(true);
  };

  /* CONFIRM SAVE GAME */

  const confirmSaveGame =
    async () => {

    setLoadingSave(true);

    try {

      const winner =
        getWinner();

      /* GUEST CONTROL */

      if (!session?.user) {

        const guestId =
          getGuestId();

        if (guestId) {

          const usage =
            await incrementGuestUsage(
              guestId
            );

          if (
            usage.success &&
            usage.gamesPlayed >= 3
          ) {

            setGuestBlocked(true);
          }

          setGuestGamesPlayed(
            usage.gamesPlayed
          );
        }
      }

      const result =
        await recordVictory(
          winner.name,
          winner.score,
          gameMode
        );

      if (result.success) {

        toast.success(
          "Partida registrada no ranking!"
        );

      } else {

        toast.error(
          result.message
        );
      }

      setShowSaveModal(false);

    } catch (error) {

      console.error(
        "Falha ao salvar ranking:",
        error
      );

      toast.error(
        "Erro ao salvar ranking."
      );

      setShowSaveModal(false);

    } finally {

      setLoadingSave(false);
    }
  };

  /* NEW GAME */

  const startNewGame = () => {

    setTeams(prev =>
      prev.map(team => ({
        ...team,
        score: 0,
        history: [],
      }))
    );

    toast.success(
      "Nova partida iniciada!"
    );
  };

  /* RESET GAME */

  const resetGame = () => {

    setTeams(prev =>
      prev.map(team => ({
        ...team,
        score: 0,
        history: [],
      }))
    );

    setShowResetModal(false);

    toast.success(
      "Placar resetado!"
    );
  };

  return (

    <div
      className="
        w-full
        max-w-5xl
        mx-auto
      "
    >

      {/* GUEST BAR */}

      {!session?.user &&
        !guestBlocked && (

        <div
          className="
            mb-4
            mx-1
            flex
            items-center
            justify-between
            gap-4
            px-3
            md:px-5
            py-3
            rounded-[1.4rem]
            border
            backdrop-blur-xl
            transition-all
          "

          style={{
            borderColor:
              remainingGames === 1
                ? 'rgba(234,179,8,0.18)'
                : 'rgba(255,255,255,0.06)',

            background:
              remainingGames === 1
                ? 'rgba(234,179,8,0.05)'
                : 'rgba(255,255,255,0.025)'
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

            <div
              className={`
                w-2
                h-2
                rounded-full
                shrink-0

                ${
                  remainingGames === 1
                    ? 'bg-yellow-400'
                    : 'bg-white/40'
                }
              `}
            />

            <div className="leading-tight">

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  md:tracking-[0.35em]
                  text-white/35
                  font-black
                "
              >
                Modo visitante
              </p>

              <p
                className={`
                  text-xs
                  md:text-sm
                  mt-1
                  font-medium

                  ${
                    remainingGames === 1
                      ? 'text-yellow-300'
                      : 'text-white/65'
                  }
                `}
              >

                {remainingGames > 1
                  ? `${remainingGames} partidas gratuitas restantes`
                  : 'Última partida gratuita disponível'}

              </p>
            </div>
          </div>

          <Link
            href="/register"

            className="
              shrink-0
              px-4
              md:px-5
              py-2.5
              rounded-xl
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              text-[10px]
              uppercase
              tracking-[0.18em]
              font-black
              transition-all
              shadow-[0_0_20px_rgba(234,179,8,0.18)]
            "
          >
            Criar Conta
          </Link>

        </div>
      )}

      {/* TOOLBAR */}

      <div
        className="
          flex
          flex-wrap
          justify-center
          md:justify-between
          items-center
          gap-4
          mb-5
          bg-black/30
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
            gap-2
            bg-white/5
            p-1
            rounded-xl
            relative
          "
        >

          {Object.entries(
            GAME_MODES
          ).map(([id, mode]) => (

            <button
              key={id}

              onClick={() =>
                setGameMode(
                  id as GameMode
                )
              }

              className="
                relative
                px-4
                md:px-6
                py-2
                rounded-lg
                font-bold
                text-xs
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
    flex
    flex-wrap
    justify-center
    gap-3
  "
>

  {/* NEW GAME */}

  <button
    onClick={startNewGame}

    className="
      bg-green-600
      hover:bg-green-500
      text-white
      px-6
      py-2
      rounded-xl
      transition-all
      text-[10px]
      font-black
      uppercase
      tracking-widest
      shadow-lg
      shadow-green-900/20
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

      handleSaveGame();
    }}

    className="
      bg-yellow-500
      hover:bg-yellow-400
      text-black
      px-6
      py-2
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

  {/* RESET */}

  <button
    onClick={() =>
      setShowResetModal(true)
    }

    className="
      bg-zinc-800
      hover:bg-red-900/40
      text-red-500
      px-4
      py-2
      rounded-xl
      transition-all
      text-[10px]
      font-black
      uppercase
      tracking-widest
      border
      border-red-900/20
      active:scale-95
    "
  >
    Reset
  </button>
</div>
</div>

      {/* SCOREBOARD */}

      <AnimatePresence mode="wait">

        <motion.div

          key={gameMode}

          initial={{
            opacity: 0,
            y: 15,
            filter: "blur(8px)"
          }}

          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
          }}

          exit={{
            opacity: 0,
            y: -15,
            filter: "blur(8px)"
          }}

          transition={{
            duration: 0.35,
            ease: "easeInOut"
          }}

          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
            md:gap-6
          "
        >

          {teams.map(team => (

            <TeamColumn
              key={team.id}

              team={team}

              gameMode={gameMode}

              onAddPoints={(pts) =>
                addPoints(
                  team.id,
                  pts
                )
              }

              onNameChange={(name) =>
                updateTeamName(
                  team.id,
                  name
                )
              }
            />
          ))}

        </motion.div>

      </AnimatePresence>

      {/* SAVE MODAL */}

      <AnimatePresence>
        {showSaveModal && (

          <motion.div
            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/70
              backdrop-blur-md
            "
          >

            <motion.div
              initial={{
                scale: 0.92,
                opacity: 0
              }}

              animate={{
                scale: 1,
                opacity: 1
              }}

              exit={{
                scale: 0.92,
                opacity: 0
              }}

              transition={{
                duration: 0.2
              }}

              className="
                w-full
                max-w-md
                mx-4
                p-7
                rounded-[2rem]
                border
                border-white/10
                bg-zinc-950
                shadow-[0_0_80px_rgba(0,0,0,0.5)]
              "
            >

              <div className="space-y-6">
                <div>
                  <h2
                    className="
                      text-2xl
                      font-black
                      text-white
                      mb-3
                    "
                  >
                    Salvar partida?
                  </h2>

                  <p
                    className="
                      text-white/50
                      leading-relaxed
                    "
                  >
                    A vitória será registrada
                    no ranking oficial.
                  </p>
                </div>

                <div
                  className="
                    flex
                    gap-3
                  "
                >

                  <button
                    onClick={() =>
                      setShowSaveModal(false)
                    }

                    className="
                      flex-1
                      py-4
                      rounded-2xl
                      bg-white/5
                      hover:bg-white/10
                      border
                      border-white/10
                      text-white
                      font-bold
                      transition-all
                    "
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={ confirmSaveGame }

                    disabled={ loadingSave }

                    className="
                      flex-1
                      py-4
                      rounded-2xl
                      bg-yellow-500
                      hover:bg-yellow-400
                      disabled:opacity-50
                      text-black
                      font-black
                      transition-all
                    "
                  >

                    {loadingSave
                      ? "Salvando..."
                      : "Salvar"}

                  </button>
                </div>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* RESET MODAL */}

      <AnimatePresence>

        {showResetModal && (

          <motion.div
            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/70
              backdrop-blur-md
            "
          >

            <motion.div
              initial={{
                scale: 0.92,
                opacity: 0
              }}

              animate={{
                scale: 1,
                opacity: 1
              }}

              exit={{
                scale: 0.92,
                opacity: 0
              }}

              transition={{
                duration: 0.2
              }}

              className="
                w-full
                max-w-md
                mx-4
                p-7
                rounded-[2rem]
                border
                border-white/10
                bg-zinc-950
                shadow-[0_0_80px_rgba(0,0,0,0.5)]
              "
            >

              <div className="space-y-6">
                <div>
                  <h2
                    className="
                      text-2xl
                      font-black
                      text-white
                      mb-3
                    "
                  >
                    Resetar placar?
                  </h2>

                  <p
                    className="
                      text-white/50
                      leading-relaxed
                    "
                  >
                    Todas as pontuações
                    da partida atual
                    serão removidas.
                  </p>
                </div>

                <div
                  className="
                    flex
                    gap-3
                  "
                >

                  <button
                    onClick={() =>
                      setShowResetModal(false)
                    }

                    className="
                      flex-1
                      py-4
                      rounded-2xl
                      bg-white/5
                      hover:bg-white/10
                      border
                      border-white/10
                      text-white
                      font-bold
                      transition-all
                    "
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={resetGame}

                    className="
                      flex-1
                      py-4
                      rounded-2xl
                      bg-red-600
                      hover:bg-red-500
                      text-white
                      font-black
                      transition-all
                    "
                  >
                    Resetar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

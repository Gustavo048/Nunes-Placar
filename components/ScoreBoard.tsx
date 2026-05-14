'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import TeamColumn from './TeamColumn';
import { recordVictory } from '@/app/actions/ranking';
import { incrementGuestUsage, getGuestUsage } from "@/app/actions/guest";
import { getGuestId } from "@/lib/guest";

const GAME_MODES = {
  CANASTRA: { label: 'Canastra' },
  TRUCO: { label: 'Truco' },
  DOMINO: { label: 'Dominó' }
} as const;

type GameMode = keyof typeof GAME_MODES;

type Team = {
  id: string;
  name: string;
  score: number;
  history: number[];
};

interface ScoreBoardProps {
  onModeChange?: (mode: GameMode) => void;
}

export default function ScoreBoard({
  onModeChange
}: ScoreBoardProps) {

  /* SESSION */

  const {
    data: session
  } = useSession();

  /* STATES */

  const [
    guestBlocked,
    setGuestBlocked
  ] = useState(false);

  const [
    guestGamesPlayed,
    setGuestGamesPlayed
  ] = useState(0);

const remainingGames =
  Math.max(
    0,
    3 - guestGamesPlayed
  );

  const [
    gameMode,
    setGameMode
  ] = useState<GameMode>('CANASTRA');

  const [
    teams,
    setTeams
  ] = useState<Team[]>([
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

      const guestId =
        getGuestId();

      if (!guestId) {
        return;
      }

      const usage =
        await getGuestUsage(guestId);

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

  /* UPDATE NAME */

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

    return teams.reduce((prev, curr) =>
      curr.score > prev.score
        ? curr
        : prev
    );
  };

  /* FINISH GAME */

  const handleFinishGame =
    async () => {

    const [
      teamA,
      teamB
    ] = teams;

    if (
      teamA.score === teamB.score
    ) {

      return alert(
        "O jogo está empatado!"
      );
    }

    if (
      teamA.score === 0 &&
      teamB.score === 0
    ) {

      return alert(
        "Inicie uma partida primeiro!"
      );
    }

    const winner =
      getWinner();

    const confirm =
      window.confirm(
        `Finalizar partida de ${gameMode}? Vitória de ${winner.name}!`
      );

    if (!confirm) return;

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

    try {

      const result =
        await recordVictory(
          winner.name,
          winner.score,
          gameMode
        );

      /* RESET MATCH */

      setTeams(prev =>
        prev.map(team => ({
          ...team,
          score: 0,
          history: [],
        }))
      );

      /* FEEDBACK */

      if (result.success) {

        alert(
          "Partida registrada no Ranking!"
        );

      } else {

        alert(result.message);
      }

    } catch (error) {

      console.error(
        "Falha ao salvar no ranking:",
        error
      );

      /* RESET */

      setTeams(prev =>
        prev.map(team => ({
          ...team,
          score: 0,
          history: [],
        }))
      );

      alert(
        "Partida finalizada, mas ocorreu erro ao salvar ranking."
      );
    }
  };

  /* RESET GAME */

  const resetGame = () => {
    if (
      window.confirm(
        "Deseja realmente zerar o placar da partida atual?"
      )
    ) {

      setTeams(prev =>
        prev.map(team => ({
          ...team,
          score: 0,
          history: [],
        }))
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">

{/* GUEST BAR */}

{!session?.user && !guestBlocked && (

  <div
    className="
      mb-4
      mx-1
      flex
      items-center
      justify-between
      gap-4
      px-4
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

    {/* LEFT */}

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
            tracking-[0.35em]
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

    {/* CTA */}

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
          justify-between
          items-center
          gap-4
          mb-8
          bg-black/40
          p-4
          rounded-2xl
          backdrop-blur-md
          border
          border-white/10
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
            gap-3
          "
        >

          <button
            onClick={resetGame}
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

          <button

            onClick={() => {

              if (guestBlocked) {
                return;
              }

              handleFinishGame();
            }}

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

            gap-6
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

      {/* GUEST BLOCK MODAL */}

      {guestBlocked &&
        !session?.user && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            backdrop-blur-md
          "
        >

          <div
            className="
              w-full
              max-w-md
              mx-4
              p-8
              rounded-[2rem]
              bg-zinc-950
              border
              border-white/10
              shadow-[0_0_80px_rgba(0,0,0,0.6)]
            "
          >

            <div className="space-y-6">

              <div>

                <h2
                  className="
                    text-3xl
                    font-black
                    text-white
                    mb-3
                  "
                >
                  Continue no Ranking
                </h2>

                <p
                  className="
                    text-white/50
                    leading-relaxed
                  "
                >
                  Crie sua conta gratuita
                  para continuar registrando
                  partidas, salvar estatísticas
                  e participar do ranking oficial.
                </p>

              </div>

              <div
                className="
                  space-y-3
                  text-sm
                  text-white/70
                "
              >

                <div>
                  • Histórico de partidas
                </div>

                <div>
                  • Ranking oficial
                </div>

                <div>
                  • Estatísticas em tempo real
                </div>

                <div>
                  • Perfil competitivo
                </div>

              </div>

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
                    py-4
                    rounded-2xl
                    text-center
                    bg-white/5
                    hover:bg-white/10
                    border
                    border-white/10
                    text-white
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
                    py-4
                    rounded-2xl
                    text-center
                    bg-yellow-500
                    hover:bg-yellow-400
                    text-black
                    font-black
                    transition-all
                  "
                >
                  Criar Conta
                </Link>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

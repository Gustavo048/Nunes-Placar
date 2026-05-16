'use client';

import {
  useState,
  useEffect
} from 'react';

import { toast }
from 'sonner';

import { useSession }
from 'next-auth/react';

import {
  incrementGuestUsage,
  getGuestUsage
} from "@/app/actions/guest";

import { recordVictory }
from '@/app/actions/ranking';

import { getGuestId }
from '@/lib/guest';

import {

  getWinner,
  isTieGame,
  isEmptyGame,
  resetTeams

} from './game.utils';

import {
  type Team,
  type GameMode
} from './types';

export function useScoreBoard() {

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

  const [
    loadingSave,
    setLoadingSave
  ] = useState(false);

  const [
    showSaveModal,
    setShowSaveModal
  ] = useState(false);

  const [
    gameMode,
    setGameMode
  ] = useState<GameMode>(
    'CANASTRA'
  );

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

  /* REMAINING GAMES */

  const remainingGames =
    Math.max(
      0,
      3 - guestGamesPlayed
    );

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
        await getGuestUsage(
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

  function addPoints(
    teamId: string,
    points: number
  ) {

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
  }

  /* UPDATE NAME */

  function updateTeamName(
    teamId: string,
    name: string
  ) {

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
  }

  /* SAVE GAME */

  async function handleSaveGame() {

    if (isTieGame(teams)) {

      toast.error(
        "O jogo está empatado!"
      );

      return;
    }

    if (isEmptyGame(teams)) {

      toast.error(
        "Inicie uma partida primeiro!"
      );

      return;
    }

    setShowSaveModal(true);
  }

  /* CONFIRM SAVE */

  async function confirmSaveGame() {

    setLoadingSave(true);

    try {

      const winner =
        getWinner(teams);

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
  }

  /* NEW GAME */

  function startNewGame() {

    setTeams(prev =>
      resetTeams(prev)
    );

    toast.success(
      "Nova partida iniciada!"
    );
  }

  return {

    session,

    guestBlocked,
    guestGamesPlayed,
    remainingGames,

    loadingSave,
    showSaveModal,
    setShowSaveModal,

    gameMode,
    setGameMode,

    teams,

    addPoints,
    updateTeamName,

    handleSaveGame,
    confirmSaveGame,

    startNewGame,
  };
}






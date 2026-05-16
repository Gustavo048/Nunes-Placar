'use client';

import GuestBar from './scoreboard/GuestBar';
import Toolbar from './scoreboard/Toolbar';
import TeamsGrid from './scoreboard/TeamsGrid';
import SaveGameModal from './scoreboard/SaveGameModal';
import { useScoreBoard } from './scoreboard/useScoreBoard';
import { useEffect } from 'react';

interface ScoreBoardProps {
  onModeChange?: (
    mode:
      | "CANASTRA"
      | "TRUCO"
      | "DOMINO"
  ) => void;
}

export default function ScoreBoard({
  onModeChange
}: ScoreBoardProps) {

  const {

    session,

    guestBlocked,
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

    startNewGame

  } = useScoreBoard();

  /* MODE CHANGE */

    useEffect(() => {

      if (onModeChange) {
        onModeChange(gameMode);
      }

    }, [
      gameMode,
      onModeChange
    ]);

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

        <GuestBar
          remainingGames={
            remainingGames
          }
        />
      )}

      {/* TOOLBAR */}

      <Toolbar
        gameMode={gameMode}
        guestBlocked={guestBlocked}
        onModeChange={setGameMode}
        onNewGame={startNewGame}
        onSaveGame={handleSaveGame}
      />

      {/* TEAMS GRID */}

      <TeamsGrid
        teams={teams}
        gameMode={gameMode}
        onAddPoints={addPoints}
        onNameChange={
          updateTeamName
        }
      />

      {/* SAVE MODAL */}

      <SaveGameModal
        open={showSaveModal}
        loading={loadingSave}
        onClose={() =>
          setShowSaveModal(false)
        }
        onConfirm={
          confirmSaveGame
        }
      />
    </div>
  );
}







'use client';

import { useEffect } from 'react';
import GuestBar from './scoreboard/GuestBar';
import Toolbar from './scoreboard/Toolbar';
import TeamsGrid from './scoreboard/TeamsGrid';
import SaveGameModal from './scoreboard/SaveGameModal';
import GuestBlockedModal from './scoreboard/GuestBlockedModal';
import { useScoreBoard } from './scoreboard/useScoreBoard';

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
    
    status,
    isAuthenticated,
    isSystemLocked,
    guestBlocked,
    remainingGames,
    loadingSave,
    showSaveModal,
    setShowSaveModal,
    showGuestBlockedModal,
    setShowGuestBlockedModal,
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

      onModeChange(
        gameMode
      );
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

      {status !== "loading" &&

        !isAuthenticated && (

          <GuestBar

            remainingGames={
              remainingGames
            }

            guestBlocked={
              guestBlocked
            }
          />
      )}

      {/* TOOLBAR */}

      <Toolbar

        gameMode={
          gameMode
        }

        guestBlocked={
          guestBlocked
        }

        onModeChange={
          setGameMode
        }

        onNewGame={
          startNewGame
        }

        onSaveGame={
          handleSaveGame
        }
      />

      {/* GAME AREA */}

      <div
        className="
          relative
        "
      >

        {/* SYSTEM LOCK OVERLAY */}

        {isSystemLocked && (

          <div
            className="
              absolute
              inset-0
              z-40
              rounded-[2rem]
              bg-black/70
              backdrop-blur-[3px]
              flex
              items-center
              justify-center
              p-6
            "
          >

            <div
              className="
                text-center
                max-w-md
              "
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  mb-4
                  px-3
                  py-1.5
                  rounded-full
                  border
                  border-red-500/10
                  bg-red-500/5
                "
              >

                <div
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-red-400
                  "
                />

                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.3em]
                    text-red-300/80
                    font-black
                  "
                >
                  Atenção
                </span>
              </div>

              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-black
                  text-white
                  mb-4
                "
              >
                Limite gratuito atingido
              </h2>

              <p
                className="
                  text-sm
                  md:text-base
                  text-white/50
                  leading-relaxed
                "
              >
                O modo visitante foi bloqueado.

                <br />
                <br />

                Faça login ou crie sua conta
                para continuar utilizando
                o sistema completo.
              </p>
            </div>
          </div>
        )}

        {/* TEAMS GRID */}

        <TeamsGrid

          teams={teams}

          gameMode={
            gameMode
          }

          onAddPoints={
            addPoints
          }

          onNameChange={
            updateTeamName
          }
        />

      </div>

      {/* SAVE MODAL */}

      <SaveGameModal

        open={
          showSaveModal
        }

        loading={
          loadingSave
        }

        onClose={() =>

          setShowSaveModal(
            false
          )
        }

        onConfirm={
          confirmSaveGame
        }
      />

      {/* GUEST BLOCKED MODAL */}

      <GuestBlockedModal

        open={
          showGuestBlockedModal
        }

        onClose={() =>

          setShowGuestBlockedModal(
            false
          )
        }
      />
    </div>
  );
}







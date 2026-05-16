'use client';

import {
  AnimatePresence,
  motion
} from 'framer-motion';

import TeamColumn from '../TeamColumn';

import {
  type Team,
  type GameMode
} from './types';

interface Props {
  teams: Team[];

  gameMode: GameMode;

  onAddPoints: (
    teamId: string,
    pts: number
  ) => void;

  onNameChange: (
    teamId: string,
    name: string
  ) => void;
}

export default function TeamsGrid({
  teams,
  gameMode,
  onAddPoints,
  onNameChange
}: Props) {

  return (

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
              onAddPoints(
                team.id,
                pts
              )
            }

            onNameChange={(name) =>
              onNameChange(
                team.id,
                name
              )
            }
          />
        ))}

      </motion.div>

    </AnimatePresence>
  );
}


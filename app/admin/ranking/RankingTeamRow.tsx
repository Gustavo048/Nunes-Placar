'use client';

import { useState, useTransition } from "react";
import ConfirmActionButton from "@/components/admin/ConfirmActionButton";
import {
  deleteRankingTeam,
  resetRankingTeam,
  updateRankingTeam
} from "@/app/actions/admin-ranking";

interface RankingTeamRowProps {

  team: {
    id: string;
    teamName: string;
    gameMode: string;
    victories: number;
    totalPoints: number;
    createdAt: Date;

    user: {
      name: string;
      email: string;
    };
  };
}

export default function RankingTeamRow({
  team
}: RankingTeamRowProps) {

  const [
    isPending,
    startTransition
  ] = useTransition();

  const [
    victories,
    setVictories
  ] = useState(
    team.victories
  );

  const [
    totalPoints,
    setTotalPoints
  ] = useState(
    team.totalPoints
  );

  /* SAVE */

  function handleSave() {

    startTransition(
      async () => {

        await updateRankingTeam(

          team.id,

          {
            victories,
            totalPoints,
          }
        );
      }
    );
  }

  /* RESET */

  function handleReset() {

    startTransition(
      async () => {

        await resetRankingTeam(
          team.id
        );

        setVictories(0);

        setTotalPoints(0);
      }
    );
  }

  return (
    <tr
      className="
        border-b
        border-white/5
        hover:bg-white/2
        transition-all
      "
    >

      {/* TEAM */}

      <td
        className="
          py-5
        "
      >

        <div>
          <p
            className="
              text-white
              font-bold
            "
          >
            {team.teamName}
          </p>
        </div>
      </td>

      {/* OWNER */}

      <td
        className="
          py-5
        "
      >

        <div>
          <p
            className="
              text-white/80
              font-medium
            "
          >
            {team.user.name}
          </p>

          <p
            className="
              text-sm
              text-white/35
            "
          >
            {team.user.email}
          </p>
        </div>
      </td>

      {/* MODE */}

      <td
        className="
          py-5
        "
      >

        <span
          className="
            px-3
            py-1.5
            rounded-full
            bg-cyan-500/10
            text-cyan-300
            text-[10px]
            uppercase
            tracking-[0.2em]
            font-black
          "
        >
          {team.gameMode}
        </span>
      </td>

      {/* VICTORIES */}

      <td
        className="
          py-5
        "
      >

        <input
          type="number"

          value={victories}

          onChange={(e) =>
            setVictories(
              Number(
                e.target.value
              )
            )
          }

          className="
            w-24
            px-3
            py-2
            rounded-xl
            bg-black/30
            border
            border-white/10
            text-white
            outline-none
            focus:border-cyan-500/30
          "
        />
      </td>

      {/* POINTS */}

      <td
        className="
          py-5
        "
      >

        <input
          type="number"

          value={totalPoints}

          onChange={(e) =>
            setTotalPoints(
              Number(
                e.target.value
              )
            )
          }

          className="
            w-28
            px-3
            py-2
            rounded-xl
            bg-black/30
            border
            border-white/10
            text-yellow-300
            font-bold
            outline-none
            focus:border-yellow-500/30
          "
        />
      </td>

      {/* CREATED */}

      <td
        className="
          py-5
          text-sm
          text-white/40
        "
      >
        {new Date(
          team.createdAt
        ).toLocaleDateString(
          "pt-BR"
        )}
      </td>

      {/* ACTIONS */}

      <td
        className="
          py-5
        "
      >

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >

          {/* SAVE BOTTON */}

          <button
            onClick={handleSave}

            disabled={isPending}

            className="
              px-3
              py-2
              rounded-xl
              bg-cyan-500/10
              hover:bg-cyan-500/20
              border
              border-cyan-500/10
              text-cyan-300
              text-[10px]
              uppercase
              tracking-[0.18em]
              font-black
              transition-all
              disabled:opacity-50
            "
          >
            Salvar
          </button>

          {/* RESET BOTTON*/}

          <ConfirmActionButton

            label="Resetar"

            confirmText="
              Deseja resetar esta equipe?
            "

            variant="yellow"

            action={async () => {

              handleReset();

            }}
          />

          {/* DELETE BOTTON*/}

          <ConfirmActionButton

            label="Remover"

            confirmText="
              Deseja remover esta equipe?
            "

            variant="red"

            action={async () => {

              await deleteRankingTeam(
                team.id
              );

            }}
          />
        </div>
      </td>
    </tr>
  );
}
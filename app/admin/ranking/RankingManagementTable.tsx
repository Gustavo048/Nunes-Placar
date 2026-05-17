'use client';

import RankingTeamRow
from "./RankingTeamRow";

interface RankingTeam {

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
}

interface RankingManagementTableProps {

  teams:
    RankingTeam[];
}

export default function RankingManagementTable({
  teams
}: RankingManagementTableProps) {

  return (

    <section
      className="
        rounded-[2rem]
        border
        border-white/10
        bg-white/2.5
        backdrop-blur-2xl
        p-5
        md:p-6
        shadow-[0_0_60px_rgba(0,0,0,0.45)]
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          mb-6
        "
      >

        <div>
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-yellow-300/70
              font-black
              mb-2
            "
          >
            RANKING MANAGEMENT
          </p>

          <h2
            className="
              text-2xl
              font-black
              text-white
            "
          >
            Gerenciamento de Equipes
          </h2>
        </div>
      </div>

      {/* TABLE */}

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full
            min-w-287.5
          "
        >

          <thead>

            <tr
              className="
                border-b
                border-white/10
              "
            >

              {[
                "Equipe",
                "Responsável",
                "Modo",
                "Vitórias",
                "Pontos",
                "Criado em",
                "Ações"
              ].map((head) => (

                <th
                  key={head}

                  className="
                    text-left

                    py-4

                    text-[10px]

                    uppercase

                    tracking-[0.3em]

                    text-white/30

                    font-black
                  "
                >
                  {head}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {teams.map((team) => (

              <RankingTeamRow
                key={team.id}
                team={team}
              />

            ))}

          </tbody>
        </table>
      </div>
    </section>
  );
}
import { getRankingTeams, getRecentMatches } from "@/app/actions/admin-ranking";
import RankingManagementTable from "./RankingManagementTable";

export default async function RankingAdminPage() {

  /* DATA */

   const teams =
    await getRankingTeams();

  const recentMatches =
    await getRecentMatches();

  return (

    <div
      className="
        space-y-8
      "
    >

      {/* HEADER */}

      <section>

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
            border-cyan-500/10
            bg-cyan-500/5
          "
        >

          <div
            className="
              w-2
              h-2
              rounded-full
              bg-cyan-400
            "
          />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-cyan-200/80
              font-black
            "
          >
            RANKING MANAGEMENT
          </span>
        </div>

        <h1
          className="
            text-3xl
            md:text-5xl
            font-black
            text-white
            leading-none
            mb-4
          "
        >
          Gerenciamento de Ranking
        </h1>

        <p
          className="
            text-sm
            md:text-base
            text-white/45
            max-w-2xl
            leading-relaxed
          "
        >
          Gerencie equipes,
          monitore partidas e
          administre o ambiente competitivo.
        </p>

      </section>



      {/* RANKING MANAGEMENT TABLE */}

      <section>

        <RankingManagementTable
          teams={teams}
        />

      </section>

      {/* RECENT MATCHES */}

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
                text-cyan-300/70
                font-black
                mb-2
              "
            >
              RECENT MATCHES
            </p>

            <h2
              className="
                text-2xl
                font-black
                text-white
              "
            >
              Partidas Recentes
            </h2>
          </div>
        </div>

        {/* MATCHES */}

        <div
          className="
            space-y-3
          "
        >

          {recentMatches.map((match) => (

            <div
              key={match.id}

              className="
                rounded-2xl
                border
                border-white/5
                bg-black/20
                p-4
                transition-all
                hover:border-cyan-500/10
              "
            >

              {/* TOP */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  mb-3
                "
              >

                <p
                  className="
                    text-sm
                    text-cyan-300
                    font-black
                  "
                >
                  {match.gameMode}
                </p>

                <p
                  className="
                    text-xs
                    text-white/35
                  "
                >
                  {new Date(
                    match.createdAt
                  ).toLocaleDateString(
                    "pt-BR"
                  )}
                </p>

              </div>

              {/* MATCH */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <div>

                  <p
                    className="
                      text-white
                      font-bold
                    "
                  >
                    {match.teamA}
                  </p>

                  <p
                    className="
                      text-white/35
                      text-sm
                    "
                  >
                    {match.scoreA} pts
                  </p>
                </div>

                <div
                  className="
                    text-white/30
                    text-xs
                    uppercase
                    tracking-[0.25em]
                  "
                >
                  VS
                </div>

                <div
                  className="
                    text-right
                  "
                >

                  <p
                    className="
                      text-white
                      font-bold
                    "
                  >
                    {match.teamB}
                  </p>

                  <p
                    className="
                      text-white/35
                      text-sm
                    "
                  >
                    {match.scoreB} pts
                  </p>
                </div>
              </div>

              {/* WINNER */}

              <div
                className="
                  mt-4
                  text-xs
                  text-green-300
                "
              >
                Winner:
                {" "}
                {match.winner}
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
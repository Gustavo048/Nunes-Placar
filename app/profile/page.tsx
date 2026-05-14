import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {

  /* SESSION */

  const session =
    await auth();

  if (!session?.user?.email) {

    redirect("/login");
  }

  /* USER */

  const user =
    await prisma.user.findUnique({

      where: {
        email: session.user.email,
      },

      include: {
        rankings: true,
      },
    });

  if (!user) {

    redirect("/");
  }

  /* STATS */

  const totalVictories =
    user.rankings.reduce(

      (acc, ranking) =>
        acc + ranking.victories,

      0
    );

  const totalPoints =
    user.rankings.reduce(

      (acc, ranking) =>
        acc + ranking.totalPoints,

      0
    );

  const totalTeams =
    user.rankings.length;

  const bestTeam =
    user.rankings.sort(

      (a, b) =>
        b.victories - a.victories

    )[0];

  return (

    <main
      className="
        min-h-screen

        bg-black

        text-white

        px-4
        py-10
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto

          space-y-8
        "
      >

        {/* HERO */}

        <section
          className="
            bg-white/5

            border
            border-white/10

            rounded-[2.5rem]

            p-8

            backdrop-blur-2xl

            shadow-[0_0_80px_rgba(0,0,0,0.45)]
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row

              lg:items-center

              justify-between

              gap-8
            "
          >

            {/* USER INFO */}

            <div
              className="
                flex
                items-center

                gap-6
              "
            >

              {/* AVATAR */}

              <div
                className="
                  w-24
                  h-24

                  rounded-full

                  bg-yellow-500

                  flex
                  items-center
                  justify-center

                  text-3xl

                  font-black

                  text-black

                  shadow-[0_0_30px_rgba(234,179,8,0.3)]
                "
              >

                {user.nickname?.charAt(0) ||
                  user.name.charAt(0)}

              </div>

              {/* DETAILS */}

              <div>

                <h1
                  className="
                    text-4xl

                    font-black

                    leading-none
                  "
                >

                  {user.nickname ||
                    user.name}

                </h1>

                <p
                  className="
                    text-white/40

                    mt-2
                  "
                >

                  {user.name}

                </p>

                <div
                  className="
                    flex
                    flex-wrap

                    items-center

                    gap-3

                    mt-4
                  "
                >

                  {user.city && (

                    <div
                      className="
                        px-4
                        py-2

                        rounded-2xl

                        bg-white/5

                        border
                        border-white/10

                        text-xs

                        uppercase

                        tracking-widest

                        text-white/60
                      "
                    >

                      {user.city}

                    </div>
                  )}

                  {user.favoriteGame && (

                    <div
                      className="
                        px-4
                        py-2

                        rounded-2xl

                        bg-yellow-500/10

                        border
                        border-yellow-500/20

                        text-xs

                        uppercase

                        tracking-widest

                        text-yellow-400
                      "
                    >

                      {user.favoriteGame}

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* STATUS */}

            <div
              className="
                flex
                items-center

                gap-3

                px-5
                py-4

                rounded-2xl

                bg-emerald-500/10

                border
                border-emerald-500/20
              "
            >

              <div
                className="
                  w-2
                  h-2

                  rounded-full

                  bg-emerald-400

                  animate-pulse
                "
              />

              <span
                className="
                  text-sm

                  uppercase

                  tracking-widest

                  text-emerald-400

                  font-black
                "
              >

                Conta ativa

              </span>

            </div>

          </div>

        </section>

        {/* STATS */}

        <section
          className="
            grid

            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

            gap-6
          "
        >

          {/* CARD */}

          <div
            className="
              bg-white/5

              border
              border-white/10

              rounded-[2rem]

              p-6

              backdrop-blur-xl
            "
          >

            <p
              className="
                text-white/40

                text-xs

                uppercase

                tracking-widest

                mb-3
              "
            >
              Vitórias
            </p>

            <h2
              className="
                text-5xl

                font-black
              "
            >

              {totalVictories}

            </h2>

          </div>

          {/* CARD */}

          <div
            className="
              bg-white/5

              border
              border-white/10

              rounded-[2rem]

              p-6

              backdrop-blur-xl
            "
          >

            <p
              className="
                text-white/40

                text-xs

                uppercase

                tracking-widest

                mb-3
              "
            >
              Pontos Totais
            </p>

            <h2
              className="
                text-5xl

                font-black
              "
            >

              {totalPoints}

            </h2>

          </div>

          {/* CARD */}

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-[2rem]
              p-6
              backdrop-blur-xl
            "
          >

            <p
              className="
                text-white/40
                text-xs
                uppercase
                tracking-widest

                mb-3
              "
            >
              Equipes
            </p>

            <h2
              className="
                text-5xl
                font-black
              "
            >

              {totalTeams}

            </h2>

          </div>

          {/* CARD */}

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-[2rem]
              p-6
              backdrop-blur-xl
            "
          >

            <p
              className="
                text-white/40
                text-xs
                uppercase
                tracking-widest
                mb-3
              "
            >
              Melhor Equipe
            </p>

            <h2
              className="
                text-2xl
                font-black
                leading-tight
              "
            >

              {bestTeam?.teamName || "--"}

            </h2>

          </div>

        </section>

      </div>

    </main>
  );
}

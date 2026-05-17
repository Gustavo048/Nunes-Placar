interface AdminStatsProps {

  metrics: {

    users: {
      total: number;
      approved: number;
      pending: number;
      blocked: number;
      admins: number;
    };

    activity: {
      online: number;
      recentLogins: number;
    };

    ranking: {
      teams: number;
      matches: number;
    };
  };
}

export default function AdminStats({
  metrics
}: AdminStatsProps) {

  const cards = [

    {
      label: "Usuários",
      value: metrics.users.total,
      accent: "text-white",
      glow: "bg-white/10",
    },

    {
      label: "Aprovados",
      value: metrics.users.approved,
      accent: "text-green-400",
      glow: "bg-green-500/10",
    },

    {
      label: "Pendentes",
      value: metrics.users.pending,
      accent: "text-yellow-300",
      glow: "bg-yellow-500/10",
    },

    {
      label: "Bloqueados",
      value: metrics.users.blocked,
      accent: "text-red-400",
      glow: "bg-red-500/10",
    },

    {
      label: "Admins",
      value: metrics.users.admins,
      accent: "text-blue-400",
      glow: "bg-blue-500/10",
    },

    {
      label: "Online",
      value: metrics.activity.online,
      accent: "text-emerald-400",
      glow: "bg-emerald-500/10",
    },

    {
      label: "Logins 24h",
      value: metrics.activity.recentLogins,
      accent: "text-purple-400",
      glow: "bg-purple-500/10",
    },

    {
      label: "Equipes",
      value: metrics.ranking.teams,
      accent: "text-cyan-400",
      glow: "bg-cyan-500/10",
    },

    {
      label: "Partidas",
      value: metrics.ranking.matches,
      accent: "text-orange-300",
      glow: "bg-orange-500/10",
    },
  ];

  return (

    <section
      className="
        mb-10
      "
    >

      {/* TITLE */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          mb-5
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
            SYSTEM OVERVIEW
          </p>

          <h2
            className="
              text-2xl
              md:text-3xl
              font-black
              text-white
            "
          >
            Métricas Operacionais
          </h2>
        </div>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          xl:grid-cols-5
          gap-4
        "
      >

        {cards.map((card) => (

          <div
            key={card.label}

            className="
              relative
              overflow-hidden
              rounded-[1.8rem]
              border
              border-white/10
              bg-white/3
              backdrop-blur-2xl
              px-4
              py-3
              shadow-none
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-yellow-500/20
              hover:bg-white/4.5
            "
          >

            {/* GLOW */}

            <div
              className={`
                absolute
                top-0
                right-0
                w-28
                h-28
                rounded-full
                blur-3xl

                ${card.glow}
              `}
            />

            {/* TOP BAR */}

            <div
              className="
                relative
                flex
                items-center
                justify-between
                mb-5
              "
            >

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.28em]
                  text-white/35
                  font-black
                "
              >
                {card.label}
              </p>

              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-white/20
                "
              />
            </div>

          {/* VALUE */}

          <div
            className="
              relative
              flex
              items-center
              justify-center
              flex-1
            "
          >

            <h2
              className={`
                text-2xl
                md:text-4xl
                font-black
                tracking-tight

                ${card.accent}
              `}
            >
              {card.value}
            </h2>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}



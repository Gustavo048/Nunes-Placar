interface LiveSystemStatusProps {

  status: {

    onlineUsers: number;
    activeAdmins: number;
    recentMatches: number;
    recentApprovals: number;
    blockedUsers: number;
  };
}

export default function LiveSystemStatus({
  status
}: LiveSystemStatusProps) {

  const cards = [

    {
      label: "Usuários Online",
      value:
        status.onlineUsers,
      accent:
        "text-emerald-300",
      glow:
        "bg-emerald-500/10",
      border:
        "border-emerald-500/10",
    },

    {
      label: "Admins Ativos",
      value:
        status.activeAdmins,
      accent:
        "text-cyan-300",
      glow:
        "bg-cyan-500/10",
      border:
        "border-cyan-500/10",
    },

    {
      label: "Partidas (1h)",
      value:
        status.recentMatches,
      accent:
        "text-yellow-300",
      glow:
        "bg-yellow-500/10",
      border:
        "border-yellow-500/10",
    },

    {
      label: "Aprovações (24h)",
      value:
        status.recentApprovals,
      accent:
        "text-blue-300",
      glow:
        "bg-blue-500/10",
      border:
        "border-blue-500/10",
    },

    {
      label: "Bloqueados",
      value:
        status.blockedUsers,
      accent:
        "text-red-300",
      glow:
        "bg-red-500/10",
      border:
        "border-red-500/10",
    },
  ];

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
          mb-6
        "
      >

        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-emerald-300/70
            font-black
            mb-2
          "
        >
          LIVE OPERATIONS
        </p>

        <h2
          className="
            text-2xl
            font-black
            text-white
          "
        >
          Status Operacional
        </h2>

      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-4
        "
      >

        {cards.map((card) => (

          <div
            key={card.label}

            className={`
              relative
              overflow-hidden
              rounded-[1.7rem]
              border
              bg-black/20
              backdrop-blur-xl
              px-4
              py-3
              transition-all

              ${card.border}
            `}
          >

            {/* GLOW */}

            <div
              className={`
                absolute
                top-0
                right-0
                w-24
                h-24
                rounded-full
                blur-3xl

                ${card.glow}
              `}
            />

            {/* LABEL */}

            <p
              className="
                relative
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/35
                font-black
                mb-4
              "
            >
              {card.label}
            </p>

            {/* VALUE */}

            <h2
              className={`
                relative
                flex
                items-center
                justify-center
                flex-1
                text-4xl
                font-black

                ${card.accent}
              `}
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
interface Log {

  id: string;
  action: string;
  targetId: string | null;
  createdAt: string | Date;
}

interface RecentActivityProps {

  logs:
    ReadonlyArray<Log>;
}

function getActionLabel(
  action: string
) {

  switch (action) {

    case "APPROVE_USER":
      return "Usuário aprovado";

    case "REJECT_USER":
      return "Usuário rejeitado";

    case "BLOCK_USER":
      return "Usuário bloqueado";

    case "UNBLOCK_USER":
      return "Usuário desbloqueado";

    case "PROMOTE_ADMIN":
      return "Usuário promovido para ADMIN";

    case "DELETE_RANKING_TEAM":
      return "Equipe removida";

    case "RESET_RANKING_TEAM":
      return "Ranking resetado";

    default:
      return action;
  }
}

function getActionColor(
  action: string
) {

  switch (action) {

    case "APPROVE_USER":
      return "bg-green-400";

    case "REJECT_USER":
      return "bg-red-400";

    case "BLOCK_USER":
      return "bg-red-500";

    case "UNBLOCK_USER":
      return "bg-emerald-400";

    case "PROMOTE_ADMIN":
      return "bg-blue-400";

    case "DELETE_RANKING_TEAM":
      return "bg-red-400";

    case "RESET_RANKING_TEAM":
      return "bg-yellow-400";

    default:
      return "bg-yellow-400";
  }
}

export default function RecentActivity({
  logs
}: RecentActivityProps) {

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
      "
    >

      {/* HEADER */}

      <div
        className="
          mb-5
        "
      >

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
          SYSTEM ACTIVITY
        </p>

        <h2
          className="
            text-xl
            font-black
            text-white
          "
        >
          Atividade Recente
        </h2>
      </div>

      {/* EMPTY */}

      {logs.length === 0 && (

        <div
          className="
            rounded-xl
            border
            border-white/5
            bg-black/20
            p-8
            text-center
          "
        >

          <p
            className="
              text-sm
              text-white/35
            "
          >
            Nenhuma atividade recente.
          </p>
        </div>
      )}

      {/* LOGS */}

      <div
        className="
          space-y-2
          border-l
          border-white/5
          pl-4
        "
      >

        {logs.map((log) => (

          <div
            key={log.id}

            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              border-white/5
              bg-black/20
              px-4
              py-3
              transition-all
              hover:border-yellow-500/10
            "
          >

            {/* LEFT */}

            <div
              className="
                flex
                items-center
                gap-3
                min-w-0
              "
            >

              <div
                className={`
                  w-2.5
                  h-2.5
                  rounded-full
                  shrink-0

                  ${getActionColor(
                    log.action
                  )}
                `}
              />

              <div
                className="
                  min-w-0
                "
              >

                <p
                  className="
                    text-sm
                    text-white
                    font-bold
                  "
                >
                  {getActionLabel(
                    log.action
                  )}
                </p>

                <p
                  className="
                    text-xs
                    text-white/35
                    truncate
                  "
                >
                  Target:
                  {" "}
                  {log.targetId || "--"}
                </p>
              </div>
            </div>

            {/* DATE */}

            <div
              className="
                shrink-0
                text-right
              "
            >

              <p
                className="
                  text-[11px]
                  text-white/30
                "
              >
                {new Date(
                  log.createdAt
                ).toLocaleString(
                  "pt-BR"
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


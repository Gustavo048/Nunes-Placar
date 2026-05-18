interface AdminLogItem {

  id: string;
  action: string;
  description: string | null;
  targetId: string | null;
  createdAt: Date;
}

interface AdminLogsTableProps {

  logs:
    AdminLogItem[];
}

function getActionStyles(
  action: string
) {

  if (
    action.includes("DELETE")
  ) {

    return {
      badge:
        "bg-red-500/10 text-red-300",

      dot:
        "bg-red-400",
    };
  }

  if (
    action.includes("RESET")
  ) {

    return {
      badge:
        "bg-yellow-500/10 text-yellow-300",

      dot:
        "bg-yellow-400",
    };
  }

  if (
    action.includes("BLOCK")
  ) {

    return {
      badge:
        "bg-orange-500/10 text-orange-300",

      dot:
        "bg-orange-400",
    };
  }

  if (
    action.includes("UPDATE")
  ) {

    return {
      badge:
        "bg-cyan-500/10 text-cyan-300",

      dot:
        "bg-cyan-400",
    };
  }

  return {
    badge:
      "bg-emerald-500/10 text-emerald-300",

    dot:
      "bg-emerald-400",
  };
}

export default function AdminLogsTable({
  logs
}: AdminLogsTableProps) {

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
          <h2
            className="
              text-2xl
              font-black
              text-white
            "
          >
            Atualizações
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
            min-w-250
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
                "Evento",
                "Descrição",
                "Target",
                "Data",
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

            {logs.map((log) => {

              const styles =
                getActionStyles(
                  log.action
                );

              return (
                <tr
                  key={log.id}

                  className="
                    border-b
                    border-white/5
                    hover:bg-white/2
                    transition-all
                  "
                >

                  {/* ACTION */}

                  <td
                    className="
                      py-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className={`
                          w-2.5
                          h-2.5
                          rounded-full

                          ${styles.dot}
                        `}
                      />

                      <span
                        className={`
                          px-3
                          py-1.5
                          rounded-full
                          text-[10px]
                          uppercase
                          tracking-[0.2em]
                          font-black

                          ${styles.badge}
                        `}
                      >
                        {log.action}
                      </span>
                    </div>
                  </td>

                  {/* DESCRIPTION */}

                  <td
                    className="
                      py-5
                      text-white/75
                    "
                  >
                    {log.description || "--"}
                  </td>

                  {/* TARGET */}

                  <td
                    className="
                      py-5
                      text-white/40
                      text-sm
                    "
                  >
                    {log.targetId || "--"}
                  </td>

                  {/* DATE */}

                  <td
                    className="
                      py-5
                      text-white/40
                      text-sm
                    "
                  >
                    {new Date(
                      log.createdAt
                    ).toLocaleString(
                      "pt-BR"
                    )}
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </section>
  );
}
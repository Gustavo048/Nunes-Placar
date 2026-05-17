import Link from "next/link";

interface QuickAction {

  title: string;
  description: string;
  href: string;
  badge: string;
  accent: string;
}

interface QuickActionsProps {

  pendingUsers: number;
  blockedUsers: number;
  criticalLogs: number;
}

export default function QuickActions({
  pendingUsers,
  blockedUsers,
  criticalLogs,
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      title: "Usuários Pendentes",

      description: `${pendingUsers} aguardando aprovação`,

      href: "/admin/users",

      badge: "REVIEW",

      accent: "yellow",
    },

    {
      title: "Usuários Bloqueados",

      description: `${blockedUsers} bloqueados no sistema`,

      href: "/admin/users",

      badge: "SECURITY",

      accent: "red",
    },

    {
      title: "Logs Críticos",

      description: `${criticalLogs} ações críticas recentes`,

      href: "/admin/logs",

      badge: "AUDIT",

      accent: "cyan",
    },

    {
      title: "Gerenciar Ranking",

      description: "Editar equipes e pontuações",

      href: "/admin/ranking",

      badge: "RANKING",

      accent: "emerald",
    },
  ];

  function getAccentStyles(accent: string) {
    switch (accent) {
      case "yellow":
        return {
          border: "border-yellow-500/10",

          glow: "bg-yellow-500/10",

          text: "text-yellow-300",

          badge: "bg-yellow-500/10 text-yellow-300",
        };

      case "red":
        return {
          border: "border-red-500/10",

          glow: "bg-red-500/10",

          text: "text-red-300",

          badge: "bg-red-500/10 text-red-300",
        };

      case "cyan":
        return {
          border: "border-cyan-500/10",

          glow: "bg-cyan-500/10",

          text: "text-cyan-300",

          badge: "bg-cyan-500/10 text-cyan-300",
        };

      default:
        return {
          border: "border-emerald-500/10",

          glow: "bg-emerald-500/10",

          text: "text-emerald-300",

          badge: "bg-emerald-500/10 text-emerald-300",
        };
    }
  }

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
          mb-6
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
          QUICK ACTIONS
        </p>

        <h2
          className="
            text-2xl
            font-black
            text-white
          "
        >
          Central Operacional
        </h2>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >
        {actions.map((action) => {
          const styles = getAccentStyles(action.accent);

          return (
            <Link
              key={action.title}
              href={action.href}
              className={`
                relative
                overflow-hidden
                rounded-[1.7rem]
                border
                bg-black/20
                p-5
                transition-all
                hover:bg-black/30

                ${styles.border}
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

                  ${styles.glow}
                `}
              />

              {/* BADGE */}

              <div
                className={`
                  relative
                  inline-flex
                  items-center
                  px-3
                  py-1.5
                  rounded-full
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  font-black
                  mb-4

                  ${styles.badge}
                `}
              >
                {action.badge}
              </div>

              {/* TITLE */}

              <h3
                className="
                  relative
                  text-lg
                  font-black
                  text-white
                  mb-3
                "
              >
                {action.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                  relative
                  text-sm
                  text-white/45
                  leading-relaxed
                "
              >
                {action.description}
              </p>

              {/* CTA */}

              <div
                className={`
                  relative
                  mt-5
                  text-sm
                  font-bold

                  ${styles.text}
                `}
              >
                Abrir →
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

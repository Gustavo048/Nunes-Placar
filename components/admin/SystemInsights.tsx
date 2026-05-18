interface Insight {

  type:
    | "success"
    | "warning"
    | "danger"
    | "info";

  title: string;

  description: string;
}

interface SystemInsightsProps {
  insights: ReadonlyArray<Insight>;
}

function getStyles(
  type: Insight["type"]
) {

  switch (type) {

    case "success":
      return {

        border:
          "border-green-500/15",

        glow:
          "bg-green-500/10",

        badge:
          "bg-green-500/10 text-green-300",
      };

    case "warning":
      return {

        border:
          "border-yellow-500/15",

        glow:
          "bg-yellow-500/10",

        badge:
          "bg-yellow-500/10 text-yellow-300",
      };

    case "danger":
      return {

        border:
          "border-red-500/15",

        glow:
          "bg-red-500/10",

        badge:
          "bg-red-500/10 text-red-300",
      };

    default:
      return {

        border:
          "border-blue-500/15",

        glow:
          "bg-blue-500/10",

        badge:
          "bg-blue-500/10 text-blue-300",
      };
  }
}

export default function SystemInsights({
  insights
}: SystemInsightsProps) {

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
            text-yellow-300/70
            font-black
            mb-2
          "
        >
          SYSTEM INSIGHTS
        </p>

        <h2
          className="
            text-2xl
            font-black
            text-white
          "
        >
          Insights do Sistema
        </h2>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-4
        "
      >

        {insights.map((
          insight,
          index
        ) => {

          const styles =
            getStyles(
              insight.type
            );

          return (
            <div
              key={index}

              className={`
                relative
                overflow-hidden
                rounded-[1.7rem]
                border
                bg-black/20
                backdrop-blur-xl
                p-5
                transition-all

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
                {insight.type}
              </div>

              {/* TITLE */}

              <h3
                className="
                  relative
                  text-lg
                  md:text-xl
                  font-black
                  text-white
                  mb-3
                "
              >
                {insight.title}
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
                {insight.description}
              </p>
            </div>
          );
        })}

      </div>
    </section>
  );
}
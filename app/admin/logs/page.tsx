import { getAdminLogs } from "@/app/actions/admin-logs";
import AdminLogsTable from "./AdminLogsTable";

export default async function AdminLogsPage() {

  /* LOGS */

  const logs =
    await getAdminLogs();

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
            border-yellow-500/10
            bg-yellow-500/5
          "
        >

          <div
            className="
              w-2
              h-2
              rounded-full
              bg-yellow-400
            "
          />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-yellow-200/80
              font-black
            "
          >
            AUDIT CENTER
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
          Logs Administrativos
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
          Monitore ações críticas,
          alterações administrativas e
          operações do sistema em tempo real.
        </p>
      </section>

      {/* LOGS TABLE */}

      <section>

        <AdminLogsTable
          logs={logs}
        />
      </section>
    </div>
  );
}
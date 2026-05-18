import { getAdminLogs } from "@/app/actions/admin-logs";
import AdminLogsTable from "./AdminLogsTable";

export default async function AdminLogsPage() {

  /* LOGS */

  const logs = await getAdminLogs();

  return (
    <div
      className="
        space-y-8
      "
    >

      {/* HEADER */}

      <section>      
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
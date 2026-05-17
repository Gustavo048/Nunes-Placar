import AdminStats from "@/components/admin/AdminStats";
import RecentActivity from "@/components/admin/RecentActivity";
import SystemInsights from "@/components/admin/SystemInsights";
import QuickActions from "@/components/admin/QuickActions";
import {
  getAdminMetrics,
  getRecentAdminLogs,
  getSystemInsights
} from "../actions/admin-metrics";

export default async function AdminPage() {

  /* FETCH METRICS */

  const metricsResult = await getAdminMetrics();

  const metrics = metricsResult.metrics;

  const pendingUsers = metrics?.users.pending || 0;

  const blockedUsers = metrics?.users.blocked || 0;

  /* FETCH LOGS */

  const logs = await getRecentAdminLogs();

  const criticalLogs = logs.filter((log) =>

      log.action.includes(
        "DELETE"
      ) ||

      log.action.includes(
        "BLOCK"
      ) ||

      log.action.includes(
        "RESET"
      )
    ).length;

  /* FETCH INSIGHTS */

  const insights = await getSystemInsights();

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
            ADMIN PANEL
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
          Painel Administrativo
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
          Gerencie solicitações de acesso,
          aprove usuários do ranking e
          acompanhe toda operação do sistema.
        </p>

      </section>

      {/* METRICS */}

      {metrics && (

        <section>

          <AdminStats
            metrics={metrics}
          />

        </section>
      )}

      {/* QUICK ACTIONS */}

      <section>

        <QuickActions

          pendingUsers={
            pendingUsers
          }

          blockedUsers={
            blockedUsers
          }

          criticalLogs={
            criticalLogs
          }
        />

      </section>

      {/* SYSTEM INSIGHTS */}

      <section>

        <SystemInsights
          insights={insights}
        />

      </section>

      {/* RECENT ACTIVITY */}

      <section>

        <RecentActivity
          logs={logs}
        />

      </section>

    </div>
  );
}








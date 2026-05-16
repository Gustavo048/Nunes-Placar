import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getPendingUsers, approveUser, rejectUser } from "../actions/admin";

export default async function AdminPage() {
  // =============================
  // VALIDA SESSÃO
  // =============================

  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // =============================
  // VALIDA ADMIN
  // =============================

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  // =============================
  // BUSCA USUÁRIOS PENDENTES
  // =============================

  const users = await getPendingUsers();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-4xl font-black mb-3">Painel Administrativo</h1>

          <p className="text-white/40">Aprovação de usuários do ranking</p>
        </div>

        {/* LISTA */}

        <div className="space-y-4">
          {users.length === 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
              <p className="text-white/40">Nenhum usuário pendente.</p>
            </div>
          )}

          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-xl font-bold">{user.name}</p>

                <p className="text-white/40 text-sm">{user.email}</p>
              </div>

              {/* BOTÕES */}

              <div className="flex gap-3">
                {/* APROVAR */}

                <form
                  action={async () => {
                    "use server";

                    await approveUser(user.id);
                  }}
                >
                  <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-xl font-bold transition">
                    Aprovar
                  </button>
                </form>

                {/* REJEITAR */}

                <form
                  action={async () => {
                    "use server";

                    await rejectUser(user.id);
                  }}
                >
                  <button className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl font-bold transition">
                    Rejeitar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

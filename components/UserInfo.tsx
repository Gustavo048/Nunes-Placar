'use client';

import { signOut, useSession } from "next-auth/react";

export default function UserInfo() {

  const { data: session } = useSession();
  

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">

        <a
          href="/login"
          className="text-sm text-white/70 hover:text-white transition"
        >
          Login
        </a>

        <a
          href="/register"
          className="text-sm bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold"
        >
          Registrar
        </a>

      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">

      <div className="text-right">

        <p className="text-sm text-white font-semibold">
          {session.user.name}
        </p>

        <p className="text-xs text-white/40">
          {session.user.status === "PENDING"
            ? "Aguardando aprovação"
            : "Conta aprovada"}
        </p>

      </div>

      <button
        onClick={() => signOut()}
        className="text-sm bg-red-500 text-white px-4 py-2 rounded-xl"
      >
        Sair
      </button>

    </div>
  );
}
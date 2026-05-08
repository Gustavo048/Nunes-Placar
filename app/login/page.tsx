'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleLogin() {

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      return;
    }

    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/10">

        <h1 className="text-3xl font-bold mb-8">
          Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-white/10"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-white/10"
          />

          <button
            onClick={handleLogin}
            className="w-full p-4 bg-green-500 text-black rounded-xl font-bold"
          >
            Entrar
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}
"use client";

import { signIn } from "next-auth/react";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  /*
  ============================================
  STATES
  ============================================
  */

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  /*
  ============================================
  LOGIN
  ============================================
  */

  async function handleLogin() {
    try {
      setLoading(true);

      setError("");

      const result = await signIn("credentials", {
        email,

        password,

        redirect: false,
      });

      /*
      ============================================
      ERRO LOGIN
      ============================================
      */

      if (result?.error) {
        setError("Email ou senha inválidos");

        return;
      }

      /*
      ============================================
      SUCCESS
      ============================================
      */

      router.push("/");
    } catch (error) {
      console.error(error);

      setError("Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen

        flex
        items-center
        justify-center

        bg-black

        text-white

        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md

          bg-white/5

          p-8

          rounded-3xl

          border
          border-white/10

          backdrop-blur-xl
        "
      >
        {/* ============================================
            TITLE
        ============================================ */}

        <h1
          className="
            text-4xl
            font-black

            mb-8
          "
        >
          Login
        </h1>

        {/* ============================================
            FORM
        ============================================ */}

        <div className="space-y-4">
          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="
              w-full

              p-4

              rounded-2xl

              bg-black/40

              border
              border-white/10

              outline-none

              focus:border-yellow-500

              transition-all
            "
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="
              w-full

              p-4

              rounded-2xl

              bg-black/40

              border
              border-white/10

              outline-none

              focus:border-yellow-500

              transition-all
            "
          />

          {/* LOGIN BUTTON */}

          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="
              w-full

              p-4

              bg-green-500

              hover:bg-green-400

              disabled:opacity-50

              text-black

              rounded-2xl

              font-black

              transition-all
            "
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* ============================================
              FORGOT PASSWORD
          ============================================ */}

          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/forgot-password")}
              className="
                text-sm
                text-gray-400

                hover:text-yellow-500

                transition-colors
              "
            >
              Esqueceu sua senha?
            </button>
          </div>

          {/* ============================================
              ERROR
          ============================================ */}

          {error && (
            <p
              className="
                text-red-400
                text-sm
                text-center
              "
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

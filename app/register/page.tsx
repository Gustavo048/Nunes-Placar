'use client';

import { useState } from "react";
import { registerUser }
from "../actions/auth";
import { useRouter }
from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister() {

    try {

      /* RESET MESSAGE */

      setMessage("");

      /* LOADING */

      setLoading(true);

      const result =
        await registerUser({

          name,
          email,
          password,
        });

      /* ERRO */

      if (!result.success) {

        setMessage(
          result.message
        );

        return;
      }

      /* SUCCESS */

      alert(
        "Solicitação enviada com sucesso! Aguarde aprovação do administrador."
      );

      /* LIMPA FORM */

      setName("");
      setEmail("");
      setPassword("");

      /* REDIRECIONA */

      router.push("/");

    } catch (error) {

      console.error(error);

      setMessage(
        "Erro interno ao registrar"
      );

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

        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md

          bg-white/5

          backdrop-blur-2xl

          p-8

          rounded-3xl

          border
          border-white/10

          shadow-[0_0_50px_rgba(0,0,0,0.45)]
        "
      >

        {/* TITLE */}

        <h1
          className="
            text-3xl
            font-black

            mb-2
          "
        >
          Criar Conta
        </h1>

        <p
          className="
            text-sm

            text-white/40

            mb-8
          "
        >
          Solicite acesso ao sistema Nunes Placar
        </p>

        {/* FORM */}

        <form
          onSubmit={(e) => {

            e.preventDefault();

            if (!loading) {
              handleRegister();
            }
          }}

          className="space-y-4"
        >

          {/* NOME */}

          <input
            type="text"

            placeholder="Nome"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            disabled={loading}

            className="
              w-full

              p-4

              rounded-xl

              bg-black/60

              border
              border-white/10

              outline-none

              focus:border-yellow-500/50

              transition-all
            "
          />

          {/* EMAIL */}

          <input
            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            disabled={loading}

            className="
              w-full

              p-4

              rounded-xl

              bg-black/60

              border
              border-white/10

              outline-none

              focus:border-yellow-500/50

              transition-all
            "
          />

          {/* PASSWORD */}

          <input
            type="password"

            placeholder="Senha"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            disabled={loading}

            className="
              w-full

              p-4

              rounded-xl

              bg-black/60

              border
              border-white/10

              outline-none

              focus:border-yellow-500/50

              transition-all
            "
          />

          {/* BUTTON */}

          <button

            type="submit"

            disabled={loading}

            className="
              w-full

              p-4

              bg-yellow-500
              hover:bg-yellow-400

              disabled:opacity-50
              disabled:cursor-not-allowed

              text-black

              rounded-xl

              font-black

              transition-all

              shadow-[0_0_25px_rgba(234,179,8,0.25)]
            "
          >

            {loading
              ? "Registrando..."
              : "Registrar"}

          </button>

          {/* MESSAGE */}

          {message && (

            <div
              className="
                p-4

                rounded-xl

                bg-red-500/10

                border
                border-red-500/20
              "
            >

              <p
                className="
                  text-sm
                  text-center

                  text-red-300
                "
              >
                {message}
              </p>

            </div>
          )}

        </form>

      </div>

    </div>
  );
}



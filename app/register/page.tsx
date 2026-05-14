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

      setMessage("");

      setLoading(true);

      const result =
        await registerUser({

          name,
          email,
          password,
        });

      if (!result.success) {
        setMessage(
          result.message
        );
        return;
      }

      alert(
        "Solicitação enviada com sucesso! Aguarde aprovação do administrador."
      );

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
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-8
          "
        >
          Criar Conta
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }

            className="
              w-full
              p-4
              rounded-xl
              bg-black
              border
              border-white/10
            "
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="
              w-full
              p-4
              rounded-xl
              bg-black
              border
              border-white/10
            "
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-black
              border
              border-white/10
            "
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="
              w-full
              p-4
              bg-yellow-500
              disabled:opacity-50
              text-black
              rounded-xl
              font-bold
              transition-all
            "
          >

            {loading
              ? "Registrando..."
              : "Registrar"}
          </button>

          {message && (

            <p
              className="
                text-sm
                text-center
                text-white/70
              "
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
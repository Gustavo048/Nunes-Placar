'use client';

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";

import { resetPassword } from "@/app/actions/reset-password";


export default function ResetPasswordForm() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const token =
    searchParams.get("token");


  const [password, setPassword] =
    useState("");

  const [confirmPassword,
      setConfirmPassword
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleReset() {

    try {

      setError("");


      if (password.length < 6) {

        setError(
          "Senha deve possuir ao menos 6 caracteres"
        );

        return;
      }


      if (password !== confirmPassword) {

        setError(
          "As senhas não coincidem"
        );

        return;
      }


      if (!token) {

        setError(
          "Token inválido"
        );

        return;
      }


      setLoading(true);


      const result = await resetPassword(
        token,
        password
      );


      if (!result.success) {

        setError(
          result.message || "Erro"
        );

        return;
      }


      alert(
        "Senha redefinida com sucesso!"
      );

      router.push("/login");

    } catch (error) {

      console.error(error);

      setError(
        "Erro ao redefinir senha"
      );

    } finally {

      setLoading(false);
    }
  }


  return (

    <div
      className="
        w-full
        max-w-md

        bg-white/5

        border
        border-white/10

        rounded-3xl

        p-8

        backdrop-blur-xl
      "
    >

      <h1
        className="
          text-4xl
          font-black
          text-white

          mb-8
        "
      >
        Nova senha
      </h1>


      <input

        type="password"

        placeholder="Nova senha"

        value={password}

        onChange={(e) =>
          setPassword(e.target.value)
        }

        className="
          w-full

          p-4

          rounded-2xl

          bg-black/40

          border
          border-white/10

          text-white

          outline-none

          focus:border-yellow-500

          transition-all

          mb-4
        "
      />


      <input

        type="password"

        placeholder="Confirmar senha"

        value={confirmPassword}

        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }

        className="
          w-full

          p-4

          rounded-2xl

          bg-black/40

          border
          border-white/10

          text-white

          outline-none

          focus:border-yellow-500

          transition-all

          mb-6
        "
      />


      <button

        onClick={handleReset}

        disabled={
          loading ||
          !password ||
          !confirmPassword
        }

        className="
          w-full

          bg-yellow-500

          hover:bg-yellow-400

          disabled:opacity-50

          text-black

          font-black

          py-4

          rounded-2xl

          transition-all
        "
      >

        {loading
          ? "Redefinindo..."
          : "Salvar nova senha"}
      </button>


      {error && (

        <p
          className="
            text-red-400

            text-sm

            text-center

            mt-4
          "
        >
          {error}
        </p>
      )}

    </div>
  );
}
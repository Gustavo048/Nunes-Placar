'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/app/actions/forgot-password";
import { toast } from "sonner"


export default function ForgotPasswordPage() {
  const router = useRouter();

  /* STATES */

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  /* SUBMIT */

  async function handleSubmit() {

    try {
      setLoading(true);
      const result = await forgotPassword(email);
      if (!result.success) {
        alert(result.message);
        return;
      }

      /* SEGURANÇA - NÃO revela existência da conta */

      toast(
        "Se existir uma conta vinculada a este email, enviaremos instruções para redefinição de senha."      );

      router.push("/login");
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao solicitar redefinição de senha."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-black
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        {/* HEADER */}

        <h1
          className="
            text-4xl
            font-black
            text-white

            mb-8
          "
        >
          Recuperar Senha
        </h1>


        {/* INPUT EMAIL */}

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)}

          className="
            w-full
            bg-black/40
            border
            border-white/10
            rounded-2xl
            p-5
            text-white
            outline-none
            focus:border-yellow-500
            transition-all
            mb-6
          "
        />


        {/*  BOTÃO */}

        <button
          onClick={handleSubmit}
          disabled={loading || !email}
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
            ? "Enviando..."
            : "Enviar link"}
        </button>

        {/* LINK LOGIN */}

        <div className="mt-6 text-center">

          <button

            onClick={() =>
              router.push("/login")
            }

            className="
              text-sm
              text-gray-400

              hover:text-yellow-500

              transition-colors
            "
          >
            Voltar para login
          </button>
        </div>
      </div>
    </main>
  );
}
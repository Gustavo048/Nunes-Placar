'use client';

import { useState } from "react";
import { registerUser } from "../actions/auth";
import { useRouter } from "next/navigation";
import StateCitySelect from "@/components/StateCitySelect";

export default function RegisterPage() {

  const router = useRouter();

  /* STATES */

  const [state, setState] =
    useState("");

  const [name, setName] =
    useState("");

  const [nickname, setNickname] =
    useState("");

  const [city, setCity] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* REGISTER */

  async function handleRegister() {

    try {

      setMessage("");

      /* VALIDATION */

      if (!state || !city) {

        setMessage(
          "Selecione estado e cidade"
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {

        setMessage(
          "As senhas não coincidem"
        );

        return;
      }

      setLoading(true);

      const result =
        await registerUser({

          name,
          nickname,
          city,
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

      /* RESET FORM */

      setName("");
      setNickname("");
      setState("");
      setCity("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      /* REDIRECT */

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
        py-10
      "
    >

      <div
        className="
          w-full
          max-w-xl
          bg-white/5
          backdrop-blur-2xl
          p-6
          md:p-8
          rounded-[2rem]
          border
          border-white/10
          shadow-[0_0_60px_rgba(0,0,0,0.45)]
        "
      >

        {/* HEADER */}

        <div className="mb-8">

          <h1
            className="
              text-3xl
              md:text-4xl
              font-black
              mb-3
            "
          >
            Criar Conta
          </h1>

          <p
            className="
              text-sm
              md:text-base
              text-white/40
              leading-relaxed
            "
          >
            Entre para o ranking oficial do
            Nunes Placar e acompanhe suas
            estatísticas em tempo real.
          </p>

        </div>

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

            placeholder="Nome completo"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            disabled={loading}

            className="
              w-full
              p-4
              rounded-2xl
              bg-black/60
              border
              border-white/10
              outline-none
              focus:border-yellow-500/50
              transition-all
            "
          />

          {/* NICKNAME */}

          <input
            type="text"

            placeholder="Apelido / Equipe"

            value={nickname}

            onChange={(e) =>
              setNickname(e.target.value)
            }

            disabled={loading}

            className="
              w-full
              p-4
              rounded-2xl
              bg-black/60
              border
              border-white/10
              outline-none
              focus:border-yellow-500/50
              transition-all
            "
          />

          {/* STATE + CITY */}

          <StateCitySelect

            selectedState={state}

            selectedCity={city}

            onStateChange={setState}

            onCityChange={setCity}
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
              rounded-2xl
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
              rounded-2xl
              bg-black/60
              border
              border-white/10
              outline-none
              focus:border-yellow-500/50
              transition-all
            "
          />

          {/* CONFIRM PASSWORD */}

          <input
            type="password"

            placeholder="Confirmar senha"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }

            disabled={loading}

            className="
              w-full
              p-4
              rounded-2xl
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
              mt-2
              bg-yellow-500
              hover:bg-yellow-400
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-black
              rounded-2xl
              font-black
              transition-all
              shadow-[0_0_25px_rgba(234,179,8,0.25)]
            "
          >

            {loading
              ? "Registrando..."
              : "Solicitar acesso"}

          </button>

          {/* MESSAGE */}

          {message && (

            <div
              className="
                p-4
                rounded-2xl
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


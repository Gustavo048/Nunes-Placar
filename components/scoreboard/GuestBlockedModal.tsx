'use client';

import Link from 'next/link';

interface Props {

  open: boolean;

  onClose: () => void;
}

export default function GuestBlockedModal({
  open,
  onClose
}: Props) {

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-999
        flex
        items-center
        justify-center
        bg-black/75
        backdrop-blur-md
        px-4
      "
    >

      {/* MODAL */}

      <div
        className="
          w-full
          max-w-md
          rounded-[2rem]
          border
          border-red-500/10
          bg-[#060606]
          p-6
          md:p-7
          shadow-[0_0_60px_rgba(0,0,0,0.6)]
        "
      >

        {/* HEADER */}

        <div
          className="
            mb-6
          "
        >

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
              border-red-500/10
              bg-red-500/5
            "
          >

            <div
              className="
                w-2
                h-2
                rounded-full
                bg-red-400
              "
            />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-red-300/80
                font-black
              "
            >
              Atenção
            </span>

          </div>

          <h2
            className="
              text-2xl
              md:text-3xl
              font-black
              text-white
              mb-3
            "
          >
            Limite gratuito atingido
          </h2>

          <p
            className="
              text-sm
              leading-relaxed
              text-white/45
            "
          >
            Você atingiu o limite de partidas
            gratuitas no modo visitante.

            <br />
            <br />

            Crie sua conta para continuar
            salvando partidas, registrar
            vitórias no ranking e acessar
            todos os recursos da plataforma.
          </p>
        </div>

        {/* ACTIONS */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
          "
        >

          <Link
            href="/register"

            className="
              flex-1
              flex
              items-center
              justify-center
              px-5
              py-3
              rounded-2xl
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              text-[10px]
              uppercase
              tracking-[0.18em]
              font-black
              transition-all
            "
          >
            Criar Conta
          </Link>

          <button
            onClick={onClose}

            className="
              flex-1
              px-5
              py-3
              rounded-2xl
              border
              border-white/10
              bg-white/3
              hover:bg-white/6
              text-white/65
              text-[10px]
              uppercase
              tracking-[0.18em]
              font-black
              transition-all
            "
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';

interface Props {

  remainingGames: number;

  guestBlocked: boolean;
}

export default function GuestBar({
  remainingGames,
  guestBlocked
}: Props) {

  return (

    <div
      className="
        mb-4
        mx-1

        flex
        items-center
        justify-between

        gap-4

        px-3
        md:px-5

        py-2.5

        rounded-2xl

        border

        backdrop-blur-xl

        transition-all
      "

      style={{

        borderColor:

          guestBlocked

            ? 'rgba(239,68,68,0.18)'

            : remainingGames === 1

              ? 'rgba(234,179,8,0.18)'

              : 'rgba(255,255,255,0.06)',

        background:

          guestBlocked

            ? 'rgba(239,68,68,0.05)'

            : remainingGames === 1

              ? 'rgba(234,179,8,0.05)'

              : 'rgba(255,255,255,0.025)'
      }}
    >

      {/* LEFT */}

      <div
        className="
          flex
          items-center

          gap-3

          min-w-0
        "
      >

        <div
          className={`
            w-2
            h-2

            rounded-full

            shrink-0

            ${

              guestBlocked

                ? 'bg-red-400'

                : remainingGames === 1

                  ? 'bg-yellow-400'

                  : 'bg-white/40'
            }
          `}
        />

        <div
          className="
            leading-tight
          "
        >

          <p
            className="
              text-[10px]

              uppercase

              tracking-[0.2em]
              md:tracking-[0.35em]

              text-white/35

              font-black
            "
          >
            Modo visitante
          </p>

          <p
            className={`
              text-xs
              md:text-sm

              mt-1

              font-medium

              ${

                guestBlocked

                  ? 'text-red-300'

                  : remainingGames === 1

                    ? 'text-yellow-300'

                    : 'text-white/65'
              }
            `}
          >

            {

              guestBlocked

                ? 'Limite gratuito atingido'

                : remainingGames > 1

                  ? `${remainingGames} partidas gratuitas restantes`

                  : 'Última partida gratuita disponível'
            }

          </p>
        </div>
      </div>

      {/* CTA */}

      <Link
        href="/register"

        className="
          shrink-0
          px-4
          py-2
          rounded-xl
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          text-[9px]
          uppercase
          tracking-[0.18em]
          font-black
          transition-all
          shadow-[0_0_20px_rgba(234,179,8,0.18)]
        "
      >
        Criar Conta
      </Link>

    </div>
  );
}




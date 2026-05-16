'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [

  {
    label: 'Overview',
    href: '/admin',
  },

  {
    label: 'Usuários',
    href: '/admin/users',
  },

  {
    label: 'Ranking',
    href: '/admin/ranking',
  },

  {
    label: 'Logs',
    href: '/admin/logs',
  },

  {
    label: 'Segurança',
    href: '/admin/security',
  },
];

export default function AdminSidebar() {

  const pathname =
    usePathname();

  return (

    <aside
      className="
        w-full
        xl:w-65

        shrink-0
      "
    >

      <div
        className="
          sticky
          top-6

          rounded-[2rem]

          border
          border-white/10

          bg-white/3

          backdrop-blur-2xl

          p-4

          shadow-[0_0_60px_rgba(0,0,0,0.45)]
        "
      >

        {/* HEADER */}

        <div
          className="
            mb-6
          "
        >

          <p
            className="
              text-[10px]

              uppercase

              tracking-[0.35em]

              text-yellow-300/70

              font-black

              mb-3
            "
          >
            ADMIN CORE
          </p>

          <h2
            className="
              text-2xl

              font-black

              text-white
            "
          >
            Controle
          </h2>

        </div>

        {/* NAV */}

        <nav
          className="
            flex
            flex-col

            gap-2
          "
        >

          {items.map((item) => {

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.href}

                href={item.href}

                className={`
                  group

                  relative

                  flex
                  items-center

                  px-4
                  py-3

                  rounded-2xl

                  border

                  transition-all

                  overflow-hidden

                  ${
                    active
                      ? `
                        bg-yellow-500
                        text-black
                        border-yellow-400
                      `
                      : `
                        bg-white/2
                        text-white/55
                        border-white/5

                        hover:border-yellow-500/20
                        hover:text-white
                      `
                  }
                `}
              >

                {/* GLOW */}

                {!active && (

                  <div
                    className="
                      absolute
                      inset-0

                      opacity-0

                      group-hover:opacity-100

                      transition-all

                      bg-linear-to-r
                      from-yellow-500/5
                      to-transparent
                    "
                  />
                )}

                <span
                  className="
                    relative

                    text-[11px]

                    uppercase

                    tracking-[0.22em]

                    font-black
                  "
                >
                  {item.label}
                </span>

              </Link>
            );
          })}

        </nav>

        {/* FOOTER */}

        <div
          className="
            mt-8
            pt-6

            border-t
            border-white/5
          "
        >

          <div
            className="
              flex
              items-center

              gap-3
            "
          >

            <div
              className="
                w-2.5
                h-2.5

                rounded-full

                bg-green-400

                shadow-[0_0_12px_rgba(34,197,94,0.8)]
              "
            />

            <span
              className="
                text-[10px]

                uppercase

                tracking-[0.25em]

                text-white/40

                font-black
              "
            >
              Sistema Operacional
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}


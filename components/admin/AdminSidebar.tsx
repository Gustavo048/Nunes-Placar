"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
  },

  {
    href: "/admin/ranking",
    label: "Ranking",
  },

  {
    href: "/admin/logs",
    label: "Logs",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        flex
        flex-col
        w-70
        sticky
        top-0
        h-screen
        shrink-0
        border-r
        border-white/10
        bg-black/40
        backdrop-blur-2xl
        p-6
      "
    >
      {/* BRAND */}

      <div
        className="
          mb-10
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
            border-yellow-500/10
            bg-yellow-500/5
          "
        >
          <div
            className="
              w-2
              h-2
              rounded-full
              bg-yellow-400
            "
          />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-yellow-200/80
              font-black
            "
          >
            ADMIN SYSTEM
          </span>
        </div>

        <h1
          className="
            text-3xl
            font-black
            text-white
            mb-8
          "
        >
          Backoffice
        </h1>

        {/* SECTION */}

        <div
          className="
            mb-4
          "
        >
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-white/25
              font-black
            "
          >
            OPERATIONS
          </p>
        </div>
      </div>

      {/* NAVIGATION */}

      <nav
        className="
          space-y-3
        "
      >
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex
                items-center
                h-13
                px-4
                rounded-2xl
                border
                transition-all

                ${
                  active
                    ? `
                      border-cyan-500/20
                      bg-cyan-500/10
                      text-cyan-300
                    `
                    : `
                      border-white/5
                      bg-white/2
                      text-white/55
                      hover:bg-white/4
                      hover:text-white
                      hover:border-white/10
                    `
                }
              `}
            >
              <span
                className="
                  text-sm
                  font-bold
                "
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}

      <div
        className="
          mt-auto
          pt-6
        "
      >
        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
            h-13
            px-4
            rounded-2xl
            border
            border-white/5
            bg-white/2.5
            text-white/35
            transition-all
            hover:bg-white/3
            hover:text-white
            hover:border-white/10
          "
        >
          <span
            className="
              text-sm
            "
          >
            ←
          </span>

          <span
            className="
              text-sm
              font-bold
            "
          >
            Voltar ao Sistema
          </span>
        </Link>
      </div>
    </aside>
  );
}

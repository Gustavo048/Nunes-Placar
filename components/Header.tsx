"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import UserInfo from "@/components/UserInfo";

export default function Header() {

  /* SESSION */

  const {
    data: session
  } = useSession();

  /* ADMIN */

  const isAdmin =
    session?.user?.role === "ADMIN";

  return (

    <header
      className="
        w-full
        h-21
        md:h-23
        bg-black/40
        backdrop-blur-2xl
        border
        border-white/10
        rounded-[1.5rem]
        px-5
        md:px-6
        py-1.5
        md:py-2
        shadow-[0_0_60px_rgba(0,0,0,0.45)]
      "
    >

      <div
        className="
          max-w-5xl
          h-full
          mx-auto
          flex
          items-center
          justify-between
          gap-4
        "
      >

        {/* LEFT */}

        <div
          className="
            flex
            items-center
            gap-4
            md:gap-5
            min-w-0
          "
        >

          {/* LOGO */}

          <Link
            href="/"

            className="
              relative
              shrink-0
              w-40
              md:w-52
              transition-opacity
              hover:opacity-90
            "
          >

            <Image
              src="/logo-v3.png"
              alt="Nunes Placar"

              width={260}
              height={70}

              priority

              className="
                w-full
                h-auto
                object-contain
              "
            />

          </Link>

        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            items-center
            gap-2
            md:gap-3
            shrink-0
          "
        >
        
{session?.user ? (

  <div
    className="
      flex
      items-center
      gap-2
      md:gap-3
    "
  >

    <UserInfo />

    {/* ADMIN BUTTON */}

    {isAdmin && (

      <Link
        href="/admin"

        className="
          px-3
          md:px-3.5
          py-2
          rounded-lg
          bg-white/5
          hover:bg-yellow-500/15
          border
          border-yellow-500/10
          text-yellow-300/80
          hover:text-yellow-200
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          transition-all
          backdrop-blur-md
        "
            >
              Admin
            </Link>
          )}

        </div>

      ) : (
            <>

              {/* LOGIN */}

              <Link
                href="/login"

                className="
                  px-4
                  md:px-5
                  py-2.5
                  rounded-xl
                  bg-white/5
                  hover:bg-white/10
                  border
                  border-white/10
                  text-white
                  text-xs
                  md:text-sm
                  font-bold
                  transition-all
                "
              >
                Login
              </Link>

              {/* REGISTER */}

              <Link
                href="/register"

                className="
                  px-4
                  md:px-5
                  py-2.5
                  rounded-xl
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  text-xs
                  md:text-sm
                  font-black
                  transition-all
                  shadow-[0_0_20px_rgba(234,179,8,0.25)]
                "
              >
                Registrar
              </Link>
            </>

          )}
        </div>
      </div>
    </header>
  );
}





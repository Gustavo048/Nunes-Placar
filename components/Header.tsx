"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import UserInfo from "@/components/UserInfo";
export default function Header() {

  /* SESSION */

  const {
    data: session
  } = useSession();

  return (
    <header
      className="
        w-full

        bg-white/5
        backdrop-blur-2xl

        border
        border-white/10

        rounded-[2rem]

        px-6
        py-3
        md:py-4

        shadow-[0_0_60px_rgba(0,0,0,0.45)]
      "
    >

      <div
        className="
          flex
          items-center
          justify-between

          gap-6
        "
      >

        {/*  LOGO */}

        <Link
          href="/"

          className="
            relative

            shrink-0

            w-32
            md:w-44

            transition-opacity
            hover:opacity-90
          "
        >
          <Image
            src="/logo-v3.png"
            alt="Nunes Placar"

            width={180}
            height={50}

            priority

            className="
              w-full
              h-auto

              object-contain
            "
          />

        </Link>

        {/* ACTIONS */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {session?.user ? (
            <UserInfo />

          ) : (

            <>
              <Link
                href="/login"

                className="
                  px-5
                  py-2

                  rounded-xl

                  bg-transparent
                  hover:bg-white/5

                  text-white
                  text-sm

                  font-semibold

                  transition-all
                "
              >
                Login
              </Link>

              <Link
                href="/register"

                className="
                  px-5
                  py-2

                  rounded-xl

                  bg-yellow-500
                  hover:bg-yellow-400

                  text-black
                  text-sm

                  font-bold

                  transition-all

                  shadow-[0_0_20px_rgba(234,179,8,0.3)]
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
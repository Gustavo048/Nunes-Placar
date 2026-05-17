import type { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminAutoRefresh from "@/components/admin/AdminAutoRefresh";

interface AdminLayoutProps {

  children:
    ReactNode;
}

export default async function AdminLayout({
  children
}: AdminLayoutProps) {

  /* SESSION */

  const session =
    await auth();

  if (!session?.user) {

    redirect("/");
  }

  /* ADMIN VALIDATION */

  if (
    session.user.role !==
    "ADMIN"
  ) {

    redirect("/");
  }

  return (
    <main
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-black
      "
    >

      {/* AUTO REFRESH */}

      <AdminAutoRefresh />

      {/* BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          -z-20
        "

        style={{
          backgroundImage:
            "url('/imagem-v1.jpg')",

          backgroundSize:
            "cover",

          backgroundPosition:
            "center",

          backgroundAttachment:
            "fixed",
        }}
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-black/85
          backdrop-blur-[3px]
          -z-10
        "
      />

      {/* SHELL */}

      <div
        className="
          flex
          min-h-screen
        "
      >

        {/* SIDEBAR */}

        <AdminSidebar />

        {/* CONTENT */}

        <div
          className="
            flex-1
            max-w-425
            w-full
            px-6
            md:px-10
            py-8
          "
        >

          {children}

        </div>
      </div>
    </main>
  );
}


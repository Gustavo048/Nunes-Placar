import type { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({
  children
}: AdminLayoutProps) {

  /* SESSION */

  const session =
    await auth();

  if (!session?.user) {
    redirect('/');
  }

  /* ADMIN VALIDATION */

  if (
    session.user.role !==
    'ADMIN'
  ) {

    redirect('/');
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
            'cover',

          backgroundPosition:
            'center',

          backgroundAttachment:
            'fixed',
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

      {/* CONTENT */}

      <div
        className="
          max-w-425

          mx-auto

          px-4
          md:px-6

          py-6
        "
      >

        {/* GRID */}

        <div
          className="
            grid

            grid-cols-1
            xl:grid-cols-[260px_minmax(0,1fr)]

            gap-6

            items-start
          "
        >

          {/* SIDEBAR */}

          <AdminSidebar />

          {/* PAGE */}

          <section
            className="
              min-w-0
            "
          >
            {children}
          </section>

        </div>

      </div>

    </main>
  );
}


'use client';

import { useMemo, useState } from 'react';

import UserRow
from './UserRow';

interface User {

  id: string;

  name: string;
  email: string;

  city: string | null;
  state: string | null;

  role: string;
  status: string;

  blocked: boolean;

  isOnline: boolean;

  createdAt: Date;
  lastLoginAt: Date | null;
}

interface UserManagementTableProps {
  users: User[];
}

const FILTERS = [
  "ALL",
  "APPROVED",
  "PENDING",
  "REJECTED",
  "BLOCKED",
  "ADMIN",
  "ONLINE",
] as const;

export default function UserManagementTable({
  users
}: UserManagementTableProps) {

  const [
    search,
    setSearch
  ] = useState("");

  const [
    filter,
    setFilter
  ] = useState<
    typeof FILTERS[number]
  >("ALL");

  /* FILTERED USERS */

  const filteredUsers =
    useMemo(() => {

      return users.filter((user) => {

        const query =
          search.toLowerCase();

        const matchesSearch =

          user.name
            .toLowerCase()
            .includes(query)

          ||

          user.email
            .toLowerCase()
            .includes(query)

          ||

          user.city
            ?.toLowerCase()
            .includes(query)

          ||

          user.state
            ?.toLowerCase()
            .includes(query);

        if (!matchesSearch) {
          return false;
        }

        switch (filter) {

          case "APPROVED":
            return user.status === "APPROVED";

          case "PENDING":
            return user.status === "PENDING";

          case "REJECTED":
            return user.status === "REJECTED";

          case "BLOCKED":
            return user.blocked;

          case "ADMIN":
            return user.role === "ADMIN";

          case "ONLINE":
            return user.isOnline;

          default:
            return true;
        }

      });

    }, [users, search, filter]);

  return (

    <section
      className="
        rounded-[2rem]

        border
        border-white/10

        bg-white/2.5

        backdrop-blur-2xl

        p-4
        md:p-6

        shadow-[0_0_60px_rgba(0,0,0,0.45)]
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          xl:flex-row

          xl:items-center
          xl:justify-between

          gap-5

          mb-6
        "
      >

        <div>

          <p
            className="
              text-[10px]

              uppercase

              tracking-[0.35em]

              text-yellow-300/70

              font-black

              mb-2
            "
          >
            USER MANAGEMENT
          </p>

          <h2
            className="
              text-2xl

              font-black

              text-white
            "
          >
            Usuários do Sistema
          </h2>

        </div>

        {/* SEARCH */}

        <input
          type="text"

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          placeholder="Buscar usuário..."

          className="
            w-full
            xl:w-80

            px-5
            py-3

            rounded-2xl

            bg-black/30

            border
            border-white/10

            text-white

            placeholder:text-white/25

            outline-none

            focus:border-yellow-500/30
          "
        />

      </div>

      {/* FILTERS */}

      <div
        className="
          flex
          flex-wrap

          gap-2

          mb-6
        "
      >

        {FILTERS.map((item) => (

          <button
            key={item}

            onClick={() =>
              setFilter(item)
            }

            className={`
              px-4
              py-2

              rounded-xl

              text-[10px]

              uppercase

              tracking-[0.2em]

              font-black

              transition-all

              border

              ${
                filter === item
                  ? `
                    bg-yellow-500
                    text-black
                    border-yellow-400
                  `
                  : `
                    bg-white/3
                    text-white/50
                    border-white/10
                    hover:border-yellow-500/20
                  `
              }
            `}
          >
            {item}
          </button>
        ))}

      </div>

      {/* TABLE */}

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full
            min-w-262.5
          "
        >

          <thead>

            <tr
              className="
                border-b
                border-white/10
              "
            >

              {[
                "Usuário",
                "Localização",
                "Status",
                "Cargo",
                "Online",
                "Último Login",
                "Ações",
              ].map((head) => (

                <th
                  key={head}

                  className="
                    text-left

                    py-4

                    text-[10px]

                    uppercase

                    tracking-[0.3em]

                    text-white/30

                    font-black
                  "
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

            {filteredUsers.map((user) => (

              <UserRow
                key={user.id}
                user={user}
              />
            ))}

          </tbody>
        </table>
      </div>
    </section>
  );
}



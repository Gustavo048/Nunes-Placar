'use client';

import {
  approveUser,
  rejectUser,
  blockUser,
  unblockUser,
  promoteToAdmin
} from '@/app/actions/admin';

import ConfirmActionButton
from './ConfirmActionButton';

interface UserRowProps {

  user: {

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
  };
}

export default function UserRow({
  user
}: UserRowProps) {

  return (

    <tr
      className="
        border-b
        border-white/5

        hover:bg-white/2

        transition-all
      "
    >

      {/* USER */}

      <td
        className="
          py-5
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
              w-11
              h-11

              rounded-2xl

              bg-yellow-500/10

              border
              border-yellow-500/10

              flex
              items-center
              justify-center

              text-yellow-300

              font-black
            "
          >
            {user.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>

            <p
              className="
                text-white

                font-bold
              "
            >
              {user.name}
            </p>

            <p
              className="
                text-sm
                text-white/35
              "
            >
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* LOCATION */}

      <td
        className="
          py-5
          text-white/60
        "
      >
        {user.city || "--"} / {user.state || "--"}
      </td>

      {/* STATUS */}

      <td
        className="
          py-5
        "
      >

        <span
          className={`
            px-3
            py-1.5
            rounded-full
            text-[10px]
            uppercase
            tracking-[0.2em]
            font-black

            ${
              user.status === "APPROVED"
                ? `
                  bg-green-500/10
                  text-green-300
                `
                : user.status === "PENDING"
                ? `
                  bg-yellow-500/10
                  text-yellow-300
                `
                : `
                  bg-red-500/10
                  text-red-300
                `
            }
          `}
        >
          {user.status}
        </span>
      </td>

      {/* ROLE */}

      <td
        className="
          py-5
        "
      >

        <span
          className={`
            px-3
            py-1.5
            rounded-full
            text-[10px]
            uppercase
            tracking-[0.2em]
            font-black

            ${
              user.role === "ADMIN"
                ? `
                  bg-blue-500/10
                  text-blue-300
                `
                : `
                  bg-white/5
                  text-white/50
                `
            }
          `}
        >
          {user.role}
        </span>
      </td>

      {/* ONLINE */}

      <td
        className="
          py-5
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <div
            className={`
              w-2.5
              h-2.5
              rounded-full

              ${
                user.isOnline
                  ? `
                    bg-green-400
                    shadow-[0_0_12px_rgba(34,197,94,0.9)]
                  `
                  : `
                    bg-white/15
                  `
              }
            `}
          />

          <span
            className="
              text-sm
              text-white/55
            "
          >
            {user.isOnline
              ? "Online"
              : "Offline"}
          </span>
        </div>
      </td>

      {/* LAST LOGIN */}

      <td
        className="
          py-5
          text-sm
          text-white/45
        "
      >
        {user.lastLoginAt
          ? new Date(
              user.lastLoginAt
            ).toLocaleDateString("pt-BR")
          : "--"}
      </td>

      {/* ACTIONS */}

      <td
        className="
          py-5
        "
      >

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >

          {/* APPROVE */}

          {user.status ===
            "PENDING" && (

            <button

              onClick={async () => {

                await approveUser(
                  user.id
                );
              }}

              className="
                px-3
                py-2
                rounded-xl
                bg-green-500/10
                hover:bg-green-500/20
                border
                border-green-500/10
                text-green-300
                text-[10px]
                uppercase
                tracking-[0.18em]
                font-black
                transition-all
              "
            >
              Aprovar
            </button>
          )}

          {/* REJECT */}

          {user.status ===
            "PENDING" && (

            <ConfirmActionButton

              label="Rejeitar"

              confirmText="
                Deseja rejeitar este usuário?
              "

              variant="red"

              action={async () => {

                await rejectUser(
                  user.id
                );
              }}
            />
          )}

          {/* BLOCK */}

          {!user.blocked && (

            <ConfirmActionButton

              label="Bloquear"

              confirmText="
                Deseja bloquear este usuário?
              "

              variant="red"

              action={async () => {

                await blockUser(
                  user.id
                );
              }}
            />
          )}

          {/* UNBLOCK */}

          {user.blocked && (

            <button

              onClick={async () => {

                await unblockUser(
                  user.id
                );
              }}

              className="
                px-3
                py-2
                rounded-xl
                bg-emerald-500/10
                hover:bg-emerald-500/20
                border
                border-emerald-500/10
                text-emerald-300
                text-[10px]
                uppercase
                tracking-[0.18em]
                font-black
                transition-all
              "
            >
              Desbloquear
            </button>
          )}

          {/* PROMOTE */}

          {user.role !==
            "ADMIN" && (

            <ConfirmActionButton

              label="Admin"

              confirmText="
                Deseja promover este usuário para ADMIN?
              "

              variant="blue"

              action={async () => {

                await promoteToAdmin(
                  user.id
                );
              }}
            />
          )}
        </div>
      </td>
    </tr>
  );
}




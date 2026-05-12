'use server';

import { resend } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
 
  // VERIFICA EMAIL EXISTENTE  

  const existingUser = await prisma.user.findUnique({

    where: {
      email: data.email,
    },
  });

  if (existingUser) {

    throw new Error("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );


  const approvalToken = uuid();

 
  // CRIA USUÁRIO

  await prisma.user.create({

    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword, 

      approvalToken,
    },
  });


  /*  LINKS DE APROVAÇÃO  */

  const approveUrl =
    `${process.env.NEXTAUTH_URL}/api/admin/approve?token=${approvalToken}`;

  const rejectUrl =
    `${process.env.NEXTAUTH_URL}/api/admin/reject?token=${approvalToken}`;

    // ENVIA EMAIL ADMIN  

  await resend.emails.send({

    from: 'Nunes Placar <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL!,
    subject: 'Nova solicitação de acesso',

    html: `

      <div
        style="
          font-family:sans-serif;
          padding:20px;
        "
      >

        <h2
          style="
            margin-bottom:20px;
          "
        >
          Nova solicitação de acesso
        </h2>

        <p>
          Um novo usuário solicitou acesso ao sistema.
        </p>

        <hr style="margin:20px 0;" />

        <p>
          <strong>Nome:</strong>
          ${data.name}
        </p>

        <p>
          <strong>Email:</strong>
          ${data.email}
        </p>

        <hr style="margin:20px 0;" />

        <div style="margin-top:30px;">

          <a
            href="${approveUrl}"

            style="
              background:#16a34a;
              color:white;
              padding:12px 20px;
              border-radius:8px;
              text-decoration:none;
              margin-right:10px;
              display:inline-block;
              font-weight:bold;
            "
          >
            Aprovar
          </a>

          <a
            href="${rejectUrl}"

            style="
              background:#dc2626;
              color:white;
              padding:12px 20px;
              border-radius:8px;
              text-decoration:none;
              display:inline-block;
              font-weight:bold;
            "
          >
            Recusar
          </a>

        </div>

      </div>
    `,
  });
 
  // SUCCESS 

  return {
    success: true,
  };
}
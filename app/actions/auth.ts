"use server";

import { resend } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    /* NORMALIZAÇÃO */

    const normalizedName = data.name.trim();

    const normalizedEmail = data.email.trim().toLowerCase();

    const normalizedPassword = data.password.trim();

    /* VALIDAÇÕES BÁSICAS  */

    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      return {
        success: false,
        message: "Preencha todos os campos",
      };
    }

    /* valida tamanho nome  */

    if (normalizedName.length < 3) {
      return {
        success: false,
        message: "Nome deve possuir ao menos 3 caracteres",
      };
    }

    /* valida senha mínima */

    if (normalizedPassword.length < 6) {
      return {
        success: false,
        message: "Senha deve possuir ao menos 6 caracteres",
      };
    }

    /* EMAIL EXISTENTE */

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email já cadastrado",
      };
    }

    /* HASH SENHA  */

    const hashedPassword = await bcrypt.hash(normalizedPassword, 10);

    /* TOKEN APROVAÇÃO  */

    const approvalToken = uuid();

    /* CRIA USUÁRIO  */

    await prisma.user.create({
      data: {
        name: normalizedName,

        /* salva email normalizado  */

        email: normalizedEmail,
        password: hashedPassword,
        approvalToken,
      },
    });

    if (!process.env._URL) {
      console.error("NEXTAUTH_URL não configurada");

      return {
        success: false,
        message: "Erro configuração servidor",
      };
    }

    /* valida ADMIN_EMAIL   */

    if (!process.env.ADMIN_EMAIL) {
      console.error("ADMIN_EMAIL não configurado");

      return {
        success: false,
        message: "Erro configuração email admin",
      };
    }

    /* LINKS ADMIN */

    const approveUrl = `${process.env.NEXTAUTH_URL}/api/admin/approve?token=${approvalToken}`;

    const rejectUrl = `${process.env.NEXTAUTH_URL}/api/admin/reject?token=${approvalToken}`;

    /*  ENVIO EMAIL ADMIN  */

    const emailResponse = await resend.emails.send({
      from: "Nunes Placar <onboarding@resend.dev>",

      to: process.env.ADMIN_EMAIL,

      subject: "Nova solicitação de acesso",

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
              ${normalizedName}
            </p>

            <p>
              <strong>Email:</strong>
              ${normalizedEmail}
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

    console.log("RESEND RESPONSE:", emailResponse);

    /* SUCCESS */

    return {
      success: true,
      message: "Solicitação enviada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);

    return {
      success: false,
      message: "Erro interno ao criar conta",
    };
  }
}

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

    if (!token) {

      return NextResponse.json({
        error: "Token inválido",
      });
    }

    const user = await prisma.user.findUnique({

      where: {
        approvalToken: token,
      },
    });

    if (!user) {

      return NextResponse.json({
        error: "Usuário não encontrado",
      });
    }

    await prisma.user.update({

      where: {
        id: user.id,
      },

      data: {

        status: "REJECTED",

        approvalToken: null,
      },
    });

    revalidatePath("/admin");

        return NextResponse.redirect(
    new URL("/admin", req.url)
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      error: "Erro ao rejeitar usuário",
    });
  }
}
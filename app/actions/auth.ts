'use server';

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
}
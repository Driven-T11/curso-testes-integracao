import prisma from "../../src/database";
import { UserInput } from "../../src/repository";

export async function buildUser(email: string, password?: string) {
  const userData: UserInput = {
    email,
    password: password || new Date().getTime().toString()
  };

  const user = await prisma.user.create({ data: userData });
  return user;
}
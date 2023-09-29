import prisma from "../../src/database";
import { UserInput } from "../../src/repository";
import { faker } from "@faker-js/faker";

export async function buildUser(email?: string, password?: string) {
  const userData: UserInput = {
    email: email || faker.internet.email(),
    password: password || faker.internet.password()
  };

  const user = await prisma.user.create({ data: userData });
  return user;
}
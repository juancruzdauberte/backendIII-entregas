import bcypt from "bcrypt";
import { faker } from "@faker-js/faker";

export const generateMockUsers = async (cantidad) => {
  const hashedPassword = await bcypt.hash("coder123", 10);

  const users = Array.from({ length: cantidad }, () => ({
    role: faker.helpers.arrayElement(["user", "admin"]),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    pets: [],
    password: hashedPassword,
  }));

  return users;
};

export const generateMockPets = async (cantidad) => {
  const pets = Array.from({ length: cantidad }, () => ({
    race: faker.animal.type(),
  }));

  return pets;
};

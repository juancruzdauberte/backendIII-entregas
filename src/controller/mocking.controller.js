import { UserModel } from "../models/Mocking.model.js";
import { PetModel } from "../models/Pets.model.js";
import { generateMockPets, generateMockUsers } from "../utils/utils.js";

export async function mockingUsers(req, res) {
  const { amount } = req.query;
  try {
    const mockUsers = await generateMockUsers(amount);
    res.status(200).json(mockUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al mockear los usuarios" });
  }
}

export async function generateData(req, res) {
  try {
    const { users = 0, pets = 0 } = req.body;

    if (users > 0) {
      const mockUsers = await generateMockUsers(users);
      const usersCreated = await UserModel.insertMany(mockUsers);
      req.logger.info(`Usuarios creados con exito: ${usersCreated}`);
    }

    if (pets > 0) {
      const mockPets = await generateMockPets(pets);
      const petsCreated = await PetModel.insertMany(mockPets);
      req.logger.info(`Mascotas creadas con exito: ${petsCreated}`);
    }

    res.status(201).json({
      mesage: "Datos ingresados correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al cargar la data en la bd" });
  }
}

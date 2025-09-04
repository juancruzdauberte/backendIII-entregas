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
      await UserModel.insertMany(mockUsers);
    }

    if (pets > 0) {
      const mockPets = await generateMockPets(pets);
      await PetModel.insertMany(mockPets);
    }

    res.status(201).json({
      mesage: "Datos ingresados correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al cargar la data en la bd" });
  }
}

import { UserModel } from "../models/Mocking.model.js";
import { PetModel } from "../models/Pets.model.js";
import { generateMockPets, generateMockUsers } from "../utils/utils.js";

export async function mockingUsers(req, res) {
  try {
    const mockUsers = await generateMockUsers(50);
    res.status(200).json(mockUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesagge: "Error al mockear los usuarios" });
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
    res.status(500).json({ mesagge: "Error al cargar la data en la bd" });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await UserModel.find();
    if (!users) {
      res.status(400).json({ message: "No hay usuarios en la base de datos" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesagge: "Error al obtener a los usuarios" });
  }
}

export async function getPets(req, res) {
  try {
    const pets = await PetModel.find();
    if (!pets) {
      res.status(400).json({ message: "No hay usuarios en la base de datos" });
      return;
    }
    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesagge: "Error al obtener a los usuarios" });
  }
}

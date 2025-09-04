import { UserModel } from "../models/Mocking.model.js";

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
    res.status(500).json({ message: "Error al obtener a los usuarios" });
  }
}

export async function getUserById(req, res) {
  try {
    const { uid } = req.params;
    const user = await UserModel.findById(uid);
    if (!user) {
      res.status(400).json({ message: "No hay usuarios en la base de datos" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener a los usuarios" });
  }
}

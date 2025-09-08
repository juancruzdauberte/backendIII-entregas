import { UserModel } from "../models/Mocking.model.js";
import { PetModel } from "../models/Pets.model.js";

export async function getPets(req, res) {
  try {
    const pets = await PetModel.find();
    if (!pets || pets.length === 0) {
      req.logger.grave("No existen mascotas en la base de datos");
      res.status(404).json({ message: "No hay mascotas en la base de datos" });
      return;
    }
    req.logger.info(`Se obtuvieron ${pets.length} mascotas`);
    return res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener a las mascotas" });
  }
}

export async function getPetById(req, res) {
  try {
    const { pid } = req.params;

    const pet = await PetModel.findById(pid);

    if (!pet) {
      req.logger.grave(`No existe la mascota con id ${pid}`);
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    req.logger.info(`Se obtuvo la mascota: ${pet}`);
    return res.status(200).json(pet);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener a las mascotas" });
  }
}

export async function createPet(req, res) {
  const { race, name } = req.body;
  try {
    if (!name || !race) {
      req.logger.grave("Falta nombre o raza de la mascota");
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const pet = await PetModel.create({
      name,
      race,
    });
    req.logger.info(`Mascota creada: ${pet}`);
    return res
      .status(201)
      .json({ message: "Mascota creada exitosamente", pet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear la mascota" });
  }
}

export async function deletePet(req, res) {
  const { pid } = req.params;
  try {
    const pet = await PetModel.findByIdAndDelete(pid);
    if (!pet) {
      req.logger.grave(`No existe la mascota con el id ${pid}`);
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    req.logger.info(
      `Mascota eliminada correctamente de la base de datos: ${pet}`
    );
    return res
      .status(200)
      .json({ message: "Mascota eliminada exitosamente", pet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar la mascota" });
  }
}

export async function petAdopted(req, res) {
  try {
    const { pid, uid } = req.params;

    const pet = await PetModel.findById(pid);
    if (!pet) {
      req.logger.grave(`No existe la mascota con el id ${pid}`);
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    if (pet.isAdopted) {
      req.logger.grave("La mascota ya fue adoptada");
      return res.status(400).json({ message: "Esta mascota ya fue adoptada" });
    }

    const user = await UserModel.findByIdAndUpdate(
      uid,
      { $push: { pets: pid } },
      { new: true }
    );

    await PetModel.findByIdAndUpdate(
      pid,
      { $set: { isAdopted: true, owner: uid } },
      { new: true }
    );
    req.logger.info(`La mascota fue adoptada por: ${user}`);
    return res.status(200).json({ message: "Mascota adoptada con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al adoptar una mascota" });
  }
}

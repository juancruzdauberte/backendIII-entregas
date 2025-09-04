import { Router } from "express";
import {
  createPet,
  deletePet,
  getPetById,
  getPets,
  petAdopted,
} from "../controller/pets.controller.js";

const router = Router();

router.get("/", getPets);
router.get("/:pid", getPetById);
router.post("/", createPet);
router.delete("/:pid", deletePet);
router.post("/:pid/user/:uid", petAdopted);

export default router;

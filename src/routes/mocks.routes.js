import { Router } from "express";
import {
  generateData,
  getPets,
  getUsers,
  mockingUsers,
} from "../controller/mocking.controller.js";

const router = Router();

router.get("/mockingusers", mockingUsers);
router.get("/users", getUsers);
router.get("/pets", getPets);
router.post("/generateData", generateData);
export default router;

import { Router } from "express";
import {
  generateData,
  mockingUsers,
} from "../controller/mocking.controller.js";

const router = Router();

router.get("/mockingusers", mockingUsers);
router.post("/generateData", generateData);

export default router;

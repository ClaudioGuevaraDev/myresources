import { Router } from "express";
import {
  createResource,
  deleteResource,
  getResources,
  updateResource,
} from "../controllers/resources.js";

const router = Router();

router.get("/", getResources);
router.post("/", createResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;

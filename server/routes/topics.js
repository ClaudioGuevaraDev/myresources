import { Router } from "express";
import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
} from "../controllers/topics.js";

const router = Router();

router.get("/", getTopics);
router.post("/", createTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

export default router;

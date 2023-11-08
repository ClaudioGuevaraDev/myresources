import express from "express";
import { PORT } from "./config.js";
import { resourceRoutes, topicRoutes } from "./routes/index.js";
import cors from "cors";

const app = express();

app.set("port", PORT);

app.use(cors());
app.use(express.json());

app.use("/api/topics", topicRoutes);
app.use("/api/resources", resourceRoutes);

export default app;

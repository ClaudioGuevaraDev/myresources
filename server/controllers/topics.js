import { connectionDB } from "../db.js";
import { ObjectId } from "mongodb";

export const getTopics = async (req, res) => {
  try {
    const col = await connectionDB("topics");
    const topics = await col.find({}).toArray();
    return res.status(200).json({ data: topics });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los tópicos" });
  }
};

export const createTopic = async (req, res) => {
  try {
    const col = await connectionDB("topics");
    const { name } = req.body;

    const checkTopic = await col.findOne({ name });
    if (checkTopic != null) {
      return res.status(400).json({ message: "El tópico ya existe" });
    }

    const { insertedId } = await col.insertOne({ name, resources: [] });

    return res.status(201).json({
      data: { insertedId, name },
      message: "Tópico creado con éxito",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el tópico" });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const col = await connectionDB("topics");
    const { name } = req.body;
    const { id } = req.params;
    const _id = new ObjectId(id);

    const checkTopic = await col.findOne({ _id });
    if (checkTopic == null) {
      return res.status(404).json({ message: "El tópico no existe" });
    }

    await col.updateOne({ _id }, { $set: { name } });

    return res.status(200).json({ message: "Tópico actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el tópico" });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const col = await connectionDB("topics");
    const { id } = req.params;
    const _id = new ObjectId(id);

    const checkTopic = await col.findOne({ _id });
    if (checkTopic == null) {
      return res.status(404).json({ message: "El tópico no existe" });
    }

    await col.deleteOne({ _id });

    return res.status(200).json({ message: "Tópico eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el tópico" });
  }
};

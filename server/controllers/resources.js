import { ObjectId } from "mongodb";
import { connectionDB } from "../db.js";

export const getResources = async (req, res) => {
  try {
    const col = await connectionDB("resources");
    const resources = await col.find({}).toArray();
    return res.status(200).json({ data: resources });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los recursos" });
  }
};

export const createResource = async (req, res) => {
  try {
    const col = await connectionDB("resources");
    const { name, link, score, description, topicId } = req.body;

    const checkResource = await col.findOne({ name });
    if (checkResource != null) {
      return res.status(400).json({ message: "El recurso ya existe" });
    }

    const { insertedId } = await col.insertOne({
      name,
      link,
      score,
      description,
      topicId,
    });

    return res.status(201).json({
      data: { _id: insertedId },
      message: "Recurso creado con éxito",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el recurso" });
  }
};

export const updateResource = async (req, res) => {
  try {
    const col = await connectionDB("resources");
    const { name, link, score, description, topicId } = req.body;
    const { id } = req.params;
    const _id = new ObjectId(id);

    const checkResource = await col.findOne({ _id });
    if (checkResource == null) {
      return res.status(404).json({ message: "El recurso no existe" });
    }

    await col.updateOne(
      { _id },
      {
        $set: {
          name,
          link,
          score,
          description,
          topicId,
        },
      }
    );

    return res.status(200).json({
      message: "Recurso actualizado con éxito",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el recurso" });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const col = await connectionDB("resources");
    const { id } = req.params;
    const _id = new ObjectId(id);

    const checkResource = await col.findOne({ _id });
    if (checkResource == null) {
      return res.status(404).json({ message: "El recurso no existe" });
    }

    await col.deleteOne({ _id });

    return res.status(200).json({
      message: "Recurso eliminado con éxito",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el recurso" });
  }
};

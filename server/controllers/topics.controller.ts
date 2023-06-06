import { type Request, type Response } from 'express'
import { type UploadedFile } from 'express-fileupload'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { ResourceModel } from '../models/Resource.model'
import { TopicModel } from '../models/Topic.model'

export const getTopics = async (req: Request, res: Response): Promise<Response> => {
  try {
    const topics = await TopicModel.find()
    return res.status(200).json(topics)
  } catch (error) {
    return res.status(500).end()
  }
}

export const getTopicById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const topic = await TopicModel.findById(id)
    if (topic == null) return res.status(404).end()

    return res.status(200).json(topic)
  } catch (error) {
    return res.status(500).end()
  }
}

export const createTopic = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body

  try {
    const newTopic = new TopicModel({ name })
    const savedTopic = await newTopic.save()
    return res.status(201).json(savedTopic)
  } catch (error) {
    return res.status(500).end()
  }
}

export const deleteTopicById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const topic = await TopicModel.findById(id)
  if (topic == null) return res.status(404).end()
  try {
    const resources = topic.resources
    await topic.deleteOne()
    for (let i = 0; i < resources.length; i++) {
      await ResourceModel.findByIdAndDelete(topic.resources[i])
    }
    return res.status(204).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export const editTopicImageById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const topic = await TopicModel.findById(id)
  if (topic == null) return res.status(404).end()

  if (req.files == null || Object.keys(req.files).length === 0) return res.status(400).end()

  const sampleFile = req.files.file as UploadedFile
  const fileName = uuidv4() + '_' + sampleFile.name
  const uploadPath = path.join(__dirname, '..', 'public', 'imgs', fileName)

  try {
    await sampleFile.mv(uploadPath)
    await TopicModel.findByIdAndUpdate(id, {
      image: `/imgs/${fileName}`
    })
    return res.status(204).end()
  } catch (error) {
    return res.status(500).end()
  }
}

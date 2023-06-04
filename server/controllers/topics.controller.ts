import { type Request, type Response } from 'express'

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
    return res.status(201).json({ topic: savedTopic })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}

export const deleteTopicById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const topic = await TopicModel.findById(id)
    if (topic == null) return res.status(404).end()
    await topic.deleteOne()
    return res.status(204).end()
  } catch (error) {
    return res.status(500).end()
  }
}

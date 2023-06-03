import { type Request, type Response } from 'express'

import TopicModel from '../models/Topic.model'

export const getTopics = async (req: Request, res: Response): Promise<Response> => {
  try {
    const topics = await TopicModel.find()
    return res.status(200).json(topics)
  } catch (error) {
    return res.status(500).end()
  }
}

export const getTopicById = (): void => {

}

export const createTopic = (): void => {

}

export const updateTopicById = (): void => {

}

export const deleteTopicById = (): void => {

}

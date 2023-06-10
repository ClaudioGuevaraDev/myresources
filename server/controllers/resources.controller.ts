import { type Request, type Response } from 'express'
import { type UploadedFile } from 'express-fileupload'
import type mongoose from 'mongoose'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { ResourceModel } from '../models/Resource.model'
import { TopicModel } from '../models/Topic.model'

export const getResources = async (req: Request, res: Response): Promise<Response> => {
  try {
    const resources = await ResourceModel.find()
    return res.status(200).json(resources)
  } catch (error) {
    return res.status(500).end()
  }
}

export const getResourceById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const resource = await ResourceModel.findById(id)
  if (resource == null) return res.status(404).end()
  return res.status(200).json(resource)
}

export const createResource = async (req: Request, res: Response): Promise<Response> => {
  const { name, link, rating, topicId } = req.body
  const topic = await TopicModel.findById(topicId)
  if (topic == null) return res.status(404).end()
  try {
    const newResource = new ResourceModel({ name, link, rating, topic })
    const savedResource = await newResource.save()
    await topic.updateOne({ $push: { resources: savedResource._id } })
    const updatedResource = await ResourceModel.findById(savedResource._id)
    return res.status(201).json(updatedResource)
  } catch (error) {
    return res.status(500).end()
  }
}

export const deleteResourceById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const resource = await ResourceModel.findById(id)
  if (resource == null) return res.status(404).end()
  const topic = await TopicModel.findById(resource.topic?._id)
  try {
    await resource.deleteOne()
    if (topic != null) {
      const filterResources: mongoose.Types.ObjectId[] = []
      for (let i = 0; i < topic.resources.length; i++) {
        if (topic.resources[i].toString() !== resource._id.toString()) {
          filterResources.push(topic.resources[i])
        }
      }
      await TopicModel.findByIdAndUpdate(topic._id, { resources: filterResources })
    }
    return res.status(204).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export const editResourceImageById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const resource = await ResourceModel.findById(id)
  if (resource == null) return res.status(404).end()

  if (req.files == null || Object.keys(req.files).length === 0) return res.status(400).end()

  const sampleFile = req.files.file as UploadedFile
  const fileName = uuidv4() + '_' + sampleFile.name
  const uploadPath = path.join(__dirname, '..', 'public', 'imgs', fileName)

  try {
    await sampleFile.mv(uploadPath)
    await ResourceModel.findByIdAndUpdate(id, {
      image: `/imgs/${fileName}`
    })
    return res.status(204).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export const updateResource = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const resource = await ResourceModel.findById(id)
  if (resource == null) return res.status(404).end()

  try {
    await ResourceModel.findByIdAndUpdate(id, req.body)
    return res.status(204).end()
  } catch (error) {
    return res.status(500).end()
  }
}

import { Router } from 'express'

import { createTopic, deleteTopicById, getTopicById, getTopics, updateTopicById } from '../controllers/topics.controller'

const router = Router()

router.get('/', getTopics)
router.get('/:id', getTopicById)
router.post('/', createTopic)
router.put('/:id', updateTopicById)
router.delete('/:id', deleteTopicById)

export default router

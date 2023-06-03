import { Router } from 'express'

import { createTopic, deleteTopicById, getTopicById, getTopics } from '../controllers/topics.controller'

const router = Router()

router.get('/', getTopics)
router.get('/:id', getTopicById)
router.post('/', createTopic)
router.delete('/:id', deleteTopicById)

export default router

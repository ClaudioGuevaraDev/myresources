import { Router } from 'express'

import { createTopic, deleteTopicById, editTopicImageById, getTopicById, getTopics } from '../controllers/topics.controller'

const router = Router()

router.get('/', getTopics)
router.get('/:id', getTopicById)
router.post('/', createTopic)
router.patch('/edit-image/:id', editTopicImageById)
router.delete('/:id', deleteTopicById)

export default router

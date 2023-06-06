import { Router } from 'express'

import { createResource, deleteResourceById, editResourceImageById, getResources } from '../controllers/resources.controller'

const router = Router()

router.get('/', getResources)
router.post('/', createResource)
router.patch('/:id', editResourceImageById)
router.delete('/:id', deleteResourceById)

export default router

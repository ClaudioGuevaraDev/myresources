import { Router } from 'express'

import { createResource, deleteResourceById, editResourceImageById, getResourceById, getResources } from '../controllers/resources.controller'

const router = Router()

router.get('/', getResources)
router.get('/:id', getResourceById)
router.post('/', createResource)
router.patch('/edit-image/:id', editResourceImageById)
router.delete('/:id', deleteResourceById)

export default router

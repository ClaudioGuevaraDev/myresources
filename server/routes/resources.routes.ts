import { Router } from 'express'

import { createResource, deleteResourceById, editResourceImageById, getResourceById, getResources, updateResource } from '../controllers/resources.controller'

const router = Router()

router.get('/', getResources)
router.get('/:id', getResourceById)
router.post('/', createResource)
router.put('/:id', updateResource)
router.patch('/edit-image/:id', editResourceImageById)
router.delete('/:id', deleteResourceById)

export default router

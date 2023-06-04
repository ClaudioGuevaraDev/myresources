import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'

import { resourcesRoutes, topicsRoutes } from './routes'

const app = express()

// Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())

// Routes
app.use('/api/topics', topicsRoutes)
app.use('/api/resources', resourcesRoutes)

export default app

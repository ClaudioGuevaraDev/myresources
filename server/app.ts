import express from 'express'

import { resourcesRoutes, topicsRoutes } from './routes'

const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use('/api/topics', topicsRoutes)
app.use('/api/resources', resourcesRoutes)

export default app

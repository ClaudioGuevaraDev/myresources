import app from './app'
import { PORT } from './config'
import { connectDatabase } from './database/connection'

async function startServer (): Promise<void> {
  try {
    app.listen(PORT)
    console.log('Servidor en el puerto', PORT)
    await connectDatabase()
  } catch (error) {
    console.error('Error al iniciar el servidor')
    throw new Error()
  }
}

startServer().catch(async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 5000))
  await startServer()
})

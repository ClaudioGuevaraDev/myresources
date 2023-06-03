import { connect } from 'mongoose'

import { MONGODB_URI } from '../config'

export async function connectDatabase (): Promise<void> {
  try {
    await connect(MONGODB_URI)
    console.log('Base de datos conectada')
  } catch (error) {
    console.error('Error de conexión a la base de datos')
    throw new Error()
  }
}

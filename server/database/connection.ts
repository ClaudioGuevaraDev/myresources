import { connect } from 'mongoose'

import { MONGODB_URI } from '../config'

export async function connectDatabase (): Promise<void> {
  try {
    await connect(MONGODB_URI)
    console.log('Base de datos conectada')
  } catch (error) {
    throw new Error('Error de conexión a la base de datos')
  }
}

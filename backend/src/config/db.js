import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDb(logger = console) {
  mongoose.set('strictQuery', true)
  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 5000,
  })
  logger.info?.('Conectado ao MongoDB')
}

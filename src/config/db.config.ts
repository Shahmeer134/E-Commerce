// import mongoose from 'mongoose'
// import { env } from './env'
// import { logger } from '../utils/helpers'

// export const connectDatabase = async () => {
//   if (mongoose.connection.readyState === 1) return
//   await mongoose.connect(env.mongoUri).then(() => {
//     logger.info('Connected to MongoDB', 'Database')
//   }).catch((error) => {
//     logger.error(`MongoDB connection error: ${error}`, 'Database')
//     process.exit(1)
//   })
// }

// export const disconnectDatabase = async () => {
//   await mongoose.disconnect()
// }

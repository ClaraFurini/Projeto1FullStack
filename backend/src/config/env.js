import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/neo-monitor',
  jwtSecret: process.env.JWT_SECRET || 'super-secret-dev-key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  redisUrl: process.env.REDIS_URL || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS) || 300,
}

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import { env } from './src/config/env.js'
import { connectDb } from './src/config/db.js'
import { requestLogger } from './src/config/logger.js'
import authRoutes from './src/routes/auth.js'
import itemRoutes from './src/routes/items.js'
import healthRoutes from './src/routes/health.js'
import { seedItemsIfEmpty } from './src/config/seedData.js'

const app = express()

const allowedOrigins = env.corsOrigin.split(',').map((origin) => origin.trim())

app.use(helmet())
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
)
app.use(compression())
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
app.use(mongoSanitize())
app.use(xss())
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)
app.use(requestLogger())

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)

app.use((err, req, res) => {
  console.error('Erro interno', err)
  res.status(500).json({ message: 'Erro interno do servidor.' })
})

const start = async () => {
  try {
    await connectDb()
    await seedItemsIfEmpty()
    app.listen(env.port, () => {
      console.log(`Servidor iniciado em http://localhost:${env.port}`)
    })
  } catch (error) {
    console.error('Falha ao iniciar servidor', error)
    process.exit(1)
  }
}

start()

import express from 'express'
import { body, query, validationResult } from 'express-validator'
import Item from '../models/itemModel.js'
import { getRedisClient } from '../config/redis.js'
import { env } from '../config/env.js'
import { auditLog } from '../config/logger.js'
import { requireAuth } from './middleware.js'

const router = express.Router()

function handleValidation(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Dados inválidos', errors: errors.array() })
  }
  return null
}

router.get(
  '/feed',
  requireAuth,
  async (req, res) => {
    const redis = await getRedisClient()
    const cacheKey = 'items:feed'

    if (redis) {
      const cached = await redis.get(cacheKey)
      if (cached) {
        auditLog('items.cache.hit', { feed: true })
        return res.json({ items: JSON.parse(cached), cached: true })
      }
    }

    const items = await Item.find({}).sort({ createdAt: -1 }).limit(20)

    if (!items.length) {
      return res.status(404).json({ message: 'Nenhum objeto encontrado no banco.' })
    }

    if (redis) {
      await redis.set(cacheKey, JSON.stringify(items), { EX: env.cacheTtlSeconds })
      auditLog('items.cache.store', { feed: true })
    }

    return res.json({ items })
  },
)

router.get(
  '/',
  requireAuth,
  [query('date').isISO8601().withMessage('Informe uma data válida (YYYY-MM-DD).')],
  async (req, res) => {
    const errorResponse = handleValidation(req, res)
    if (errorResponse) return errorResponse

    const { date } = req.query
    const redis = await getRedisClient()
    const cacheKey = `items:${date}`

    if (redis) {
      const cached = await redis.get(cacheKey)
      if (cached) {
        auditLog('items.cache.hit', { date })
        return res.json({ items: JSON.parse(cached), cached: true })
      }
    }

    const items = await Item.find({ approachDate: date }).sort({ name: 1 })

    if (!items.length) {
      return res.status(404).json({ message: 'Nenhum objeto encontrado para a data informada.' })
    }

    if (redis) {
      await redis.set(cacheKey, JSON.stringify(items), { EX: env.cacheTtlSeconds })
      auditLog('items.cache.store', { date })
    }

    return res.json({ items })
  },
)

router.post(
  '/',
  requireAuth,
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Nome é obrigatório.'),
    body('approachDate').isISO8601().withMessage('Data inválida.'),
    body('magnitude').optional().isNumeric().withMessage('Magnitude deve ser numérica.'),
    body('velocity').optional().isString().trim(),
    body('distance').optional().isString().trim(),
    body('nasaUrl').optional().isURL().withMessage('URL inválida.'),
    body('isHazardous').optional().isBoolean(),
    body('orbitingBody').optional().isString().trim(),
    body('diameterMin').optional().isFloat({ min: 0 }),
    body('diameterMax').optional().isFloat({ min: 0 }),
  ],
  async (req, res) => {
    const errorResponse = handleValidation(req, res)
    if (errorResponse) return errorResponse

    const payload = {
      ...req.body,
      isHazardous: Boolean(req.body.isHazardous),
    }

    const item = await Item.create(payload)
    const redis = await getRedisClient()
    if (redis) {
      await redis.del(`items:${item.approachDate}`)
      await redis.del('items:feed')
      auditLog('items.cache.invalidate', { date: item.approachDate })
    }

    auditLog('items.create', { id: item.id, user: req.user?.email })

    return res.status(201).json({ item })
  },
)

export default router

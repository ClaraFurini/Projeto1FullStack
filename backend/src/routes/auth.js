import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import { env } from '../config/env.js'
import User from '../models/userModel.js'
import { auditLog } from '../config/logger.js'
import { requireAuth, setAuthCookie } from './middleware.js'

const router = express.Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

function handleValidation(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Dados inválidos', errors: errors.array() })
  }
  return null
}

router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Nome é obrigatório.'),
    body('email').isEmail().normalizeEmail().withMessage('E-mail inválido.'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter ao menos 6 caracteres.'),
  ],
  async (req, res) => {
    const errorResponse = handleValidation(req, res)
    if (errorResponse) return errorResponse

    const { name, email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: 'Usuário já existe.' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, env.jwtSecret, {
      expiresIn: '12h',
    })
    setAuthCookie(res, token)
    auditLog('auth.register', { email })

    return res.status(201).json({ user: user.toSafe() })
  },
)

router.post(
  '/login',
  loginLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('E-mail inválido.'),
    body('password').notEmpty().withMessage('Senha é obrigatória.'),
  ],
  async (req, res) => {
    const errorResponse = handleValidation(req, res)
    if (errorResponse) return errorResponse

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      auditLog('auth.login.failed', { email })
      return res.status(401).json({ message: 'Credenciais inválidas.' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      auditLog('auth.login.failed', { email })
      return res.status(401).json({ message: 'Credenciais inválidas.' })
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, env.jwtSecret, {
      expiresIn: '12h',
    })
    setAuthCookie(res, token)
    auditLog('auth.login.success', { email })

    return res.json({ user: user.toSafe() })
  },
)

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({ message: 'Logout efetuado.' })
})

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(401).json({ message: 'Usuário não encontrado.' })
  }
  return res.json({ user: user.toSafe() })
})

export default router

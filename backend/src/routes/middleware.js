import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function requireAuth(req, res, next) {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ message: 'Autenticação necessária.' })
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret)
    req.user = decoded
    return next()
  } catch (error) {
    console.error('Falha ao validar token', error)
    return res.status(401).json({ message: 'Sessão inválida ou expirada.' })
  }
}

export function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production',
    maxAge: 1000 * 60 * 60 * 12,
  })
}

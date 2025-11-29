import morgan from 'morgan'

export function requestLogger() {
  return morgan('combined')
}

export function auditLog(event, payload = {}) {
  const timestamp = new Date().toISOString()
  console.info(`[${timestamp}] ${event}`, payload)
}

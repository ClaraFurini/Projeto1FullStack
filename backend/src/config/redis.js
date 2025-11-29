import { createClient } from 'redis'
import { env } from './env.js'

let client = null

if (env.redisUrl) {
  client = createClient({ url: env.redisUrl })

  client.on('error', (err) => {
    console.error('Erro no Redis:', err.message)
  })
}

export async function getRedisClient() {
  if (!client) return null
  if (!client.isOpen) {
    await client.connect()
  }
  return client
}

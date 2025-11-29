import Item from '../models/itemModel.js'
import { auditLog } from './logger.js'

const sampleItems = [
  {
    name: '2024 QF1',
    isHazardous: false,
    magnitude: 21.4,
    nasaUrl: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=2024%20QF1',
    velocity: '52.300',
    distance: '1.245.000',
    approachDate: '2024-10-15',
    orbitingBody: 'Earth',
    diameterMin: 0.12,
    diameterMax: 0.25,
  },
  {
    name: 'Apophis',
    isHazardous: true,
    magnitude: 19.7,
    nasaUrl: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=99942',
    velocity: '31.720',
    distance: '3.140.000',
    approachDate: '2024-10-15',
    orbitingBody: 'Earth',
    diameterMin: 0.34,
    diameterMax: 0.39,
  },
  {
    name: 'Didymos',
    isHazardous: true,
    magnitude: 18.2,
    nasaUrl: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=65803',
    velocity: '23.150',
    distance: '7.520.000',
    approachDate: '2024-10-16',
    orbitingBody: 'Earth',
    diameterMin: 0.73,
    diameterMax: 0.18,
  },
]

export async function seedItemsIfEmpty() {
  const count = await Item.estimatedDocumentCount()
  if (count > 0) return

  await Item.insertMany(sampleItems)
  auditLog('seed.items.created', { count: sampleItems.length })
}

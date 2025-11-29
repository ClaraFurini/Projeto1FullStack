import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isHazardous: { type: Boolean, default: false },
    magnitude: { type: Number },
    nasaUrl: { type: String, trim: true },
    velocity: { type: String },
    distance: { type: String },
    approachDate: { type: String, required: true },
    orbitingBody: { type: String },
    diameterMin: { type: Number },
    diameterMax: { type: Number },
  },
  { timestamps: true },
)

const Item = mongoose.model('Item', itemSchema)
export default Item

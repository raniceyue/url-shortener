import { Schema, model } from 'mongoose'

export interface IUrl {
  short: string;
  long: string;
  visited: number;
  createdAt: Date;
}

const schema = new Schema<IUrl>({
  short: { type: String, required: true },
  long: { type: String, required: true },
  visited: { type: Number, required: false, default: 0},
  createdAt: {
    type: Date,
    expires: 60 * 60 * 24 * 30,
    default: new Date()
  }
}, { collection: 'urls' })

export var Url = model('Url', schema)

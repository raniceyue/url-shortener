import { Schema, model } from 'mongoose'

export interface IUrl {
  short: string;
  long: string;
  createdAt: Date;
}

const schema = new Schema<IUrl>({
  short: { type: String, required: true },
  long: { type: String, required: true },
  createdAt: {
    type: Date,
    expires: 60 * 60 * 24 * 30,
    default: new Date()
  }
}, { collection: 'urls' })

export var Url = model('Url', schema)

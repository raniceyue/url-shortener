import { Schema, model } from 'mongoose'

export interface IUrl {
  short: string;
  long: string;
}

const schema = new Schema<IUrl>({
  short: { type: String, required: true },
  long: { type: String, required: true}
}, { collection: 'urls' })

export var Url = model('Url', schema)

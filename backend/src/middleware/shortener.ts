import createHash from 'create-hash'

export function hash(url: string) {
  return createHash('sha256')
    .update(url)
    .digest('hex');
}
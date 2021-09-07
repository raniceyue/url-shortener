import { hash } from '../../../services/helper'

export async function createShort(req: any, res: any) {
  try {
    // const data = {
    //   "cookie": req.body.cookie,
    //   "expiry": req.body.expiry,
    //   "short": req.body.short,
    //   "long": req.body.long
    // }

    // Store in database
  } catch (e) {
    res.status(500).send({
      message: "An error occurred and we could not create the short link!",
      isSuccess: false,
      error: e
    })
  }
}

export async function generateShortcode(req: any, res: any) {
  try {
    // Generate short code
    res.status(200)
      .send(hash(req.params.long_url))
  } catch (e) {
    res.status(500).send({
      message: "Failed to generate short code",
      isSuccess: false,
      error: e
    })
  }
}
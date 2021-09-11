import { hash } from '../../../services/helper'
import { Url } from './model'

export async function createShort(req: any, res: any) {
  try {
    const url = new Url()
    const short = hash(req.body.long)
    
    // Check if DB already has the link
    let doc = await Url.findOne({ short: short })

    if (!doc) {

      url.short = short
      url.long = req.body.long

      await url.save()

      res.status(200).json({
        message: 'New short link created',
        isSuccess: true,
        data: url
      })
    } else {
      // Update the expiry date of the shortlink if the link already exists
      
      doc.createdAt = new Date()

      await doc.save()

      res.status(200).json({
        message: 'Short link already exists, so just updating the time of creation to extend the expiry date',
        isSuccess: true,
        data: url
      })
    }

  } catch (error) {
    res.status(500).send({
      message: 'An error occurred and we could not create the short link',
      isSuccess: false,
      error: error
    })
    console.log(error)
  }
}

export async function getLong(req: any, res: any) {
  try {
    let doc = await Url.findOne({ short: req.params.short })

    if (!doc) {
      res.status(404).send({
        message: 'We could not find the long link for this short link',
        isSuccess: false,
        data: req.body.short
      })
    } else {
      res.status(200).send({
        message: 'Successfuly found the long link for this short',
        isSuccess: true,
        data: doc
      })
    }

  } catch (error) {
    res.status(500).send({
      message: 'An error occured and we could not get the long link for this short link',
      isSuccess: false,
      error: error
    })
    console.log(error)
  }
}
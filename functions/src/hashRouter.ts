import express from 'express'
import crypto from 'crypto'

const router = express.Router()
router.get('/', (req, res) => {
  // if (!req.headers.authorization) {
  //     return res.status(403).json({ error: "No credentials sent!" })
  // }
  // ...
  // Validate authorization header or auth from your system
  // ...

  const { email } = req.query
  const token = crypto
    .createHmac('sha256', CONFIG.billing.secretKey)
    .update(email)
    .digest('hex')
  return res.status(200).send({ token })
})

export default router

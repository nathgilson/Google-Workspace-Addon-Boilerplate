import express from "express"
import crypto from "crypto"

const router = express.Router()
router.get("/", (req, res) => {
  const { email }: any = req.query
  const token = crypto.createHmac("sha256", CONFIG.billing.secretKey).update(email).digest("hex")
  return res.status(200).send({ token })
})

export default router

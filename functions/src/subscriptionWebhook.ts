import express from "express"
import { firestore } from "../utils/firebase"
import stripe from "../utils/stripe"
import { reportError } from "../utils/stackDriverLogger"

const router = express.Router()

router.get("/", (req, res) => {
  // health check endpoint
  res.status(200).send({ data: "up and running" })
})

router.post("/", (req: any, res: any) => {
  let event
  try {
    // check stripe event signature
    event = stripe.webhooks.constructEvent(req.rawBody, req.headers["stripe-signature"], CONFIG.stripe.webhookSecret)
  } catch (error) {
    //   reportError(
    //     error,
    //     { request: req, details: 'stripe-signature check error' },
    //     req
    //   )
    console.error(error)
    return res.status(400).send({ error })
  }

  if (!event || !event.type || !event.data?.object) return res.status(400).send({ event, error: "Missing data" })

  const { status, customer: customerId, id: subscriptionId } = event.data.object

  const { id: plan } = event.data.object?.plan

  return stripe.customers
    .retrieve(customerId)
    .then((customer: any) => {
      if (customer.deleted) {
        throw Error(`Customer was deleted`)
      }
      return customer.email
    })
    .then((email) => {
      switch (event.type) {
        // CREATED
        case "customer.subscription.created":
          return firestore
            .collection("users")
            .doc(email)
            .set(
              {
                subscriptionId,
                status,
                plan
              },
              { merge: true }
            )
            .then(() => res.status(200).send({ event, status: "created" }))

        // UPDATED
        case "customer.subscription.updated":
          return firestore
            .collection("users")
            .doc(email)
            .set(
              {
                subscriptionId,
                status,
                plan
              },
              { merge: true }
            )
            .then(() => res.status(200).send({ event, status: "updated" }))

        // DELETED
        case "customer.subscription.deleted":
          return firestore
            .collection("users")
            .doc(email)
            .set(
              {
                subscriptionId,
                status,
                plan
              },
              { merge: true }
            )
            .then(() => res.status(200).send({ event, status: "deleted" }))

        default:
          return res.status(404).send({ event, error: "unknown event" })
      }
    })
    .catch((error) => {
      console.error(`>> WEBHOOK ERROR: ${error}`)
      return res.status(400).send({ event, error: error.message || "Customer not found" })
    })
})

export default router

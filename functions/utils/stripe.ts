import Stripe from 'stripe'

const stripe = new Stripe(CONFIG.stripe.secretKey, { apiVersion: '2020-08-27' })

export { Stripe }

export default stripe

import * as functions from "firebase-functions"
import * as express from "express"

import hashRouter from "./hashRouter"
import subscriptionWebhook from "./subscriptionWebhook"
import trackingLogger from "./trackingLogger"
import trialExtended from "./trialExtended"
import { initStackDriverLogger, reportError } from "../utils/stackDriverLogger"

// STACKDRIVER:
initStackDriverLogger()

// WRAPPED APP HANDLER:
const wrappedAppHandler = (handler) => {
  const app: any = express()
  const cors = require("cors")({ origin: true })
  app.use(cors)
  handler(app)
  app.use((err, req, res, next) => {
    reportError(err, { request: req }, req)
    console.error(err)
    res.statusCode = 500
    res.end()
  })
  return app
}

// FUNCTIONS:
// 🤖 Email tracker:
exports.trackingLogger = functions.https.onRequest(wrappedAppHandler(trackingLogger))
// 🤖 Trial Extender:
exports.trialExtended = functions.https.onRequest(wrappedAppHandler(trialExtended))

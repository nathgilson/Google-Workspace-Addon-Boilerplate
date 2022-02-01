import cors from "cors"
import * as express from "express"
import * as functions from "firebase-functions"
import { reportError } from "../utils/stackdriverLogger"
import trackingLogger from "./trackingLogger"

require("firebase-functions/lib/logger/compat") // Prettify logs in firebase

/*************************************************
 *                    🤖 API
 ************************************************/
// 🔼 Express app can be called with an HTTP request https://firebase.google.com/docs/functions/http-events
const app = express()
const corsConfig = cors({ origin: true })
// 1️⃣ set request handler:
app.use(corsConfig)
// 2️⃣ set the app controllers: [EDIT HERE ✍🏻]
app.use("/trackingLogger", trackingLogger)

// health check
app.get("/", (req, res) => res.status(200).json({ status: "ok" }))

// 3️⃣ set error handler:
app.use((err, req, res, next) => {
  console.error(err)
  reportError(err, { request: req, details: "API Error" }, req)
  res.status(500).json({ error: err.message || "An unknown error occurred." })
})
// 4️⃣ export:
exports.api = functions.https.onRequest(app)

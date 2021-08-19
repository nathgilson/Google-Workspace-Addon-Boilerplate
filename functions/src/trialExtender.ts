/* eslint-disable import/first */
import { firestore } from "../utils/firebase"

export default (app) => {
  app.post("/", (req, res) => {
    const { email } = req.body

    // Push recipient read event
    return firestore
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        if (!doc.exists) return res.sendStatus(400)
        firestore.collection("users")?.doc(email).update({
          trialExtended: Date.now()
        })
        return res.sendStatus(200)
      })
      .catch((e) => {
        console.error("Error:", e)
      })
  })
}

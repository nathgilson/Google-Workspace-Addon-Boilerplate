/* eslint-disable import/first */
import cors from "cors"
import atob from "atob"
import admin from "firebase-admin"

import { firestore } from "../utils/firebase"
import { TrackingMeta } from "../../addon/src/types"

const trackingLogger = (req: any, res: any) => {
  cors({ origin: true })(req, res, () => {
    const mailEvent = JSON.parse(atob(req.url.replace("/", ""))) as TrackingMeta

    const docRef = firestore
      .collection("users")
      .doc(mailEvent.se) // sender email
      .collection("trackingSpreadsheet")
      .doc(mailEvent.sp) // spreadsheet id
      .collection("sheet")
      .doc(mailEvent.sh) // sheet id
      .collection("campaigns")
      .doc(mailEvent.ca) // campaign id

    // Push recipient read event
    docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          docRef.set({
            recipients: [mailEvent.re]
          })
        } else {
          docRef.update({
            recipients: admin.firestore.FieldValue.arrayUnion(mailEvent.re)
          })
        }
        res.sendStatus(200)
      })
      .catch((e) => {
        console.error("Error:", e)
      })
  })
}

export default trackingLogger

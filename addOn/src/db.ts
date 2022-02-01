declare const FirestoreApp: any
import config from "../config"

const { client_email, private_key, project_id } = config.firebaseSecret
const firestore = FirestoreApp.getFirestore(client_email, private_key, project_id)
const getUserEmail = (): any => Session.getEffectiveUser().getEmail() // or Session.getActiveUser()
const timestamp = Date.now()
const domain = getUserEmail()?.split("@")[1] || ""

export const fetchUserData = (): any => {
  let userDocument = null
  // 1️⃣ TRY TO FETCH USER
  try {
    userDocument = firestore.getDocument(`users/${getUserEmail()}`)?.obj
  } catch (error) {
    console.warn(`>> New user: ${getUserEmail() || "unknown"}:`)
  }
  if (userDocument) return userDocument
  // 2️⃣ IF DOESNT EXIST => CREATE NEW USER IN DB
  const newUserObject = {
    userEmail: getUserEmail(),
    createdAt: timestamp
  }
  firestore.createDocument(`users/${getUserEmail()}`, newUserObject)
  Utilities.sleep(1000)
  // 3️⃣ NOW TRY AGAIN WITH NEW CREATED USER
  try {
    userDocument = firestore.getDocument(`users/${getUserEmail()}`)?.obj
  } catch (error) {
    console.warn(`>> Error with ${getUserEmail() || "unknown"}:`)
    console.error(error)
  }
  if (userDocument) return userDocument
  // 4️⃣ FAILSAFE
  return newUserObject
}

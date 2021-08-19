import * as adminSDK from 'firebase-admin'

adminSDK.initializeApp({
  credential: adminSDK.credential.cert(CONFIG.firebase)
})

export const storage = adminSDK.storage()
export const auth = adminSDK.auth()
export const firestore = adminSDK.firestore()
export const admin = adminSDK

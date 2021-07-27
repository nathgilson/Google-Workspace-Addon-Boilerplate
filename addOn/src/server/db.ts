import config from './config'

declare const FirestoreApp: any

// eslint-disable-next-line camelcase
const { client_email, private_key, project_id } = config.firebaseSecret
export const firestore = FirestoreApp.getFirestore(client_email, private_key, project_id)

const getUserEmail = (): any => Session.getEffectiveUser().getEmail() // or Session.getActiveUser()
const timestamp = Date.now()
const domain = getUserEmail()?.split('@')[1] || ''

export const fetchUserData = (): any => {
  let userDocument = null
  // TRY TO FETCH USER
  try {
    userDocument = firestore.getDocument(`users/${getUserEmail()}`)?.obj
  } catch (error) {
    console.warn(`>> New user: ${getUserEmail() || 'unknown'}:`)
  }
  if (userDocument) return userDocument
  // IF DOESNT EXIST => CREATE NEW USER IN DB
  const newUserObject = {
    userEmail: getUserEmail(),
    domain,
    createdAt: timestamp,
    isBrandingRemoved: false,
    trackingIsActivated: false,
    status: 'trialing',
    templates: {
      default: {
        advancedContent: config.defaultAdvancedContent,
        content: config.defaultContent,
        createdAt: timestamp,
        editedOn: timestamp,
        id: 'default',
        name: 'My first template',
        subject: 'I found a mail merge tool for Gmail',
      },
    },
  }
  firestore.createDocument(`users/${getUserEmail()}`, newUserObject)
  Utilities.sleep(1000)
  // NOW TRY AGAIN WITH NEW CREATED USER
  try {
    userDocument = firestore.getDocument(`users/${getUserEmail()}`)?.obj
  } catch (error) {
    console.warn(`>> Error with ${getUserEmail() || 'unknown'}:`)
    console.error(error)
  }
  if (userDocument) return userDocument
  // FAILSAFE
  return newUserObject
}

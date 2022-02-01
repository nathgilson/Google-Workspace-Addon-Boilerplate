import * as common from "./common"
import * as gmail from "./gmail"
import * as props from "./props"
import * as db from "./db"

declare const global: any

// Init add-on when google app opens:
global.onOpen = (e: any) => common.createCatCard("good morning", true)

// COMMON
global.createCatCard = common.createCatCard
global.onChangeCat = common.onChangeCat
global.truncate = common.truncate

// GMAIL
global.onGmailMessage = gmail.onGmailMessage
global.onGmailCompose = gmail.onGmailCompose
global.onGmailInsertCat = gmail.onGmailInsertCat

// PROPS
global.setUserProperties = props.setUserProperties
global.getUserProperties = props.getUserProperties
global.deleteUserProperties = props.deleteUserProperties
global.deleteScriptProperties = props.deleteScriptProperties

// DB
global.fetchUserData = db.fetchUserData

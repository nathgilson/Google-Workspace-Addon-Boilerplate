import * as common from "./common"
import * as gmail from "./gmail"
import * as props from "./props"
import * as db from "./db"

declare const global: any

// COMMON
global.onOpen = (e: any) => common.createCatCard("good morning", true)
global.createCatCard = common.createCatCard
global.onChangeCat = common.onChangeCat

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

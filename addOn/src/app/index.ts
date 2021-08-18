import * as props from "./props"
import * as ui from "./ui"
import * as db from "./db"

declare const global: any

// Init add-on when google app opens:
global.onOpen = (e: any) => ui.createCatCard("good morning", true)

// UI
global.createCatCard = ui.createCatCard
global.onChangeCat = ui.onChangeCat
global.truncate = ui.truncate

// PROPS
global.setUserProperties = props.setUserProperties
global.getUserProperties = props.getUserProperties
global.deleteUserProperties = props.deleteUserProperties
global.deleteScriptProperties = props.deleteScriptProperties

// DB
global.fetchUserData = db.fetchUserData

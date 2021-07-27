import * as props from './props'
import * as ui from './ui'
import * as db from './db'
import * as sheet from './sheet'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

// PROPS
global.setUserProperties = props.setUserProperties
global.getUserProperties = props.getUserProperties
global.deleteUserProperties = props.deleteUserProperties
global.deleteScriptProperties = props.deleteScriptProperties

// UI
global.onOpen = ui.onOpen
global.openModal = ui.openModal

// DB
global.fetchUserData = db.fetchUserData

// SHEET
global.getSheetId = sheet.getSheetId
global.getSheetData = sheet.getSheetData

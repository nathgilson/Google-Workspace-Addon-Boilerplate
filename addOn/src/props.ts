// User properties & script properties are the equivalent of the local storage for Gscript add-ons:

// USER PROPERTY:
export const setUserProperty = (uid: string, property: any) =>
  PropertiesService?.getUserProperties()?.setProperty(uid, property)
export const getUserProperty = (uid: string) => PropertiesService?.getUserProperties()?.getProperty(uid)
export const deleteUserProperty = (uid: string) => {
  console.log("⏩ deleting user prop")
  PropertiesService?.getUserProperties()?.deleteProperty(uid)
}

// USER PROPERTIES:
export const setUserProperties = (properties: any) => PropertiesService?.getUserProperties()?.setProperties(properties)
export const getUserProperties = () => PropertiesService?.getUserProperties()?.getProperties()
export const deleteUserProperties = () => {
  console.log("⏩ deleting user props")
  return PropertiesService?.getUserProperties()?.deleteAllProperties()
}

// SCRIPT PROPERTIES:
export const setScriptProperty = (properties: any) =>
  PropertiesService?.getScriptProperties()?.setProperties(properties)
export const deleteScriptProperties = () => {
  console.log("⏩ deleting script props")
  return PropertiesService?.getScriptProperties()?.deleteAllProperties()
}

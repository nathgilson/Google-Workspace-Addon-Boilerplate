// PROPERTIES:
export const setUserProperties = (properties: any) =>
  PropertiesService?.getUserProperties()?.setProperties(properties)

export const getUserProperties = () =>
  PropertiesService?.getUserProperties()?.getProperties()

export const deleteUserProperties = () => {
  console.log('⏩ deleting user props')
  return PropertiesService?.getUserProperties()?.deleteAllProperties()
}

// PROPERTY:
export const setUserProperty = (uid: string, properties: any) =>
  PropertiesService?.getUserProperties()?.setProperty(uid, properties)

export const getUserProperty = (uid: string) =>
  PropertiesService?.getUserProperties()?.getProperty(uid)

export const deleteUserProperty = (uid: string) =>
  PropertiesService?.getUserProperties()?.deleteProperty(uid)

// SCRIPT PROPS
export const deleteScriptProperties = () => {
  console.log('⏩ deleting script props')
  return PropertiesService?.getScriptProperties()?.deleteAllProperties()
}

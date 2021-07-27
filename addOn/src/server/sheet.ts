const sheet = () => SpreadsheetApp.getActiveSheet()
const range = () => sheet().getDataRange()

export const getSheetId: any = () => {
  const id = SpreadsheetApp.getActiveSpreadsheet().getId()
  return id
}

export const getSheetData: any = () => range().getDisplayValues()

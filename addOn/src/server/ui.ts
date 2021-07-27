export const onOpen = (event: any): void => {
  // Add add-on in menu
  const menu = SpreadsheetApp.getUi().createAddonMenu()
  menu.addItem('▶️‏‏‎ ‎‏‏‎ ‎Start', 'openModal')
  menu.addToUi()
}

export const openModal = (): void => {
  const html = HtmlService.createHtmlOutputFromFile('Modal').setWidth(900).setHeight(600)
  SpreadsheetApp.getUi().showModalDialog(html, 'Mail Merge for Gmail 📣')
}

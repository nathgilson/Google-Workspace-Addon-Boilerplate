export const createCatCard = (text: string, isHomepage?: boolean) => {
  // Explicitly set the value of isHomepage as false if null or undefined.
  if (!isHomepage) {
    isHomepage = false
  }
  const now = new Date()
  // Replace formward slashes in the text, as they break the CataaS API.
  const caption = text.replace(/\//g, " ")
  const imageUrl = Utilities.formatString(
    "https://cataas.com/cat/says/%s?time=%s",
    // @ts-ignore
    encodeURIComponent(caption),
    now.getTime()
  )
  const image = CardService.newImage().setImageUrl(imageUrl).setAltText("Meow")
  const action = CardService.newAction()
    .setFunctionName("onChangeCat")
    .setParameters({ text: text, isHomepage: isHomepage.toString() })
  const button = CardService.newTextButton()
    .setText("Change cat t")
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  const buttonSet = CardService.newButtonSet().addButton(button)
  const footer = CardService.newFixedFooter().setPrimaryButton(
    CardService.newTextButton()
      .setText("Powered by cataas.com")
      .setOpenLink(CardService.newOpenLink().setUrl("https://cataas.com"))
  )
  const section = CardService.newCardSection().addWidget(image).addWidget(buttonSet)
  const card = CardService.newCardBuilder().addSection(section).setFixedFooter(footer)
  if (!isHomepage) {
    const peekHeader = CardService.newCardHeader()
      .setTitle("Contextual Cat")
      .setImageUrl("https://www.gstatic.com/images/icons/material/system/1x/pets_black_48dp.png")
      .setSubtitle(text)
    card.setPeekCardHeader(peekHeader)
  }

  return card.build()
}

export const onChangeCat = (e: { parameters: { text: any; isHomepage: string } }) => {
  console.log(e)
  const text = e.parameters.text
  const isHomepage = e.parameters.isHomepage === "true"
  const card = createCatCard(text, isHomepage)
  const navigation = CardService.newNavigation().updateCard(card)
  const actionResponse = CardService.newActionResponseBuilder().setNavigation(navigation)
  return actionResponse.build()
}

export const truncate = (message: string) => {
  if (message.length > 40) {
    message = message.slice(0, 40)
    message = message.slice(0, message.lastIndexOf(" ")) + "..."
  }
  return message
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable object-shorthand */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */

export const createCatCard = (text: string, isHomepage: boolean) => {
  // Explicitly set the value of isHomepage as false if null or undefined.
  if (!isHomepage) {
    isHomepage = false
  }
  var now = new Date()
  // Replace formward slashes in the text, as they break the CataaS API.
  var caption = text.replace(/\//g, ' ')
  var imageUrl = Utilities.formatString(
    'https://cataas.com/cat/says/%s?time=%s',
    // @ts-ignore
    encodeURIComponent(caption),
    now.getTime()
  )
  var image = CardService.newImage().setImageUrl(imageUrl).setAltText('Meow')
  var action = CardService.newAction()
    .setFunctionName('onChangeCat')
    .setParameters({ text: text, isHomepage: isHomepage.toString() })
  var button = CardService.newTextButton()
    .setText('Change cat')
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  var buttonSet = CardService.newButtonSet().addButton(button)
  var footer = CardService.newFixedFooter().setPrimaryButton(
    CardService.newTextButton()
      .setText('Powered by cataas.com')
      .setOpenLink(CardService.newOpenLink().setUrl('https://cataas.com'))
  )
  var section = CardService.newCardSection().addWidget(image).addWidget(buttonSet)
  var card = CardService.newCardBuilder().addSection(section).setFixedFooter(footer)

  if (!isHomepage) {
    var peekHeader = CardService.newCardHeader()
      .setTitle('Contextual Cat')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/pets_black_48dp.png')
      .setSubtitle(text)
    card.setPeekCardHeader(peekHeader)
  }

  return card.build()
}

export const onChangeCat = (e: { parameters: { text: any; isHomepage: string } }) => {
  console.log(e)
  var text = e.parameters.text
  var isHomepage = e.parameters.isHomepage === 'true'
  var card = createCatCard(text, isHomepage)
  var navigation = CardService.newNavigation().updateCard(card)
  var actionResponse = CardService.newActionResponseBuilder().setNavigation(navigation)
  return actionResponse.build()
}

export const truncate = (message: string) => {
  if (message.length > 40) {
    message = message.slice(0, 40)
    message = message.slice(0, message.lastIndexOf(' ')) + '...'
  }
  return message
}

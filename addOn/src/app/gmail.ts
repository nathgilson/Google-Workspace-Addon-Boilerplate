import { createCatCard, truncate } from "./common"

export const onGmailMessage = (e) => {
  console.log(e)
  // Get the ID of the message the user has open.
  var messageId = e.gmail.messageId
  // Get an access token scoped to the current message and use it for GmailApp
  // calls.
  var accessToken = e.gmail.accessToken
  GmailApp.setCurrentMessageAccessToken(accessToken)
  // Get the subject of the email.
  var message = GmailApp.getMessageById(messageId)
  var subject = message.getThread().getFirstMessageSubject()
  // Remove labels and prefixes.
  subject = subject.replace(/^([rR][eE]|[fF][wW][dD])\:\s*/, "").replace(/^\[.*?\]\s*/, "")
  // If neccessary, truncate the subject to fit in the image.
  subject = truncate(subject)
  return createCatCard(subject)
}

export const onGmailCompose = (e) => {
  console.log(e)
  var header = CardService.newCardHeader()
    .setTitle("Insert cat")
    .setSubtitle("Add a custom cat image to your email message.")
  // Create text input for entering the cat's message.
  var input = CardService.newTextInput()
    .setFieldName("text")
    .setTitle("Caption")
    .setHint("What do you want the cat to say?")
  // Create a button that inserts the cat image when pressed.
  var action = CardService.newAction().setFunctionName("onGmailInsertCat")
  var button = CardService.newTextButton()
    .setText("Insert cat")
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  var buttonSet = CardService.newButtonSet().addButton(button)
  // Assemble the widgets and return the card.
  var section = CardService.newCardSection().addWidget(input).addWidget(buttonSet)
  var card = CardService.newCardBuilder().setHeader(header).addSection(section)
  return card.build()
}

export const onGmailInsertCat = (e) => {
  console.log(e)
  // Get the text that was entered by the user.
  var text = e.formInput.text
  // Use the "Cat as a service" API to get the cat image. Add a "time" URL
  // parameter to act as a cache buster.
  var now = new Date()
  var imageUrl = "https://cataas.com/cat"
  if (text) {
    // Replace formward slashes in the text, as they break the CataaS API.
    var caption = text.replace(/\//g, " ")
    imageUrl += Utilities.formatString(
      "/says/%s?time=%s",
      // @ts-ignore
      encodeURIComponent(caption),
      now.getTime()
    )
  }
  var imageHtmlContent = '<img style="display: block; max-height: 300px;" src="' + imageUrl + '"/>'
  var response = CardService.newUpdateDraftActionResponseBuilder()
    .setUpdateDraftBodyAction(
      CardService.newUpdateDraftBodyAction()
        .addUpdateContent(imageHtmlContent, CardService.ContentType.MUTABLE_HTML)
        .setUpdateType(CardService.UpdateDraftBodyType.IN_PLACE_INSERT)
    )
    .build()
  return response
}

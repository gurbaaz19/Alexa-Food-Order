/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require("ask-sdk-core");

var name = null;
var phone = null;

var writtenMenuFood =
    "1) Masala Dosa 40\n2) Chicken Fried Rice 70\n3) Chicken Noodles 70",
  oralMenuFood = "Masala Dosa 40, Chicken Fried Rice 70, Chicken Noodles 70",
  writtenMenuDrinks = "1) Coke 20\n2) Sprite 20\n3) Maaza 15",
  oralMenuDrinks = "Coke 20, Sprite 20, Maaza 15";

var foodQuantity1 = 0,
  foodQuantity2 = 0,
  foodQuantity3 = 0,
  drinksQuantity1 = 0,
  drinksQuantity2 = 0,
  drinksQuantity3 = 0,
  gst = 0,
  subtotal = 0,
  total = 0;

let dosa = "",
  rice = "",
  noodles = "",
  coke = "",
  sprite = "",
  maaza = "";

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "Welcome to Flaming Foods !!! Please give your name and mobile number to continue.";
    const repromptOutput =
      "Please give your name and mobile number to continue.";
    let cardTitle = "Welcome to Flaming Foods !!!";
    let cardContent = repromptOutput;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  },
};

const CustomerAuthenticationIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "CustomerAuthenticationIntent"
    );
  },
  handle(handlerInput) {
    const slotNames = handlerInput.requestEnvelope.request.intent.slots;
    name = slotNames.Name.value;
    phone = slotNames.Phone.value;
    const speakOutput = `Welcome ${name}, What would you like to order: ${oralMenuFood}`;
    const cardTitle = "Menu";
    const cardContent = writtenMenuFood;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  },
};

const OrderFoodIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "OrderFoodIntent"
    );
  },
  handle(handlerInput) {
    const slotNames = handlerInput.requestEnvelope.request.intent.slots;

    foodQuantity1 = slotNames.foodQuantityOne.value;
    foodQuantity2 = slotNames.foodQuantityTwo.value;
    foodQuantity3 = slotNames.foodQuantityThree.value;

    if (isNaN(foodQuantity1)) {
      foodQuantity1 = 0;
      dosa = "";
    } else {
      dosa = ", " + foodQuantity1 + " Masala Dosa";
    }
    if (isNaN(foodQuantity2)) {
      foodQuantity2 = 0;
      rice = "";
    } else {
      rice = ", " + foodQuantity2 + " Chicken Fried Rice";
    }
    if (isNaN(foodQuantity3)) {
      foodQuantity3 = 0;
      noodles = "";
    } else {
      noodles = ", " + foodQuantity3 + " Chicken Noodles";
    }

    const speakOutput = `So you have ordered${dosa}${rice}${noodles}. Would you like to have some drinks? The Menu is as follows: ${oralMenuDrinks} `;
    let cardTitle = "Thanks for ordering, the available drinks are as follows:";
    let cardContent = writtenMenuDrinks;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  },
};

const OrderDrinksIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "OrderDrinksIntent"
    );
  },
  handle(handlerInput) {
    const slotNames = handlerInput.requestEnvelope.request.intent.slots;

    drinksQuantity1 = slotNames.drinksQuantityOne.value;
    drinksQuantity2 = slotNames.drinksQuantityTwo.value;
    drinksQuantity3 = slotNames.drinksQuantityThree.value;

    if (isNaN(drinksQuantity1)) {
      drinksQuantity1 = 0;
      coke = "";
    } else {
      coke = ", " + drinksQuantity1 + " Coke";
    }
    if (isNaN(drinksQuantity2)) {
      drinksQuantity2 = 0;
      sprite = "";
    } else {
      sprite = ", " + drinksQuantity2 + " Sprite";
    }
    if (isNaN(drinksQuantity3)) {
      drinksQuantity3 = 0;
      maaza = "";
    } else {
      maaza = ", " + drinksQuantity3 + " Maaza";
    }

    subtotal =
      foodQuantity1 * 40 +
      foodQuantity2 * 70 +
      foodQuantity3 * 70 +
      drinksQuantity1 * 20 +
      drinksQuantity2 * 20 +
      drinksQuantity3 * 15;
    total = subtotal * 1.05;

    const speakOutput = `So you have ordered${dosa}${rice}${noodles}${coke}${sprite}${maaza} and your Subtotal is ${subtotal} with a 5% GST, making the total ${total} . Do you confirm your order, if "NO", then please mention the food items and their quantity again.`;
    let cardTitle = "Please Confirm the order";
    let cardContent = `You have ordered:${dosa}${rice}${noodles}${coke}${sprite}${maaza}\nSubtotal: ${subtotal}\nGST 5%\nTotal: ${total}`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  },
};

const FinishOrderingIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "FinishOrderingIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = `Thanks for ordering, your food will be delivered shortly.`;
    let cardTitle = "Thanks for ordering";
    let cardContent = `Your food is being prepared.\nTotal: Rs.${total}`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  },
};
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "You can say hello to me! How can I help?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Goodbye!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Sorry, I don't know about that. Please try again.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Sorry, I had trouble doing what you asked. Please try again.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    CustomerAuthenticationIntentHandler,
    OrderFoodIntentHandler,
    OrderDrinksIntentHandler,
    FinishOrderingIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();

"use strict";

let appId = process.env.APP_ID || undefined;

const Alexa = require("alexa-sdk");
const XboxOn = require("./XboxOn");

let xbox = new XboxOn({
  "xbox_ip": process.env.IP_ADDRESS,
  "xbox_id": process.env.LIVE_DEVICE_ID,
  "card_title": process.env.CARD_TITLE || "Powering your XBox on.",
  "card_content": process.env.CARD_CONTENT || "",
  "responses": [
    "Starting Xbox."
  ]
});

let handlers = {
  "LaunchRequest": function() {
    xbox.on(this);
  },

  "TurnOnXboxIntent": function() {
    xbox.on(this);
  }
};

exports.handler = function(event, context) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

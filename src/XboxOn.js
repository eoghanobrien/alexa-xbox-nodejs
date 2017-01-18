"use strict";

const XboxOnOff = require("xbox-onoff");

class XboxOn {
  constructor(options) {
    this.options = Object.assign({
      "xbox_ip": "",
      "xbox_id": "",
      "card_title": "",
      "card_content": "",
      "responses": []
    }, options);
    this.DEFAULT_RESPONSE = "Starting Xbox.";
  }

  _getRandomMessage() {
    if (! this.options.responses.length) return this.DEFAULT_RESPONSE;
    return this.options.responses[
      Math.floor(Math.random() * this.options.responses.length)
    ];
  }

  _sendCard(alexa) {
    let title = this.options.card_title;
    let content = this.options.card_content;
    let message = this._getRandomMessage();

    alexa.emit(":tellWithCard", message, title, content);
  }

  on(alexa) {
    let xbox = new XboxOnOff({
      ip: this.options.xbox_ip,
      id: this.options.xbox_id
    });
    let self = this;
    xbox.powerOn(() => {
      self._sendCard(alexa);
    });
  }
}

module.exports = XboxOn;

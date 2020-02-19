"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errorString = error => {
  let newString = error.message.replace('/', '').replace(/"/g, '');

  if (error.details[0].type === 'object.missing') {
    newString = newString.replace('value', 'The request').replace(',', ' or').replace('[', '').replace('one of', 'a').replace(']', '');
  }

  return newString;
};

exports.default = errorString;
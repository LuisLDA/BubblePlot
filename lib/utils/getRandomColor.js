"use strict";

exports.__esModule = true;
exports.getRandomColor = void 0;

var getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

exports.getRandomColor = getRandomColor;
"use strict";

exports.__esModule = true;
exports.mapToBubbleData = void 0;
var _getImageUser = require("../utils/getImageUser");
var mapToBubbleData = (data, filterAxisX, filterAxisY) => {
  return data.map(item => {
    return {
      "id_page": item.id_page,
      "title": item.id,
      "user": item.username,
      "red": item.red_name,
      "x": item[filterAxisX],
      "y": item[filterAxisY],
      "value": item.interactions,
      bulletSettings: {
        src: (0, _getImageUser.getImageUser)(item.id_page, item.username, item.red)
      }
    };
  });
};
exports.mapToBubbleData = mapToBubbleData;
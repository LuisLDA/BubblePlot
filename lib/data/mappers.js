"use strict";

exports.__esModule = true;
exports.mapToBubbleData = void 0;
var _getImageUser = require("../utils/getImageUser");
var mapToBubbleData = (data, filterAxisX, filterAxisY) => {
  return data.map(item => {
    return {
      "id_page": item.ID_PAGE,
      "title": item.ID,
      "user": item.USERNAME,
      "red": item.RED_NAME,
      "x": item[filterAxisX],
      "y": item[filterAxisY],
      "value": item.interactions,
      bulletSettings: {
        src: (0, _getImageUser.getImageUser)(item.ID_PAGE, item.USERNAME, item.RED)
      }
    };
  });
};
exports.mapToBubbleData = mapToBubbleData;
"use strict";

exports.__esModule = true;
exports.mapToBubbleData = void 0;

var _getImageUser = require("../utils/getImageUser");

var _icons = _interopRequireDefault(require("./icons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapToBubbleData = (data, filterAxisX, filterAxisY) => {
  return data.map(item => {
    // Intenta convertir a número, si falla asigna 0
    var xValue = Number(item[filterAxisX]);
    var yValue = Number(item[filterAxisY]);
    return {
      "ID_PAGE": item.ID_PAGE,
      "title": item.ID,
      "user": item.USERNAME,
      "red": item.RED_NAME || _icons.default[item.RED - 1].red,
      "x": isNaN(xValue) ? 0 : xValue,
      "y": isNaN(yValue) ? 0 : yValue,
      "value": item.Seguidores || 0,
      bulletSettings: {
        src: (0, _getImageUser.getImageUser)(item.ID_PAGE, item.USERNAME, item.RED)
      },
      "icon": {
        src: _icons.default[item.RED - 1].src
      }
    };
  });
};

exports.mapToBubbleData = mapToBubbleData;
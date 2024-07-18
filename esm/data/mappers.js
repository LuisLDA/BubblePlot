import { getImageUser } from "../utils/getImageUser";
import icons from "./icons";
export var mapToBubbleData = (data, filterAxisX, filterAxisY) => {
  return data.map(item => {
    // Intenta convertir a número, si falla asigna 0
    var xValue = Number(item[filterAxisX]);
    var yValue = Number(item[filterAxisY]);
    return {
      "ID_PAGE": item.ID_PAGE,
      "title": item.ID,
      "user": item.USERNAME,
      "red": item.RED_NAME || icons[item.RED - 1].red,
      "x": isNaN(xValue) ? 0 : xValue,
      "y": isNaN(yValue) ? 0 : yValue,
      "value": item.Seguidores || 0,
      bulletSettings: {
        src: getImageUser(item.ID_PAGE, item.USERNAME, item.RED)
      },
      "icon": {
        src: icons[item.RED - 1].src
      }
    };
  });
};
import { getImageUser } from "../utils/getImageUser";
import icons from "./icons";
export var mapToBubbleData = (data, filterAxisX, filterAxisY) => {
  return data.map(item => {
    return {
      "ID_PAGE": item.ID_PAGE,
      "title": item.ID,
      "user": item.USERNAME,
      "red": item.RED_NAME || icons[item.RED - 1].red,
      "x": item[filterAxisX],
      "y": item[filterAxisY],
      "value": item.followers || 0,
      bulletSettings: {
        src: getImageUser(item.ID_PAGE, item.USERNAME, item.RED)
      },
      "icon": {
        src: icons[item.RED - 1].src
      }
    };
  });
};
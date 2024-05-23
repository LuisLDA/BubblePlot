import { getImageUser } from "../utils/getImageUser";
export var mapToBubbleData = (data, filterAxisX, filterAxisY) => {
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
        src: getImageUser(item.id_page, item.username, item.red)
      }
    };
  });
};
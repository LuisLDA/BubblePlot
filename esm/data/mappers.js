import { getImageUser } from "../utils/getImageUser";
export var mapToBubbleData = (data, filterAxisX, filterAxisY) => {
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
        src: getImageUser(item.ID_PAGE, item.USERNAME, item.RED)
      }
    };
  });
};
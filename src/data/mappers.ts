import { AnyObject } from "antd/es/_util/type";
import { getImageUser } from "../utils/getImageUser";
import icons from "./icons";

export const mapToBubbleData = (data: AnyObject[], filterAxisX: string, filterAxisY: string) => {
  return data.map((item: AnyObject) => {

    //if (item.Seguidores === 'No registrado') item.Seguidores = 0;


    return {
      "ID_PAGE": item.ID_PAGE,
      "title": item.ID,
      "user": item.USERNAME,
      "red": item.RED_NAME || icons[item.RED - 1].red,
      "x": typeof item[filterAxisX] === 'string' ? 0 : item[filterAxisX],
      "y": typeof item[filterAxisY] === 'string' ? 0 : item[filterAxisY],
      "value": item.Seguidores || 0,
      bulletSettings: { src: getImageUser(item.ID_PAGE, item.USERNAME, item.RED) },
      "icon": { src: icons[item.RED - 1].src }
    }
  });
}
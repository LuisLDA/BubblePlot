import { AnyObject } from "antd/es/_util/type";
import { getImageUser } from "../utils/getImageUser";
import icons from "./icons";

export const mapToBubbleData = (data: AnyObject[], filterAxisX: string, filterAxisY: string) => {
  return data.map((item: AnyObject) => {
    return {
      "ID_PAGE": item.ID_PAGE,
      "title": item.ID,
      "user": item.USERNAME,
      "red": item.RED_NAME || icons[item.RED - 1].red,
      "x": item[filterAxisX],
      "y": item[filterAxisY],
      "value": item.Seguidores || 0,
      bulletSettings: { src: getImageUser(item.ID_PAGE, item.USERNAME, item.RED) },
      "icon": { src: icons[item.RED - 1].src }
    }
  });
}
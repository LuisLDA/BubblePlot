import { AnyObject } from "antd/es/_util/type";
import { getImageUser } from "../utils/getImageUser";
import icons from "./icons";

export const mapToBubbleData = (data: AnyObject[], filterAxisX: string, filterAxisY: string) => {
  return data.map((item: AnyObject) => {

    // Intenta convertir a número, si falla asigna 0
    const xValue = Number(item[filterAxisX]);
    const yValue = Number(item[filterAxisY]);

    return {
      "ID_PAGE": item.ID_PAGE,
      "title": item.ID,
      "user": item.USERNAME,
      "red": item.RED_NAME || icons[item.RED - 1].red,
      "x": isNaN(xValue) ? 0 : xValue,
      "y": isNaN(yValue) ? 0 : yValue,
      "value": item.Seguidores || 0,
      bulletSettings: { src: getImageUser(item.ID_PAGE, item.USERNAME, item.RED) },
      "icon": { src: icons[item.RED - 1].src }
    }
  });
}
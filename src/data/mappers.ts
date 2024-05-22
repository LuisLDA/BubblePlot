import { AnyObject } from "antd/es/_util/type";
import { getImageUser } from "../utils/getImageUser";

export const mapToBubbleData = (data: AnyObject[], filterAxisX: string, filterAxisY: string) => {
  return data.map((item: AnyObject) => {
    return {
      "title": item.id,
      "user": item.username,
      "red": item.red_name,
      "x": item[filterAxisX],
      "y": item[filterAxisY],
      "value": item.interactions,
      bulletSettings: { src: getImageUser(item.id_page, item.username, item.red) }
    }
  });
}
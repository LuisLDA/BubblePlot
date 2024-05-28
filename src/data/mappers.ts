import { AnyObject } from "antd/es/_util/type";
import { getImageUser } from "../utils/getImageUser";

export const mapToBubbleData = (data: AnyObject[], filterAxisX: string, filterAxisY: string) => {
  return data.map((item: AnyObject) => {
    return {
      "ID_PAGE": item.ID_PAGE,
      "title": item.ID,
      "user": item.USERNAME,
      "red": item.RED_NAME,
      "x": item[filterAxisX],
      "y": item[filterAxisY],
      "value": item.interactions,
      bulletSettings: { src: getImageUser(item.ID_PAGE, item.USERNAME, item.RED) },
      "icon": {src:"https://assets.codepen.io/t-160/icon_social_twitter.svg"}
    }
  });
}
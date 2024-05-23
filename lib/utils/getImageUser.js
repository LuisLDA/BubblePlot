"use strict";

exports.__esModule = true;
exports.getImageUser = void 0;
var defaultUser = 'https://www.w3schools.com/howto/img_avatar.png';
var getImageUser = (id_page, username, red) => {
  var src_img = '';
  var cdn = 'https://cdn-60ld3n.socialsalert.com';
  switch (red) {
    case 1:
      src_img = "https://4v4t4r5.socialsalert.com/tw/" + id_page;
      break;
    case 2:
      src_img = cdn + '/facebook/image/' + id_page;
      break;
    case 3:
      src_img = cdn + '/instagram/image/' + username;
      break;
    case 4:
      src_img = cdn + '/youtube/image/' + id_page;
      break;
    case 6:
      src_img = cdn + '/tiktok/image/' + username;
      break;
    case 8:
      src_img = cdn + '/twitch/image/' + id_page;
      break;
    case 13:
      src_img = cdn + '/kwai/image/' + id_page;
      break;
    case 18:
      src_img = cdn + '/linkedin/image/' + id_page;
      break;
    default:
      src_img = defaultUser;
      break;
  }
  return src_img;
};
exports.getImageUser = getImageUser;
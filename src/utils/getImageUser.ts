const defaultUser = 'https://www.w3schools.com/howto/img_avatar.png';


export const getImageUser = (id_page: string, username: string, red: number) => {
  let src_img = '';

  let cdn = 'https://cdn-60ld3n.socialsalert.com';
  switch (red) {
    case 1:
      src_img = "https://4v4t4r5.socialsalert.com/tw/" + id_page
      break;
    case 2:
      src_img = cdn + '/facebook/image/' + id_page
      break;
    case 3:
      src_img = cdn + '/instagram/image/' + username
      break;
    case 4:
      src_img = cdn + '/youtube/image/' + id_page
      break;
    case 6:
      src_img = cdn + '/tiktok/image/' + username
      break;
    case 8:
      src_img = cdn + '/twitch/image/' + id_page
      break;
    case 13:
      src_img = cdn + '/kwai/image/' + id_page
      break;
    case 18:
      src_img = cdn + '/linkedin/image/' + id_page
      break;

    default:
      src_img = defaultUser;
      break;
  }
  return src_img;
}
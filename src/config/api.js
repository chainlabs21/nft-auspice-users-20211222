const apiServer = "http://3.34.76.233:32287";
export const API = {
  API_USER_JOIN: `${apiServer}/users/join`,
  API_COMPLETE_EMAIL_VERIFY: `${apiServer}/users/bind_address_email`,
  API_USERS_LOGIN: `${apiServer}/users/login/crypto`,
  API_GET_USER_INFO: `${apiServer}/my/info`,
  API_VERIFY_EMAIL_SEND: `${apiServer}/users/email/verifycode`,
  API_LOGOUT: `${apiServer}/users/logout`,
  API_ITEM_UPLOAD_BASE64: `${apiServer}/mint/store/base64`,
  API_ITEM_UPLOAD_OVER: `${apiServer}/mint/store/file`,
  API_GET_ITEM_DATA: `${apiServer}/items/item`,
  API_ITEM_SAVE_META: `${apiServer}/mint/metadata`,
  API_MINT_TX_REPORT: `${apiServer}/mint/report/mint`,
  API_LAZY_MINT: `${apiServer}/mint/mint`,
  API_GET_ITEM_CATEGORIES: `${apiServer}/queries/categories`,
};

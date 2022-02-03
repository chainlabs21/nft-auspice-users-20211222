const apiServer = "http://itemverse1.net:32287";

export const API = {
  API_USER_JOIN: `${apiServer}/users/join`,
  API_COMPLETE_EMAIL_VERIFY: `${apiServer}/users/bind_address_email`,
  API_USERS_LOGIN: `${apiServer}/users/login/crypto`,
  API_GET_USER_INFO: `${apiServer}/my/info`,
  API_VERIFY_EMAIL_SEND: `${apiServer}/users/email/verifycode`,
  API_LOGOUT: `${apiServer}/users/logout`,
  API_ITEM_UPLOAD_BASE64: `${apiServer}/mint/store/base64`,
  API_ITEM_UPLOAD_OVER: `${apiServer}/mint/store/file`,
  API_GET_ITEM_DATA: `${apiServer}/items/item`, // /:itemid
  API_ITEM_SAVE_META: `${apiServer}/mint/metadata`,
  API_MINT_TX_REPORT: `${apiServer}/mint/report/mint`,
  API_LAZY_MINT: `${apiServer}/mint/mint`,
  API_GET_ITEM_CATEGORIES: `${apiServer}/queries/categories`,
  API_GET_EXPLORE: `${apiServer}/queries/rows/fieldvalues/transactions/0/10/id/DESC`,
  API_GET_ITEM_LIST: `${apiServer}/merchandises`,
  API_GET_LIKE_LIST: `${apiServer}/queries/rows/logfavorites/objectid`, // /:itemid /:index /:limit /id /:sort
  API_GET_OWNER_LIST: `${apiServer}/queries/rows/itembalances/itemid`, // /:itemid /:index /:limit /id /:sort

  API_ORDER_MAKER_SELLER: `${apiServer}/orders/maker/seller`,
  API_PLATFORM_SETTINGS: `${apiServer}/queries/rows/settings/active/1/0/100/id/DESC`,
};

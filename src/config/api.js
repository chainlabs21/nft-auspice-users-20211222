const apiServer = process.env.REACT_APP_API_SERVER; //"http://itemverse1.net:32287"; // // const apiServer = "http://3.34.76.233:32287";
export const API = {
  API_TICKERS: `${apiServer}/stats/tickers`,
  API_TOGGLE_FAVOR: `${apiServer}/favorites/toggle`,
  API_COUNT_FAVOR: `${apiServer}/favorites/totalcount`,
  API_TOGGLE_BOOKMARK: `${apiServer}/bookmarks/toggle`,
  API_USER_JOIN: `${apiServer}/users/join`,
  API_COMPLETE_EMAIL_VERIFY: `${apiServer}/users/email/verifycode`,
  API_USERS_LOGIN: `${apiServer}/users/login/crypto`,
  API_GET_MY_INFO: `${apiServer}/my/info`,
  API_USER_INFO: `${apiServer}/users/user/info`,
  API_USER_EXISTS: (address, option = "address") =>
    `${apiServer}/users/query-value-exists/${option}/${address}`,
  API_USER_CHECK: `${apiServer}/users/check`,
  API_USER_CHANGE_MAIL: `${apiServer}/users/update/mail`,
  API_USER_PROF_UPLOAD: `${apiServer}/users/upload/file`,
  API_MYINFO: `${apiServer}/users/user/myinfo`,
  API_VERIFY_EMAIL_SEND: `${apiServer}/users/email/verifycode`,
  API_GET_NONCE: `${apiServer}/users/login/secure/crypto`,
  API_LOGOUT: `${apiServer}/users/logout`,
  API_ITEM_UPLOAD_BASE64: `${apiServer}/mint/store/base64`,
  API_ITEM_UPLOAD_OVER: `${apiServer}/mint/store/file`,
  API_GET_ITEM_DATA: `${apiServer}/items/item`, // /:itemid
  API_ITEM_DATA_AUX: `${apiServer}/items/item/aux`,
  API_ITEM_SAVE_META: `${apiServer}/mint/metadata`,
  API_REPORT_TX_MINT: `${apiServer}/mint/report/mint`,
  API_LAZY_MINT: `${apiServer}/mint/mint/lazy`,
  API_NOTIFICATIONS: `${apiServer}/users/notifications`,
//	API_GET_ITEM_CATEGORIES: `${apiServer}/queries/categories`,
  API_GET_I_LIKE:`${apiServer}/queries/ilike`,// /:itemid CHECK IF I LIKED THIS ITEM
	API_GET_ITEM_CATEGORIES: `${apiServer}/queries/rows/categories/group_/items/0/100/displayOrder/ASC`,
  API_GET_MAINCATEGORY:`${apiServer}/queries/featured/rows/`,
	API_REPORT_SPAM_CATEGORIES : `${apiServer}/queries/rows/categories/group_/reportspam/0/100/id/DESC` ,
  API_GET_CREATORS: `${apiServer}/queries/rows/users/iscreator/1/0/8/countcreated/DESC?userdetail=1`,
  API_GET_EXPLORE: `${apiServer}/queries/rows/fieldvalues/transactions/0/60/id/DESC`,
  API_GET_ITEM_LIST: `${apiServer}/merchandises`,
  API_GET_LIKE_LIST: `${apiServer}/queries/rows/logfavorites/objectid`, // /:itemid /:index /:limit /id /:sort
  API_GET_OWNER_LIST: `${apiServer}/queries/rows/itembalances/itemid`, // /:itemid /:index /:limit /id /:sort
  API_ORDER_MAKER_SELLER: `${apiServer}/orders/maker/seller`,
  API_PLATFORM_SETTINGS: `${apiServer}/queries/rows/settings/active/1/0/100/id/DESC`,
  API_MAIN_FEATURED_ITEMS: `${apiServer}/queries/rows/items/isfeatured/1/0/10/id/DESC`,
  API_MAIN_NEW_ITEMS: `${apiServer}/queries/rows/items/active/1/0/10/id/DESC`,
  API_MAIN_TREND_ITEMS: `${apiServer}/queries/rows/items/active/1/0/10/countviews/DESC`,
  API_MERCHANDISES_LIST: `${apiServer}/merchandises/single/latest`, // /:index /:limit
  //	, API_MERCHANDISES_LIST : `${apiServer}/merchandises/single/latest/0/10`
  API_MYITEMS: `${apiServer}/queries/filter/rows/itembalances/username`, // /${username}/0/10/id/DESC
  API_OWNED_ITEMS: `${apiServer}/queries/rows/itembalances/username`, // /${username}/0/10/id/DESC
  API_AUTHORS_ITEMS: `${apiServer}/queries/rows/items/author`,
  API_SELLER_ITEMS_00: `${apiServer}/queries/rows/orders/username`, //	/:fieldval/:offset/:limit/:orderkey/:orderval'
  //	, API_SELLER_ITEMS_01 : `${apiServer}/queries/rows/fieldvalues/orders` // /:tablename/:offset/:limit/:orderkey/:orderval //			let {fieldname , fieldvalues , itemdetail } = req.query
  API_TRANSACTIONS: `${apiServer}/queries/rows/transactions`, // /:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval
  API_USER_FAVORITES: `${apiServer}/queries/rows/logfavorites`,
  API_REPORT_TX_AUCTION_ENGLISH: `${apiServer}/transactions/report/auction/english/open`, // /:txhash
  API_EDIT_ITEM: `${apiServer}/items/item`, // /:itemid/:fieldname/:fieldval'
  API_TOGGLE_ITEM: `${apiServer}/items/item/toggle`, // /:itemid/:fieldname/:fieldval ,
  API_REPORT_TX_CLOSE_SPOT: `${apiServer}/transactions/report/sale/close`, // txhash
  API_LOGFEEPAYS: `${apiServer}/queries/rows/logfeepayouts`, // /:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval
  //	API_HIDDEN: `${apiServer}/queries/rows/itembalances/username`,
  API_HIDDEN: `${apiServer}/queries/rows/orders/username`,
  API_SALE_COMMON: `${apiServer}/sales/maker/seller`,
  API_REPORT_BID_TO_AUCTION: `${apiServer}/transactions/report/auction/english/bid`, // /:txhash
  API_ITEM_HISTORY: `${apiServer}/queries/rows/itemhistory`, // /:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval
  API_REPORT_TX_REGISTER_PROXY: `${apiServer}/transactions/report/registerproxy`, // /:txhash
  API_RANKING: `${apiServer}/queries/rows/users02/active/1/0/20/sumsalesfloat/DESC`,
  API_GET_BIDS: `${apiServer}/my/bids`,
  API_GET_PROPOSAL: `${apiServer}/my/proposals`,
  API_GET_REPORT_CATEGORIES: `${apiServer}/queries/reportcategory`,
  API_SEND_REPORT: `${apiServer}/report/send`, ///:category/:username/:itemid
  //API_GET_ITEM_CATEGORIES: `${apiServer}/queries/rows/itemhistory`, // /:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval
  ///filter/rows/:tablename/:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval"
  API_GET_ANNOUNCES: `${apiServer}/queries/findcount/announcements`,
  API_GET_NOTICE_CONTENT: `${apiServer}/queries/field/announcements`,
  API_GET_PUSH: `${apiServer}/users/push`,
};

////////////////

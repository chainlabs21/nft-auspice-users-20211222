import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  setConnect,
  setisloader,
  setpriceklay,
  setitemid,
} from "../../util/store";
import styled from "styled-components";

// import "./css/style01.css"; // import "./css/style02.css";

import { useEffect, useRef, useState } from "react";
// import { singleItem } from "../mokups/items";
import moment from "moment";
// import axios from "axios";
import { API } from "../../config/api";
import ItemOwnerPopup from "../../components/market/ItemOwnerPopup";
import ItemLikePopup from "../../components/market/ItemLikePopup";
import { applytoken } from "../../util/rest";
import {
  onClickCopy,
  LOGGER,
  KEYS,
  getMaxMinAvg,
  getmyaddress,
  convaj,
  ISFINITE,
  get_deltatime_str,
} from "../../util/common";
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../config/messages";
import {
  PAYMEANS_DEF,
  URL_TX_SCAN,
  FEES_DEF,
  NETTYPE,
} from "../../config/configs";
import I_heart from "../../img/icons/I_heart.png";
import { useSearchParams } from "react-router-dom";
import {
  query_nfttoken_balance,
  requesttransaction,
  getabistr_forfunction,
  query_with_arg,
} from "../../util/contract-calls";

import I_klaytn from "../../img/sub/I_klaytn.svg";
import refresh from "../../img/sub/refresh.png";
import alert from "../../img/sub/alert.png";
import share from "../../img/sub/share.png";
import { query_eth_balance } from "../../util/contract-calls";
import { getethrep, getweirep, is_two_addresses_same } from "../../util/eth";
import rstone from "../../img/sub/rstone.png";
import I_dnArw from "../../img/header/I_dnArw.svg";
import icon_link_on from "../../img/sub/icon_link_on.png";
import heart_off from "../../img/sub/heart_off.png";
import heart_on from "../../img/sub/heart_on.png";
import star_off from "../../img/sub/star_off.png";
import star_on from "../../img/sub/star_on.png";
import I_ltArw3BlackBtn from "../../img/design/I_ltArw3BlackBtn.png";
import I_rtArw3BlackBtn from "../../img/design/I_rtArw3BlackBtn.png";
import I_ltArw3 from "../../img/icons/I_ltArw3.png";

import { ADDRESSES } from "../../config/addresses";
import { getStyle, putCommaAtPrice, strDot } from "../../util/Util";
import Chart from "react-apexcharts";
import { MAP_SALETYPES, MAP_ITEMHISTORY_EVETNS } from "../../config/disp";
import PlaceBidPopup from "../../components/PlaceBidPopup";
import DefaultHeader from "../../components/header/DefaultHeader";
import { D_categoryList ,D_itemHistoryCategoryList} from "../../data/D_item";

import PopupBg from "../../components/PopupBg";
import ReportPopup from "../../components/market/ReportPopup";
import PurchaseSinglePopup from "../../components/market/PurchaseSinglePopup";

const convertLongString = (startLength, endLength, str) => {
  if (!str) return;
  const head = str.substring(0, startLength);
  const spread = "......";
  const tail = str.substring(str.length - endLength, str.length);
  return head + spread + tail;
};
const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};
function SingleItem({
  store,
  setConnect,
  Setisloader,
  Setpriceklay,
  Setitemid,
}) {
  const navigate = useNavigate(); //  const { itemid } = useParams()
  const otherWorkRef = useRef();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [listCategory, setListCategory] = useState(0);
  const [otherWorkIndex, setOtherWorkIndex] = useState(0);
  const [myItem, setMyItem] = useState(true);
  const [ownerPopup, setOwnerPopup] = useState(false); // true
  const [likePopup, setLikePopup] = useState(false);
  const [reportPopup, setreportPopup] = useState(false);
  const [purchasePopup, setPurchasePopup] = useState(false);

  /**   const {    likerList,    ownerList,    salesStatus,    pur chaseStatus,    transactionHistory,    chainInformation,  } = singleItem;*/
  const [buySpotPopup, setbuySpotPopup] = useState(false);
  let [bidauctionmodal, setbidauctionmodal] = useState(false);
  const [chartCategory, setChartCategory] = useState(0); //  const [endAutionTime, setEndAutionTime] = useState( singleItem.auctionExpiry )  // const [diffTime, setDiffTime] = useState();  //  const [nearEnd, setNearEnd] = useState(false);
  const [itemdata, setitemdata] = useState({});
  let [itemdataaux, setitemdataaux] = useState();
  const [userIndex, setUserIndex] = useState(0);
  let [transactionHistory, settransactionHistory] = useState([]);
  let [logorders, setlogorders] = useState([]);
  let [logsales, setlogsales] = useState([]);
  let [logprices, setlogprices] = useState([]);
  //	let [ logactions , setlogactions ] = useState ( [] )
  let [pricestats, setpricestats] = useState([]);
  let [ilikethis, setilikethis] = useState(false);
  let [ibookmarkthis, setibookmarkthis] = useState(false);
  let [orders_sell, setorders_sell] = useState([]);
  let [sellorder, setsellorder] = useState({});
  let [author, setauthor] = useState();
  let [myethbalance, setmyethbalance] = useState();
  let [priceklay, setpriceklay] = useState();
  let [istoschecked, setistoschecked] = useState(false);
  let [listotheritems, setlistotheritems] = useState([]);
  let [listitemhistory, setlistitemhistory] = useState([]);
  let [listholder, setlistholder] = useState([]);
  let [iscollectionbyauthorseller, setiscollectionbyauthorseller] = useState();
  let [jprofileimages, setjprofileimages] = useState([]);
  let lockjprofileimages = {};
  let [searchParams, setSearchParams] = useSearchParams();
  let [itemid, setitemid] = useState(searchParams.get("itemid"));
  let [referer, setreferer] = useState(searchParams.get("referer"));
  let [j_auctionuuid_bidprice, setj_auctionuuid_bidprice] = useState({});
  let [j_auctionuuid_bidder, setj_auctionuuid_bidder] = useState({});
  let [mybidamount, setmybidamount] = useState("");
  const [chartXdata, setChartXdata] = useState([]);
  const [chartYdata, setChartYdata] = useState([]);
  let [reportcatlist, setreportcatlist] = useState([]);
  let tokenid; //	let itemid =get_last_part_of_path ( window.location.href )
  let axios = applytoken();
  let [myaddress, setmyaddress] = useState(getmyaddress());
  const getfeeamountstr = (amount, rate) => {
    let n = (+amount * +rate) / 10000;
    return n.toFixed(4); // String()
  };

  useEffect(
    (_) => {
      let { klaytn } = window;
      if (klaytn) {
      } else {
        return;
      }
      let myaddress = getmyaddress();
      setmyaddress(myaddress);
      myaddress &&
        query_eth_balance(myaddress).then((resp) => {
          LOGGER("mylcfti0uE", resp);
          setmyethbalance(getethrep(resp));
        });
    },
    [window.klaytn]
  );

  useEffect(
    async (_) => {
      if (sellorder && KEYS(sellorder).length) {
      } else {
        return;
      }
      return;
      let resp = await query_with_arg({
        contractaddress: ADDRESSES.erc1155,
        abikind: "ERC1155",
        methodname: "_itemhash_tokenid",
        aargs: [itemdata?.item?.itemid],
      });
      LOGGER("mohrKFfjxQ", resp);
      if (resp) {
        tokenid = resp;
        return;
        query_with_arg({
          contractaddress: ADDRESSES.erc1155,
          abikind: "AUCTION_ENGLISH_BATCH_TASKS",
          methodname: "get_batch_hashid",
          aargs: [
            sellorder?.username,
            ADDRESSES.erc1155,
            tokenid,
            getweirep(sellorder?.asset_amount_ask),
            sellorder?.expiry,
          ],
        }); //
      } else {
        tokenid = 0;
      }
    },
    [sellorder]
  );

  const on_buy_spot_common = (_) => {
    LOGGER("", itemdata.item?.itemid); // query_nfttoken_balance () // a little cumbersome
    let { item } = itemdata;
    let aargs = [
      ADDRESSES.erc1155, // 0
      itemdata.item?.itemid, // 1 item?.itemid			//			, itemdata.item?.tokenid // 0
      itemdata.item?.countcopies, // 2
      itemdata.item?.authorfee, // 3
      sellorder.asset_amount_bid, //4 			//			, item?.decimals       //			, sellorder?.asset_contract_ask ? sellorder?.asset_contract_ask : ADDR ESSES.zero
      getweirep(sellorder?.asset_amount_ask), // 5
      itemdata.item?.author, // 6
      sellorder?.username, // 7
      myaddress, // 8
      referer ? referer : ADDRESSES.zero, // 9
    ];
    LOGGER(aargs);
    //		return
    let abistr = getabistr_forfunction({
      contractaddress: ADDRESSES.matcher_simple,
      abikind: "MATCHER_SIMPLE",
      methodname: "mint_and_match_single_simple",
      aargs,
    });
    LOGGER(abistr);
    //	return
    // remix : 0xcfc209030000000000000000000000005ae8f88e15ff42d62b5c1288dc7909bdfa5ef4f40000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000003840000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000016a6075a71700000000000000000000000000008f4559c842a96e308c6fe7d56054dffd6a158e390000000000000000000000008f4559c842a96e308c6fe7d56054dffd6a158e39000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae24049180000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d5a417854327234786848466b6864634743655a48515347507939524d57704d516a6f6b61707852386274516a000000000000000000000000000000000000
    // 0xcfc20903000000000000000000000000ff817302e7b6d116cdff1a730508551ee15578750000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000003840000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000017508f1956a8000000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae2404918000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae240491800000000000000000000000083f714ad20e34748516e8367faf143abde6c37830000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d5173564c734c745154654676694743345332547632466b57416f4c4774545937714e57387263546850676f6e000000000000000000000000000000000000 // => 842
    // 0xcfc20903000000000000000000000000ff817302e7b6d116cdff1a730508551ee15578750000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000003840000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000017508f1956a8000000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae2404918000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae2404918000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d5173564c734c745154654676694743345332547632466b57416f4c4774545937714e57387263546850676f6e000000000000000000000000000000000000
    requesttransaction({
      from: myaddress,
      to: ADDRESSES.matcher_simple,
      data: abistr,
      value: getweirep(sellorder.asset_amount_ask), // '0x00'
      gas: "" + 800_000, // 320,948
    })
      .then((resp) => {
        LOGGER("", resp);
        let { transactionHash, status } = resp;
        if (status) {
          let reqbody = {
            itemid,
            tokenid: itemdata.item?.tokenid,
            amount: sellorder?.asset_amount_bid, // itemdata.item?.countcopies,
            price: sellorder?.asset_amount_ask,
            username: myaddress,
            seller: sellorder?.username,
            buyer: myaddress,
            matcher_contract: ADDRESSES.matcher_simple, // _2022 0131,
            token_repo_contract: ADDRESSES.erc1155,
            adminfee: {
              address: ADDRESSES.vault,
              amount: getfeeamountstr(
                sellorder?.asset_amount_ask,
                FEES_DEF.ADMIN
              ),
              rate: FEES_DEF.ADMIN,
            }, //
            refererfee: referer
              ? {
                  address: referer,
                  amount: getfeeamountstr(
                    sellorder?.asset_amount_ask,
                    FEES_DEF.REFERER
                  ),
                  rate: FEES_DEF.REFERER,
                }
              : null,
            authorfee: {
              address: itemdata?.item?.author,
              amount: getfeeamountstr(
                sellorder?.asset_amount_ask,
                itemdata.item?.authorfee
              ),
              rate: itemdata?.item?.authorfee,
            },
            sellorderuuid: sellorder?.uuid,
            nettype: NETTYPE,
          };
          axios
            .post(API.API_REPORT_TX_CLOSE_SPOT + `/${transactionHash}`, reqbody)
            .then((resp) => {
              LOGGER("G6OvdxLxyA", resp.data);
              let { status } = resp.data;
              if (status == "OK") {
                SetErrorBar(messages.MSG_DONE_REGISTERING);
                fetchitem(itemdata?.item?.itemid);
                setbuySpotPopup(false);
              }
            });
        }
      })
      .catch((err) => {
        LOGGER("", err);
        SetErrorBar(messages.MSG_USER_DENIED_TX);
      }); // LOGGER( ''  , abistr )
    return;
    if (itemdata?.item?.tokenid) {
    } // on chain
    else {
    }
  };

  const on_bid_auction = async (_) => {
    if (mybidamount) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_INPUT);
      return;
    }
    if (j_auctionuuid_bidprice[sellorder?.uuid]) {
      if (+mybidamount > j_auctionuuid_bidprice[sellorder?.uuid]) {
      } else {
        SetErrorBar(messages.MSG_BID_AMOUNT_OUTBID);
        return;
      }
    }
    if (+mybidamount >= sellorder?.asset_amount_ask) {
    } else {
      SetErrorBar(messages.MSG_BID_AMOUNT_NOT_ENOUGH);
      return;
    }
    let aargs = [
      ADDRESSES.erc1155,
      sellorder?.username,
      sellorder?.itemid,
      itemdata?.item?.countcopies,
      itemdata?.item?.authorfee,
      //      tokenid || "0", // itemdata?.item?.
      sellorder?.username,
      sellorder?.asset_amount_bid,
      getweirep(sellorder?.asset_amount_ask),
      sellorder?.startingtime ? sellorder?.startingtime : moment().unix(),
      sellorder?.expiry,
      getweirep(mybidamount),
    ];
    LOGGER("", aargs);
    // return
    let abistr = getabistr_forfunction({
      contractaddress: ADDRESSES.auction_repo_english_batch_tasks, // auction_repo_english_simple_no_batch_tasks
      abikind: "AUCTION_ENGLISH_BATCH_TASKS",
      methodname: "mint_begin_simple_and_bid",
      aargs,
    });
    // remix : 0xfb972d6a000000000000000000000000ff817302e7b6d116cdff1a730508551ee1557875000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000025bf6196bd100000000000000000000000000000000000000000000000000000000000061ff908f00000000000000000000000000000000000000000000000000000000620679ef000000000000000000000000000000000000000000000000025f839810978000000000000000000000000000000000000000000000000000000000000000002e516d5455734c597a4d694c3178733777484e354454627351437a5043485a6278746874523737634647534a383438000000000000000000000000000000000000
    // react : 0xfb972d6a0000000000000000000000005ae8f88e15ff42d62b5c1288dc7909bdfa5ef4f4000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000025bf6196bd100000000000000000000000000000000000000000000000000000000000061ff908f00000000000000000000000000000000000000000000000000000000620679ef000000000000000000000000000000000000000000000000025f839810978000000000000000000000000000000000000000000000000000000000000000002e516d5455734c597a4d694c3178733777484e354454627351437a5043485a6278746874523737634647534a383438000000000000000000000000000000000000
    LOGGER("", abistr);
    //		return
    requesttransaction({
      from: myaddress,
      to: ADDRESSES.auction_repo_english_batch_tasks, // auction_repo_english_simple_no_batch_tasks
      data: abistr,
      value: getweirep(mybidamount),
      gas: "" + 1400_000, // 610,174
    })
      .then(async (resp) => {
        LOGGER("", resp);
        let { transactionHash: txhash, status } = resp;
        if (status) {
        } else {
          SetErrorBar(messages.MSG_USER_DENIED_TX);
          return;
        }
        SetErrorBar(messages.MSG_BID_PLACED);
        let reqbody = {
          itemid: itemdata?.item?.itemid,
          auctionuuid: sellorder?.uuid,
          seller: sellorder?.username,
          username: myaddress,
          price: mybidamount,
          priceunit: PAYMEANS_DEF,
          nettype: NETTYPE,
          typestr: "BID_TO_AUCTION",
          tokenid: itemdata?.item?.tokenid,
          expiry: sellorder?.expiry,
        };
        axios
          .post(API.API_REPORT_BID_TO_AUCTION + `/${txhash}`, reqbody)
          .then((resp) => {
            LOGGER("rehCTxqXLK", resp.data);
            let { status } = resp.data;
            if (status == "OK") {
              SetErrorBar(messages.MSG_DONE_REGISTERING);
              fetchitem(itemdata?.item?.itemid);
              setbidauctionmodal(false);
            }
          });
      })
      .catch((err) => {
        LOGGER("", err);
        SetErrorBar(messages.MSG_USER_DENIED_TX);
        setbidauctionmodal(false);
      });
  };
  const onclickbuy = (_) => {
    switch (sellorder?.typestr) {
      case "COMMON":
        on_buy_spot_common();
        break;
      case "AUCTION_ENGLISH":
        on_bid_auction();
        break;
      default:
        SetErrorBar(messages.MSG_SALE_TYPE_NOT_DEFINED);
        break;
    }
  };
  const resolve_author_seller = (itemdata) => {
    if (itemdata?.minpriceorder) {
      let { username } = itemdata?.minpriceorder; // ?.username
      axios
        .get(API.API_OWNED_ITEMS + `/${username}/0/10/id/DESC`)
        .then((resp) => {
          LOGGER("", resp.data);
          let { status, list } = resp.data;
          if (status == "OK") {
            setlistotheritems(list);
          }
        });
      setiscollectionbyauthorseller("seller");
    } else {
      // return itemdata?.author?.username
      let { username } = itemdata?.author;
      axios
        .get(API.API_AUTHORS_ITEMS + `/${username}/0/10/id/DESC`)
        .then((resp) => {
          LOGGER("", resp.data);
          let { status, list } = resp.data;
          if (status == "OK") {
            setlistotheritems(list);
          }
        });
      setiscollectionbyauthorseller("author");
    }
  };
  const fetchitem = (itemid) => {
    Setisloader(true);
    axios
      .get(`${API.API_GET_ITEM_DATA}/${itemid}`, {
        params: { incviewcount: 1 },
      })
      .then((res) => {
        LOGGER("agwwiWSDdf", res.data);
        let { status, respdata } = res.data;
        if (status == "OK") {
          setitemdata(respdata);
          let { orders_sellside } = respdata;
          setorders_sell(orders_sellside);
          setilikethis(respdata.ilikethisitem);
          setibookmarkthis(respdata.ibookmarkthis);
          if (respdata.bids) {
            setj_auctionuuid_bidprice(
              convaj(respdata.bids, "basesaleuuid", "price")
            ); // auctionhashid
            setj_auctionuuid_bidder(
              convaj(respdata.bids, "basesaleuuid", "username")
            );
          }
          if (orders_sellside && orders_sellside.length) {
            orders_sellside.forEach((elem, idx) => {
              axios
                .get(API.API_USER_INFO + `/${elem.username}`)
                .then((resp) => {
                  LOGGER("V9kbW2K1sr", resp.data);
                  let { status, payload } = resp.data;
                  if (status == "OK") {
                    let { profileimage } = payload?.mongo;
                    if (profileimage) {
                      //									let jdata={}
                      //								jdata[v.username ] = profileimage
                      jprofileimages[idx] = profileimage;
                      setjprofileimages(jprofileimages);
                    }
                  }
                });
            });
          }
          query_with_arg({
            contractaddress: ADDRESSES.erc1155,
            abikind: "ERC1155",
            methodname: "_itemhash_tokenid",
            aargs: [respdata?.item?.itemid], // itemdata
          }).then((resp) => {
            LOGGER("mohrKFfjxQ", resp);
            if (resp) {
              tokenid = resp;
            }
          });
          resolve_author_seller(respdata);
        }
        Setisloader(false);
      });
    axios.get(`${API.API_ITEM_DATA_AUX}/${itemid}`).then((resp) => {
      LOGGER("6ENydA38bX", resp.data);
      let { status, respdata } = resp.data;
      if (status == "OK") {
        setitemdataaux(respdata);
        setauthor(respdata.author_mongo);
        setlogorders(respdata.logorders);
        let { logprices } = respdata;
        setlogprices(logprices);
        setpricestats(getMaxMinAvg(logprices.map((elem) => elem.price)));
        setChartXdata(
          logprices.map((e) => `${moment(e.createdat).format("MM.DD")}`)
        );
        setChartYdata(logprices.map((e) => e.price));
        /** 				setlogo rders ( respdata.log orders )
				let { logp rices , logact ions } =respdata
				setlogpri ces ( logpr ices )
				setlogactions ( logact ions )
				setprice stats ( getMaxMinAvg ( lo gprices ) )*/
        if (respdata.transactions) {
          // settransactionHistory ( respdata.transactions )
          //					let { logp rices , logactions } =respdata
          //					setlogactions ( logactions )
        }
      }
    });
    axios
      .get(`${API.API_TRANSACTIONS}/itemid/${itemid}/0/100/id/DESC`)
      .then((resp) => {
        LOGGER("KF5RW8IBDT", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          settransactionHistory(list);
        }
      }); // /:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval
    axios
      .get(`${API.API_ITEM_HISTORY}/itemid/${itemid}/0/100/id/DESC`)
      .then((resp) => {
        LOGGER("Tz06IcamyG", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          setlistitemhistory(list);
          setlistholder(list);
        }
      });
  };

  function onClickSwiperPreBtn(swiperRef, items, index, setIndex) {
    const wrapWidth = swiperRef.current.offsetWidth;
    const contWidth = swiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(items.length / itemNumByPage);

    if (index > 0) setIndex(index - 1);
    else setIndex(pageNum - 1);
  }

  function onClickSwiperNextBtn(swiperRef, items, index, setIndex) {
    const wrapWidth = swiperRef.current.offsetWidth;
    const contWidth = swiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(items.length / itemNumByPage);

    if (index < pageNum - 1) setIndex(index + 1);
    else setIndex(0);
  }

  function handlerByIndex(swiperRef, index) {
    if (!swiperRef.current.children[0]) return;

    const wrapWidth = swiperRef.current.offsetWidth;
    const contWidth = swiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(
      swiperRef.current.children.length / itemNumByPage
    );

    if (swiperRef.current?.scrollTo) {
      if (index < pageNum) {
        swiperRef.current.scrollTo({
          left:
            (contWidth + getStyle(swiperRef, "gap")) * itemNumByPage * index,
          behavior: "smooth",
        });
      } else {
        swiperRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }

  useEffect(() => {
    LOGGER("8xlWxqxeC2", itemid, referer);
    fetchitem(itemid);
    axios.get(`${API.API_TICKERS}/USDT`).then((resp) => {
      LOGGER("", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setpriceklay(list[PAYMEANS_DEF]); // 'KLAY'
      }
    });
    axios
      .get(`${API.API_TRANSACTIONS}/itemid/${itemid}/0/100/id/DESC`)
      .then((resp) => {
        LOGGER("KF5RW8IBDT", resp.data);
        let { status, list } = resp.data;
        if (status == "OK") {
          settransactionHistory(list);
        }
      });
    axios.get(API.API_REPORT_SPAM_CATEGORIES).then((resp) => {
      LOGGER("PmwDwJ2AGw", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setreportcatlist(list);
      }
    });
  }, []);

  useEffect(
    (_) => {
      let { itemid } = store;
      if (itemid) {
      } else {
        return;
      }
      fetchitem(itemid);
    },
    [store.itemid]
  );

  useEffect(
    () => handlerByIndex(otherWorkRef, otherWorkIndex),
    [otherWorkIndex]
  );

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        {ownerPopup && (
          <>
            <ItemOwnerPopup off={setOwnerPopup} itemid={itemid} />
            <PopupBg bg off={setOwnerPopup} />
          </>
        )}

        {reportPopup && (
          <>
            <ReportPopup off={setreportPopup} />
            <PopupBg bg off={setreportPopup} />
          </>
        )}

        {likePopup && (
          <>
            <ItemLikePopup off={setLikePopup} itemid={itemid} />
            <PopupBg bg off={setLikePopup} />
          </>
        )}

        {purchasePopup && (
          <>
            <PurchaseSinglePopup off={setPurchasePopup} />
            <PopupBg bg off={setPurchasePopup} />
          </>
        )}

        {false && <PlaceBidPopup />}

        {buySpotPopup && (
          <div
            className="popup info"
            id="info_popup"
            style={{ display: "block" }}
          >
            <div className="box_wrap buynft">
              <a
                onClick={() => setbuySpotPopup(false)}
                className="close close2"
                id="info_close"
              >
                <img
                  src={require("../../img/sub/icon_close.png").default}
                  alt="close"
                />
              </a>
              <div className="poptitle nob">
                <h2>Purchase receipt</h2>
              </div>
              <div className="list_bottom buy_nft">
                <p
                  className="warn"
                  style={{
                    display: itemdata?.item?.isreviewed ? "none" : "block",
                  }}
                >
                  Warning! Contains items
                  <br /> that have not been reviewed and approved
                </p>
                <div className="receipt_section">
                  <div className="receipt_title">
                    <p className="rec_t">Item</p>
                    <p className="rec_t right">Subtotal</p>
                  </div>
                  <div className="receipt_item">
                    <ul>
                      <li>
                        <span
                          className="pic"
                          style={{
                            backgroundImage: `url(${itemdata?.item?.url})`,
                          }}
                        ></span>
                        <div className="right_price">
                          <h3>
                            {convertLongString(8, 4, sellorder?.username)}
                            <br />
                            <span>{itemdata?.item?.titlename} </span>
                            {/**Blackman with neon */}
                          </h3>
                          <h4 className="m_sub">
                            <img
                              style={{ width: "60px" }}
                              src={require("../../img/header/logo.png").default}
                            />
                            <span className="pri">
                              {sellorder?.asset_amount_bid
                                ? `Qty. ${sellorder?.asset_amount_bid}`
                                : ""}{" "}
                              {sellorder?.tokenid
                                ? `of token #${sellorder?.tokenid}`
                                : ""}{" "}
                            </span>
                          </h4>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="rec_t">
                          Total
                          <span className="red">
                            {+myethbalance &&
                            +myethbalance > sellorder?.asset_amount_ask
                              ? "\u00A0"
                              : "Insufficient KLAY balance"}
                          </span>
                        </p>
                        <div className="right_price m_left">
                          <h4 className="blue">
                            <img
                              src={require("../../img/sub/rock.png").default}
                            />
                            {sellorder?.asset_amount_ask}
                            <span className="pri">
                              ($
                              {priceklay && sellorder?.asset_amount_ask
                                ? (
                                    +priceklay * sellorder?.asset_amount_ask
                                  ).toFixed(4)
                                : ""}
                              )
                            </span>
                          </h4>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="rec_t">
                          Your balance
                          <span className="red" style={{ color: "black" }}>
                            {" "}
                            {strDot(myaddress, 8, 2)}
                          </span>
                        </p>
                        <div className="right_price m_left">
                          <h4 className="blue">
                            <img
                              src={require("../../img/sub/rock.png").default}
                            />
                            {myethbalance ? (+myethbalance).toFixed(4) : "0"}
                            <span className="pri">
                              ($
                              {priceklay && myethbalance
                                ? (+priceklay * +myethbalance).toFixed(4)
                                : ""}
                              )
                            </span>
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <form className="ckb_wrap">
                    <div
                      className="ckb"
                      style={{
                        display: itemdata?.item?.isreviewed ? "none" : "block",
                      }}
                    >
                      <input type="checkbox" id="chk" name="chk1" />
                      <label htmlFor="chk">
                        Aware that Itemverse contains one item that has not been
                        reviewed and approved
                      </label>
                    </div>
                    <div className="ckb">
                      <input
                        type="checkbox"
                        id="chk2"
                        name="chk1"
                        onChange={(e) => {
                          setistoschecked(!istoschecked); // LOGGER()
                        }}
                      />
                      <label htmlFor="chk2">
                        I agree to Itemverse's <b>Terms of Service</b>
                      </label>
                    </div>
                  </form>
                </div>
                <a
                  className="reportit on "
                  disabled={istoschecked ? false : true}
                  onClick={(_) => {
                    if (istoschecked) {
                    } else {
                      //                    SetErrorBar(messages.MSG_PLEASE_CHECK_TOS);
                      //                  return;
                    }
                    LOGGER("pHeiL5AWXM");
                    onclickbuy();
                  }}
                >
                  Make a payment
                </a>
              </div>
            </div>
          </div>
        )}
        <MsignPopupBox>
          <section className="innerBox" style={{ paddingTop: myItem && 0 }}>
            {myItem && (
              <article className="myItemBar">
                <div className="titleBox">
                  <button className="exitBtn" onClick={() => navigate(-1)}>
                    <img src={I_ltArw3} alt="" />
                  </button>

                  <strong className="title">
                    Philip van Kouwenbergh's item
                  </strong>
                </div>

                <div className="btnBox">
                  <button className="sellBtn" onClick={() => {}}>
                    SELL
                  </button>
                  <button className="editBtn" onClick={() => {}}>
                    EDIT
                  </button>
                </div>
              </article>
            )}

            {myItem && (
              <article className="myItemBar">
                <div className="titleBox">
                  <button className="exitBtn" onClick={() => navigate(-1)}>
                    <img src={I_ltArw3} alt="" />
                  </button>

                  <strong className="title">
                    Philip van Kouwenbergh's item
                  </strong>
                </div>

                <div className="btnBox">
                  <button className="editBtn" onClick={() => {}}>
                    EDIT
                  </button>
                  <button className="cancelBtn" onClick={() => {}}>
                    Cancel Listing
                  </button>
                </div>
              </article>
            )}
            <article className="itemArea">
              <div
                className="itemBox"
                style={{
                  backgroundImage: `url(${itemdata?.item?.url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="topBar">
                  <button className="sellerBtn" onClick={() => {}}>
                    <img
                      className="profImg"
                      src={author?.profileimage}
                      alt=""
                    />
                    <p>@{itemdata.author?.nickname}</p>
                  </button>

                  <button
                    className="likeBtn"
                    onClick={() => setLikePopup(true)}
                  >
                    <img src={I_heart} alt="" />
                  </button>
                </div>

                <div className="bottomBar">
                  <button
                    className="ownerBtn"
                    onClick={() => setOwnerPopup(true)}
                  >
                    <p className="value">{itemdata.countholders}</p>
                    <p className="key">Owner</p>
                  </button>
                  <button className="fragmentBtn">
                    <p className="value">{itemdata.item?.countcopies}</p>
                    <p className="key">Fragment</p>
                  </button>
                  <button className="viewBtn">
                    <p className="value">
                      {numFormatter(itemdata.item?.countviews)}
                    </p>
                    <p className="key">Views</p>
                  </button>
                </div>
              </div>

              <div className="priceContainer">
                <div className="titleBox">Owner public content include</div>

                <div className="priceList">
                  <div className="priceBox">
                    <p className="listTitle">Current Bid</p>
                    <div className="price">
                      <p className="value">2.867</p>
                      <p className="key">AUSP</p>
                    </div>
                    <p className="exchange">$1,234.25</p>
                  </div>

                  <div className="timeBox">
                    <p className="listTitle">Auction ending in</p>
                    <strong className="time">05:32:21</strong>
                  </div>
                </div>

                <button
                  className="bidBtn"
                  onClick={() => setPurchasePopup(true)}
                >
                  Place a Bid
                </button>
              </div>
            </article>

            <article className="rightBox">
              <strong className="itemTitle">{itemdata?.item?.titlename}</strong>

              <div className="descriptionBox">
                <strong className="descriptionTitle">Description</strong>

                <p className="description">{itemdata.item?.description}</p>
              </div>

              <div className="btnBox">
                <button
                  className="reloadBtn"
                  onClick={() => window.location.reload()}
                >
                  <img src={refresh} alt="" />
                </button>
                <button
                  className="alertBtn"
                  onClick={() => setreportPopup(true)}
                >
                  <img src={alert} alt="" />
                </button>
                <button className="shareBtn" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>
            </article>

            <article className="priceBox">
              <strong className="title">Price History</strong>

              <div className="contBox">
                <div className="termBox posBox">
                  <button className="termBtn" onClick={() => {}}>
                    <p>Last 60 Days</p>
                    <img src={I_dnArw} alt="" />
                  </button>
                </div>

                <div className="chartContainer">
                  <ul className="priceList">
                    <li>
                      <p className="key">Average price</p>
                      <strong className="value">$31.11</strong>
                    </li>
                    <li>
                      <p className="key">Highest price</p>
                      <strong className="value">$32.11</strong>
                    </li>
                    <li>
                      <p className="key">Lowest price</p>
                      <strong className="value">$30.11</strong>
                    </li>
                  </ul>

                  <div className="chartBox">
                    <Chart
                      {...chartData}
                      options={{
                        chart: {
                          toolbar: {
                            show: false,
                          },
                        },
                        xaxis: {
                          categories: [...chartXdata],
                        },
                        colors: ["#000"],
                      }}
                      series={[
                        {
                          name: "price",
                          data: [...chartYdata],
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </article>

            <article className="offerBox">
              <strong className="title">Offer History</strong>

              <div className="scrollBox">
                <ul className="offerList">
                  {orders_sell
                    .sort((a, b) => {
                      return +a.asset_amount_ask == +b.asset_amount_ask
                        ? a.createdat > b.createdat
                          ? -1
                          : +1
                        : +a.asset_amount_ask - +b.asset_amount_ask;
                    })
                    .map((v, idx) => {
                      return (
                        <li key={idx}>
                          <span className="profBox">
                            <img src={jprofileimages[idx]} alt="" />
                            <span className="textBox">
                              <strong className="price">
                                {(+v.asset_amount_ask)?.toFixed(4)} KLAY
                              </strong>
                              <p className="nickname">T.WD</p>
                            </span>
                          </span>

                          <span className="rightBox">
                            <p className="address">{v.username}</p>

                            <p className="time">
                              {moment(v.createdat).fromNow()}
                            </p>
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </article>

            <article className="statusArea">
              <div className="saleBox statusBox">
                <strong className="title">Sales status</strong>

                <div className="scrollBox">
                  <ul className="listHeader">
                    <li>Price/ Expired</li>
                    <li>Seller</li>
                  </ul>

                  <ul className="list">
                    {[1, 2, 3, 4, 5, 6].map((cont, index) => (
                      <li key={index}>
                        <span className="infoBox">
                          <div className="leftBox">
                            <img src={I_klaytn} alt="" />

                            <div className="priceTimeBox">
                              <p className="price">0.015 KLAY ($30.11)</p>
                              <p className="time">3 days later</p>
                            </div>
                          </div>

                          <button className="buyBtn" onClick={() => {}}>
                            Buy
                          </button>
                        </span>

                        <span className="seller">Philip van Kouwenbergh</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="offerBox statusBox">
                <strong className="title">Purchase status</strong>

                <div className="scrollBox">
                  <ul className="listHeader">
                    <li>Price/ Expired</li>
                    <li>Seller</li>
                  </ul>

                  <ul className="list">
                    {[1, 2, 3, 4, 5, 6].map((cont, index) => (
                      <li key={index}>
                        <span className="infoBox">
                          <div className="leftBox">
                            <img src={I_klaytn} alt="" />

                            <div className="priceTimeBox">
                              <p className="price">0.015 KLAY ($30.11)</p>
                              <p className="time">3 days later</p>
                            </div>
                          </div>

                          <button className="buyBtn" onClick={() => {}}>
                            Buy
                          </button>
                        </span>

                        <span className="seller">Philip van Kouwenbergh</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="categoryListArea">
              <ul className="categoryList">
                {D_itemHistoryCategoryList.map((cont, index) => (
                  <li
                    key={index}
                    className={listCategory === index ? "on" : ""}
                    onClick={() => setListCategory(index)}
                  >
                    {cont}
                  </li>
                ))}
              </ul>

              <div className="scrollBox">
                <ul className="listHeader">
                  <li>Event</li>
                  <li>Price</li>
                  <li>From</li>
                  <li>To</li>
                  <li>Date</li>
                  <li>Tx confirm</li>
                </ul>

                <ul className="list">
                  {[1, 2, 3, 4, 5, 6].map((cont, index) => (
                    <li key={index}>
                      <span>purchase</span>
                      <span>0.0020 KLAY</span>
                      <span>0xb9e83064c381bd64cb2b2f8406203e584b81a7e1</span>
                      <span>0x495f947276749ce646f68ac8c248420045cb7b5e</span>
                      <span>1 month ago</span>
                      <span>
                        <button onClick={() => {}}>
                          <img src={icon_link_on} alt="" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="otherWorkArea">
              <strong className="title">Other works in this collection</strong>

              <div className="swiperContainer">
                <div class="swiperBox">
                  <ul class="swiperList" ref={otherWorkRef}>
                    {listotheritems
                      .filter((elem) =>
                        elem.item?.itemid == itemid ? false : true
                      )
                      .sort((a, b) => a.id - b.id)
                      .map((cont, index) => (
                        <li
                          key={index}
                          class="swiperContBox"
                          onClick={() =>
                            navigate(`/singleitem?itemid=${cont.item?.itemid}`)
                          }
                        >
                          <div
                            className="itemBox"
                            style={{
                              backgroundImage: `url(${cont.item?.url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="infoBox">
                              <div className="topBar">
                                <button
                                  className="likeBtn"
                                  onClick={(e) => {
                                    // onClickFavorBtn(e, cont.itemid)
                                  }}
                                >
                                  <img
                                    src={
                                      cont.ilikethisitem ? heart_on : heart_off
                                    }
                                    alt=""
                                  />

                                  <p>{cont.countfavors}</p>
                                </button>

                                <button
                                  className="bookmarkBtn"
                                  onClick={(e) => {
                                    // onClickBookMarkBtn(e, cont.itemid)
                                  }}
                                >
                                  <img
                                    src={cont.ididbookmark ? star_on : star_off}
                                    alt=""
                                  />
                                </button>
                              </div>

                              <p className="title">{cont?.item?.titlename}</p>
                              <p className="nickname">
                                {strDot(cont.item?.author?.nickname, 10, 0)}
                              </p>

                              <div className="etcBox">
                                <p className="time">
                                  {cont?.minpriceorder
                                    ? moment
                                        .unix(cont?.minpriceorder?.expiry)
                                        .fromNow()
                                    : moment(cont?.item?.createdat).toNow()}
                                </p>

                                <strong className="priceBox">
                                  {cont?.minpriceorder?.price} KLAY
                                </strong>
                              </div>
                            </div>
                          </div>

                          <button className="buyBtn" onClick={() => {}}>
                            Buy Now
                          </button>
                        </li>
                      ))}
                  </ul>

                  <button
                    className="nextBtn pageBtn"
                    onClick={() =>
                      onClickSwiperNextBtn(
                        otherWorkRef,
                        listotheritems,
                        otherWorkIndex,
                        setOtherWorkIndex
                      )
                    }
                  >
                    <img src={I_rtArw3BlackBtn} alt="" />
                  </button>
                </div>
              </div>
            </article>
          </section>
        </MsignPopupBox>
      </>
    );
  else
    return (
      <>
        {ownerPopup && (
          <>
            <ItemOwnerPopup off={setOwnerPopup} itemid={itemid} />
            <PopupBg bg off={setOwnerPopup} />
          </>
        )}

        {reportPopup && (
          <>
            <ReportPopup off={setreportPopup} />
            <PopupBg bg off={setreportPopup} />
          </>
        )}

        {likePopup && (
          <>
            <ItemLikePopup off={setLikePopup} itemid={itemid} />
            <PopupBg bg off={setLikePopup} />
          </>
        )}

        {false && <PlaceBidPopup />}

        {purchasePopup && (
          <>
            <PurchaseSinglePopup off={setPurchasePopup} />
            <PopupBg bg off={setPurchasePopup} />
          </>
        )}

        {buySpotPopup && (
          <div
            className="popup info"
            id="info_popup"
            style={{ display: "block" }}
          >
            <div className="box_wrap buynft">
              <a
                onClick={() => setbuySpotPopup(false)}
                className="close close2"
                id="info_close"
              >
                <img
                  src={require("../../img/sub/icon_close.png").default}
                  alt="close"
                />
              </a>
              <div className="poptitle nob">
                <h2>Purchase receipt</h2>
              </div>
              <div className="list_bottom buy_nft">
                <p
                  className="warn"
                  style={{
                    display: itemdata?.item?.isreviewed ? "none" : "block",
                  }}
                >
                  Warning! Contains items
                  <br /> that have not been reviewed and approved
                </p>
                <div className="receipt_section">
                  <div className="receipt_title">
                    <p className="rec_t">Item</p>
                    <p className="rec_t right">Subtotal</p>
                  </div>
                  <div className="receipt_item">
                    <ul>
                      <li>
                        <span
                          className="pic"
                          style={{
                            backgroundImage: `url(${itemdata?.item?.url})`,
                          }}
                        ></span>
                        <div className="right_price">
                          <h3>
                            {convertLongString(8, 4, sellorder?.username)}
                            <br />
                            <span>{itemdata?.item?.titlename} </span>
                            {/**Blackman with neon */}
                          </h3>
                          <h4 className="m_sub">
                            <img
                              style={{ width: "60px" }}
                              src={require("../../img/header/logo.png").default}
                            />
                            <span className="pri">
                              {sellorder?.asset_amount_bid
                                ? `Qty. ${sellorder?.asset_amount_bid}`
                                : ""}{" "}
                              {sellorder?.tokenid
                                ? `of token #${sellorder?.tokenid}`
                                : ""}{" "}
                            </span>
                          </h4>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="rec_t">
                          Total
                          <span className="red">
                            {+myethbalance &&
                            +myethbalance > sellorder?.asset_amount_ask
                              ? "\u00A0"
                              : "Insufficient KLAY balance"}
                          </span>
                        </p>
                        <div className="right_price m_left">
                          <h4 className="blue">
                            <img
                              src={require("../../img/sub/rock.png").default}
                            />
                            {sellorder?.asset_amount_ask}
                            <span className="pri">
                              ($
                              {priceklay && sellorder?.asset_amount_ask
                                ? (
                                    +priceklay * sellorder?.asset_amount_ask
                                  ).toFixed(4)
                                : ""}
                              )
                            </span>
                          </h4>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="rec_t">
                          Your balance
                          <span className="red" style={{ color: "black" }}>
                            {" "}
                            {strDot(myaddress, 8, 2)}
                          </span>
                        </p>
                        <div className="right_price m_left">
                          <h4 className="blue">
                            <img
                              src={require("../../img/sub/rock.png").default}
                            />
                            {myethbalance ? (+myethbalance).toFixed(4) : "0"}
                            <span className="pri">
                              ($
                              {priceklay && myethbalance
                                ? (+priceklay * +myethbalance).toFixed(4)
                                : ""}
                              )
                            </span>
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <form className="ckb_wrap">
                    <div
                      className="ckb"
                      style={{
                        display: itemdata?.item?.isreviewed ? "none" : "block",
                      }}
                    >
                      <input type="checkbox" id="chk" name="chk1" />
                      <label htmlFor="chk">
                        Aware that Itemverse contains one item that has not been
                        reviewed and approved
                      </label>
                    </div>
                    <div className="ckb">
                      <input
                        type="checkbox"
                        id="chk2"
                        name="chk1"
                        onChange={(e) => {
                          setistoschecked(!istoschecked); // LOGGER()
                        }}
                      />
                      <label htmlFor="chk2">
                        I agree to Itemverse's <b>Terms of Service</b>
                      </label>
                    </div>
                  </form>
                </div>
                <a
                  className="reportit on "
                  disabled={istoschecked ? false : true}
                  onClick={(_) => {
                    if (istoschecked) {
                    } else {
                      //                    SetErrorBar(messages.MSG_PLEASE_CHECK_TOS);
                      //                  return;
                    }
                    LOGGER("pHeiL5AWXM");
                    onclickbuy();
                  }}
                >
                  Make a payment
                </a>
              </div>
            </div>
          </div>
        )}

        <DefaultHeader />

        <PsingleItemBox>
          <section className="innerBox" style={{ paddingTop: myItem && 0 }}>
            {myItem && (
              <article className="myItemBar">
                <div className="titleBox">
                  <button className="exitBtn" onClick={() => navigate(-1)}>
                    <img src={I_ltArw3} alt="" />
                  </button>

                  <strong className="title">
                    Philip van Kouwenbergh's item
                  </strong>
                </div>

                <div className="btnBox">
                  <button className="sellBtn" onClick={() => {}}>
                    SELL
                  </button>
                  <button className="editBtn" onClick={() => {}}>
                    EDIT
                  </button>
                </div>
              </article>
            )}

            {myItem && (
              <article className="myItemBar">
                <div className="titleBox">
                  <button className="exitBtn" onClick={() => navigate(-1)}>
                    <img src={I_ltArw3} alt="" />
                  </button>

                  <strong className="title">
                    Philip van Kouwenbergh's item
                  </strong>
                </div>

                <div className="btnBox">
                  <button className="editBtn" onClick={() => {}}>
                    EDIT
                  </button>
                  <button className="cancelBtn" onClick={() => {}}>
                    Cancel Listing
                  </button>
                </div>
              </article>
            )}

            <article className="itemArea">
              <div
                className="itemBox"
                style={{
                  backgroundImage: `url(${itemdata?.item?.url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="topBar">
                  <button className="sellerBtn" onClick={() => {}}>
                    <img
                      className="profImg"
                      src={author?.profileimage}
                      alt=""
                    />
                    <p>@{itemdata.author?.nickname}</p>
                  </button>

                  <button
                    className="likeBtn"
                    onClick={() => setLikePopup(true)}
                  >
                    <img src={I_heart} alt="" />
                    <p>{itemdata.item?.countfavors} Likes</p>
                  </button>
                </div>

                <div className="bottomBar">
                  <button
                    className="ownerBtn"
                    onClick={() => setOwnerPopup(true)}
                  >
                    <p className="value">{itemdata.countholders}</p>
                    <p className="key">Owner</p>
                  </button>
                  <button className="fragmentBtn">
                    <p className="value">{itemdata.item?.countcopies}</p>
                    <p className="key">Fragment</p>
                  </button>
                  <button className="viewBtn">
                    <p className="value">
                      {numFormatter(itemdata.item?.countviews)}
                    </p>
                    <p className="key">Views</p>
                  </button>
                </div>
              </div>

              <div className="rightBox">
                <div className="topBar">
                  <strong className="title">{itemdata?.item?.titlename}</strong>

                  <div className="btnBox">
                    <button
                      className="reloadBtn"
                      onClick={() => window.location.reload()}
                    >
                      <img src={refresh} alt="" />
                    </button>
                    <button
                      className="alertBtn"
                      onClick={() => setreportPopup(true)}
                    >
                      <img src={alert} alt="" />
                    </button>
                    <button className="shareBtn" onClick={() => {}}>
                      <img src={share} alt="" />
                    </button>
                  </div>
                </div>

                <div className="priceContainer">
                  <div className="titleBox">Owner public content include</div>

                  <div className="priceList">
                    <div className="priceBox">
                      <p className="title">Current Bid</p>
                      <div className="price">
                        <p className="value">2.867</p>
                        <p className="key">AUSP</p>
                      </div>
                      <p className="exchange">$1,234.25</p>
                    </div>

                    <div className="timeBox">
                      <p className="title">Auction ending in</p>
                      <strong className="time">05:32:21</strong>
                    </div>
                  </div>

                  <button
                    className="bidBtn"
                    onClick={() => setPurchasePopup(true)}
                  >
                    Place a Bid
                  </button>
                </div>
              </div>
            </article>

            <article className="descriptionArea">
              <strong className="title">Description</strong>

              <p className="description">{itemdata.item?.description}</p>
            </article>

            <article className="historyArea">
              <div className="priceBox">
                <strong className="title">Price History</strong>

                <div className="contBox">
                  <div className="termBox posBox">
                    <button className="termBtn" onClick={() => {}}>
                      <p>Last 60 Days</p>
                      <img src={I_dnArw} alt="" />
                    </button>
                  </div>

                  <div className="chartContainer">
                    <ul className="priceList">
                      <li>
                        <p className="key">Average price</p>
                        <strong className="value">$31.11</strong>
                      </li>
                      <li>
                        <p className="key">Highest price</p>
                        <strong className="value">$32.11</strong>
                      </li>
                      <li>
                        <p className="key">Lowest price</p>
                        <strong className="value">$30.11</strong>
                      </li>
                    </ul>

                    <div className="chartBox">
                      <Chart
                        {...chartData}
                        options={{
                          chart: {
                            toolbar: {
                              show: false,
                            },
                          },
                          xaxis: {
                            categories: [...chartXdata],
                          },
                          colors: ["#000"],
                        }}
                        series={[
                          {
                            name: "price",
                            data: [...chartYdata],
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="offerBox">
                <strong className="title">Offer History</strong>

                <div className="scrollBox">
                  <ul className="offerList">
                    {orders_sell
                      .sort((a, b) => {
                        return +a.asset_amount_ask == +b.asset_amount_ask
                          ? a.createdat > b.createdat
                            ? -1
                            : +1
                          : +a.asset_amount_ask - +b.asset_amount_ask;
                      })
                      .map((v, idx) => {
                        return (
                          <li key={idx}>
                            <span className="profBox">
                              <img src={jprofileimages[idx]} alt="" />
                              <span className="textBox">
                                <strong className="price">
                                  {(+v.asset_amount_ask)?.toFixed(4)} KLAY
                                </strong>
                                <p className="nickname">T.WD</p>
                              </span>
                            </span>

                            <span className="rightBox">
                              <p className="address">
                                {convertLongString(8, 8, v.username)}
                              </p>

                              <p className="time">
                                {moment(v.createdat).fromNow()}
                              </p>
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </article>

            <article className="statusArea">
              <div className="saleBox">
                <strong className="title">SALES STATUS</strong>

                <div className="scrollBox">
                  <ul className="listHeader">
                    <li>Price</li>
                    <li>Expired</li>
                    <li>Seller</li>
                  </ul>

                  <ul className="list">
                    {[1, 2, 3, 4, 5, 6].map((cont, index) => (
                      <li key={index}>
                        <span>
                          <div className="priceBox">
                            <img src={I_klaytn} alt="" />
                            <p>0.015 KLAY ($30.11)</p>
                          </div>

                          <button className="purchaseBtn" onClick={() => {}}>
                            Purchase
                          </button>
                        </span>

                        <span>3 days later</span>
                        <span>Philip van Kouwenbergh</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="offerBox">
                <strong className="title">PURCHASE STATUS</strong>

                <div className="scrollBox">
                  <ul className="listHeader">
                    <li>Price</li>
                    <li>Expired</li>
                    <li>Buyer</li>
                  </ul>

                  <ul className="list">
                    {[1, 2, 3, 4, 5, 6].map((cont, index) => (
                      <li key={index}>
                        <span>
                          <div className="priceBox">
                            <img src={I_klaytn} alt="" />
                            <p>0.015 KLAY ($30.11)</p>
                          </div>

                          <button className="purchaseBtn" onClick={() => {}}>
                            Purchase
                          </button>
                        </span>

                        <span>3 days later</span>
                        <span>Philip van Kouwenbergh</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="categoryListArea">
              <ul className="categoryList">
                {D_itemHistoryCategoryList.map((cont, index) => (
                  <li
                    key={index}
                    className={listCategory === index ? "on" : ""}
                    onClick={() => setListCategory(index)}
                  >
                    {cont}
                  </li>
                ))}
              </ul>

              <div className="scrollBox">
                <ul className="listHeader">
                  <li>Event</li>
                  <li>Price</li>
                  <li>From</li>
                  <li>To</li>
                  <li>Date</li>
                  <li>Tx confirm</li>
                </ul>

                <ul className="list">
                  {[1, 2, 3, 4, 5, 6].map((cont, index) => (
                    <li key={index}>
                      <span>purchase</span>
                      <span>0.0020 KLAY</span>
                      <span>0xb9e83064c381bd64cb2b2f8406203e584b81a7e1</span>
                      <span>0x495f947276749ce646f68ac8c248420045cb7b5e</span>
                      <span>1 month ago</span>
                      <span>
                        <button onClick={() => {}}>
                          <img src={icon_link_on} alt="" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="otherWorkArea">
              <strong className="title">Other works in this collection</strong>

              <div className="swiperContainer">
                <div class="swiperBox">
                  <ul class="swiperList" ref={otherWorkRef}>
                    {listotheritems
                      .filter((elem) =>
                        elem.item?.itemid == itemid ? false : true
                      )
                      .sort((a, b) => a.id - b.id)
                      .map((cont, index) => (
                        <li
                          key={index}
                          class="swiperContBox"
                          onClick={() =>
                            navigate(`/singleitem?itemid=${cont.item?.itemid}`)
                          }
                        >
                          <div
                            className="itemBox"
                            style={{
                              backgroundImage: `url(${cont.item?.url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="infoBox">
                              <div className="topBar">
                                <button
                                  className="likeBtn"
                                  onClick={(e) => {
                                    // onClickFavorBtn(e, cont.itemid)
                                  }}
                                >
                                  <img
                                    src={
                                      cont.ilikethisitem ? heart_on : heart_off
                                    }
                                    alt=""
                                  />

                                  <p>{cont.countfavors}</p>
                                </button>

                                <button
                                  className="bookmarkBtn"
                                  onClick={(e) => {
                                    // onClickBookMarkBtn(e, cont.itemid)
                                  }}
                                >
                                  <img
                                    src={cont.ididbookmark ? star_on : star_off}
                                    alt=""
                                  />
                                </button>
                              </div>

                              <p className="title">{cont?.item?.titlename}</p>
                              <p className="nickname">
                                {strDot(cont.item?.author?.nickname, 10, 0)}
                              </p>

                              <div className="etcBox">
                                <p className="time">
                                  {cont?.minpriceorder
                                    ? moment
                                        .unix(cont?.minpriceorder?.expiry)
                                        .fromNow()
                                    : moment(cont?.item?.createdat).toNow()}
                                </p>

                                <strong className="priceBox">
                                  {cont?.minpriceorder?.price} KLAY
                                </strong>
                              </div>
                            </div>
                          </div>

                          <button className="buyBtn" onClick={() => {}}>
                            Buy Now
                          </button>
                        </li>
                      ))}
                  </ul>

                  <button
                    className="preBtn pageBtn"
                    onClick={() =>
                      onClickSwiperPreBtn(
                        otherWorkRef,
                        listotheritems,
                        otherWorkIndex,
                        setOtherWorkIndex
                      )
                    }
                  >
                    <img src={I_ltArw3BlackBtn} alt="" />
                  </button>

                  <button
                    className="nextBtn pageBtn"
                    onClick={() =>
                      onClickSwiperNextBtn(
                        otherWorkRef,
                        listotheritems,
                        otherWorkIndex,
                        setOtherWorkIndex
                      )
                    }
                  >
                    <img src={I_rtArw3BlackBtn} alt="" />
                  </button>
                </div>
              </div>
            </article>
          </section>
        </PsingleItemBox>
      </>
    );
}

const MsignPopupBox = styled.div`
  padding: 72px 0;
  height: 100%;
  overflow-y: scroll;

  .innerBox {
    padding: 5.55vw 5.55vw 0 5.55vw;

    *::-webkit-scrollbar {
      width: 6px;
    }

    *::-webkit-scrollbar-thumb {
      background-color: #222;
      border-radius: 4px;
      width: 6px;
    }

    *::-webkit-scrollbar-track {
      background-color: #d8d8d8;
      border-radius: 4px;
      border: 1px solid #fff;
    }

    .myItemBar {
      display: flex;
      flex-direction: column;
      gap: 5vw;
      padding: 8.33vw 0;

      .titleBox {
        display: flex;
        align-items: center;
        gap: 2.22vw;

        .exitBtn {
          img {
            width: 5vw;
          }
        }

        .title {
          font-size: 5vw;
        }
      }

      .btnBox {
        display: flex;
        gap: 2.77vw;

        button {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 13.33vw;
          border-radius: 11.66vw;
          font-size: 4.44vw;
          font-weight: 700;

          &.sellBtn {
            color: #fff;
            background: #1c7eff;
          }

          &.editBtn,
          &.cancelBtn {
            border: 2px solid #000;
          }
        }
      }
    }

    .title {
      font-size: 5vw;
      font-weight: 900;
      font-family: "Poppins", sans-serif;
    }

    .itemArea {
      display: flex;
      flex-direction: column;
      height: 171.11vw;
      border-radius: 5.55vw;
      overflow: hidden;

      .itemBox {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 116.11vw;
        padding: 2.77vw 2.77vw 11.11vw 2.77vw;

        .topBar {
          display: flex;
          justify-content: space-between;
          width: 100%;

          button {
            height: 11.66vw;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 7.77vw;
            backdrop-filter: blur(15px);
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);

            p {
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            &.sellerBtn {
              display: flex;
              align-items: center;
              gap: 2.22vw;
              max-width: 52.77vw;
              padding: 0 2.22vw;
              font-size: 3.33vw;
              line-height: 3.33vw;
              font-weight: 500;

              img {
                width: 8.33vw;
                height: 8.33vw;
                border-radius: 50%;
                object-fit: cover;
                background: #fff;
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
              }
            }

            &.likeBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 11.66vw;
              height: 11.66vw;

              img {
                width: 5.55vw;
              }
            }
          }
        }

        .bottomBar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 83.33vw;
          height: 17.77vw;
          padding: 0 4.16vw;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 14.44vw;
          backdrop-filter: blur(15px);
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);

          button {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            .value {
              font-size: 6.66vw;
              font-weight: 700;
            }

            .key {
              font-size: 3.33vw;
              font-weight: 500;
            }
          }
        }
      }

      .priceContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 55.55vw;
        padding: 10vw 4.44vw 5.55vw 4.44vw;
        background: #222;
        position: relative;

        .titleBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 51.11vw;
          height: 8.33vw;
          border-radius: 5vw;
          font-size: 3.33vw;
          font-weight: 500;
          color: #fff;
          background: #1c7eff;
          top: -4.16vw;
          position: absolute;
        }

        .priceList {
          flex: 1;
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 2.22vw;
          text-align: center;
          color: #fff;

          .listTitle {
            font-size: 3.33vw;
            font-weight: 500;
          }

          .priceBox {
            .price {
              display: flex;
              align-items: flex-end;
              margin: 2.77vw 0 0 0;
              font-weight: 900;

              .value {
                font-size: 7.77vw;
                line-height: 9.16vw;
              }

              .key {
                font-size: 3.33vw;
                line-height: 5.55vw;
              }
            }

            .exchange {
              font-size: 3.88vw;
              color: #b2b2b2;
            }
          }

          .timeBox {
            display: flex;
            flex-direction: column;
            gap: 2.77vw;

            .time {
              font-size: 7.77vw;
            }
          }
        }

        .bidBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 56px;
          font-size: 22px;
          font-weight: 700;
          background: #fff;
          border-radius: 28px;
        }
      }
    }

    & > .rightBox {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 5.55vw 0 0 0;
      padding: 0 0 8.33vw 0;

      .itemTitle {
        font-size: 8.33vw;
      }

      .descriptionBox {
        display: flex;
        flex-direction: column;
        gap: 3.33vw;
        margin: 2.77vw 0 0 0;

        .descriptionTitle {
          font-size: 5vw;
        }

        .description {
          font-size: 3.88vw;
          font-weight: 500;
          line-height: 5.55vw;
        }
      }

      .btnBox {
        display: flex;
        align-items: center;
        gap: 6.11vw;
        margin: 5.55vw 0 0 0;

        button {
          img {
            height: 6.66vw;
            object-fit: contain;
          }
        }
      }
    }

    & > .priceBox {
      display: flex;
      flex-direction: column;
      padding: 8.33vw 0;
      border-top: 1px solid #e1e1e1;

      .contBox {
        display: flex;
        flex-direction: column;
        gap: 4.44vw;
        margin: 5.55vw 0 0 0;

        .termBox {
          .termBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 45vw;
            height: 8.88vw;
            padding: 0 3.88vw 0 5.55vw;
            font-size: 3.88vw;
            font-weight: 500;
            border: solid 1px #899a9b;
            border-radius: 6.66vw;
            img {
              width: 5.55vw;
            }
          }
        }

        .chartContainer {
          display: flex;
          flex-direction: column;

          .priceList {
            display: flex;
            gap: 8.33vw;

            li {
              display: flex;
              flex-direction: column;
              gap: 1.11vw;
              width: 20vw;

              .key {
                font-size: 3.33vw;
                font-weight: 500;
                letter-spacing: -0.03vw;
              }

              .value {
                font-size: 5.55vw;
              }
            }
          }

          .chartBox {
            width: 100%;
          }
        }
      }
    }

    & > .offerBox {
      display: flex;
      flex-direction: column;
      gap: 2.77vw;
      padding: 8.33vw 0;
      border-top: 1px solid #e1e1e1;

      .scrollBox {
        height: 51.66vw;

        .offerList {
          display: flex;
          flex-direction: column;
          gap: 9.94vw;
          height: 100%;
          padding: 5.55vw 4.44vw 5.55vw 0;
          overflow-y: scroll;

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 6.66vw;

            .profBox {
              display: flex;
              align-items: center;
              gap: 2.77vw;

              img {
                width: 8.33vw;
                height: 8.33vw;
                border-radius: 50%;
                object-fit: cover;
              }

              .textBox {
                white-space: nowrap;

                .price {
                  font-size: 4.44vw;
                }

                .nickname {
                  font-size: 3.33vw;
                  font-weight: 500;
                  color: #899a9b;
                }
              }
            }

            .rightBox {
              flex: 1;
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 2.77vw;
              font-weight: 500;
              overflow: hidden;

              .address {
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }

    .statusArea {
      display: flex;
      flex-direction: column;
      gap: 8.33vw;
      padding: 8.33vw 0 0 0;
      border-top: 1px solid #e1e1e1;

      .statusBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;

        .scrollBox {
          border: solid 1px #222;
          border-radius: 20px;
          padding: 1.11vw 2.22vw 3.88vw 2.77vw;

          .listHeader {
            display: flex;
            align-items: center;
            height: 13.33vw;
            font-size: 3.88vw;
            font-weight: 500;
          }

          .list {
            display: flex;
            flex-direction: column;
            gap: 3.33vw;
            height: 50vw;
            overflow-y: scroll;

            li {
              display: flex;

              .infoBox {
                display: flex;
                justify-content: space-between;
                gap: 2.77vw;

                .leftBox {
                  flex: 1;
                  display: flex;
                  gap: 1.66vw;

                  img {
                    width: 5.55vw;
                    height: 5.55vw;
                    border-radius: 50%;
                    object-fit: contain;
                  }

                  .priceTimeBox {
                    display: flex;
                    flex-direction: column;
                    gap: 0.55vw;
                    font-weight: 500;

                    * {
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }

                    .price {
                      font-size: 3.88vw;
                    }

                    .time {
                      font-size: 3.33vw;
                      color: #b1b1b1;
                    }
                  }
                }

                .buyBtn {
                  width: 13.33vw;
                  height: 6.66vw;
                  font-size: 3.88vw;
                  font-weight: 500;
                  color: #fff;
                  background: #000;
                  border-radius: 4.44vw;
                }
              }

              .seller {
                font-size: 3.88vw;
                font-weight: 500;
                line-height: 6.66vw;
                color: #1c7eff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }

          .listHeader,
          .list li {
            gap: 2.77vw;
          }

          .listHeader li,
          .list li span {
            &:nth-of-type(1) {
              width: 60vw;
            }

            &:nth-of-type(2) {
              flex: 1;
            }
          }
        }
      }
    }

    .categoryListArea {
      padding: 0 0 4.44vw 0;
      margin: 8.33vw 0;
      border: solid 1px #222;
      border-radius: 5.55vw;
      overflow: hidden;

      .categoryList {
        display: flex;
        height: 13.33vw;

        li {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3.88vw;
          font-weight: 500;
          color: #899a9b;
          background: #f3f3f3;

          &.on {
            color: #fff;
            background: #000;
          }
        }
      }

      .scrollBox {
        margin: 0 2.22vw 0 2.77vw;

        overflow-x: scroll;

        &::-webkit-scrollbar {
          height: 6px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #222;
          border-radius: 4px;
          height: 6px;
        }

        &::-webkit-scrollbar-track {
          background-color: #d8d8d8;
          border-radius: 4px;
          border: 1px solid #fff;
        }

        .listHeader {
          display: flex;
          align-items: center;
          height: 13.33vw;

          li {
            font-size: 4.44vw;
            font-weight: 700;
          }
        }

        .list {
          width: 340vw;
          height: 53.33vw;
          font-size: 4.44vw;
          font-weight: 500;
          overflow-y: scroll;

          li {
            display: flex;
            align-items: center;
            height: 13.33vw;
            border-top: 1px solid #f2f2f2;

            span {
              &:nth-of-type(n + 3):nth-of-type(-n + 4) {
                color: #1c7eff;
              }

              &:nth-of-type(5) {
                color: #899a9b;
              }

              &:nth-of-type(6) {
                button {
                  img {
                    width: 5.55vw;
                  }
                }
              }
            }
          }
        }

        .listHeader li,
        .list li span {
          &:nth-of-type(1) {
            min-width: 30.55vw;
          }

          &:nth-of-type(2) {
            min-width: 31.11vw;
          }

          &:nth-of-type(3) {
            min-width: 108.88vw;
          }

          &:nth-of-type(4) {
            min-width: 108.88vw;
          }

          &:nth-of-type(5) {
            min-width: 35vw;
          }

          &:nth-of-type(6) {
            min-width: 23.33vw;
            display: flex;
            justify-content: center;
          }
        }
      }
    }

    .otherWorkArea {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;
      padding: 8.33vw 0 0 0;
      border-top: 1px solid #e1e1e1;

      .title {
        font-size: 22px;
      }

      .swiperContainer {
        .swiperBox {
          display: flex;
          align-items: center;

          .swiperList {
            display: flex;
            gap: 5.55vw;
            overflow-x: scroll;
            scroll-snap-type: x mandatory;

            &::-webkit-scrollbar {
              display: none;
            }

            .swiperContBox {
              display: flex;
              flex-direction: column;
              width: 88.88vw;
              min-width: 88.88vw;
              height: 144.44vw;
              color: #fff;
              border-radius: 5.55vw;
              overflow: hidden;
              cursor: pointer;
              position: relative;
              scroll-snap-align: center;

              .itemBox {
                flex: 1;
                display: flex;
                align-items: flex-end;

                .infoBox {
                  width: 100%;
                  padding: 2.77vw 5.55vw 4.44vw 5.55vw;
                  background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.3),
                    rgba(84, 84, 84, 0.3)
                  );

                  .topBar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    img {
                      width: 5.55vw;
                    }

                    .likeBtn {
                      display: flex;
                      align-items: center;
                      gap: 2.77vw;
                      font-size: 3.88vw;
                      font-weight: 500;
                      line-height: 3.88vw;
                      color: #fff;
                    }

                    .bookmarkBtn {
                    }
                  }

                  .title {
                    margin: 3.33vw 0 0 0;
                    font-size: 7.22vw;
                    font-weight: 500;
                    line-height: 10vw;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .nickname {
                    margin: 1.11vw 0 0 0;
                    font-size: 5vw;
                    font-weight: 500;
                  }

                  .etcBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 6.11vw;
                    margin: 2.5vw 0 0 0;

                    .time {
                      font-size: 3.88vw;
                      font-weight: 500;
                      color: #e5e5e5;
                    }

                    .priceBox {
                      font-size: 5vw;
                    }
                  }
                }
              }

              .buyBtn {
                height: 17.77vw;
                font-size: 5vw;
                font-weight: 500;
                color: #fff;
                background: #222;
              }
            }
          }
        }
      }

      .pageBtn {
        position: absolute;

        img {
          width: 10vw;
        }

        &.nextBtn {
          right: 2.22vw;
        }
      }
    }
  }
`;

const PsingleItemBox = styled.div`
  padding: 120px 0;

  .innerBox {
    max-width: 1280px;
    padding: 82px 0 0 0;
    margin: 0 auto;

    *::-web kit-scrollbar {
      width: 6px;
    }

    *::-webkit-scrollbar-thumb {
      background-color: #222;
      border-radius: 4px;
      width: 6px;
    }

    *::-webkit-scrollbar-track {
      background-color: #d8d8d8;
      border-radius: 4px;
      border: 1px solid #fff;
    }

    .myItemBar {
      display: flex;
      align-items: center;
      gap: 18px;
      height: 128px;

      .titleBox {
        display: flex;
        align-items: center;
        gap: 16px;

        .exitBtn {
          img {
            width: 18px;
          }
        }

        .title {
          font-size: 22px;
        }
      }

      .btnBox {
        display: flex;
        gap: 10px;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          height: 48px;
          border-radius: 28px;
          font-size: 18px;
          font-weight: 700;

          &.sellBtn {
            color: #fff;
            background: #1c7eff;
          }

          &.editBtn {
            border: 2px solid #000;
          }

          &.cancelBtn {
            width: 160px;
            border: 2px solid #000;
          }
        }
      }
    }

    .itemArea {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .itemBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 740px;
        height: 740px;
        padding: 10px 10px 20px 10px;
        border-radius: 20px;

        .topBar {
          display: flex;
          justify-content: space-between;
          width: 100%;

          button {
            height: 56px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 28px;
            backdrop-filter: blur(15px);
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);

            p {
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            &.sellerBtn {
              display: flex;
              align-items: center;
              gap: 10px;
              max-width: 260px;
              padding: 0 10px;
              font-size: 16px;
              line-height: 16px;
              font-weight: 500;
              color: #000;

              img {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                object-fit: cover;
                background: #fff;
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
              }
            }

            &.likeBtn {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 10px;
              max-width: 150px;
              padding: 0 20px;
              font-size: 16px;
              line-height: 16px;
              font-weight: 500;
              color: #000;

              img {
                width: 20px;
              }
            }
          }
        }

        .bottomBar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 434px;
          height: 92px;
          padding: 0 28px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 52px;
          backdrop-filter: blur(15px);
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);

          button {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            .value {
              font-size: 40px;
              font-weight: 700;
            }

            .key {
              font-size: 14px;
              font-weight: 500;
            }
          }
        }
      }

      & > .rightBox {
        display: flex;
        flex-direction: column;
        gap: 120px;
        width: 100%;
        max-width: 500px;

        .topBar {
          display: flex;
          flex-direction: column;
          gap: 26px;

          .title {
            font-size: 40px;
          }

          .btnBox {
            display: flex;
            align-items: center;
            gap: 20px;

            button {
              img {
                width: 24px;
                height: 20px;
                object-fit: contain;
              }
            }
          }
        }

        .priceContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 492px;
          padding: 30px;
          background: #222;
          border-radius: 20px;
          position: relative;

          .titleBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 226px;
            height: 36px;
            border-radius: 18px;
            font-size: 14px;
            font-weight: 500;
            color: #fff;
            background: #1c7eff;
            top: -18px;
            position: absolute;
          }

          .priceList {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 44px 0;
            text-align: center;
            color: #fff;

            .title {
              font-size: 20px;
              font-weight: 500;
            }

            .priceBox {
              font-weight: 900;

              .price {
                display: flex;
                align-items: flex-end;
                margin: 16px 0 0 0;

                .value {
                  font-size: 50px;
                  line-height: 60px;
                }

                .key {
                  font-size: 24px;
                  line-height: 44px;
                }
              }

              .exchange {
                font-size: 20px;
                color: #b2b2b2;
              }
            }

            .timeBox {
              display: flex;
              flex-direction: column;
              gap: 16px;

              .time {
                font-size: 50px;
              }
            }
          }

          .bidBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 56px;
            font-size: 22px;
            font-weight: 700;
            background: #fff;
            border-radius: 28px;
          }
        }
      }
    }

    .descriptionArea {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 40px 0 0 0;

      .title {
        font-size: 22px;
      }

      .description {
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
      }
    }

    .historyArea {
      display: flex;
      gap: 16px;
      margin: 66px 0 0 0;

      & > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 30px;

        .title {
          font-size: 22px;
        }

        .contBox {
          flex: 1;
        }

        &.priceBox {
          .contBox {
            display: flex;
            flex-direction: column;
            gap: 24px;

            .termBox {
              .termBtn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 176px;
                height: 38px;
                padding: 0 16px;
                font-size: 16px;
                font-weight: 500;
                border: solid 1px #899a9b;
                border-radius: 24px;

                img {
                  width: 20px;
                }
              }
            }

            .chartContainer {
              display: flex;

              .priceList {
                display: flex;
                flex-direction: column;
                gap: 32px;
                width: 120px;

                li {
                  display: flex;
                  flex-direction: column;
                  gap: 8px;

                  .key {
                    font-size: 14px;
                    font-weight: 500;
                  }

                  .value {
                    font-size: 26px;
                  }
                }
              }

              .chartBox {
                width: 380px;
              }
            }
          }
        }

        &.offerBox {
          .scrollBox {
            height: 306px;
            border: solid 2px #222;
            border-radius: 20px;
            padding: 27px 18px 27px 27px;

            .offerList {
              display: flex;
              flex-direction: column;
              gap: 20px;
              height: 100%;
              overflow-y: scroll;

              li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 76px;
                padding: 0 20px 0 0;

                .profBox {
                  display: flex;
                  align-items: center;
                  gap: 36px;

                  img {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    object-fit: cover;
                  }

                  .textBox {
                    .price {
                      font-size: 18px;
                    }
                    .nickname {
                      font-size: 14px;
                      font-weight: 500;
                      color: #899a9b;
                    }
                  }
                }

                .rightBox {
                  flex: 1;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
    }

    .statusArea {
      display: flex;
      gap: 16px;
      margin: 90px 0 0 0;

      .title {
        font-size: 22px;
      }

      & > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .scrollBox {
          display: flex;
          flex-direction: column;
          height: 354px;
          padding: 0 8px 10px 16px;
          border-radius: 20px;
          border: solid 2px #222;

          .listHeader {
            display: flex;
            align-items: center;
            height: 62px;
            font-size: 18px;
            font-weight: 700;
          }

          .list {
            flex: 1;
            overflow-y: scroll;

            li {
              display: flex;
              align-items: center;
              height: 54px;
              border-top: 1px solid #f1f1f1;
              font-weight: 500;

              span {
                &:nth-of-type(1) {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 16px 0 0;

                  .priceBox {
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    img {
                      width: 24px;
                      height: 24px;
                      object-fit: contain;
                    }
                  }

                  .purchaseBtn {
                    width: 88px;
                    height: 34px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #fff;
                    background: #222;
                    border-radius: 16px;
                  }
                }

                &:nth-of-type(3) {
                  color: #1c7eff;
                }
              }
            }
          }

          .listHeader li,
          .list li span {
            &:nth-of-type(1) {
              width: 304px;
            }

            &:nth-of-type(2) {
              width: 108px;
            }

            &:nth-of-type(3) {
              flex: 1;
            }
          }
        }
      }
    }

    .categoryListArea {
      margin: 30px 0 0 0;
      border: solid 2px #222;
      border-radius: 20px;
      overflow: hidden;

      .categoryList {
        display: flex;
        height: 60px;

        li {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          font-weight: 500;
          color: #899a9b;
          background: #f3f3f3;

          &.on {
            color: #fff;
            background: #000;
          }
        }
      }

      .scrollBox {
        padding: 0 8px 0 12px;

        .listHeader {
          display: flex;
          align-items: center;
          height: 54px;
          padding: 0 22px 0 6px;

          li {
            font-size: 18px;
            font-weight: 500;
          }
        }

        .list {
          height: 280px;
          padding: 0 22px 0 6px;
          font-size: 16px;
          font-weight: 500;
          overflow-y: scroll;

          li {
            display: flex;
            align-items: center;
            height: 56px;
            border-top: 1px solid #f2f2f2;

            span {
              &:nth-of-type(n + 3):nth-of-type(-n + 4) {
                color: #1c7eff;
              }

              &:nth-of-type(5) {
                color: #899a9b;
              }

              &:nth-of-type(6) {
                button {
                  img {
                    width: 28px;
                  }
                }
              }
            }
          }
        }

        .listHeader li,
        .list li span {
          &:nth-of-type(1) {
            width: 110px;
          }

          &:nth-of-type(2) {
            width: 112px;
          }

          &:nth-of-type(3) {
            width: 392px;
          }

          &:nth-of-type(4) {
            width: 392px;
          }

          &:nth-of-type(5) {
            width: 126px;
          }

          &:nth-of-type(6) {
            flex: 1;
            display: flex;
            justify-content: center;
          }
        }
      }
    }

    .otherWorkArea {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin: 90px 0 0 0;

      .title {
        font-size: 22px;
      }

      .swiperContainer {
        .swiperBox {
          display: flex;
          align-items: center;
          position: relative;

          .swiperList {
            display: flex;
            gap: 16px;
            overflow-x: scroll;

            &::-webkit-scrollbar {
              display: none;
            }

            .swiperContBox {
              display: flex;
              flex-direction: column;
              width: 308px;
              min-width: 308px;
              height: 500px;
              color: #fff;
              border-radius: 20px;
              overflow: hidden;
              cursor: pointer;

              .itemBox {
                flex: 1;
                display: flex;
                align-items: flex-end;

                .infoBox {
                  width: 100%;
                  padding: 16px;
                  background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.3),
                    rgba(84, 84, 84, 0.3)
                  );

                  .topBar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    img {
                      width: 20px;
                    }

                    .likeBtn {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      font-size: 14px;
                      font-weight: 500;
                      line-height: 14px;
                      color: #fff;
                    }

                    .bookmarkBtn {
                    }
                  }

                  .title {
                    margin: 10px 0 0 0;
                    font-size: 22px;
                    font-weight: 500;
                    line-height: 30px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .nickname {
                    margin: 4px 0 0 0;
                    font-size: 14px;
                    font-weight: 500;
                  }

                  .etcBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 22px;
                    margin: 12px 0 0 0;

                    .time {
                      font-size: 14px;
                      font-weight: 500;
                      color: #e5e5e5;
                    }

                    .priceBox {
                      font-size: 18px;
                    }
                  }
                }
              }

              .buyBtn {
                height: 64px;
                font-size: 22px;
                font-weight: 500;
                color: #fff;
                background: #222;
              }
            }
          }
        }
      }

      .pageBtn {
        position: absolute;

        &.preBtn {
          left: -24px;
        }

        &.nextBtn {
          right: -24px;
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}
function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
    Setisloader: (payload) => dispatch(setisloader(payload)),
    Setpriceklay: (payload) => dispatch(setpriceklay(payload)),
    Setitemid: (payload) => dispatch(setitemid(payload)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);

const chartCategoryList = ["Transaction History", "Chain Information"];

const chartData = {
  width: "100%",
  height: "100%",
  type: "line",
  options: {
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
      width: 2,
    },
    stroke: {
      curve: "smooth",
    },

    grid: {
      row: {
        colors: ["transparrent"],
        opacity: 0.5,
      },
    },
  },
};
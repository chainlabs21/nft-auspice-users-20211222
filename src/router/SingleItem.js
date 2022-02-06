import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  setConnect,
  setisloader,
  setpriceklay,
  setitemid,
} from "../util/store";
import styled from "styled-components";
import sample from "../img/sub/sample.png";
import profile_img from "../img/sub/profile_img.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css"; // import "./css/style01.css"; // import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useEffect, useRef, useState } from "react";
// import { singleItem } from "../mokups/items";
import moment from "moment";
// import axios from "axios";
import { API } from "../config/api";
import ItemOwnerPopup from "../components/ItemOwnerPopup";
import ItemLikePopup from "../components/ItemLikePopup";
import { applytoken } from "../util/rest";
import {
  onClickCopy,
  LOGGER,
  KEYS,
  getMaxMinAvg,
  get_last_part_of_path,
  gettimestr,
  getmyaddress,
  convaj,
  ISFINITE,
} from "../util/common";
import SetErrorBar from "../util/SetErrorBar";
import { messages } from "../config/messages";
import {
  PAYMEANS_DEF,
  URL_TX_SCAN,
  FEES_DEF,
  NETTYPE,
} from "../config/configs";
import I_heartO from "../img/main/I_heartO.svg";
import I_heartOGray from "../img/sub/I_heartOGray.svg";
import I_heartOPink from "../img/sub/I_heartOPink.svg";
import { useSearchParams } from "react-router-dom";
import {
  query_nfttoken_balance,
  requesttransaction,
  getabistr_forfunction,
  query_with_arg,
} from "../util/contract-calls";
import I_staroff from "../img/sub/star_off.png";
import I_staron from "../img/sub/star_on.png";
import { query_eth_balance } from "../util/contract-calls";
import { getethrep, getweirep, is_two_addresses_same } from "../util/eth";
import rstone from "../img/sub/rstone.png";
import { ADDRESSES } from "../config/addresses";
import { putCommaAtPrice, strDot } from "../util/Util";
import Chart from "react-apexcharts";
import { MAP_SALETYPES , MAP_ITEMHISTORY_EVETNS } from '../config/disp'
import PlaceBidPopup from '../components/PlaceBidPopup'

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
  const itemWrapRef = useRef();
  /**   const {    likerList,    ownerList,    salesStatus,    pur chaseStatus,    transactionHistory,    chainInformation,  } = singleItem;*/
  const [ownerPopup, setOwnerPopup] = useState(false);
  const [likePopup, setLikePopup] = useState(false);
  const [buySpotPopup, setbuySpotPopup] = useState(false);
  let [bidauctionmodal, setbidauctionmodal] = useState(false);
  const [chartCategory, setChartCategory] = useState(0);
  //  const [endAutionTime, setEndAutionTime] = useState( singleItem.auctionExpiry )
  // const [diffTime, setDiffTime] = useState();
  //  const [nearEnd, setNearEnd] = useState(false);
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
  let [mybidamount, setmybidamount] = useState("");
  const [chartXdata, setChartXdata] = useState([]);
  const [chartYdata, setChartYdata] = useState([]);

  let tokenid;
  //	let itemid =get_last_part_of_path ( window.location.href )
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
			itemdata.item?.countcopies , // 2
			itemdata.item?.authorfee , // 3
      sellorder.asset_amount_bid, //4 			//			, item?.decimals       //			, sellorder?.asset_contract_ask ? sellorder?.asset_contract_ask : ADDR ESSES.zero
			getweirep(sellorder?.asset_amount_ask), // 5
			itemdata.item?.author , // 6
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
		LOGGER(abistr)
//	return
// 0xcfc20903000000000000000000000000ff817302e7b6d116cdff1a730508551ee15578750000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000003840000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000017508f1956a8000000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae2404918000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae240491800000000000000000000000083f714ad20e34748516e8367faf143abde6c37830000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d5173564c734c745154654676694743345332547632466b57416f4c4774545937714e57387263546850676f6e000000000000000000000000000000000000 // => 842
// 0xcfc20903000000000000000000000000ff817302e7b6d116cdff1a730508551ee15578750000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000003840000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000017508f1956a8000000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae2404918000000000000000000000000df7f660ecb4d96b56856d6b555a9ee9ae2404918000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d5173564c734c745154654676694743345332547632466b57416f4c4774545937714e57387263546850676f6e000000000000000000000000000000000000
    requesttransaction({
      from: myaddress,
      to: ADDRESSES.matcher_simple,
      data: abistr,
      value: getweirep(sellorder.asset_amount_ask), // '0x00'
    })
      .then((resp) => {
        LOGGER("", resp);
        let { transactionHash, status } = resp;
        if (status) {
          let reqbody = {
            itemid,
            tokenid: itemdata.item?.tokenid,
            amount: itemdata.item?.countcopies,
            price: sellorder?.asset_amount_ask,
            username: myaddress,
            seller: sellorder?.username,
            buyer: myaddress,
            matcher_contract: ADDRESSES.matcher_simple_20220131,
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
    let aargs = [
      ADDRESSES.erc1155,
      sellorder?.username,
      sellorder?.itemid,
      itemdata?.item?.countcopies,
      itemdata?.item?.authorfee,
//      tokenid || "0", // itemdata?.item?.
			sellorder?.username ,
      sellorder?.asset_amount_bid,
      getweirep(sellorder?.asset_amount_ask),
      sellorder?.startingtime ? sellorder?.startingtime : moment().unix(),
      sellorder?.expiry,
      getweirep(mybidamount),
		];
		LOGGER( '' , aargs )
// return
    let abistr = getabistr_forfunction({
      contractaddress: ADDRESSES.auction_repo_english_batch_tasks, // auction_repo_english_simple_no_batch_tasks
      abikind: "AUCTION_ENGLISH_BATCH_TASKS",
      methodname: "mint_begin_simple_and_bid",
      aargs,
		})
// remix : 0xfb972d6a000000000000000000000000ff817302e7b6d116cdff1a730508551ee1557875000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000025bf6196bd100000000000000000000000000000000000000000000000000000000000061ff908f00000000000000000000000000000000000000000000000000000000620679ef000000000000000000000000000000000000000000000000025f839810978000000000000000000000000000000000000000000000000000000000000000002e516d5455734c597a4d694c3178733777484e354454627351437a5043485a6278746874523737634647534a383438000000000000000000000000000000000000		
// react : 0xfb972d6a0000000000000000000000005ae8f88e15ff42d62b5c1288dc7909bdfa5ef4f4000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000fbbd5d0e27fabf2b57dd3660892684485fbd43dc0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000025bf6196bd100000000000000000000000000000000000000000000000000000000000061ff908f00000000000000000000000000000000000000000000000000000000620679ef000000000000000000000000000000000000000000000000025f839810978000000000000000000000000000000000000000000000000000000000000000002e516d5455734c597a4d694c3178733777484e354454627351437a5043485a6278746874523737634647534a383438000000000000000000000000000000000000
		LOGGER( '' ,  abistr )
//		return
    requesttransaction({
      from: myaddress,
      to: ADDRESSES.auction_repo_english_batch_tasks, // auction_repo_english_simple_no_batch_tasks
      data: abistr,
      value: getweirep(mybidamount),
    }).then(async (resp) => {
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
    axios.get(`${API.API_GET_ITEM_DATA}/${itemid}`).then((res) => {
      LOGGER("agwwiWSDdf", res.data);
      let { status, respdata } = res.data;
      if (status == "OK") {
        setitemdata(respdata);
        let { orders_sellside } = respdata;
        setorders_sell(orders_sellside);
        setilikethis(respdata.ilikethisitem);
        setibookmarkthis(respdata.ibookmarkthis);
        if (respdata.bids) {
          convaj(respdata.bids, "auctionhashid", "price");
        }
        if (orders_sellside && orders_sellside.length) {
          orders_sellside.forEach((elem, idx) => {
            axios.get(API.API_USER_INFO + `/${elem.username}`).then((resp) => {
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

  function onClickUserPreBtn() {
    const wrapWidth = itemWrapRef.current.offsetWidth;
    const contWidth = itemWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(listotheritems.length / itemNumByPage);
    if (userIndex > 0) setUserIndex(userIndex - 1);
    else setUserIndex(pageNum - 1);
  }

  function onClickUserNextBtn() {
    const wrapWidth = itemWrapRef.current.offsetWidth;
    const contWidth = itemWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(listotheritems.length / itemNumByPage);
    if (userIndex < pageNum - 1) setUserIndex(userIndex + 1);
    else setUserIndex(0);
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

  useEffect(() => {
		if(itemWrapRef.current && itemWrapRef.current.offsetWidth ){}
		else {return }
		if(itemWrapRef.current && itemWrapRef.current.children[0]){}
		else {return }
    const wrapWidth = itemWrapRef.current.offsetWidth;
    const contWidth = itemWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(listotheritems.length / itemNumByPage);

    if (itemWrapRef.current?.scrollTo) {
      if (userIndex < pageNum) {
        itemWrapRef.current.scrollTo({
          left: contWidth * itemNumByPage * userIndex,
          behavior: "smooth",
        });
      } else {
        itemWrapRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [userIndex]);

  return (
    <SignPopupBox>
      {ownerPopup && <ItemOwnerPopup off={setOwnerPopup} />}

      {likePopup && <ItemLikePopup off={setLikePopup} itemid={itemid} />}

{ false && (<PlaceBidPopup />) }

      {bidauctionmodal && (
        <div
          className="popup info"
          id="info_popup"
          style={{ display: "block" }}
        >
          <div className="box_wrap buynft">
            <a
              onClick={() => setbidauctionmodal(false)}
              className="close close2"
              id="info_close"
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </a>
            <div className="poptitle nob">
              <h2>Place a bid</h2>
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
                            src={require("../img/header/logo.png").default}
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
                        Current highest bid<span className="red">{"-"}</span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <img src={require("../img/sub/rock.png").default} />
                          {j_auctionuuid_bidprice[sellorder?.uuid]
                            ? j_auctionuuid_bidprice[sellorder?.uuid]
                            : "-"}{" "}
                          <span className="pri">(${"-"})</span>
                        </h4>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p className="rec_t">
                        Minimum bid
                        <span className="red" style={{ color: "black" }}>
                          {" "}
                          {"-"}
                        </span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <img src={require("../img/sub/rock.png").default} />
                          {sellorder?.asset_amount_ask}
                          <span className="pri">
                            ($
                            {priceklay && sellorder?.asset_amount_ask
                              ? (+priceklay * +sellorder?.asset_amount_ask).toFixed(4)
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
                        Your bid
                        <span className="red" style={{ color: "black" }}>
                          {" "}
                          {"-"}
                        </span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <input
                            value={mybidamount}
                            onChange={(e) => {
                              let { value : value_raw } = e.target;
															let value = + value_raw
                               if (ISFINITE(value)) {
															} else if ( value==0){}
															else {
                                SetErrorBar(messages.MSG_INPUT_NUMBERS_ONLY);
//                                return;
                              }
                              setmybidamount("" + value_raw );
                              if (value >= +myethbalance) {
                                SetErrorBar(messages.MSG_EXCEEDS_BALANCE);
                                return;
                              }
                              if (value >= sellorder?.asset_amount_ask) {
                              } else {
                                SetErrorBar(messages.MSG_FAILS_AUCTION_REQ);
                                return;
                              }
                              if (j_auctionuuid_bidprice[sellorder?.uuid]) {
                                if (
                                  value >=
                                  +j_auctionuuid_bidprice[sellorder?.uuid]
                                ) {
                                } else {
                                  SetErrorBar(messages.MSG_FAILS_AUCTION_REQ);
                                  return;
                                }
                              }
                            }}
                          />
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
                    <label for="chk">
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
                    <label for="chk2">
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
                    SetErrorBar(messages.MSG_PLEASE_CHECK_TOS);
                    return;
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
                src={require("../img/sub/icon_close.png").default}
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
                            src={require("../img/header/logo.png").default}
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
                            ? "-"
                            : "Insufficient KLAY balance"}
                        </span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <img src={require("../img/sub/rock.png").default} />
                          {sellorder?.asset_amount_ask}
                          <span className="pri">
                            ($
                            {priceklay && sellorder?.asset_amount_ask
                              ? +priceklay * sellorder?.asset_amount_ask
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
                          <img src={require("../img/sub/rock.png").default} />
                          {myethbalance}
                          <span className="pri">
                            ($
                            {priceklay && myethbalance
                              ? +priceklay * +myethbalance
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
                    <label for="chk">
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
                    <label for="chk2">
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
                    SetErrorBar(messages.MSG_PLEASE_CHECK_TOS);
                    return;
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

      <section id="sub">
        <article className="bundle_box box2 box3">
          <div className="wrap">
            <div className="bundle_top">
              <div className="bun_tl">
                <div
                  className="bun_tl_img"
                  style={{ backgroundImage: `url(${itemdata?.item?.url})` }}
                >
                  <div className="bt artist">
                    <h2>
                      {/**  <img src={author?.profileimage}></img>*/}
                      <span
                        style={{
                          backgroundImage: `url(${author?.profileimage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></span>
                      @{itemdata.author?.nickname}
                    </h2>
                  </div>
                  <div className="bt likes">
                    <a
                      onClick={() => {
                        setLikePopup(true);
                      }}
                      className="like_heart off"
                    >
                      <h2>{itemdata.item?.countfavors} Likes</h2>
                    </a>
                  </div>
                  <div className="views">
                    <ul>
                      <li
                        className="ownerBox"
                        onClick={() => setOwnerPopup(true)}
                      >
                        <h3>{itemdata.countholders}</h3>
                        <h4>
                          {itemdata.countholders && itemdata.countholders > 1
                            ? "Owners"
                            : "Owner"}{" "}
                        </h4>
                      </li>
                      <li>
                        <h3>{itemdata.item?.countcopies}</h3>
                        <h4>
                          {" "}
                          {itemdata.item?.countcopies &&
                          itemdata.item?.countcopies > 1
                            ? "Fragments"
                            : "Fragment"}
                        </h4>
                      </li>
                      <li>
                        <h3>{numFormatter(itemdata.item?.countviews)}</h3>
                        <h4>views</h4>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bun_tr">
                <div className="bun_right">
                  <div className="right_t">
                    <div className="tt">
                      <h2>{itemdata?.item?.titlename}</h2>
                      <div className="icons">
                        <a
                          onClick={(_) => {
                            fetchitem(itemdata?.item?.itemid);
                          }}
                        >
                          <img
                            src={require("../img/sub/refresh.png").default}
                          />
                        </a>
                        <a>
                          <img src={require("../img/sub/alert.png").default} />
                        </a>

                        <a
                          onClick={(_) => {
                            onClickCopy(window.location.href);
                            SetErrorBar(messages.MSG_COPIED);
                          }}
                        >
                          <img src={require("../img/sub/share.png").default} />
                        </a>
                        <a
                          onClick={(_) => {
                            LOGGER("CodOU75E5r");
                            axios
                              .post(`${API.API_TOGGLE_FAVOR}/${itemid}`)
                              .then((resp) => {
                                LOGGER("", resp.data);
                                let { status, respdata } = resp.data;
                                if (status == "OK") {
                                  if (respdata) {
                                    setilikethis(true);
                                    SetErrorBar(messages.MSG_FAVORITED);
                                    fetchitem(itemid);
                                  } else {
                                    setilikethis(false);
                                    SetErrorBar(messages.MSG_UNFAVORITED);
                                    fetchitem(itemid);
                                  }
                                }
                              });
                          }}
                        >
                          <img
                            src={ilikethis ? I_heartOPink : I_heartOGray}
                          ></img>
                        </a>

                        <a
                          onClick={(_) => {
                            axios
                              .post(`${API.API_TOGGLE_BOOKMARK}/${itemid}`)
                              .then((resp) => {
                                LOGGER("", resp.data);
                                let { status, respdata } = resp.data;
                                if (status == "OK") {
                                  if (respdata) {
                                    setibookmarkthis(true);
                                    SetErrorBar(messages.MSG_DID_BOOKMARK);
                                  } else {
                                    setibookmarkthis(false);
                                    SetErrorBar(messages.MSG_UNDID_BOOKMARK);
                                  }
                                }
                              });
                          }}
                        >
                          <img
                            src={
                              ibookmarkthis
                                ? require("../img/sub/bookmark-solid.png")
                                    .default
                                : require("../img/sub/bookmark.png").default
                            }
                          ></img>{" "}
                        </a>
                      </div>
                    </div>
                    <div className="boxes">
                      <h2>Owner public content include</h2>
                      <div className="black_box">
                        <ul>
                          <li>
                            {" "}
                            {/** itemdata.item?.price */}
                            <h3>Price</h3>
                            <h4>
                              {sellorder?.asset_amount_ask
                                ? (+sellorder?.asset_amount_ask).toFixed(4)
                                : ""}
                              <span>&nbsp;{"KLAY"}</span>
                            </h4>
                            <h5>
                              {sellorder ? "Qty." : ""}{" "}
                              {sellorder?.asset_amount_bid}{" "}
                              {itemdata?.item?.tokenid
                                ? `of token #${itemdata?.item?.tokenid}`
                                : ""}
                              {/** itemdata.item?.normprice &&
                                itemdata.item.normprice.toLocaleString(
                                  "en",
                                  "US"
                                )*/}
                            </h5>
                          </li>
                          {/* <li>
                            <h3>Auction ending in</h3>
                            <h4 style={nearEnd ? { color: "red" } : {}}>
                              {diffTime}
                            </h4>
                          </li> */}
                        </ul>
                        <a
                          onClick={() => {
                            if (sellorder?.typestr == "COMMON") {
                              setbuySpotPopup(true);
                            } else if (
                              sellorder?.typestr == "AUCTION_ENGLISH"
                            ) {
                              setbidauctionmodal(true);
                            } else {
                            }
                          }}
                          className="bid"
                        >
                          Buy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bun_full">
              <div className="desc">
                <h2 className="i_title">Description</h2>
                <p>{itemdata.item?.description}</p>
              </div>
            </div>
            <div className="bundle_top top2">
              <div className="bun_tl">
                <div className="right_m">
                  <h2 className="i_title">Price History</h2>
                  <form>
                    <select>
                      <option>Last 60 Days</option>
                    </select>
                  </form>
                  <div className="prices">
                    <ul>
                      <li>
                        <h3>Average price</h3>
                        <p>{pricestats[2] || "NA"}</p>
                      </li>
                      <li>
                        <h3>Highest price</h3>
                        <p>{pricestats[0] || "NA"}</p>
                      </li>
                      <li>
                        <h3>Lowest price</h3>
                        <p>{pricestats[1] || "NA"}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="graph">
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
              <div className="bun_tr">
                <div className="right_b">
                  <h2 className="i_title">Offers</h2>
                  <div className="history_s container">
                    <ul>
                      {orders_sell
                        .sort(
                          (a, b) =>{
														return (+a.asset_amount_ask == +b.asset_amount_ask)? 
															( a.createdat > b.createdat ? - 1 : + 1 )
														  : +a.asset_amount_ask - +b.asset_amount_ask
													}
                        )
                        .map((v, idx) => {
                          return (
                            <li
                              key={idx}
                              onClick={(_) => {
                                // SetErrorBar('BpAzNi4c1n')
                                //														setactiveorder ( v )
                                if (
                                  is_two_addresses_same(myaddress, v.username)
                                ) {
                                  SetErrorBar(messages.MSG_YOUR_OWN_ORDER);
                                  return;
                                } else {
                                }
                                setsellorder(v);
                                return;
                              }}
                            >
                              <span
                                className="profile_img"
                                style={{
                                  backgroundImage: `url(${jprofileimages[idx]})`,
                                }}
                              ></span>
                              <h3>
                                {v.asset_amount_ask
                                  ? (+v.asset_amount_ask).toFixed(4)
                                  : ""}{" "}
                                KLAY
                                <br />
                                <span>{`Qty.${v.asset_amount_bid}`} {MAP_SALETYPES[v.typestr] }</span>
                              </h3>
                              <h4>{convertLongString(8, 8, v.username)}</h4>
                              <h5>
                                {"created " + moment(v.createdat).fromNow()}
                              </h5>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="status s_pc">
              <div className="mptable left">
                <strong>SALES STATUS</strong>
                <div className="ranktable_pc p_th">
                  <div className="table_sales">
                    <table>
                      <colgroup>
                        <col style={{ width: "48%" }} />
                        <col style={{ width: "22%" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Price</th>
                          <th>Expired</th>
                          <th>Seller</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logsales.map((v) => (
                          <tr>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  style={{ width: "24px" }}
                                  alt=""
                                />
                                <p>
                                  {v.tokenprice} KLAY{" "}
                                  <span>(${v.priceusd})</span>
                                </p>
                              </div>
                              <div className="pur">
                                <a>{v.kind}</a>
                              </div>
                            </td>
                            <td>{moment(v.expired).toNow()}</td>
                            <td className="blue">{v.seller}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mptable right">
                <strong>PURCHASE STATUS</strong>
                <div className="ranktable_pc p_th">
                  <div className="table_sales">
                    <table>
                      <colgroup>
                        <col style={{ width: "39%" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Price</th>
                          <th>Expired</th>
                          <th>Buyer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logorders.map((v, idx) => (
                          <tr key={idx}>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  style={{ width: "24px" }}
                                  alt=""
                                />
                                <p>
                                  {v.price} KLAY{" "}
                                  <span>(Qty. {v.asset_amount_bid})</span>
                                </p>
                              </div>
                            </td>
                            <td>{moment(v.createdat).fromNow()}</td>
                            <td className="blue">{v.buyer}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="status s_m">
              <div className="mptable left">
                <strong>Sales status</strong>
                <div className="ranktable_pc p_th">
                  <div className="table_sales">
                    <table>
                      <colgroup>
                        <col style={{ width: "75%" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Price/Expired</th>
                          <th>Seller</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: "24px" }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div className="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td className="blue">
                            <div className="div">Esther</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mptable right">
                <strong>Purchase status</strong>
                <div className="ranktable_pc p_th">
                  <div className="table_sales">
                    <table>
                      <colgroup>
                        <col style={{ width: "75%" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Price/Expired</th>
                          <th>Buyer</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: "24px" }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td className="blue">Esther</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="basic plustab ml2">
              <div className="tab">
                <ul>
                  {chartCategoryList.map((cont, index) => (
                    <li
                      key={index}
                      className={chartCategory === index && "on"}
                      onClick={() => {
                        setChartCategory(index);
                        switch (index) {
                          case 0:
                            setlistholder(listitemhistory);
                            break;
                          case 1:
                            setlistholder(transactionHistory);
                            break;
                        }
                      }}
                    >
                      {cont}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab_bottom container con3" id="FixedTable">
                <table>
                  <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead className="head">
                    <tr>
                      <th>Event</th>
                      <th>Price</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Date</th>
                      <th className="hchain">Tx confirm</th>
                    </tr>
                  </thead>
                  <tbody className="body">
                    {listholder.map((v, idx) => (
                      <tr key={idx}>
                        <td> { MAP_ITEMHISTORY_EVETNS [ v.typestr ] } </td>
                        <td className="bold">
                          {putCommaAtPrice(v.price * 1)} KLAY
                        </td>
                        <td className="blue">{ strDot(v.from_ , 20,0) }</td>
                        <td className="blue">{ strDot(v.to_ , 0 , 20 ) }</td>
                        <td className="gray">
                          {moment(v.createdat).fromNow()}
                        </td>
                        <td>
                          <span
                            onClick={(_) => {
                              window
                                .open(
                                  URL_TX_SCAN[v.nettype] + `/${v.txhash}`,
                                  "_blank"
                                )
                                .focus();
                            }}
                            className={v.chainOn ? "chain on" : "chain off"}
                          ></span>
                          {/*                          <a                             className={v.chainOn ? "chain on" : "chain off"}                          ></a>
                           */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="wrap">
              <h4 className="t">
                Other works from {iscollectionbyauthorseller}
              </h4>

              <div className="swiper">
                <div className="swiper-container swiper-container-trendingitem">
                  <ol className="item item4 buy swiper-wrapper">
                    <div className="slideBox" ref={itemWrapRef}>
                      {listotheritems
                        .filter((elem) =>
                          elem.item?.itemid == itemid ? false : true
                        )
                        .sort((a, b) => a.id - b.id)
                        .map((cont, index) => (
                          <span key={index}>
                            <li
                              className="swiper-slide"
                              onClick={() => {
                                LOGGER("abc"); // window.location.reload()
                                Setitemid(cont.item?.itemid);
                                navigate(
                                  `/singleitem?itemid=${cont.item?.itemid}`
                                );
                              }}
                            >
                              <a
                                style={{
                                  backgroundImage: `url(${cont.item?.url})`,
                                }}
                              >
                                <div className="on">
                                  <ul>
                                    <li
                                      className={
                                        cont.ilikethisitem
                                          ? "heart on"
                                          : "heart off"
                                      }
                                    >
                                      {cont?.countfavors}
                                    </li>
                                    <li className="star off"></li>
                                  </ul>
                                  <div>{cont?.item?.titlename}</div>
                                  <span>{cont?.item?.author?.nickname}</span>
                                  <ol>
                                    <li>
                                      {cont?.minpriceorder
                                        ? moment
                                            .unix(cont?.minpriceorder?.expiry)
                                            .fromNow()
                                        : moment(cont?.item?.createdat).toNow()}
                                    </li>
                                    <li>
                                      {cont?.minpriceorder
                                        ? `${cont?.minpriceorder?.price} KLAY`
                                        : ""}{" "}
                                    </li>
                                  </ol>
                                  <p>Buy Now</p>
                                </div>
                              </a>
                            </li>
                          </span>
                        ))}
                    </div>
                  </ol>
                </div>

                <div
                  className="swiper-button-prev swiper-button-trendingitem-prev"
                  onClick={onClickUserPreBtn}
                ></div>
                <div
                  className="swiper-button-next swiper-button-trendingitem-next"
                  onClick={onClickUserNextBtn}
                ></div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  @media screen and (min-width: 1440px) {
    #sub .item .swiper .swiper-button-trendingitem-prev {
      left: -26px;
    }

    #sub .item .swiper .swiper-button-trendingitem-next {
      right: -26px;
    }
  }
  
  .swiper-wrapper,
  .slideBox {
    overflow-x: scroll;
    transition: 0.8s;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  *::-webkit-scrollbar {
    width: 4px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #222;
    border-radius: 4px;
    width: 6px;
  }
  *::-webkit-scrollbar-track {
    background-color: #d8d8d8;
    border-radius: 4px;
    border: 1px solid #f6f6f6;
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

let orders = {
  asset_amount_ask: "12",
  asset_amount_bid: "1",
  asset_contract_ask: null,
  asset_contract_bid: "0xb7aa9cd318e97f42a477dc1d9185fdec5503e9b5",
  asset_id_ask: null,
  asset_id_bid: null,
  createdat: "2022-01-24T09:11:17.000Z",
  datahash: null,
  id: 7,
  isprivate: 0,
  itemid: "QmWFGooUcsbdMMHWxTBwNi3xoX1Wp62EStV3YbGCaTkmrk",
  makerortaker: 0,
  matcher_contract: null,
  privateaddress: null,
  rawdata_to_sign:
    '{"seller_address":"0x90033484a520b20169b60f131b4e2f7f46923faf","amount":1,"price":12,"priceunit":"0x000000000000000000000000000000000000","expiry":0,"itemid":"QmWFGooUcsbdMMHWxTBwNi3xoX1Wp62EStV3YbGCaTkmrk","tokenid":null}',
  rawdatahash:
    "9d26fa13c5595761156898a27d3dfe94d090c9634255b61eaa6bec4ca1d2d7f1",
  sig_r: "0x3f4510a8753b867bb8e8419fdc0102fa30830d81612c979751bacb1d45c7ffac",
  sig_s: "0x47db87c9ba82941178a377c517fc0ccc73bf0e41915599cae6c468be47ad7b6c",
  sig_v: "0x1b",
  signature: null,
  signaturestr:
    "0x3f4510a8753b867bb8e8419fdc0102fa30830d81612c979751bacb1d45c7ffac47db87c9ba82941178a377c517fc0ccc73bf0e41915599cae6c468be47ad7b6c1b",
  supertype: 1,
  supertypestr: "SELL",
  type: null,
  typestr: null,
  updatedat: null,
  username: "0xaec2f4dd8b08eef0c71b02f97978106d875464ed",
  uuid: "39326de3-438c-4ebd-b2ec-092b271db16a",
};

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

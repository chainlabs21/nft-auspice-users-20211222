import { useSelector } from "react-redux";
import {useState} from "react";
import styled from "styled-components";
import moment from "moment";
import I_x from "../../img/icons/I_x.svg";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_chkBtn from "../../img/design/I_chkBtn.png";
import {strDot} from "../../util/Util"
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../config/messages";
import {ISFINITE, LOGGER, convaj } from "../../util/common";
import {ADDRESSES } from "../../config/addresses"
import { getethrep, getweirep, is_two_addresses_same } from "../../util/eth";
import {
  query_nfttoken_balance,
  requesttransaction,
  getabistr_forfunction,
  query_with_arg,
} from "../../util/contract-calls";
import {
  PAYMEANS_DEF,
  URL_TX_SCAN,
  FEES_DEF,
  NETTYPE,
} from "../../config/configs";
import axios from 'axios';
import {API} from "../../config/api"
import { useEffect } from "react";
const convertLongString = (startLength, endLength, str) => {
    if (!str) return;
    const head = str.substring(0, startLength);
    const spread = "......";
    const tail = str.substring(str.length - endLength, str.length);
    return head + spread + tail;
  };
export default function PlaceBidPopup({off, sellorder, itemdata, myethbalance, priceklay,}){
    const {walletAddress, userData, isLoggedin} = useSelector((state)=>state.user)
    const [TOSChk, setTOSChk] = useState(false)
    const [ChkChk, setChkChk] = useState(false)
    const[ bidauctionmodal, setbidauctionmodal]= useState(false)
    const [mybidamount, setmybidamount] = useState(0)
    let [j_auctionuuid_bidprice, setj_auctionuuid_bidprice] = useState({});
    let [j_auctionuuid_bidder, setj_auctionuuid_bidder] = useState({});

    useEffect(()=>{
      if (itemdata.bids) {
        setj_auctionuuid_bidprice(
          convaj(itemdata.bids, "basesaleuuid", "price")
        ); // auctionhashid
        setj_auctionuuid_bidder(
          convaj(itemdata.bids, "basesaleuuid", "username")
        );
      }
    },[itemdata])
    const onBidAuction=()=>{
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
        ]
        LOGGER( '' , aargs )
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
          from: walletAddress,
          to: ADDRESSES.auction_repo_english_batch_tasks, // auction_repo_english_simple_no_batch_tasks
          data: abistr,
          value: getweirep(mybidamount),
          gas: "" + 1400_000, // 610,174
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
            username: walletAddress,
            price: mybidamount,
            priceunit: PAYMEANS_DEF,
            nettype: NETTYPE,
            typestr: "BID_TO_AUCTION",
            tokenid: itemdata?.item?.tokenid,
            expiry : sellorder?.expiry
          };
          axios
            .post(API.API_REPORT_BID_TO_AUCTION + `/${txhash}`, reqbody)
            .then((resp) => {
              LOGGER("rehCTxqXLK", resp.data);
              let { status } = resp.data;
              if (status == "OK") {
                SetErrorBar(messages.MSG_DONE_REGISTERING);
                //fetchitem(itemdata?.item?.itemid);
                setbidauctionmodal(false);
              }
            });
        }).catch(err=>{ LOGGER( '' , err )
          SetErrorBar( messages.MSG_USER_DENIED_TX )
          setbidauctionmodal ( false )
        })
      };
      function onClickBuy(){

      }


    return(
        <PlaceaBidPopup>
         <article className="topBar">
          <span className="blank" />
          <strong className="title">Place a bid</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>
        <article className="contArea">
        <div className="warningBox">
            Warning! Contains items that have not been reviewed and approved
          </div>
          <div className="contBox">
            <div className="listHeader">
              <p>Item</p>
              <p>Subtotal</p>
            </div>
            <ul className="itemList">
              <li>
                <img className="itemImg" src={itemdata?.item?.url}/>

                <div className="infoBox">
                  <div className="titleBox">
                    <p className="seller">{strDot(sellorder?.username, 5, 5)}</p>
                    <strong className="itemTitle">{itemdata?.item?.titlename}</strong>
                  </div>

                  <div className="priceBox">
                    <div className="token">
                      <img src={I_klaytn} alt="" />
                      <strong className="price">{sellorder?.asset_amount_bid
                              ? `Qty. ${sellorder?.asset_amount_bid}`
                              : ""}{""}
                            {sellorder?.tokenid
                              ? `of token #${sellorder?.tokenid}`
                              : ""}{""}</strong>
                    </div>

                    <p className="exchange">(${priceklay * 3})</p>
                  </div>
                </div>
              </li>
              </ul>

              {/**HIGHEST BID (CURRENT) */}
                    <div className="totalBox">
                      <div className="keyBox">
                      <strong className="key">Current highest bid</strong>
                        <span className="red" style={{ color: "gray" }}>
                          {j_auctionuuid_bidder[sellorder?.uuid] ? strDot(j_auctionuuid_bidder[sellorder?.uuid], 8, 0): 'NONE' }
                        </span>
                      </div>
                      <div className="valueBox">
                        <div className="token">
                          <img src={I_klaytn} alt="" />
                          <strong className="price">{j_auctionuuid_bidprice[sellorder?.uuid]
                            ? j_auctionuuid_bidprice[sellorder?.uuid]
                            : "0.00"}{" "}</strong>
                        </div>
                        <p className="exchange">($
                            {priceklay &&
                            j_auctionuuid_bidprice[sellorder?.uuid]
                              ? (
                                  +priceklay *
                                  +j_auctionuuid_bidprice[sellorder?.uuid]
                                ).toFixed(4)
                              : "0.00"}
                            )</p>
                      </div>
                    </div>

                    {/**   MINIUMBID */}
                    <div className="totalBox">
                      <div className="keyBox">
                        <strong className="key">Minimum bid</strong>      
                      </div>
                      <div className="valueBox">
                        <div className="token">
                          <img src={I_klaytn} alt="" />
                          <strong className="price">{sellorder?.asset_amount_ask}</strong>
                        </div>
                        <p className="exchange">
                            (${priceklay && sellorder?.asset_amount_ask
                              ? (+priceklay * +sellorder?.asset_amount_ask).toFixed(4)
                              : ""})
                            </p>
                      </div>
                    </div>

                    {/*YOUR BID*/}

                    <div className="totalBox">
                      <div className="keyBox">
                        <strong className="key">Your bid</strong>
                        <span>(Current balance:{" "}
                          {myethbalance ? (+myethbalance).toFixed(4) : "0"})</span>
                      </div>
                      <div className="valueBox">
                        <div className="inputBox">
                      <input
                            type="number"
                            value={mybidamount}
                            onChange={(e) => {
                              let { value: value_raw } = e.target;
                              let value = +value_raw;
                              if (ISFINITE(value)) {
                              } else if (value == 0) {
                              } else {
                                SetErrorBar(messages.MSG_INPUT_NUMBERS_ONLY);
                                //                                return;
                              }
                              setmybidamount("" + value_raw);
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
                          </div>
                          <p className="exchange">
                          (${priceklay && mybidamount
                              ? (+priceklay * +mybidamount).toFixed(4)
                              : "0"})
                              </p>

                      </div>
                    </div>
            </div>
            {/* END OF CONT BOX 
            
            
            
            /////////TERM LIST
            
            
            */}
            <ul className="termList">
            <li>
              <button className="chkBtn" onClick={() => {setChkChk(!ChkChk)}}>
                {ChkChk&&<img src={I_chkBtn} alt="" />}
              </button>

              <p className="term">
                Aware that Auspice contains one item that has not been reviewed
                and approved
              </p>
            </li>

            <li>
              <button className="chkBtn" onClick={() => {setTOSChk(!TOSChk)}}>
              {TOSChk&&<img src={I_chkBtn} alt="" />}
              </button>

              <p className="term">
                I agree to Auspice's <u>Terms of Service</u>
              </p>
            </li>
          </ul>

          {(ChkChk&&TOSChk)?(<button className="paymentBtn" onClick={() => {
            onBidAuction();
            /*TOSChk&&ChkChk&&*/
          }}>
            Place a bid
          </button>):(<button className="depaymentBtn" onClick={() => {}}>
            Place a bid
          </button>)
          }


          </article>  
        </PlaceaBidPopup>
    )

}
// const PlaceaBidPopup = styled.div`
//   width: 88.88vw;
//   max-height: 90vh;
//   background: #fff;
//   box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
//   border-radius: 2.77vw;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   position: fixed;
//   z-index: 6;
//   overflow-y: scroll;

//   & > .topBar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 3.33vw;
//     height: 14.44vw;

//     .title {
//       font-size: 4.44vw;
//       line-height: 4.44vw;
//     }

//     .blank,
//     img {
//       width: 5.55vw;
//     }
//   }

//   .contArea {
//     display: flex;
//     flex-direction: column;
//     padding: 3.33vw 2.77vw;
//     border-top: 1px solid #e8e8e8;

//     .warningBox {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: 17.22vw;
//       border-radius: 2.22vw;
//       font-size: 3.33vw;
//       font-weight: 700;
//       text-align: center;
//       color: #ff1c1c;
//       border: solid 1px #ff1c1c;
//     }

//     .contBox {
//       padding: 0 1.11vw;
//       margin: 2.77vw 0 0 0;

//       .listHeader {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 8.88vw;
//         font-size: 5vw;
//         font-weight: 700;
//       }

//       .itemList {
//         display: flex;
//         flex-direction: column;
//         gap: 5.55vw;
//         padding: 4.44vw 0;
//         border-top: 1px solid #e8e8e8;
//         border-bottom: 1px solid #e8e8e8;

//         li {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 4.44vw;

//           .itemImg {
//             display: inline-block;
//             width: 27.77vw;
//             height: 27.77vw;
//             border-radius: 2.22vw;
//             object-fit: contain;
//             background: #000;
//           }

//           .infoBox {
//             display: flex;
//             flex-direction: column;
//             gap: 5.55vw;
//             width: 100%;

//             .titleBox {
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               gap: 1.11vw;

//               .seller {
//                 font-size: 3.33vw;
//                 font-weight: 500;
//                 color: #1c7eff;
//               }

//               .itemTitle {
//                 font-size: 4.44vw;
//               }
//             }

//             .priceBox {
//               display: flex;
//               justify-content: space-between;

//               .key {
//                 font-size: 4.44vw;
//                 font-weight: 900;
//               }

//               .value {
//                 display: flex;
//                 flex-direction: column;
//                 gap: 0.55vw;

//                 .token {
//                   display: flex;
//                   justify-content: flex-end;
//                   align-items: center;
//                   gap: 1.11vw;

//                   img {
//                     width: 6.66vw;
//                     height: 6.66vw;
//                     object-fit: contain;
//                   }

//                   .price {
//                     font-size: 5vw;
//                   }
//                 }

//                 .exchange {
//                   font-size: 3.88vw;
//                   font-weight: 500;
//                   color: #b2b2b2;
//                 }
//               }
//             }
//           }
//         }
//       }

//       .totalBox {
//         display: flex;
//         justify-content: space-between;
//         align-items: flex-start;
//         padding: 4.44vw 0;
//         border-bottom: 1px solid #e8e8e8;

//         .keyBox {
//           display: flex;
//           flex-direction: column;
//           gap: 1.11vw;

//           .key {
//             font-size: 4.44vw;
//             font-weight: 900;
//           }
//           .alarm {
//             font-size: 3.33vw;
//             color: #ff1c1c;
//           }
//         }

//         .valueBox {
//           .token {
//             display: flex;
//             justify-content: flex-end;
//             align-items: center;
//             gap: 1.11vw;

//             img {
//               width: 6.66vw;
//               height: 6.66vw;
//               object-fit: contain;
//             }

//             .price {
//               font-size: 5vw;
//               color: #1c7eff;
//             }
//           }

//           .exchange {
//             font-size: 3.88vw;
//             font-weight: 500;
//             color: #b2b2b2;
//           }
//         }
//       }
//     }

//     .termList {
//       display: flex;
//       flex-direction: column;
//       gap: 5.55vw;
//       padding: 6.66vw 0 0 0;

//       li {
//         display: flex;
//         gap: 3.33vw;

//         .chkBtn {
//           width: 5.55vw;
//           height: 5.55vw;
//           border-radius: 1.11vw;
//           overflow: hidden;
//           border: 1px solid #000;

//           img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }
//         }

//         .term {
//           flex: 1;
//           font-size: 3.88vw;
//           font-weight: 500;
//           line-height: 5vw;
//         }
//       }
//     }
//   }

//   .paymentBtn {
//     width: 100%;
//     height: 15.55vw;
//     margin: 11.11vw 0 0 0;
//     font-size: 4.44vw;
//     font-weight: 700;
//     color: #fff;
//     background: #222;
//     border-radius: 7.77vw;
//   }
// `;

const PlaceaBidPopup = styled.section`
  width: 600px;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;

  & > .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 72px;

    .title {
      font-size: 22px;
    }

    .blank,
    img {
      width: 20px;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    border-top: 1px solid #e8e8e8;

    .warningBox {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 62px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #ff1c1c;
      border: solid 1px #ff1c1c;
    }

    .contBox {
      .listHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        padding: 0 8px;
        font-size: 22px;
        font-weight: 500;
      }

      .itemList {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 8px;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;

        li {
          display: flex;
          gap: 14px;

          .itemImg {
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 8px;
            object-fit: contain;
            background: #000;
          }

          .infoBox {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > div {
              display: flex;
              flex-direction: column;

              &.titleBox {
                .seller {
                  height: 20px;
                  font-size: 16px;
                  font-weight: 500;
                  color: #1c7eff;
                }

                .itemTitle {
                  font-size: 22px;
                  color: #222;
                }
              }

              &.priceBox {
                gap: 4px;

                .token {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  gap: 4px;

                  img {
                    width: 24px;
                    height: 24px;
                    object-fit: contain;
                  }

                  .price {
                    font-size: 22px;
                  }
                }

                .exchange {
                  font-size: 14px;
                  font-weight: 500;
                  color: #b2b2b2;
                }
              }
            }
          }
        }
      }

      .totalBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        padding: 10px 8px;
        border-bottom: 1px solid #e8e8e8;

        .keyBox {
          display: flex;
          flex-direction: column;

          .key {
            font-size: 22px;
          }

          .alarm {
            font-size: 12px;
            color: #ff1c1c;
          }
        }

        .valueBox {
          align-self: flex-end;

          .token {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 4px;

            img {
              width: 24px;
              height: 24px;
              object-fit: contain;
            }

            .price {
              font-size: 22px;
              color: #1c7eff;
            }
          }
          .inputBox{
            padding: 0 20px;
          border-radius: 8px;
          background-color: #f6f6f6;
          }
          input{
            width: 96px;
            display: flex;
            justify-content: flex-end;
            font-size: 22px;
            border: 4px;
            border-radius: 10px;
            height: 32px;
            text-align: right;
          }

          .exchange {
            text-align: right ;
            font-size: 14px;
            font-weight: 500;
            color: #b2b2b2;
          }
        }
      }
    }

    .termList {
      display: flex;
      flex-direction: column;
      gap: 20px;

      li {
        display: flex;
        gap: 14px;

        .chkBtn {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          overflow: hidden;
          border-radius: 4px;
          border: 1px solid #000;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .term {
          flex: 1;
          font-size: 16px;
          font-weight: 500;
          line-height: 20px;
        }
      }
    }
  }

  .paymentBtn {
    width: 350px;
    height: 56px;
    margin: 30px auto 0 auto;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    background: #222;
    border-radius: 28px;
  }
  .depaymentBtn {
    width: 350px;
    height: 56px;
    margin: 30px auto 0 auto;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    background: #999999;
    border-radius: 28px;
  }
`;

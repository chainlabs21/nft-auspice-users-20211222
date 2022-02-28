import { useSelector } from "react-redux";
import {useState} from "react";
import styled from "styled-components";
import I_x from "../../img/icons/I_x.svg";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_chkBtn from "../../img/design/I_chkBtn.png";
import {strDot} from "../../util/Util"
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../config/messages";
import { LOGGER } from "../../util/common";
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


export default function BidSinglePopup({ nd, off, imageurl,title, sellername, price, myethbalance, sellorder, itemdata }) {
  const isMobile = useSelector((state) => state.common.isMobile);
  const {walletAddress, userData} = useSelector((state)=>state.user)
  const [TOSChk, setTOSChk]=useState(false);
  const [ChkChk, setChkChk]=useState(false);
  let [ referer, setreferer] = useState()//searchParams.get("referer"));
  const getfeeamountstr = (amount, rate) => {
    let n = (+amount * +rate) / 10000;
    return n.toFixed(4); // String()
  };
  useEffect(()=>{
    console.log(itemdata)
    console.log(sellorder)
  })

    const onClickBuy = ()=>{
      console.log(sellorder?.typestr)
      switch(sellorder?.typestr){
        case "COMMON":
          onBuySpotCommon();
          break;
        case "AUCTION_ENGLISH":
          //onBuySpotCommon();
          //onBidAuction();
          break;
        default:
          SetErrorBar(messages.MSG_SALE_TYPE_NOT_DEFINED);
          break;
      }
    }

    const onBuySpotCommon=()=>{
      LOGGER("BUYSPOT", itemdata.item?.itemid)
      let {item} = itemdata;
      let itemid = item.itemid
      let aargs=[
        ADDRESSES.erc1155, // 0
        item.itemid, // 1 item?.itemid			//			, itemdata.item?.tokenid // 0
        item.countcopies, // 2
        item.authorfee, // 3
        sellorder.asset_amount_bid, //4 			//			, item?.decimals       //			, sellorder?.asset_contract_ask ? sellorder?.asset_contract_ask : ADDR ESSES.zero
        getweirep(sellorder?.asset_amount_ask), // 5
        item.author, // 6
        sellorder.username, // 7
        walletAddress, // 8
        referer ? referer : ADDRESSES.zero,
      ]
      LOGGER(aargs);
      //		return
      let abistr = getabistr_forfunction({
        contractaddress: ADDRESSES.matcher_simple,
        abikind: "MATCHER_SIMPLE",
        methodname: "mint_and_match_single_simple",
        aargs,
      });
      LOGGER(abistr);
      requesttransaction({
        from: walletAddress,
        to: ADDRESSES.matcher_simple,
        data: abistr,
        value: getweirep(sellorder.asset_amount_ask), // '0x00'
        gas: "" + 800_000, // 320,948
      })
        .then((resp) => {
          LOGGER("", resp);
          let { transactionHash, status } = resp;
          
            console.log(sellername)
          if (status) {
            let reqbody = {
              itemid,
              tokenid: itemdata.item?.tokenid,
              amount: sellorder?.asset_amount_bid, // itemdata.item?.countcopies,
              price: sellorder?.asset_amount_ask,
              username: walletAddress,
              seller: sellername,
              buyer: walletAddress,
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
            console.log(reqbody)
            axios
              .post(API.API_REPORT_TX_CLOSE_SPOT + `/${transactionHash}`, reqbody)
              .then((resp) => {
                LOGGER("G6OvdxLxyA", resp.data);
                let { status } = resp.data;
                if (status == "OK") {
                  SetErrorBar( messages.MSG_DONE_REGISTERING );
                  off()
                  //fetchitem(itemdata?.item?.itemid);
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

    
  if (isMobile)
    return (
      <MbidSinglePopup>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Purchase receipt</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="warningBox">
            Warning! Contains items
            <br />
            that have not been reviewed and approved
          </div>

          <div className="contBox">
            <div className="listHeader">Item</div>

            <ul className="itemList">
              <li>
                <img className="itemImg" src="itemurl"/>

                <div className="infoBox">
                  <div className="titleBox">
                    <p className="seller">{strDot(sellername, 5, 5)}</p>
                    <strong className="itemTitle">Blackman with neon</strong>
                  </div>

                  <div className="priceBox">
                    <strong className="key">Subtotal</strong>

                    <div className="value">
                      <div className="token">
                        <img src={I_klaytn} alt="" />
                        <strong className="price">25</strong>
                      </div>

                      <p className="exchange">($58,282.50)</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div className="totalBox">
              <div className="keyBox">
                <strong className="key">Total</strong>
                <strong className="alarm">Insufficient ETH balance</strong>
              </div>

              <div className="valueBox">
                <div className="token">
                  <img src={I_klaytn} alt="" />
                  <strong className="price">25</strong>
                </div>
                <p className="exchange">($58,282.50)</p>
              </div>
            </div>
          </div>

          <ul className="termList">
            <li>
              <button className="chkBtn" onClick={() => {}}>
                <img src={I_chkBtn} alt="" />
              </button>

              <p className="term">
                Aware that Auspice contains one item that has not been reviewed
                and approved
              </p>
            </li>

            <li>
              <button className="chkBtn" onClick={() => {}}>
                <img src={I_chkBtn} alt="" />
              </button>

              <p className="term">
                I agree to Auspice's <u>Terms of Service</u>
              </p>
            </li>
          </ul>

          <button className="paymentBtn" onClick={() => {}}>
            make a payment
          </button>
        </article>
      </MbidSinglePopup>
    );
  else
    return (
      <PbidSinglePopup>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Purchase receipt</strong>
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
                <img className="itemImg" src={imageurl}/>

                <div className="infoBox">
                  <div className="titleBox">
                    <p className="seller">{strDot(sellername, 5, 5)}</p>
                    <strong className="itemTitle">{title}</strong>
                  </div>

                  <div className="priceBox">
                    <div className="token">
                      <img src={I_klaytn} alt="" />
                      <strong className="price">{price}</strong>
                    </div>

                    <p className="exchange">($58,282.50)</p>
                  </div>
                </div>
              </li>
            </ul>

            <div className="totalBox">
              <div className="keyBox">
                <strong className="key">Total</strong>
                {!(+myethbalance &&
                            +myethbalance > sellorder?.asset_amount_ask)&&<strong className="alarm">Insufficient KLAY balance</strong>}
              </div>

              <div className="valueBox">
                <div className="token">
                  <img src={I_klaytn} alt="" />
                  <strong className="price">{price}</strong>
                </div>
                <p className="exchange">($58,282.50)</p>
              </div>
            </div>
          </div>

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

          {(+myethbalance &&+myethbalance > sellorder?.asset_amount_ask&&ChkChk&&TOSChk)?(<button className="paymentBtn" onClick={() => {
            onClickBuy()
            /*TOSChk&&ChkChk&&*/
          }}>
            make a payment
          </button>):(<button className="depaymentBtn" onClick={() => {}}>
            make a payment
          </button>)
          }
        </article>
      </PbidSinglePopup>
    );
}

const MbidSinglePopup = styled.section`
  width: 88.88vw;
  max-height: 90vh;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2.77vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;
  overflow-y: scroll;

  & > .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3.33vw;
    height: 14.44vw;

    .title {
      font-size: 4.44vw;
      line-height: 4.44vw;
    }

    .blank,
    img {
      width: 5.55vw;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    padding: 3.33vw 2.77vw;
    border-top: 1px solid #e8e8e8;

    .warningBox {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 17.22vw;
      border-radius: 2.22vw;
      font-size: 3.33vw;
      font-weight: 700;
      text-align: center;
      color: #ff1c1c;
      border: solid 1px #ff1c1c;
    }

    .contBox {
      padding: 0 1.11vw;
      margin: 2.77vw 0 0 0;

      .listHeader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 8.88vw;
        font-size: 5vw;
        font-weight: 700;
      }

      .itemList {
        display: flex;
        flex-direction: column;
        gap: 5.55vw;
        padding: 4.44vw 0;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4.44vw;

          .itemImg {
            display: inline-block;
            width: 27.77vw;
            height: 27.77vw;
            border-radius: 2.22vw;
            object-fit: contain;
            background: #000;
          }

          .infoBox {
            display: flex;
            flex-direction: column;
            gap: 5.55vw;
            width: 100%;

            .titleBox {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.11vw;

              .seller {
                font-size: 3.33vw;
                font-weight: 500;
                color: #1c7eff;
              }

              .itemTitle {
                font-size: 4.44vw;
              }
            }

            .priceBox {
              display: flex;
              justify-content: space-between;

              .key {
                font-size: 4.44vw;
                font-weight: 900;
              }

              .value {
                display: flex;
                flex-direction: column;
                gap: 0.55vw;

                .token {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  gap: 1.11vw;

                  img {
                    width: 6.66vw;
                    height: 6.66vw;
                    object-fit: contain;
                  }

                  .price {
                    font-size: 5vw;
                  }
                }

                .exchange {
                  font-size: 3.88vw;
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
        align-items: flex-start;
        padding: 4.44vw 0;
        border-bottom: 1px solid #e8e8e8;

        .keyBox {
          display: flex;
          flex-direction: column;
          gap: 1.11vw;

          .key {
            font-size: 4.44vw;
            font-weight: 900;
          }
          .alarm {
            font-size: 3.33vw;
            color: #ff1c1c;
          }
        }

        .valueBox {
          .token {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 1.11vw;

            img {
              width: 6.66vw;
              height: 6.66vw;
              object-fit: contain;
            }

            .price {
              font-size: 5vw;
              color: #1c7eff;
            }
          }

          .exchange {
            font-size: 3.88vw;
            font-weight: 500;
            color: #b2b2b2;
          }
        }
      }
    }

    .termList {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;
      padding: 6.66vw 0 0 0;

      li {
        display: flex;
        gap: 3.33vw;

        .chkBtn {
          width: 5.55vw;
          height: 5.55vw;
          border-radius: 1.11vw;
          overflow: hidden;
          border: 1px solid #000;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .term {
          flex: 1;
          font-size: 3.88vw;
          font-weight: 500;
          line-height: 5vw;
        }
      }
    }
  }

  .paymentBtn {
    width: 100%;
    height: 15.55vw;
    margin: 11.11vw 0 0 0;
    font-size: 4.44vw;
    font-weight: 700;
    color: #fff;
    background: #222;
    border-radius: 7.77vw;
  }
`;

const PbidSinglePopup = styled.section`
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

          .exchange {
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

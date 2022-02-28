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

export default function PlaceBidPopup(){

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
          from: myaddress,
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
            username: myaddress,
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
                fetchitem(itemdata?.item?.itemid);
                setbidauctionmodal(false);
              }
            });
        }).catch(err=>{ LOGGER( '' , err )
          SetErrorBar( messages.MSG_USER_DENIED_TX )
          setbidauctionmodal ( false )
        })
      };


    return(
        <PlaceBidPopup>
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
                        Current highest bid
                        <span className="red" style={{ color: "gray" }}>
                          {j_auctionuuid_bidder[sellorder?.uuid] ? strDot(j_auctionuuid_bidder[sellorder?.uuid], 8, 0): '\u00A0' }
                        </span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <img src={require("../img/sub/rock.png").default} />
                          {j_auctionuuid_bidprice[sellorder?.uuid]
                            ? j_auctionuuid_bidprice[sellorder?.uuid]
                            : " "}{" "}
                          &nbsp;
                          <span className="pri">
                            ($
                            {priceklay &&
                            j_auctionuuid_bidprice[sellorder?.uuid]
                              ? (
                                  +priceklay *
                                  +j_auctionuuid_bidprice[sellorder?.uuid]
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
                        Minimum bid
                        <span className="red" style={{ color: "black" }}>
                          {" "}
                          &nbsp;
                        </span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <img src={require("../img/sub/rock.png").default} />
                          {sellorder?.asset_amount_ask}
                          <span className="pri">
                            ($
                            {priceklay && sellorder?.asset_amount_ask
                              ? (
                                  +priceklay * +sellorder?.asset_amount_ask
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
                        Your bid
                        <span className="red" style={{ color: "black" }}>
                          (Current balance:{" "}
                          {myethbalance ? (+myethbalance).toFixed(4) : "0"})
                        </span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <input
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
                  onBidAuction();
                }}
              >
                Place bid
              </a>
            </div>
          </div>
        </div>
        </PlaceBidPopup>
    )

}
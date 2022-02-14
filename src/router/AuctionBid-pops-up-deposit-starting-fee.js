import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import s1 from "../img/sub/s2.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";
import VerifyAccountPopup from "./VerifyAccountPopup";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { messages } from "../config/messages";
import { applytoken } from "../util/rest";
import SetErrorBar from "../util/SetErrorBar";
import { API } from "../config/api";
import { LOGGER, getrandomint, ISFINITE } from "../util/common";

function AuctionBid({ store, setConnect }) {
  const navigate = useNavigate();
  const [verifyPopup, setVerifyPopup] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  let [itemid, setitemid] = useState();
  let [itemdatabatched, setitemdatabatched] = useState();
  let [bidamount_start, setbidamount_start] = useState("");
  let [daystoclose, setdaystoclose] = useState();
  let [expiry, setexpiry] = useState();
  let axios = applytoken();
  useEffect((_) => {
    let bidamount_start = getrandomint(1, 10);
    let bidamount_max = getrandomint(bidamount_start + 1, 20);
    setbidamount_start(bidamount_start);
  }, []);
  useEffect((_) => {
    let itemid = searchParams.get("itemid");
    if (itemid) {
    } else {
      SetErrorBar(messages.MSG_PLEASE_SPECIFY_QUERY_VALUE);
      return;
    }
    axios.get(`${API.API_GET_ITEM_DATA}/${itemid}`).then((resp) => {
      LOGGER("oWWjCVhIpY", resp.data);
      let { status, respdata } = resp.data;
      if (status == "OK") {
        setitemdatabatched(respdata);
      } else {
        SetErrorBar(messages.MSG_PLEASE_SPECIFY_QUERY_VALUE);
      }
    });
  }, []);

  return (
    <SignPopupBox>
      {verifyPopup && <VerifyAccountPopup off={setVerifyPopup} />}

      <section id="sub">
        <article className="ntfsell_box">
          <div className="choose_wrap">
            <div className="sellbg left">
              <div className="ntfsell_con">
                <div className="top1 profile">
                  <a onClick={() => navigate(-1)}>
                    <img
                      src={require("../img/sub/nft_arrow.png").default}
                      alt=""
                    />
                  </a>
                  <span></span>
                  <strong>Henry junior's Item</strong>
                </div>
                <div className="sell_wrap">
                  <div className="create create3">
                    <form action="">
                      <div className="form">
                        <ul>
                          <li>
                            <h3>Choose a sales method</h3>
                            <ol>
                              <li onClick={() => navigate("/salefixed")}>
                                <a>
                                  <h4>Fixed Price</h4>
                                  <span>
                                    Sell ​​at a fixed or declining
                                    <br />
                                    price after a period of time
                                  </span>
                                </a>
                              </li>
                              <li className="on">
                                <a>
                                  <h4>Auction Bid</h4>
                                  <span>Sell ​​to the highest bidder</span>
                                </a>
                              </li>
                              <li onClick={() => navigate("/salebundle")}>
                                <a>
                                  <h4>
                                    Bundle Sale
                                    <img
                                      src={
                                        require("../img/sub/bundle_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                  </h4>
                                  <span>
                                    Selling multiple
                                    <br />
                                    items together
                                  </span>
                                </a>
                              </li>
                            </ol>
                          </li>
                          <li>
                            <div className="Minimum input2">
                              <div className="top2">
                                <h3>Starting bid</h3>
                                <div className="icon">
                                  <a>
                                    <img
                                      src={
                                        require("../img/sub/auction_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <div className="bubble_info">
                                      <div className="bubble">
                                        <img
                                          src={
                                            require("../img/sub/bubble_icon.png")
                                              .default
                                          }
                                          alt=""
                                        />
                                        <p>
                                          You can always accept a sale even if
                                          you are offered <br />
                                          a price that is higher than your
                                          minimum bid and
                                          <br />
                                          lower than your target bid.
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                                <p>Enter your starting bid.</p>
                                <div className="toggle border_1">
                                  <div className="select_left">
                                    <img
                                      src={
                                        require("../img/sub/I_klaytn.svg")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <select id="">
                                      <option>KLAY</option>
                                    </select>
                                  </div>
                                  <div className="input_right">
                                    <input
                                      value={bidamount_start}
                                      type="number"
                                      placeholder=""
                                      onKeyDown="onlyNumber(this)"
                                      onChange={(evt) => {
                                        let { value } = evt.target;
                                        if (ISFINITE(+value)) {
                                        } else {
                                          return;
                                        }
                                        setbidamount_start(value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="Target input2">
                              <div className="top2">
                                <h3>Minimum bid</h3>
                                <div className="icon">
                                  <a>
                                    <img
                                      src={
                                        require("../img/sub/auction_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <div className="bubble_info">
                                      <div className="bubble">
                                        <img
                                          src={
                                            require("../img/sub/bubble_icon.png")
                                              .default
                                          }
                                          alt=""
                                        />
                                        <p>
                                          You can always accept a sale even if
                                          you are offered <br />
                                          a price that is higher than your
                                          minimum bid and
                                          <br />
                                          lower than your target bid.
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                                <p>
                                  Enter your target price. If you do not receive
                                  <br />a bid above this price, it will close
                                  without sale.
                                </p>
                                <div className="toggle border_1">
                                  <div className="select_left">
                                    <img
                                      src={
                                        require("../img/sub/I_klaytn.svg")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <select id="">
                                      <option>KLAY</option>
                                      <option>KLAY</option>
                                      <option>KLAY</option>
                                      <option>KLAY</option>
                                      <option>KLAY</option>
                                    </select>
                                  </div>
                                  <div className="input_right">
                                    <input
                                      type="number"
                                      placeholder=""
                                      onKeyDown="onlyNumber(this)"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="Expiry">
                              <div className="endoption2">
                                <h3>Expiry date</h3>
                                <div className="top2">
                                  <p>
                                    When the expiration time is reached,
                                    <br />
                                    the sale price is automatically It ends.
                                  </p>
                                  <div className="twoselect">
                                    <div className="toggle_1">
                                      <select
                                        id=""
                                        onChange={(evt) => {
                                          LOGGER("", evt.target.value);
                                          setdaystoclose(evt.target.value);
                                        }}
                                      >
                                        <option>5 days later</option>
                                        <option>3 days later</option>
                                        <option>2 days later</option>
                                        <option>1 days later</option>
                                      </select>
                                    </div>
                                    <div className="toggle_2">
                                      <select id="">
                                        <option>PM 02 : 00</option>
                                        <option>PM 03 : 00</option>
                                        <option>AM 01 : 00</option>
                                        <option>AM 02 : 00</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="inst_con">
                              <div className="instrucion line1">
                                <div className="dropdown on">
                                  <a>
                                    <span></span>
                                  </a>
                                  <div className="bot_title">
                                    <strong>Instruction</strong>
                                    <p>
                                      We need a process for listing without gas
                                      fees
                                    </p>
                                  </div>
                                  <div className="info">
                                    <p>
                                      - If you are trading for the first time,
                                      you will need to reset your account.
                                      <br />
                                      &nbsp;&nbsp;The process of sending 0 KLAY
                                      to verify that the account is a valid
                                      account proceeds.
                                    </p>
                                    <p>
                                      - Please complete the signature to create
                                      a sales list.
                                    </p>
                                    <p>
                                      - Gas fee is paid only for the first time,
                                      and subsequent listings are supported free
                                      of charge.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="sellbg2_pc">
              <div className="sell_wrap">
                <div className="top3">
                  <h3>
                    Summary of
                    <br />
                    transaction information
                  </h3>
                  <span className="basic">
                    The auction begins. If the bid is
                    <br />
                    more than 1 KLAY, the bid will be
                    <br />
                    awarded at 17:58 on July 28, 2021.
                  </span>
                  <span className="red2">
                    The target bid must be greater
                    <br />
                    than the minimum bid
                  </span>
                  <span className="red2">Please enter your target bid</span>
                  <span className="red2">
                    Target bid must be at least 1 KLAY
                  </span>
                </div>
                <div className="referral">
                  <h3>Referral Fee</h3>
                  <p>
                    If you purchase through a referral link, 1% of the sales
                    amount will be rewarded.
                  </p>
                </div>
                <div className="fees">
                  <h3>Fees</h3>
                  <ul>
                    <li>
                      <p>Platform Fee</p>
                      <span>2.5%</span>
                    </li>
                    <li>
                      <p>Royalty</p>
                      <span>5%</span>
                    </li>
                    <li>
                      <strong>Total</strong>
                      <strong>7.5%</strong>
                    </li>
                  </ul>
                </div>
                <div
                  className="sales_btn"
                  onClick={() => {
                    setVerifyPopup(true);
                  }}
                >
                  <a>Sales start</a>
                </div>
              </div>
            </div>
            <div className="sellbg2_m">
              <div className="sell_wrap">
                <div className="top3">
                  <h3>Transaction information</h3>
                  <span className="basic">
                    The item is posted for sale
                    <br />
                    at 3,339 KLAY
                  </span>
                  <span className="red">
                    End price must be less than start price
                  </span>
                </div>
                <div className="referral">
                  <h3>Referral Fee</h3>
                  <p>
                    If you purchase through a referral link, 1% of the sales
                    amount will be rewarded.
                  </p>
                </div>
                <div className="fees">
                  <h3>Fees</h3>
                  <ul>
                    <li>
                      <p>Platform Fee</p>
                      <span>2.5%</span>
                    </li>
                    <li>
                      <p>Royalty</p>
                      <span>5%</span>
                    </li>
                    <li>
                      <strong>Total</strong>
                      <strong>7.5%</strong>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="sales_btn">
                <a>Sales start</a>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionBid);

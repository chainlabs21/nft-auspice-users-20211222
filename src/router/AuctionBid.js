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

import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import VerifyAccountPopup from "./VerifyAccountPopup";
import { useState } from "react";

function AuctionBid({ store, setConnect }) {
  const navigate = useNavigate();

  const [verifyPopup, setVerifyPopup] = useState(false);

  return (
    <SignPopupBox>
      {verifyPopup && <VerifyAccountPopup off={setVerifyPopup} />}

      <section id="sub">
        <article class="ntfsell_box">
          <div class="choose_wrap">
            <div class="sellbg left">
              <div class="ntfsell_con">
                <div class="top1 profile">
                  <a onClick={() => navigate(-1)}>
                    <img
                      src={require("../img/sub/nft_arrow.png").default}
                      alt=""
                    />
                  </a>
                  <span></span>
                  <strong>Henry junior's Item</strong>
                </div>
                <div class="sell_wrap">
                  <div class="create create3">
                    <form action="">
                      <div class="form">
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
                              <li class="on">
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
                            <div class="Minimum input2">
                              <div class="top2">
                                <h3>Minimum bid</h3>
                                <div class="icon">
                                  <a>
                                    <img
                                      src={
                                        require("../img/sub/auction_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <div class="bubble_info">
                                      <div class="bubble">
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
                                <div class="toggle border_1">
                                  <div class="select_left">
                                    <img
                                      src={
                                        require("../img/sub/eth_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <select name="" id="">
                                      <option>ETH</option>
                                      <option>ETH</option>
                                      <option>ETH</option>
                                      <option>ETH</option>
                                      <option>ETH</option>
                                    </select>
                                  </div>
                                  <div class="input_right">
                                    <input
                                      type="number"
                                      placeholder=""
                                      onkeydown="onlyNumber(this)"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="Target input2">
                              <div class="top2">
                                <h3>Minimum bid</h3>
                                <div class="icon">
                                  <a>
                                    <img
                                      src={
                                        require("../img/sub/auction_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <div class="bubble_info">
                                      <div class="bubble">
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
                                <div class="toggle border_1">
                                  <div class="select_left">
                                    <img
                                      src={
                                        require("../img/sub/eth_icon.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <select name="" id="">
                                      <option>ETH</option>
                                      <option>ETH</option>
                                      <option>ETH</option>
                                      <option>ETH</option>
                                      <option>ETH</option>
                                    </select>
                                  </div>
                                  <div class="input_right">
                                    <input
                                      type="number"
                                      placeholder=""
                                      onkeydown="onlyNumber(this)"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="Expiry">
                              <div class="endoption2">
                                <h3>Expiry date</h3>
                                <div class="top2">
                                  <p>
                                    When the expiration time is reached,
                                    <br />
                                    the sale price is automatically It ends.
                                  </p>
                                  <div class="twoselect">
                                    <div class="toggle_1">
                                      <select name="" id="">
                                        <option>5 days later</option>
                                        <option>3 days later</option>
                                        <option>2 days later</option>
                                        <option>1 days later</option>
                                      </select>
                                    </div>
                                    <div class="toggle_2">
                                      <select name="" id="">
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
                            <div class="inst_con">
                              <div class="instrucion line1">
                                <div class="dropdown on">
                                  <a>
                                    <span></span>
                                  </a>
                                  <div class="bot_title">
                                    <strong>Instruction</strong>
                                    <p>
                                      We need a process for listing without gas
                                      fees
                                    </p>
                                  </div>
                                  <div class="info">
                                    <p>
                                      - If you are trading for the first time,
                                      you will need to reset your account.
                                      <br />
                                      &nbsp;&nbsp;The process of sending 0 Ether
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
            <div class="sellbg2_pc">
              <div class="sell_wrap">
                <div class="top3">
                  <h3>
                    Summary of
                    <br />
                    transaction information
                  </h3>
                  <span class="basic">
                    The auction begins. If the bid is
                    <br />
                    more than 1 ETH, the bid will be
                    <br />
                    awarded at 17:58 on July 28, 2021.
                  </span>
                  <span class="red2">
                    The target bid must be greater
                    <br />
                    than the minimum bid
                  </span>
                  <span class="red2">Please enter your target bid</span>
                  <span class="red2">Target bid must be at least 1 ETH</span>
                </div>
                <div class="referral">
                  <h3>Referral Fee</h3>
                  <p>
                    If you purchase through a referral link, 1% of the sales
                    amount will be rewarded.
                  </p>
                </div>
                <div class="fees">
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
                <div class="sales_btn" onClick={() => setVerifyPopup(true)}>
                  <a>Sales start</a>
                </div>
              </div>
            </div>
            <div class="sellbg2_m">
              <div class="sell_wrap">
                <div class="top3">
                  <h3>Transaction information</h3>
                  <span class="basic">
                    The item is posted for sale
                    <br />
                    at 3,339 ETH
                  </span>
                  <span class="red">
                    End price must be less than start price
                  </span>
                </div>
                <div class="referral">
                  <h3>Referral Fee</h3>
                  <p>
                    If you purchase through a referral link, 1% of the sales
                    amount will be rewarded.
                  </p>
                </div>
                <div class="fees">
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
              <div class="sales_btn">
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

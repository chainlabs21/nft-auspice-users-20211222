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

function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap guidance">
          <div class="top4">
            <strong>Guidance on how to verify your account</strong>
            <a onClick={() => navigate(-1)} class="close" id="info_close">
              <img src={require("../img/sub/icon_close.png").default} alt="" />
            </a>
          </div>
          <div class="howto">
            <p>
              Please check the connected external wallet and complete the
              transaction.
              <br />
              The contract approval process is performed only once per account
              <br />
              for the first time.
            </p>
            <div class="img_m">
              <img src={require("../img/sub/img_process.png").default} alt="" />
            </div>
            <div class="inst_con">
              <div class="instrucion line1">
                <div class="dropdown on">
                  <a href="">
                    <span></span>
                  </a>
                  <div class="bot_title">
                    <strong>Instruction</strong>
                    <p>
                      When you sell items for the first time in your account,
                      you need to go
                      <br />
                      through the contract approval process.
                    </p>
                  </div>
                  <div class="info">
                    <p>
                      - If you are trading for the first time, you will need to
                      reset your account. The process
                      <br /> &nbsp;&nbsp;of sending 0 Ether to verify that the
                      account is a valid account proceeds.
                      <br />
                    </p>
                    <p>
                      - Please complete the signature to create a sales list.
                      <br />
                    </p>
                    <p>
                      - Gas fee is paid only for the first time, and subsequent
                      listings are supported
                      <br />
                      &nbsp; free of charge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="img_pc">
              <img src={require("../img/sub/img_process.png").default} alt="" />
            </div>
            <p>
              Please wait until this process is complete. Depending on the
              Ethereum
              <br />
              mainnet and gas
              <br /> price quotes, it can take from a few minutes to
              <br /> several hours.
            </p>
          </div>
        </div>
      </div>

      <section id="sub">
        <article class="ntfsell_box">
          <div class="choose_wrap">
            <div class="sellbg left">
              <div class="ntfsell_con">
                <div class="top1 profile">
                  <a href="">
                    <img
                      src={require("../img/sub/nft_arrow.png").default}
                      alt=""
                    />
                  </a>
                  <span></span>
                  <strong>Henry junior's Item</strong>
                </div>
                <div class="sell_wrap">
                  <div class="create create2">
                    <form action="">
                      <div class="form">
                        <ul>
                          <li>
                            <div class="bundle">
                              <div class="top2">
                                <h3>Bundle Naming</h3>
                              </div>
                              <div class="bundletext">
                                <input
                                  type="text"
                                  placeholder="Bundle name to bundle"
                                />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="price_info">
                              <div class="top2 m2">
                                <h3>Price</h3>
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
                              <p>Items sold until canceled</p>
                            </div>
                          </li>
                          <li>
                            <div class="end">
                              <div class="top2 m2">
                                <h3>End price option</h3>
                                <div class="toggle">
                                  <input type="checkbox" name="" id="toggle" />
                                  <label for="toggle"></label>
                                </div>
                              </div>
                              <p>
                                If you add the closing price, the sale or
                                duration
                                <br />
                                The price will gradually decrease until it
                                expires.
                              </p>
                              <div class="endprice">
                                <div class="endpricebox">
                                  <ul>
                                    <li>
                                      <div class="endoption1">
                                        <h3>End price</h3>
                                        <div class="top2">
                                          <p>
                                            The closing price is equal to the
                                            starting price or <br />
                                            It should be lower. prices are
                                            sequential lowers.
                                          </p>
                                          <div class="toggle border_1">
                                            <div class="select_left">
                                              <img
                                                src={require("../img/sub/eth_icon.png")
                                                  .default}
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
                                      <div class="endoption2">
                                        <h3>Price</h3>
                                        <div class="top2">
                                          <p>Items sold until canceled</p>
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
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="private">
                              <div class="top2 m2">
                                <h3>Private option</h3>
                                <div class="toggle">
                                  <input type="checkbox" name="" id="toggle2" />
                                  <label for="toggle2"></label>
                                </div>
                              </div>
                              <p>
                                If set to private, other than the address
                                entered below Products are not visible to users
                              </p>
                              <div class="privatenum">
                                <p>0x8df35T1REFD58984E3F2DG312FD323RE5R4FD5</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="inst_con">
                              <div class="instrucion line1">
                                <div class="dropdown on">
                                  <a href="">
                                    <span></span>
                                  </a>
                                  <div class="bot_title">
                                    <strong>Instruction</strong>
                                    <p>
                                      When you sell items for the first time in
                                      your account, you need to go
                                      <br />
                                      through the contract approval process.
                                    </p>
                                  </div>
                                  <div class="info">
                                    <p>
                                      - If you are trading for the first time,
                                      you will need to reset your account. The
                                      process
                                      <br /> &nbsp;&nbsp;of sending 0 Ether to
                                      verify that the account is a valid account
                                      proceeds.
                                      <br />
                                    </p>
                                    <p>
                                      - Please complete the signature to create
                                      a sales list.
                                      <br />
                                    </p>
                                    <p>
                                      - Gas fee is paid only for the first time,
                                      and subsequent listings are supported
                                      <br />
                                      &nbsp; free of charge.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="blackman">
                              <ul>
                                <li>
                                  <div class="two_bundle">
                                    <div class="dropdown">
                                      <a href="">
                                        <span class="drop2"></span>
                                      </a>
                                      <div class="bundle2">
                                        <span></span>
                                        <div class="name">
                                          <p>Philip van Kouwenbergh</p>
                                          <strong>Blackman with neon</strong>
                                        </div>
                                      </div>
                                      <div class="textbox">
                                        <div class="txt">
                                          <textarea
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="two_bundle">
                                    <div class="dropdown">
                                      <a href="">
                                        <span class="drop2"></span>
                                      </a>
                                      <div class="bundle2">
                                        <span></span>
                                        <div class="name">
                                          <p>Philip van Kouwenbergh</p>
                                          <strong>Blackman with neon</strong>
                                        </div>
                                      </div>
                                      <div class="textbox">
                                        <div class="txt">
                                          <textarea
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="sellbg2">
              <div class="sell_wrap">
                <div class="top3">
                  <h3>Transaction information</h3>
                  <span class="basic">
                    The item is posted for sale
                    <br />
                    at 3,339 ETH
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
                <div class="sales_btn">
                  <a href="">Sales start</a>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);

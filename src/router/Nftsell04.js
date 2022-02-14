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






// import "./css/style01.css";
// import "./css/style02.css";





function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <section id="sub">
        <article className="ntfsell_box">
          <div className="choose_wrap">
            <div className="sellbg left">
              <div className="ntfsell_con">
                <div className="top1 profile">
                  <a >
                    <img
                      src={require("../img/sub/nft_arrow.png").default}
                      alt=""
                    />
                  </a>
                  <span></span>
                  <strong>Henry junior's Item</strong>
                </div>
                <div className="sell_wrap">
                  <div className="create create2">
                    <form action="">
                      <div className="form">
                        <ul>
                          <li>
                            <div className="bundle">
                              <div className="top2">
                                <h3>Bundle Naming</h3>
                              </div>
                              <div className="bundletext">
                                <input
                                  type="text"
                                  placeholder="Bundle name to bundle"
                                />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="price_info_pc">
                              <div className="top2">
                                <h3>Price</h3>
                                <div className="toggle border_1">
                                  <div className="select_left">
                                    <img
                                      src={
                                        require("../img/sub/I_klaytn.svg")
                                          .default
                                      }
                                      alt=""
                                    />
                                    <select  id="">
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
                              <p>Items sold until canceled</p>
                            </div>
                            <div className="price_info_m">
                              <div className="top2">
                                <h3>Price</h3>
                                <p>Items sold until canceled</p>
                              </div>
                              <div className="toggle border_1">
                                <div className="select_left">
                                  <img
                                    src={
                                      require("../img/sub/I_klaytn.svg").default
                                    }
                                    alt=""
                                  />
                                  <select  id="">
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
                          </li>
                          <li>
                            <div className="end">
                              <div className="top2 m2">
                                <h3>End price option</h3>
                                <div className="toggle">
                                  <input type="checkbox"  id="toggle" />
                                  <label htmlFor="toggle"></label>
                                </div>
                              </div>
                              <p>
                                If you add the closing price, the sale or
                                duration
                                <br />
                                The price will gradually decrease until it
                                expires.
                              </p>
                              <div className="endprice">
                                <div className="endpricebox">
                                  <ul>
                                    <li>
                                      <div className="endoption1">
                                        <h3>End price</h3>
                                        <div className="top2">
                                          <p>
                                            The closing price is equal to the
                                            starting price or <br />
                                            It should be lower. prices are
                                            sequential lowers.
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
                                              <select  id="">
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
                                      <div className="endoption2">
                                        <h3>Price</h3>
                                        <div className="top2">
                                          <p>Items sold until canceled</p>
                                          <div className="twoselect">
                                            <div className="toggle_1">
                                              <select  id="">
                                                <option>5 days later</option>
                                                <option>3 days later</option>
                                                <option>2 days later</option>
                                                <option>1 days later</option>
                                              </select>
                                            </div>
                                            <div className="toggle_2">
                                              <select  id="">
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
                            <div className="private">
                              <div className="top2 m2">
                                <h3>Private option</h3>
                                <div className="toggle">
                                  <input type="checkbox"  id="toggle2" />
                                  <label htmlFor="toggle2"></label>
                                </div>
                              </div>
                              <p>
                                If set to private, other than the address
                                entered below Products are not visible to users
                              </p>
                              <div className="privatenum">
                                <p>0x8df35T1REFD58984E3F2DG312FD323RE5R4FD5</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="inst_con">
                              <div className="instrucion line1">
                                <div className="dropdown">
                                  <a >
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
                                      &nbsp;&nbsp;The process of sending 0 Klay
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
                          <li>
                            <div className="blackman">
                              <ul>
                                <li>
                                  <div className="two_bundle">
                                    <div className="dropdown">
                                      <a >
                                        <span className="drop2"></span>
                                      </a>
                                      <div className="bundle2">
                                        <span></span>
                                        <div className="name">
                                          <p>Philip van Kouwenbergh</p>
                                          <strong>Blackman with neon</strong>
                                        </div>
                                      </div>
                                      <div className="textbox">
                                        <div className="txt">
                                          <textarea
                                            
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
                                  <div className="two_bundle">
                                    <div className="dropdown">
                                      <a >
                                        <span className="drop2"></span>
                                      </a>
                                      <div className="bundle2">
                                        <span></span>
                                        <div className="name">
                                          <p>Philip van Kouwenbergh</p>
                                          <strong>Blackman with neon</strong>
                                        </div>
                                      </div>
                                      <div className="textbox">
                                        <div className="txt">
                                          <textarea
                                            
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
            <div className="sellbg2_pc">
              <div className="sell_wrap">
                <div className="top3 h3p">
                  <h3>Transaction information</h3>
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
                <div className="sales_btn">
                  <a >Sales start</a>
                </div>
              </div>
            </div>
            <div className="sellbg2_m">
              <div className="sell_wrap">
                <div className="top3">
                  <h3>Transaction information</h3>
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
                <a >Sales start</a>
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

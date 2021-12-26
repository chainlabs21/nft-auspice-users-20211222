import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import s5 from "../img/sub/s5.png";
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
import { useState } from "react";

function SingleItem({ store, setConnect }) {
  const navigate = useNavigate();

  const [ownerPopup, setOwnerPopup] = useState(false);
  const [likePopup, setLikePopup] = useState(false);
  const [reportPopup, setReportPopup] = useState(false);
  const [reportDesc, setReportDesc] = useState("");
  const [bidPopup, setBidPopup] = useState(false);

  return (
    <SignPopupBox>
      {likePopup && (
        <div class="popup info" id="info_popup" style={{ display: "block" }}>
          <div class="box_wrap wrap2">
            <a
              onClick={() => setLikePopup(false)}
              class="close close2"
              id="info_close"
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </a>
            <div class="poptitle">
              <h2>Liked by</h2>
            </div>
            <div class="list_bottom">
              <ul class="container popcon">
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    cryptopunks
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    art book
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    good Friends
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    ZED Run
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    Meebits
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    Sandbox
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    cryptopunks
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {reportPopup && (
        <div class="popup info" id="info_popup" style={{ display: "block" }}>
          <div class="box_wrap wrap3">
            <a
              onClick={() => setReportPopup(false)}
              class="close close2"
              id="info_close"
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </a>
            <div class="poptitle">
              <h2>Report inappropriate items</h2>
            </div>
            <form>
              <div class="list_bottom bottom2">
                <h3>Category</h3>
                <select>
                  <option disable selected hidden>
                    Please select a reason for reporting
                  </option>
                  <option>Similar to another artist's work</option>
                </select>
                <h3>Detailed description</h3>

                <textarea
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                  placeholder="Please describe in detail why you would like to report the item."
                ></textarea>
              </div>
              <div class="report_wrap">
                <button
                  href=""
                  class="reportit"
                  disabled={!reportDesc}
                  onClick={() => setReportPopup(false)}
                >
                  Report it
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {ownerPopup && (
        <div class="popup info" id="info_popup" style={{ display: "block" }}>
          <div class="box_wrap wrap2">
            <a
              onClick={() => setOwnerPopup(false)}
              class="close close2"
              id="info_close"
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </a>
            <div class="poptitle">
              <h2>Owner List</h2>
            </div>
            <div class="list_bottom">
              <ul class="container popcon">
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    cryptopunks
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                  <p>
                    <a>22 Items</a>
                  </p>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    art book
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                  <p>
                    <a>1 Items</a>
                  </p>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    good Friends
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                  <p>
                    <a>10 Items</a>
                  </p>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    ZED Run
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                  <p>
                    <a>37 Items</a>
                  </p>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    Meebits
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                  <p>
                    <a>16 Items</a>
                  </p>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    Sandbox
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                  <p>
                    <a>76 Items</a>
                  </p>
                </li>
                <li>
                  <span class="pop_profile"></span>
                  <h3>
                    cryptopunks
                    <br />
                    <span>0x6bc...1sad</span>
                  </h3>
                  <p>
                    <a>22 Items</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {bidPopup && (
        <div class="popup info" id="info_popup" style={{ display: "block" }}>
          <div class="box_wrap buynft">
            <a
              onClick={() => setBidPopup(false)}
              class="close close2"
              id="info_close"
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </a>
            <div class="poptitle nob">
              <h2>Purchase receipt</h2>
            </div>
            <div class="list_bottom buy_nft">
              <p class="warn">
                Warning! Contains items
                <br /> that have not been reviewed and approved
              </p>
              <div class="receipt_section">
                <div class="receipt_title">
                  <p class="rec_t">Item</p>
                  <p class="rec_t right">Subtotal</p>
                </div>
                <div class="receipt_item">
                  <ul>
                    <li>
                      <span class="pic"></span>
                      <div class="right_price">
                        <h3>
                          Philip van Kouwenbergh
                          <br />
                          <span>Blackman with neon 4 items</span>
                        </h3>
                        <h4 class="m_sub">
                          <img src={require("../img/sub/stone.png").default} />
                          25<span class="pri">($58,282.50)</span>
                        </h4>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p class="rec_t">
                        Total<span class="red">Insufficient ETH balance</span>
                      </p>
                      <div class="right_price m_left">
                        <h4 class="blue">
                          <img src={require("../img/sub/stone.png").default} />
                          25<span class="pri">($58,282.50)</span>
                        </h4>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                </div>
                <form class="ckb_wrap">
                  <div class="ckb">
                    <input type="checkbox" id="chk" name="chk1" />
                    <label for="chk">
                      Aware that Auspice contains one item that has not been
                      reviewed and approved
                    </label>
                  </div>
                  <div class="ckb">
                    <input type="checkbox" id="chk2" name="chk1" />
                    <label for="chk2">
                      I agree to Auspice's <b>Terms of Service</b>
                    </label>
                  </div>
                </form>
              </div>
              <button class="reportit on" onClick={() => setBidPopup(false)}>
                Make a payment
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="sub">
        <article class="bundle_box box2">
          <div class="wrap">
            <div class="bundle_top">
              <div class="bun_tl">
                <div class="bun_tl_img">
                  <div class="bt artist">
                    <h2>
                      <span></span>@Philip van Kouwenbergh
                    </h2>
                  </div>
                  <div class="bt likes" onClick={() => setLikePopup(true)}>
                    <a class="like_heart off">
                      <h2>1,486 Likes</h2>
                    </a>
                  </div>
                  <div class="views">
                    <ul>
                      <li
                        onClick={() => setOwnerPopup(true)}
                        style={{ cursor: "pointer" }}
                      >
                        <h3>21</h3>
                        <h4>Owner</h4>
                      </li>
                      <li>
                        <h3>30</h3>
                        <h4>Fragment</h4>
                      </li>
                      <li>
                        <h3>1.1M</h3>
                        <h4>views</h4>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="desc">
                  <h2 class="i_title">Description</h2>
                  <p>
                    This is a collection of digitals produced on April 28th,
                    with beautiful night views. It's about the
                    <br />
                    harmony of neon signs. It's an expression of modern art.
                    <br />
                    <br />
                    on April 28th, with beautiful night views. It's about the
                    harmony of neon signs.
                    <br />
                    It's an expression of modern art.
                  </p>
                  <div class="mcons">
                    <a>
                      <img src={require("../img/sub/refresh.png").default} />
                    </a>
                    <a>
                      <img src={require("../img/sub/alert.png").default} />
                    </a>
                    <a>
                      <img src={require("../img/sub/share.png").default} />
                    </a>
                  </div>
                </div>
              </div>
              <div class="bun_tr">
                <div class="bun_right">
                  <div class="right_t">
                    <div class="tt">
                      <h2>
                        Blackman
                        <br />
                        with neon
                      </h2>
                      <div class="icons">
                        <a>
                          <img
                            src={require("../img/sub/refresh.png").default}
                          />
                        </a>
                        <a onClick={() => setReportPopup(true)}>
                          <img src={require("../img/sub/alert.png").default} />
                        </a>
                        <a>
                          <img src={require("../img/sub/share.png").default} />
                        </a>
                      </div>
                    </div>
                    <div class="boxes">
                      <h2>Owner public content include</h2>
                      <div class="black_box">
                        <ul>
                          <li>
                            <h3>Current Bid</h3>
                            <h4>
                              2.867<span>AUSP</span>
                            </h4>
                            <h5>$1,234.25</h5>
                          </li>
                          <li>
                            <h3>Auction ending in</h3>
                            <h4>05:32:21</h4>
                          </li>
                        </ul>
                        <a
                          class="bid"
                          style={{ color: "#000" }}
                          onClick={() => setBidPopup(true)}
                        >
                          Place a Bid
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="right_m">
                    <h2 class="i_title">Price History</h2>
                    <form>
                      <select>
                        <option>Last 60 Days</option>
                      </select>
                    </form>
                    <div class="prices">
                      <ul>
                        <li>
                          <h3>Average price</h3>
                          <p>$31.11</p>
                        </li>
                        <li>
                          <h3>Highest price</h3>
                          <p>$32.11</p>
                        </li>
                        <li>
                          <h3>Lowest price</h3>
                          <p>$30.11</p>
                        </li>
                      </ul>
                    </div>
                    <div class="graph">
                      <img
                        src={require("../img/sub/Component.png").default}
                        alt="graph"
                      />
                    </div>
                  </div>
                  <div class="right_b">
                    <h2 class="i_title">Offer History</h2>
                    <div class="history_s container">
                      <ul>
                        <li>
                          <span class="profile_img"></span>
                          <h3>
                            5.44 ETH
                            <br />
                            <span>T.WD</span>
                          </h3>
                          <h4>0x83bc3fF3CE5499...</h4>
                          <h5>21:54</h5>
                        </li>
                        <li>
                          <span class="profile_img"></span>
                          <h3>
                            4.23 ETH
                            <br />
                            <span>TIMOTHY</span>
                          </h3>
                          <h4></h4>
                          <h5>20:00</h5>
                        </li>
                        <li>
                          <span class="profile_img"></span>
                          <h3>
                            4.00 ETH
                            <br />
                            <span>PT_WORK</span>
                          </h3>
                          <h4></h4>
                          <h5>17:33</h5>
                        </li>
                        <li>
                          <span class="profile_img"></span>
                          <h3>
                            4.00 ETH
                            <br />
                            <span>PT_WORK</span>
                          </h3>
                          <h4></h4>
                          <h5>17:33</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="status s_pc">
              <div class="mptable left">
                <strong>SALES STATUS</strong>
                <div class="ranktable_pc p_th">
                  <div class="table_sales">
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
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                            <div class="pur">
                              <a>Purchase</a>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td class="blue">Esther</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                            <div class="pur">
                              <a>Purchase</a>
                            </div>
                          </td>
                          <td>4 days later</td>
                          <td class="blue">TODD</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                            <div class="pur">
                              <a>Purchase</a>
                            </div>
                          </td>
                          <td>1 days later</td>
                          <td class="blue">Philip van Kouwenbergh</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                            <div class="pur">
                              <a>Purchase</a>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.015 ETH ($0,000,000.50)</p>
                            </div>
                            <div class="pur">
                              <a>Purchase</a>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                            <div class="pur">
                              <a>Purchase</a>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="mptable right">
                <strong>PURCHASE STATUS</strong>
                <div class="ranktable_pc p_th">
                  <div class="table_sales">
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
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td class="blue">Esther</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>4 days later</td>
                          <td class="blue">TODD</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>1 days later</td>
                          <td class="blue">Philip van Kouwenbergh</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.015 ETH <span>($0,000,000.50)</span>
                              </p>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>
                                0.010 ETH <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="status s_m">
              <div class="mptable left">
                <strong>Sales status</strong>
                <div class="ranktable_pc p_th">
                  <div class="table_sales">
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
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div class="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td class="blue">
                            <div class="div">Esther</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>4 days later</span>
                            </div>
                            <div class="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td class="blue">
                            <div class="div">TODD</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div class="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td class="blue">
                            <div class="div">Philip van Kouwenbergh</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div class="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td class="blue">
                            <div class="div">PT_WORK</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div class="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td class="blue">
                            <div class="div">PT_WORK</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div class="pur">
                              <a>Buy</a>
                            </div>
                          </td>
                          <td class="blue">
                            <div class="div">PT_WORK</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="mptable right">
                <strong>Purchase status</strong>
                <div class="ranktable_pc p_th">
                  <div class="table_sales">
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
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td class="blue">Esther</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>4 days later</span>
                            </div>
                          </td>
                          <td class="blue">TODD</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>1 days later</span>
                            </div>
                          </td>
                          <td class="blue">Philip van Kouwenbergh</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.015 ETH ($0,000,000.50)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/stone.png").default}
                                alt=""
                              />
                              <p>0.010 ETH ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td class="blue">PT_WORK</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="basic plustab ml2">
              <div class="tab">
                <ul>
                  <li class="on">Transaction History</li>
                  <li>Chain Information</li>
                </ul>
              </div>
              <div class="tab_bottom container con3" id="FixedTable">
                <table>
                  <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead class="head">
                    <tr>
                      <th>Event</th>
                      <th>Price</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Date</th>
                      <th class="hchain">Tx confirm</th>
                    </tr>
                  </thead>
                  <tbody class="body">
                    <tr>
                      <td>sale</td>
                      <td class="bold">0.0020 ETH</td>
                      <td class="blue">
                        0xb9e83064c381bd64cb2b2f8406203e584b81a7e1
                      </td>
                      <td class="blue">
                        0x495f947276749ce646f68ac8c248420045cb7b5e
                      </td>
                      <td class="gray">1 month ago</td>
                      <td>
                        <span class="chain on"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>purchase</td>
                      <td class="bold">0.0022 ETH</td>
                      <td class="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td class="blue">
                        0x3c3ade46a59267295a3ade22902b040ec6f36809
                      </td>
                      <td class="gray">2 month ago</td>
                      <td>
                        <span class="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>sale</td>
                      <td class="bold">0.0023 ETH</td>
                      <td class="blue">
                        0xe8bd396947a5ff690634aa2f66985b103b6911ba
                      </td>
                      <td class="blue">
                        0xb9e83064c381bd64cb2b2f8406203e584b81a7e1
                      </td>
                      <td class="gray">4 month ago</td>
                      <td>
                        <span class="chain on"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>sale</td>
                      <td class="bold">0.0020 ETH</td>
                      <td class="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td class="blue">
                        0xd869084ad98142f828f2cf9d76727a2ec832ace2
                      </td>
                      <td class="gray">5 month ago</td>
                      <td>
                        <span class="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>purchase</td>
                      <td class="bold">0.0001 ETH</td>
                      <td class="blue">
                        0x1e425a95aecdc4d1b2c4987e914de35ede716852
                      </td>
                      <td class="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td class="gray">5 month ago</td>
                      <td>
                        <span class="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>purchase</td>
                      <td class="bold">0.0001 ETH</td>
                      <td class="blue">
                        0x1e425a95aecdc4d1b2c4987e914de35ede716852
                      </td>
                      <td class="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td class="gray">5 month ago</td>
                      <td>
                        <span class="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>purchase</td>
                      <td class="bold">0.0001 ETH</td>
                      <td class="blue">
                        0x1e425a95aecdc4d1b2c4987e914de35ede716852
                      </td>
                      <td class="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td class="gray">5 month ago</td>
                      <td>
                        <span class="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>sale</td>
                      <td class="bold">0.0020 ETH</td>
                      <td class="blue">
                        0xb9e83064c381bd64cb2b2f8406203e584b81a7e1
                      </td>
                      <td class="blue">
                        0x495f947276749ce646f68ac8c248420045cb7b5e
                      </td>
                      <td class="gray">5 month ago</td>
                      <td>
                        <span class="chain off"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="wrap">
              <h4 class="t">Other works in this collection</h4>

              <div class="swiper">
                <div class="swiper-container swiper-container-trendingitem">
                  <ol class="item item5 buy swiper-wrapper">
                    <li class="swiper-slide">
                      <a style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li class="heart off">1,389</li>
                            <li class="star off"></li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <ol>
                            <li>6 minutes left</li>
                            <li>1.67 AUSP</li>
                          </ol>
                          <p>Buy Now</p>
                        </div>
                      </a>
                    </li>
                    <li class="swiper-slide">
                      <a style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li class="heart on">1,389</li>
                            <li class="star on"></li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <ol>
                            <li>6 minutes left</li>
                            <li>1.67 AUSP</li>
                          </ol>
                          <p>Buy Now</p>
                        </div>
                      </a>
                    </li>
                    <li class="swiper-slide">
                      <a style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li class="heart on">1,389</li>
                            <li class="star on"></li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <ol>
                            <li>6 minutes left</li>
                            <li>1.67 AUSP</li>
                          </ol>
                          <p>Buy Now</p>
                        </div>
                      </a>
                    </li>
                    <li class="swiper-slide">
                      <a style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li class="heart on">1,389</li>
                            <li class="star on"></li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <ol>
                            <li>6 minutes left</li>
                            <li>1.67 AUSP</li>
                          </ol>
                          <p>Buy Now</p>
                        </div>
                      </a>
                    </li>
                    <li class="swiper-slide">
                      <a style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li class="heart on">1,389</li>
                            <li class="star on"></li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <ol>
                            <li>6 minutes left</li>
                            <li>1.67 AUSP</li>
                          </ol>
                          <p>Buy Now</p>
                        </div>
                      </a>
                    </li>
                  </ol>
                </div>

                {/* <div class="swiper-button-prev swiper-button-trendingitem-prev pcno"></div>
                <div class="swiper-button-next swiper-button-trendingitem-next pcno"></div> */}
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
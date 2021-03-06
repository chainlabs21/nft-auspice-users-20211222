import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import s1 from "../img/sub/s1.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s9 from "../img/sub/s9.png";

import bun_slide_img1 from "../img/sub/s2.png";
import bun_slide_img2 from "../img/sub/s4.png";
import bun_slide_img3 from "../img/sub/s3.png";
import bun_slide_img4 from "../img/sub/s9.png";
import { useState } from "react";

function BundleItem({ store, setConnect }) {
  const navigate = useNavigate();

  const [imgIndex, setImgIndex] = useState(0);
  const [bidPopup, setBidPopup] = useState(false);

  const [chartCategory, setChartCategory] = useState(0);

  function onClickNextItemBtn() {
    if (imgIndex > 0) setImgIndex(imgIndex - 1);
  }

  function onClickPreItemBtn() {
    if (imgIndex < imgList.length - 1) setImgIndex(imgIndex + 1);
  }

  function onClickShare() {
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = window.location.href; // "0xD591aaaaaa55dsf12";
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  return (
    <SignPopupBox>
      {bidPopup && (
        <div
          className="popup info"
          id="info_popup"
          style={{ display: "block" }}
        >
          <div className="box_wrap buynft">
            <a
              onClick={() => setBidPopup(false)}
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
              <p className="warn">
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
                      <span className="pic"></span>
                      <div className="right_price">
                        <h3>
                          Philip van Kouwenbergh
                          <br />
                          <span>Blackman with neon</span>
                        </h3>
                        <h4 className="m_sub">
                          <img src={require("../img/sub/stone.png").default} />
                          25<span className="pri">($58,282.50)</span>
                        </h4>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p className="rec_t">
                        Total
                        <span className="red">Insufficient KLAY balance</span>
                      </p>
                      <div className="right_price m_left">
                        <h4 className="blue">
                          <img src={require("../img/sub/stone.png").default} />
                          25<span className="pri">($58,282.50)</span>
                        </h4>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                </div>
                <form className="ckb_wrap">
                  <div className="ckb">
                    <input type="checkbox" id="chk" name="chk1" />
                    <label htmlFor="chk">
                      Aware that Itemverse contains one item that has not been
                      reviewed and approved
                    </label>
                  </div>
                  <div className="ckb">
                    <input type="checkbox" id="chk2" name="chk1" />
                    <label htmlFor="chk2">
                      I agree to Itemverse's <b>Terms of Service</b>
                    </label>
                  </div>
                </form>
              </div>
              <a href="" className="reportit on ">
                Make a payment
              </a>
            </div>
          </div>
        </div>
      )}

      <section id="sub">
        <article className="bundle_box box2 box3">
          <div className="wrap">
            <div className="bundle_top bundle_top2">
              <div className="bun_tl">
                <div className="bun_tl_img">
                  <div className="bt artist">
                    <h2>
                      <span></span>@Philip van Kouwenbergh
                    </h2>
                  </div>
                  <div className="slidew">
                    <h3>1/10</h3>
                    <div className="arrows">
                      <a href="">
                        <img src={require("../img/sub/baleft.png").default} />
                      </a>
                      <a href="">
                        <img src={require("../img/sub/baright.png").default} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bun_slide_img swiper bun-slide-img-swiper">
                  <ul className="swiper-wrapper">
                    <li className="swiper-slide">
                      <img
                        src={require("../img/sub/bun_slide_img1.png").default}
                      />
                    </li>
                    <li className="swiper-slide">
                      <img
                        src={require("../img/sub/bun_slide_img2.png").default}
                      />
                    </li>
                    <li className="swiper-slide">
                      <img
                        src={require("../img/sub/bun_slide_img3.png").default}
                      />
                    </li>
                    <li className="swiper-slide">
                      <img
                        src={require("../img/sub/bun_slide_img4.png").default}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bun_tr">
                <div className="bun_right">
                  <div className="right_t">
                    <div className="tt">
                      <h2>
                        Blackman with neon
                        <br />4 items
                      </h2>
                      <div className="icons">
                        <a href="">
                          <img
                            src={require("../img/sub/refresh.png").default}
                          />
                        </a>
                        <a href="">
                          <img src={require("../img/sub/alert.png").default} />
                        </a>
                        <a href="">
                          <img src={require("../img/sub/share.png").default} />
                        </a>
                      </div>
                    </div>
                    <div className="boxes">
                      <h2>Owner public content include</h2>
                      <div className="black_box">
                        <ul>
                          <li>
                            <h3>Current Bid</h3>
                            <h4>
                              2.867<span>KLAY</span>
                            </h4>
                            <h5>$1,234.25</h5>
                          </li>
                          <li>
                            <h3>Auction ending in</h3>
                            <h4>05:32:21</h4>
                          </li>
                        </ul>
                        <a onClick={() => setBidPopup(true)} className="bid">
                          Place a Bid
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="desc">
                    <h2 className="i_title">Description</h2>
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
                  </div>
                </div>
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
                  <div className="graph">
                    <img
                      src={require("../img/sub/Component.png").default}
                      alt="graph"
                    />
                  </div>
                </div>
              </div>
              <div className="bun_tr">
                <div className="right_b">
                  <h2 className="i_title">Offer History</h2>
                  <div className="history_s container">
                    <ul>
                      <li>
                        <span className="profile_img"></span>
                        <h3>
                          5.44 KLAY
                          <br />
                          <span>T.WD</span>
                        </h3>
                        <h4>0x83bc3fF3CE5499...</h4>
                        <h5>21:54</h5>
                      </li>
                      <li>
                        <span className="profile_img"></span>
                        <h3>
                          4.23 KLAY
                          <br />
                          <span>TIMOTHY</span>
                        </h3>
                        <h4></h4>
                        <h5>20:00</h5>
                      </li>
                      <li>
                        <span className="profile_img"></span>
                        <h3>
                          4.00 KLAY
                          <br />
                          <span>PT_WORK</span>
                        </h3>
                        <h4></h4>
                        <h5>17:33</h5>
                      </li>
                      <li>
                        <span className="profile_img"></span>
                        <h3>
                          4.00 KLAY
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
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                            <div className="pur">
                              <a href="">Purchase</a>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td className="blue">Esther</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                            <div className="pur">
                              <a href="">Purchase</a>
                            </div>
                          </td>
                          <td>4 days later</td>
                          <td className="blue">TODD</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                            <div className="pur">
                              <a href="">Purchase</a>
                            </div>
                          </td>
                          <td>1 days later</td>
                          <td className="blue">Philip van Kouwenbergh</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                            <div className="pur">
                              <a href="">Purchase</a>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td className="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                            <div className="pur">
                              <a href="">Purchase</a>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td className="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                            <div className="pur">
                              <a href="">Purchase</a>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td className="blue">PT_WORK</td>
                        </tr>
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
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td className="blue">Esther</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>4 days later</td>
                          <td className="blue">TODD</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>1 days later</td>
                          <td className="blue">Philip van Kouwenbergh</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td className="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.015 KLAY <span>($0,000,000.50)</span>
                              </p>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td className="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>
                                0.010 KLAY <span>($30.11)</span>
                              </p>
                            </div>
                          </td>
                          <td>3 days later</td>
                          <td className="blue">PT_WORK</td>
                        </tr>
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
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div className="pur">
                              <a href="">Buy</a>
                            </div>
                          </td>
                          <td className="blue">
                            <div className="div">Esther</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>4 days later</span>
                            </div>
                            <div className="pur">
                              <a href="">Buy</a>
                            </div>
                          </td>
                          <td className="blue">
                            <div className="div">TODD</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div className="pur">
                              <a href="">Buy</a>
                            </div>
                          </td>
                          <td className="blue">
                            <div className="div">Philip van Kouwenbergh</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div className="pur">
                              <a href="">Buy</a>
                            </div>
                          </td>
                          <td className="blue">
                            <div className="div">PT_WORK</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div className="pur">
                              <a href="">Buy</a>
                            </div>
                          </td>
                          <td className="blue">
                            <div className="div">PT_WORK</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                            <div className="pur">
                              <a href="">Buy</a>
                            </div>
                          </td>
                          <td className="blue">
                            <div className="div">PT_WORK</div>
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
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td className="blue">Esther</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>4 days later</span>
                            </div>
                          </td>
                          <td className="blue">TODD</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>1 days later</span>
                            </div>
                          </td>
                          <td className="blue">Philip van Kouwenbergh</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td className="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.015 KLAY ($0,000,000.50)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td className="blue">PT_WORK</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="name price">
                              <img
                                src={require("../img/sub/I_klaytn.svg").default}
                                style={{ width: 24 }}
                                alt=""
                              />
                              <p>0.010 KLAY ($30.11)</p>
                              <span>3 days later</span>
                            </div>
                          </td>
                          <td className="blue">PT_WORK</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="basic plustab">
              <div className="tab">
                <ul>
                  {chartCategoryList.map((cont, index) => (
                    <li
                      className={chartCategory === index && "on"}
                      onClick={() => setChartCategory(index)}
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
                    <tr>
                      <td>sale</td>
                      <td className="bold">0.0020 KLAY</td>
                      <td className="blue">
                        0xb9e83064c381bd64cb2b2f8406203e584b81a7e1
                      </td>
                      <td className="blue">
                        0x495f947276749ce646f68ac8c248420045cb7b5e
                      </td>
                      <td className="gray">1 month ago</td>
                      <td>
                        <span className="chain on"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>purchase</td>
                      <td className="bold">0.0022 KLAY</td>
                      <td className="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td className="blue">
                        0x3c3ade46a59267295a3ade22902b040ec6f36809
                      </td>
                      <td className="gray">2 month ago</td>
                      <td>
                        <span className="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>sale</td>
                      <td className="bold">0.0023 KLAY</td>
                      <td className="blue">
                        0xe8bd396947a5ff690634aa2f66985b103b6911ba
                      </td>
                      <td className="blue">
                        0xb9e83064c381bd64cb2b2f8406203e584b81a7e1
                      </td>
                      <td className="gray">4 month ago</td>
                      <td>
                        <span className="chain on"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>sale</td>
                      <td className="bold">0.0020 KLAY</td>
                      <td className="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td className="blue">
                        0xd869084ad98142f828f2cf9d76727a2ec832ace2
                      </td>
                      <td className="gray">5 month ago</td>
                      <td>
                        <span className="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>purchase</td>
                      <td className="bold">0.0001 KLAY</td>
                      <td className="blue">
                        0x1e425a95aecdc4d1b2c4987e914de35ede716852
                      </td>
                      <td className="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td className="gray">5 month ago</td>
                      <td>
                        <span className="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>purchase</td>
                      <td className="bold">0.0001 KLAY</td>
                      <td className="blue">
                        0x1e425a95aecdc4d1b2c4987e914de35ede716852
                      </td>
                      <td className="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td className="gray">5 month ago</td>
                      <td>
                        <span className="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>purchase</td>
                      <td className="bold">0.0001 KLAY</td>
                      <td className="blue">
                        0x1e425a95aecdc4d1b2c4987e914de35ede716852
                      </td>
                      <td className="blue">
                        0x86b5226a351ffa2088a58b16c274aea8dc2ef912
                      </td>
                      <td className="gray">5 month ago</td>
                      <td>
                        <span className="chain off"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>sale</td>
                      <td className="bold">0.0020 KLAY</td>
                      <td className="blue">
                        0xb9e83064c381bd64cb2b2f8406203e584b81a7e1
                      </td>
                      <td className="blue">
                        0x495f947276749ce646f68ac8c248420045cb7b5e
                      </td>
                      <td className="gray">5 month ago</td>
                      <td>
                        <span className="chain off"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="item sitem_wrap">
            <h4 className="t">Other works in this collection</h4>
            <div className="swiper">
              <div className="swiper-container swiper-container-trendingitem">
                <ol className="item item4 buy swiper-wrapper">
                  <div
                    className="slideBox"
                    // ref={itemWrapRef}
                  >
                    <span>
                      <li className="swiper-slide">
                        <a
                          href="#"
                          style={{
                            backgroundImage: `url(${s1})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="on">
                            <ul>
                              <li className="heart off">1,389</li>
                              <li className="star off"></li>
                            </ul>
                            <div>Summer Pool</div>
                            <span>David</span>
                            <ol>
                              <li>6 minutes left</li>
                              <li>1.67 KLAY</li>
                            </ol>
                            <p>Buy Now</p>
                          </div>
                        </a>
                      </li>
                    </span>
                    <span>
                      <li className="swiper-slide">
                        <a
                          href="#"
                          style={{
                            backgroundImage: `url(${s2})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="on">
                            <ul>
                              <li className="heart on">1,389</li>
                              <li className="star on"></li>
                            </ul>
                            <div>Summer Pool</div>
                            <span>David</span>
                            <ol>
                              <li>6 minutes left</li>
                              <li>1.67 KLAY</li>
                            </ol>
                            <p>Buy Now</p>
                          </div>
                        </a>
                      </li>
                    </span>
                    <span>
                      <li className="swiper-slide">
                        <a
                          href="#"
                          style={{
                            backgroundImage: `url(${s4})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="on">
                            <ul>
                              <li className="heart on">1,389</li>
                              <li className="star on"></li>
                            </ul>
                            <div>Summer Pool</div>
                            <span>David</span>
                            <ol>
                              <li>6 minutes left</li>
                              <li>1.67 KLAY</li>
                            </ol>
                            <p>Buy Now</p>
                          </div>
                        </a>
                      </li>
                    </span>
                    <span>
                      <li className="swiper-slide">
                        <a
                          href="#"
                          style={{
                            backgroundImage: `url(${s3})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="on">
                            <ul>
                              <li className="heart on">1,389</li>
                              <li className="star on"></li>
                            </ul>
                            <div>Summer Pool</div>
                            <span>David</span>
                            <ol>
                              <li>6 minutes left</li>
                              <li>1.67 KLAY</li>
                            </ol>
                            <p>Buy Now</p>
                          </div>
                        </a>
                      </li>
                    </span>
                    <span>
                      <li className="swiper-slide">
                        <a
                          href="#"
                          style={{
                            backgroundImage: `url(${s9})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="on">
                            <ul>
                              <li className="heart on">1,389</li>
                              <li className="star on"></li>
                            </ul>
                            <div>Summer Pool</div>
                            <span>David</span>
                            <ol>
                              <li>6 minutes left</li>
                              <li>1.67 KLAY</li>
                            </ol>
                            <p>Buy Now</p>
                          </div>
                        </a>
                      </li>
                    </span>
                  </div>
                </ol>
              </div>
              <div className="swiper-button-prev swiper-button-trendingitem-prev "></div>
              <div className="swiper-button-next swiper-button-trendingitem-next"></div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .bun_slide_img {
    .swiper-wrapper {
      display: flex;

      li {
        width: 25%;
        padding: 0 5px;
        border-radius: 20px;
        overflow: hidden;
        box-sizing: border-box;
      }
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BundleItem);

const imgList = [
  bun_slide_img1,
  bun_slide_img2,
  bun_slide_img3,
  bun_slide_img4,
  bun_slide_img1,
  bun_slide_img2,
  bun_slide_img3,
  bun_slide_img4,
];

const chartCategoryList = ["Transaction History", "Chain Information"];

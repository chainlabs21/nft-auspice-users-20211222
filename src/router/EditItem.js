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
import profile_img from "../img/sub/profile_img.png";

import { useState } from "react";
import PopupBg from "../components/PopupBg";
import CancelListingPopup from "../components/CancelListingPopup";
import PlaceBidPopup from "../components/PlaceBidPopup";

export default function EditItem({ store, setConnect }) {
  const navigate = useNavigate();
  const [cancelPopup, setCancelPopup] = useState(false);
  const [placePopup, setPlacePopup] = useState(false);

  return (
    <>
      {cancelPopup && (
        <>
          <CancelListingPopup off={setCancelPopup} />
          <PopupBg bg off={setCancelPopup} />
        </>
      )}

      {placePopup && (
        <>
          <PlaceBidPopup off={setPlacePopup} />
          <PopupBg bg off={setPlacePopup} />
        </>
      )}
      <SignPopupBox>
        <section id="sub">
          <article className="bundle_box box2 box3">
            <div className="wrap">
              <div className="back">
                <div className="bt">
                  <a className="backic">
                    <img src={require("../img/sub/icon_back.png").default} />
                  </a>
                  <h2>Philip van Kouwenbergh's item</h2>
                </div>
                <div className="seed">
                  <a onClick={() => navigate("/createitem")} className="edit">
                    EDIT
                  </a>

                  <a onClick={() => setCancelPopup(true)} className="edit">
                    Cancel Listing
                  </a>
                </div>
              </div>
              <div className="bundle_top">
                <div className="bun_tl">
                  <div className="bun_tl_img">
                    <div className="bt artist">
                      <h2>
                        <span
                          style={{ backgroundImage: `url(${profile_img})` }}
                        ></span>
                        @Philip van Kouwenbergh
                      </h2>
                    </div>
                    <div className="bt likes">
                      <a href="" className="like_heart off">
                        <h2>1,486 Likes</h2>
                      </a>
                    </div>
                    <div className="views">
                      <ul>
                        <li>
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
                </div>

                <div className="bun_tr">
                  <div className="bun_right">
                    <div className="right_t">
                      <div className="tt">
                        <h2>Blackman with neon</h2>
                        <div className="icons">
                          <a>
                            <img
                              src={require("../img/sub/refresh.png").default}
                            />
                          </a>
                          <a>
                            <img
                              src={require("../img/sub/alert.png").default}
                            />
                          </a>
                          <a>
                            <img
                              src={require("../img/sub/share.png").default}
                            />
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
                            onClick={() => setPlacePopup(true)}
                            className="bid"
                          >
                            Place a Bid
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
                  <p>
                    This is a collection of digitals produced on April 28th,
                    with beautiful night views. It's about the
                    <br />
                    harmony of neon signs. It's an expression of modern art.
                    <br />
                    on April 28th, with beautiful night views. It's about the
                    harmony of neon signs.
                    <br />
                    It's an expression of modern art.
                  </p>
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
                            5.44 ETH
                            <br />
                            <span>T.WD</span>
                          </h3>
                          <h4>0x83bc3fF3CE5499...</h4>
                          <h5>21:54</h5>
                        </li>
                        <li>
                          <span className="profile_img"></span>
                          <h3>
                            4.23 ETH
                            <br />
                            <span>TIMOTHY</span>
                          </h3>
                          <h4></h4>
                          <h5>20:00</h5>
                        </li>
                        <li>
                          <span className="profile_img"></span>
                          <h3>
                            4.00 ETH
                            <br />
                            <span>PT_WORK</span>
                          </h3>
                          <h4></h4>
                          <h5>17:33</h5>
                        </li>
                        <li>
                          <span className="profile_img"></span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.015 ETH ($0,000,000.50)</p>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.015 ETH <span>($0,000,000.50)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>
                                  0.010 ETH <span>($30.11)</span>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
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
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
                                <span>3 days later</span>
                              </div>
                            </td>
                            <td className="blue">Esther</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="name price">
                                <img
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
                                <span>4 days later</span>
                              </div>
                            </td>
                            <td className="blue">TODD</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="name price">
                                <img
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
                                <span>1 days later</span>
                              </div>
                            </td>
                            <td className="blue">Philip van Kouwenbergh</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="name price">
                                <img
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
                                <span>3 days later</span>
                              </div>
                            </td>
                            <td className="blue">PT_WORK</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="name price">
                                <img
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.015 ETH ($0,000,000.50)</p>
                                <span>3 days later</span>
                              </div>
                            </td>
                            <td className="blue">PT_WORK</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="name price">
                                <img
                                  src={require("../img/sub/stone.png").default}
                                  alt=""
                                />
                                <p>0.010 ETH ($30.11)</p>
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
              <div className="basic plustab ml2">
                <div className="tab">
                  <ul>
                    <li className="on">Transaction History</li>
                    <li>Chain Information</li>
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
                        <td className="bold">0.0020 ETH</td>
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
                        <td className="bold">0.0022 ETH</td>
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
                        <td className="bold">0.0023 ETH</td>
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
                        <td className="bold">0.0020 ETH</td>
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
                        <td className="bold">0.0001 ETH</td>
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
                        <td className="bold">0.0001 ETH</td>
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
                        <td className="bold">0.0001 ETH</td>
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
                        <td className="bold">0.0020 ETH</td>
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
            <div className="item">
              <div className="wrap">
                <h4 className="t">Other works in this item</h4>
                <div className="swiper">
                  <div className="swiper-container swiper-container-trendingitem">
                    <ol className="item item5 buy swiper-wrapper">
                      <li className="swiper-slide">
                        <a
                          onClick={() => navigate(-1)}
                          style={{ backgroundImage: `url(${s1})` }}
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
                      <li className="swiper-slide">
                        <a
                          onClick={() => navigate("/singleitem")}
                          style={{ backgroundImage: `url(${s2})` }}
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
                      <li className="swiper-slide">
                        <a
                          onClick={() => navigate("/singleitem")}
                          style={{ backgroundImage: `url(${s4})` }}
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
                      <li className="swiper-slide">
                        <a
                          onClick={() => navigate("/singleitem")}
                          style={{ backgroundImage: `url(${s3})` }}
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
                      <li className="swiper-slide">
                        <a
                          onClick={() => navigate("/singleitem")}
                          style={{ backgroundImage: `url(${s9})` }}
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
                    </ol>
                  </div>
                  <div className="swiper-button-prev swiper-button-trendingitem-prev pcno"></div>
                  <div className="swiper-button-next swiper-button-trendingitem-next pcno"></div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </SignPopupBox>
    </>
  );
}

const SignPopupBox = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  #sub {
    .bundle_box {
      .wrap {
        .back {
          .seed {
            a {
              @media screen and (min-width: 768px) {
                width: unset;
              }
              min-width: 120px;
              padding: 0 16px;
            }
          }
        }
      }
    }
  }
`;

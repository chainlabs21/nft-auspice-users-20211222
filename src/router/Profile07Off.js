import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s5 from "../img/sub/s5.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";
import click1 from "../img/sub/click1.png";
import ho_img from "../img/sub/ho_img.png";

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
      <section id="sub">
        <article className="profile_home deal_box">
          <div className="collection_home">
            <img src={require("../img/sub/home_bg.png").default} />

            <div className="wrap">
              <div className="collection_detail">
                <div className="pro_img">
                  <img src={require("../img/sub/home_profile.png").default} />
                  <div className="home_icons">
                    <a >
                      <img src={require("../img/sub/re.png").default} />
                    </a>
                    <a >
                      <img src={require("../img/sub/share.png").default} />
                    </a>
                  </div>
                </div>
                <h2 className="notop">Henry junior's Item</h2>
                <h3>0x97bc...8cad2</h3>
                <h4>
                  Henry is a mixed-media artist living in the Bay Area and uses
                  <br /> a stream of consciousness approach to his work.
                </h4>
              </div>
            </div>

            <div className="move off deal">
              <div className="cw ucl">
                <span className="close">
                  <img src={require("../img/sub/side_close.png").default} />
                  <b className="mclose">
                    Filter<span>1</span>
                  </b>
                </span>
                <div className="left_move">
                  <form>
                    <div className="filter">
                      <h3 className="filt">
                        <img
                          src={require("../img/sub/filter_icon.png").default}
                        />
                        Filter
                      </h3>
                      <img
                        src={require("../img/sub/filter_close.png").default}
                        className="fc"
                      />
                    </div>
                    <div className="fold status">
                      <h3 className="slide_tt">
                        Status
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open status">
                        <ul>
                          <li className="on">Buy Now</li>
                          <li>On Auction</li>
                          <li>New</li>
                          <li>Has Offers</li>
                        </ul>
                      </div>
                    </div>

                    <div className="fold">
                      <h3 className="slide_tt">
                        Price
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open">
                        <select>
                          <option disabled selected hidden>
                            United States Dollars (USD)
                          </option>
                          <option>100</option>
                        </select>
                        <div className="price_area">
                          <div className="price_wrap">
                            <input type="text" placeholder="0.00" />
                            <span className="usd">USD</span>
                          </div>
                          <div className="price_wrap">
                            <input type="text" placeholder="0.00" />
                            <span className="usd">USD</span>
                          </div>
                        </div>
                        <a  className="slide_btn">
                          Apply
                        </a>
                      </div>
                    </div>

                    <div className="fold">
                      <h3 className="slide_tt">
                        Items
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open collection">
                        <input
                          type="text"
                          placeholder="Filter"
                          className="s_search"
                        />
                        <ul>
                          <li
                            className="collec_img"
                            style={{ backgroundImage: `url(${collect_img})` }}
                          >
                            <span>Item 01</span>
                          </li>
                          <li
                            className="collec_img"
                            style={{ backgroundImage: `url(${collect_img2})` }}
                          >
                            <span>Item 02</span>
                          </li>
                          <li
                            className="collec_img"
                            style={{ backgroundImage: `url(${collect_img3})` }}
                          >
                            <span>Item 03</span>
                          </li>
                          <li
                            className="collec_img"
                            style={{ backgroundImage: `url(${collect_img4})` }}
                          >
                            <span>Item 04</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="fold">
                      <h3 className="slide_tt">
                        Chains
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open">
                        <ul>
                          <li className="ra">
                            <input type="radio" id="rad" name="rad" />
                            <label htmlFor="rad">
                              <img
                                src={require("../img/sub/stone.png").default}
                              />
                              Klaytn
                            </label>
                          </li>
                          <li className="ra">
                            <input type="radio" id="rad2" name="rad" />
                            <label htmlFor="rad2">
                              <img
                                src={require("../img/sub/rock.png").default}
                              />
                              Klaytn
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="fold">
                      <h3 className="slide_tt">
                        Sales Coin
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open">
                        <input
                          type="text"
                          placeholder="Filter"
                          className="s_search"
                        />
                        <ul>
                          <li className="ra">
                            <input type="radio" id="rad3" name="rad2" />
                            <label htmlFor="rad3">KLAY</label>
                          </li>
                          <li className="ra">
                            <input type="radio" id="rad4" name="rad2" />
                            <label htmlFor="rad4">WETH</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="right_move p_th">
                <div className="real_sec">
                  <ul className="tab tabb">
                    <li>Search Wallet</li>
                    <li className="onn">Transaction history</li>
                    <li>Offers</li>
                    <li>Liked</li>
                    <li>Hidden item</li>
                    <li>Referals</li>
                  </ul>
                  <div className="pad">
                    <div className="filter_list">
                      <div className="filter_left">
                        <div className="fl">
                          <a >
                            <span>Filter reset</span>
                          </a>
                        </div>
                        <div className="select_f">
                          <p>Listing</p>
                          <a >
                            <img
                              src={require("../img/sub/close_24.png").default}
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                      <div className="filter_right">
                        <div className="fr">
                          <a >
                            <img
                              src={require("../img/sub/exchange.png").default}
                              alt=""
                            />
                            <span>transactional information</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="filter_list2">
                      <div className="f_left">
                        <div className="slide2">
                          <div className="swiper mySwiper3">
                            <ul className="swiper-wrapper">
                              <li className="swiper-slide">
                                <div className="fl">
                                  <a >
                                    <span>Filter reset</span>
                                  </a>
                                </div>
                              </li>
                              <li className="swiper-slide">
                                <div className="select_f">
                                  <p>Sale</p>
                                  <a >
                                    <img
                                      src={
                                        require("../img/sub/close_24.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </li>
                              <li className="swiper-slide">
                                <div className="select_f">
                                  <p>Sale</p>
                                  <a >
                                    <img
                                      src={
                                        require("../img/sub/close_24.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </li>
                              <li className="swiper-slide">
                                <div className="select_f">
                                  <p>Sale</p>
                                  <a >
                                    <img
                                      src={
                                        require("../img/sub/close_24.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </li>
                              <li className="swiper-slide">
                                <div className="select_f">
                                  <p>Sale</p>
                                  <a >
                                    <img
                                      src={
                                        require("../img/sub/close_24.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </li>
                              <li className="swiper-slide">
                                <div className="select_f">
                                  <p>Sale</p>
                                  <a >
                                    <img
                                      src={
                                        require("../img/sub/close_24.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </li>
                              <li className="swiper-slide">
                                <div className="select_f">
                                  <p>Sale</p>
                                  <a >
                                    <img
                                      src={
                                        require("../img/sub/close_24.png")
                                          .default
                                      }
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="f_right">
                        <div className="fr">
                          <a >
                            <img
                              src={require("../img/sub/exchange.png").default}
                              alt=""
                            />
                            <span>transactional information</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="ranktable_pc">
                      <table>
                        <colgroup>
                          <col style={{ width: "10.7%" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "10.7%" }} />
                          <col style={{ width: "7%" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>Event</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Summer Pool</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>VOE837548548548548</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>VOE837548548</p>
                              </div>
                            </td>
                            <td>1 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_off.png")
                                    .default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Donald DUck</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>regrerg</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>TOM12</p>
                              </div>
                            </td>
                            <td>5 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_off.png")
                                    .default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Crushed He DUck</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Dan</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>AMAMA</p>
                              </div>
                            </td>
                            <td>10 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_on.png").default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Summer Pool</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>VOE837548548</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>VOE837548548</p>
                              </div>
                            </td>
                            <td>1 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_off.png")
                                    .default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Donald DUck</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>regrerg</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>TOM12</p>
                              </div>
                            </td>
                            <td>5 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_off.png")
                                    .default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Crushed He DUck</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Dan</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>AMAMA</p>
                              </div>
                            </td>
                            <td>10 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_on.png").default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Summer Pool</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>VOE837548548</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>VOE837548548</p>
                              </div>
                            </td>
                            <td>1 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_off.png")
                                    .default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Donald DUck</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>regrerg</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>TOM12</p>
                              </div>
                            </td>
                            <td>5 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_off.png")
                                    .default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Listing</td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Crushed He DUck</p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.00050</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>Dan</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>AMAMA</p>
                              </div>
                            </td>
                            <td>10 minutes left</td>
                            <td>1</td>
                            <td>
                              <img
                                src={
                                  require("../img/sub/icon_link_on.png").default
                                }
                                alt=""
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="ranktable_m">
                      <ul>
                        <li>
                          <div className="content">
                            <div className="name_left">
                              <div className="img">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="txt">
                                <h4>Listing</h4>
                                <p>Summer Pool</p>
                                <a >
                                  <span className="more">+ More</span>
                                  <span className="less">- Less</span>
                                </a>
                              </div>
                            </div>
                            <div className="num_right">
                              <div className="total">
                                <p>
                                  <img
                                    src={
                                      require("../img/sub/I_klaytn.svg").default
                                    }
                                    alt=""
                                  />
                                  0.005
                                </p>
                              </div>
                              <div className="time">
                                <p>1 minutes left</p>
                                <img
                                  src={
                                    require("../img/sub/icon_link_off.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="slide_s slide2">
                            <div className="etc">
                              <ul>
                                <li>
                                  <p>Quantity</p>
                                  <span>1</span>
                                </li>
                                <li>
                                  <p>From</p>
                                  <span>VOE837837837</span>
                                </li>
                                <li>
                                  <p>To</p>
                                  <span>TIDREDTIDRED</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="content">
                            <div className="name_left">
                              <div className="img">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="txt">
                                <h4>Listing</h4>
                                <p>Summer Pool</p>
                                <a >
                                  <span className="more">+ More</span>
                                  <span className="less">- Less</span>
                                </a>
                              </div>
                            </div>
                            <div className="num_right">
                              <div className="total">
                                <p>
                                  <img
                                    src={
                                      require("../img/sub/I_klaytn.svg").default
                                    }
                                    alt=""
                                  />
                                  0.005
                                </p>
                              </div>
                              <div className="time">
                                <p>1 minutes left</p>
                                <img
                                  src={
                                    require("../img/sub/icon_link_off.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="content">
                            <div className="name_left">
                              <div className="img">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="txt">
                                <h4>Listing</h4>
                                <p>Summer Pool</p>
                                <a >
                                  <span className="more">+ More</span>
                                  <span className="less">- Less</span>
                                </a>
                              </div>
                            </div>
                            <div className="num_right">
                              <div className="total">
                                <p>
                                  <img
                                    src={
                                      require("../img/sub/I_klaytn.svg").default
                                    }
                                    alt=""
                                  />
                                  0.005
                                </p>
                              </div>
                              <div className="time">
                                <p>1 minutes left</p>
                                <img
                                  src={
                                    require("../img/sub/icon_link_off.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="content">
                            <div className="name_left">
                              <div className="img">
                                <img
                                  src={
                                    require("../img/sub/hjcollection.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="txt">
                                <h4>Listing</h4>
                                <p>Summer Pool</p>
                                <a >
                                  <span className="more">+ More</span>
                                  <span className="less">- Less</span>
                                </a>
                              </div>
                            </div>
                            <div className="num_right">
                              <div className="total">
                                <p>
                                  <img
                                    src={
                                      require("../img/sub/I_klaytn.svg").default
                                    }
                                    alt=""
                                  />
                                  0.005
                                </p>
                              </div>
                              <div className="time">
                                <p>1 minutes left</p>
                                <img
                                  src={
                                    require("../img/sub/icon_link_off.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
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

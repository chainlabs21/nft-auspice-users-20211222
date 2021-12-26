import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";

import stone from "../img/sub/stone.png";
import rock from "../img/sub/rock.png";

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

function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();

  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  

  function editFilterList(category, cont) {
    let dataObj = filterObj;
    dataObj[category] = cont;

    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }

  function onclickFilterCancel(cont) {
    let dataObj = filterObj;

    for (var key in dataObj) {
      if (dataObj.hasOwnProperty(key) && dataObj[key] == cont) {
        delete dataObj[key];
      }
    }

    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }

  return (
    <SignPopupBox>
      <section id="sub">
        <article class="deal_box">
          <div class="move on deal">
            <div class="cw ucl">
              <span class="close close2">
                <img src={require("../img/sub/side_close.png").default} />
                <b class="mclose">
                  Filter<span>1</span>
                </b>
              </span>
              <div class="left_move">
                <form>
                  <div class="filter">
                    <h3 class="filt">Filter</h3>
                    <img
                      src={require("../img/sub/filter_close.png").default}
                      class="fc"
                    />
                  </div>
                  <div class="fold status">
                    <h3 class="slide_tt">
                      Event type
                      <img
                        src={require("../img/sub/slide_up.png").default}
                        class="slide_up"
                      />
                    </h3>

                    <div class="open status">
                      <ul>
                        {statusList.map((cont, index) => (
                          <li
                            key={index}
                            style={{ cursor: "pointer" }}
                            className={filterObj.eventType === cont && "on"}
                            onClick={() => editFilterList("eventType", cont)}
                          >
                            {cont}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div class="fold">
                    <h3 class="slide_tt">
                      Collections
                      <img
                        src={require("../img/sub/slide_up.png").default}
                        class="slide_up"
                      />
                    </h3>

                    <div class="open collection">
                      <input
                        type="text"
                        placeholder="Filter"
                        class="s_search"
                      />
                      <ul>
                        <li
                          class="collec_img"
                          style={{ backgroundImage: `url(${collect_img})` }}
                        >
                          <span>Collection 01</span>
                        </li>
                        <li
                          class="collec_img"
                          style={{ backgroundImage: `url(${collect_img2})` }}
                        >
                          <span>Collection 02</span>
                        </li>
                        <li
                          class="collec_img"
                          style={{ backgroundImage: `url(${collect_img3})` }}
                        >
                          <span>Collection 03</span>
                        </li>
                        <li
                          class="collec_img"
                          style={{ backgroundImage: `url(${collect_img4})` }}
                        >
                          <span>Collection 04</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="fold">
                    <h3 class="slide_tt">
                      Chains
                      <img
                        src={require("../img/sub/slide_up.png").default}
                        class="slide_up"
                      />
                    </h3>

                    <div class="open">
                      <ul>
                        {chainList.map((cont, index) => (
                          <li
                            key={index}
                            class="ra"
                            onClick={() => editFilterList("chain", cont.name)}
                          >
                            <span
                              className="chkBtn"
                              style={{
                                background:
                                  filterObj.chain === cont.name && "#000",
                              }}
                            >
                              <span />
                            </span>
                            <label for={cont.name}>
                              <img src={cont.img} />
                              {cont.name}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="right_move">
              <div class="pad">
                <div class="real_sec ex">
                  <div class="filter_list ex_d">
                    <div class="filter_left">
                      <div class="fl">
                        <a>
                          <span>Filter reset</span>
                        </a>
                      </div>
                      {filterList.map((cont, index) => (
                        <div class="select_f" key={index}>
                          <p>{cont}</p>
                          <a onClick={() => onclickFilterCancel(cont)}>
                            <img
                              src={require("../img/sub/close_24.png").default}
                              alt=""
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                    <div class="filter_right">
                      <div class="fr">
                        <a>
                          <img
                            src={require("../img/sub/exchange.png").default}
                            alt=""
                          />
                          <span>transactional information</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="filter_list2">
                    <div class="f_left">
                      <div class="slide2">
                        <div class="swiper mySwiper3">
                          <ul class="swiper-wrapper">
                            <li class="swiper-slide">
                              <div class="fl">
                                <a>
                                  <span>Filter reset</span>
                                </a>
                              </div>
                            </li>
                            <li class="swiper-slide">
                              <div class="select_f">
                                <p>Sale</p>
                                <a>
                                  <img
                                    src={
                                      require("../img/sub/close_24.png").default
                                    }
                                    alt=""
                                  />
                                </a>
                              </div>
                            </li>
                            <li class="swiper-slide">
                              <div class="select_f">
                                <p>Sale</p>
                                <a>
                                  <img
                                    src={
                                      require("../img/sub/close_24.png").default
                                    }
                                    alt=""
                                  />
                                </a>
                              </div>
                            </li>
                            <li class="swiper-slide">
                              <div class="select_f">
                                <p>Sale</p>
                                <a>
                                  <img
                                    src={
                                      require("../img/sub/close_24.png").default
                                    }
                                    alt=""
                                  />
                                </a>
                              </div>
                            </li>
                            <li class="swiper-slide">
                              <div class="select_f">
                                <p>Sale</p>
                                <a>
                                  <img
                                    src={
                                      require("../img/sub/close_24.png").default
                                    }
                                    alt=""
                                  />
                                </a>
                              </div>
                            </li>
                            <li class="swiper-slide">
                              <div class="select_f">
                                <p>Sale</p>
                                <a>
                                  <img
                                    src={
                                      require("../img/sub/close_24.png").default
                                    }
                                    alt=""
                                  />
                                </a>
                              </div>
                            </li>
                            <li class="swiper-slide">
                              <div class="select_f">
                                <p>Sale</p>
                                <a>
                                  <img
                                    src={
                                      require("../img/sub/close_24.png").default
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
                    <div class="f_right">
                      <div class="fr">
                        <a>
                          <img
                            src={require("../img/sub/exchange.png").default}
                            alt=""
                          />
                          <span>transactional information</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="ranktable_pc">
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
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Summer Pool</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>VOE837548548548548</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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
                                require("../img/sub/icon_link_off.png").default
                              }
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Donald DUck</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>regrerg</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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
                                require("../img/sub/icon_link_off.png").default
                              }
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Crushed He DUck</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Dan</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Summer Pool</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>VOE837548548</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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
                                require("../img/sub/icon_link_off.png").default
                              }
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Donald DUck</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>regrerg</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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
                                require("../img/sub/icon_link_off.png").default
                              }
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Crushed He DUck</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Dan</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Summer Pool</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>VOE837548548</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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
                                require("../img/sub/icon_link_off.png").default
                              }
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Donald DUck</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>regrerg</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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
                                require("../img/sub/icon_link_off.png").default
                              }
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sale</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Crushed He DUck</p>
                            </div>
                          </td>
                          <td>
                            <div class="name price">
                              <img
                                src={require("../img/sub/eth_icon.png").default}
                                alt=""
                              />
                              <p>0.00050</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Dan</p>
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
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

                  <div class="ranktable_m">
                    <ul>
                      <li>
                        <div class="content">
                          <div class="name_left">
                            <div class="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div class="txt">
                              <h4>Sale</h4>
                              <p>Summer Pool</p>
                              <a>
                                <span class="more">+ More</span>
                                <span class="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div class="num_right">
                            <div class="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/eth_icon.png").default
                                  }
                                  alt=""
                                />
                                0.005
                              </p>
                            </div>
                            <div class="time">
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
                        <div class="slide_s slide2">
                          <div class="etc">
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
                        <div class="content">
                          <div class="name_left">
                            <div class="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div class="txt">
                              <h4>Sale</h4>
                              <p>Summer Pool</p>
                              <a>
                                <span class="more">+ More</span>
                                <span class="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div class="num_right">
                            <div class="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/eth_icon.png").default
                                  }
                                  alt=""
                                />
                                0.005
                              </p>
                            </div>
                            <div class="time">
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
                        <div class="content">
                          <div class="name_left">
                            <div class="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div class="txt">
                              <h4>Sale</h4>
                              <p>Summer Pool</p>
                              <a>
                                <span class="more">+ More</span>
                                <span class="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div class="num_right">
                            <div class="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/eth_icon.png").default
                                  }
                                  alt=""
                                />
                                0.005
                              </p>
                            </div>
                            <div class="time">
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
                        <div class="content">
                          <div class="name_left">
                            <div class="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div class="txt">
                              <h4>Sale</h4>
                              <p>Summer Pool</p>
                              <a>
                                <span class="more">+ More</span>
                                <span class="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div class="num_right">
                            <div class="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/eth_icon.png").default
                                  }
                                  alt=""
                                />
                                0.005
                              </p>
                            </div>
                            <div class="time">
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

const statusList = ["Buy Now", "On Auction", "New", "Has Offers"];

const chainList = [
  {
    img: stone,
    name: "Ethereum",
  },
  {
    img: rock,
    name: "Klaytn",
  },
];
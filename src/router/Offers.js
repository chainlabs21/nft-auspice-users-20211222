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
import { useRef, useState } from "react";

function Offers({ store, setConnect }) {
  const navigate = useNavigate();

  const [toggleFilter, setToggleFilter] = useState(false);
  const [offerCategory, setOfferCategory] = useState(0);
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);

  function editFilterList(category, cont) {
    let dataObj = filterObj;
    dataObj[category] = cont;

    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }

  function onclickFilterReset() {
    setFilterObj({});
    setFilterList([]);
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
        <article class="profile_home deal_box">
          <div class="collection_home">
            <img src={require("../img/sub/home_bg.png").default} />

            <div class="wrap">
              <div class="collection_detail">
                <div class="pro_img">
                  <img src={require("../img/sub/home_profile.png").default} />
                  <div class="home_icons">
                    <a>
                      <img src={require("../img/sub/re.png").default} />
                    </a>
                    <a>
                      <img src={require("../img/sub/share.png").default} />
                    </a>
                  </div>
                </div>
                <h2 class="notop">Henry junior's Collection</h2>
                <h3>0x97bc...8cad2</h3>
                <h4>
                  Henry is a mixed-media artist living in the Bay Area and uses
                  <br /> a stream of consciousness approach to his work.
                </h4>
              </div>
            </div>

            <div class={toggleFilter ? "move on deal" : "move off deal"}>
              <div class="cw ucl">
                <span class="close" onClick={() => setToggleFilter(true)}>
                  <img src={require("../img/sub/side_close.png").default} />
                  <b class="mclose">
                    Filter<span>1</span>
                  </b>
                </span>
                <div class="left_move">
                  <form>
                    <div class="filter">
                      <h3 class="filt">
                        <img
                          src={require("../img/sub/filter_icon.png").default}
                        />
                        Filter
                      </h3>
                      <img
                        src={require("../img/sub/filter_close.png").default}
                        class="fc"
                        onClick={() => setToggleFilter(false)}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div class="fold status">
                      <h3 class="slide_tt">
                        Status
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
                              className={filterObj[cont] === cont && "on"}
                              onClick={() => editFilterList(cont, cont)}
                            >
                              {cont}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div class="fold">
                      <h3 class="slide_tt">
                        Price
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          class="slide_up"
                        />
                      </h3>

                      <div class="open">
                        <select>
                          <option disabled selected hidden>
                            United States Dollars (USD)
                          </option>
                          <option>100</option>
                        </select>
                        <div class="price_area">
                          <div class="price_wrap">
                            <input type="text" placeholder="0.00" />
                            <span class="usd">USD</span>
                          </div>
                          <div class="price_wrap">
                            <input type="text" placeholder="0.00" />
                            <span class="usd">USD</span>
                          </div>
                        </div>
                        <a class="slide_btn">Apply</a>
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
                            style={{
                              backgroundImage: `url(${collect_img})`,
                            }}
                          >
                            <span>Collection 01</span>
                          </li>
                          <li
                            class="collec_img"
                            style={{
                              backgroundImage: `url(${collect_img2})`,
                            }}
                          >
                            <span>Collection 02</span>
                          </li>
                          <li
                            class="collec_img"
                            style={{
                              backgroundImage: `url(${collect_img3})`,
                            }}
                          >
                            <span>Collection 03</span>
                          </li>
                          <li
                            class="collec_img"
                            style={{
                              backgroundImage: `url(${collect_img4})`,
                            }}
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
                        <ul className="selectList">
                          {chainList.map((cont, index) => (
                            <li
                              key={index}
                              class="ra"
                              onClick={() => editFilterList("chain", cont.name)}
                              style={{ cursor: "pointer" }}
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

                    <div class="fold">
                      <h3 class="slide_tt">
                        Sales Coin
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          class="slide_up"
                        />
                      </h3>

                      <div class="open">
                        <input
                          type="text"
                          placeholder="Filter"
                          class="s_search"
                        />
                        <ul className="selectList">
                          {coinList.map((cont, index) => (
                            <li
                              key={index}
                              class="ra"
                              onClick={() => editFilterList("coin", cont)}
                            >
                              <span
                                className="chkBtn"
                                style={{
                                  background: filterObj.coin === cont && "#000",
                                }}
                              >
                                <span />
                              </span>
                              <label for={cont}>{cont}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="right_move">
                <div class="real_sec">
                  <ul class="tab tabb">
                    <li onClick={() => navigate("/myprof")}>Search Wallet</li>
                    <li onClick={() => navigate("/transactionhistory")}>
                      Transaction history
                    </li>
                    <li class="onn">Offers</li>
                    <li onClick={() => navigate("/liked")}>Liked</li>
                    <li onClick={() => navigate("/hiddenitem")}>Hidden item</li>
                    <li onClick={() => navigate("/referals")}>Referals</li>
                  </ul>
                  <div class="pad">
                    <div class="etc">
                      <ul>
                        {offerCategoryList.map((cont, index) => (
                          <li
                            key={index}
                            className={offerCategory === index && "onnn"}
                            onClick={() => setOfferCategory(index)}
                          >
                            {cont}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div class="filter_list">
                      <div class="filter_left">
                        <div class="fl">
                          <a onClick={onclickFilterReset}>
                            <span>Filter reset</span>
                          </a>
                        </div>
                        {filterList.map((cont, index) => (
                          <div key={index} class="select_f">
                            <p>{cont}</p>
                            <a>
                              <img
                                src={require("../img/sub/close_24.png").default}
                                alt=""
                                onClick={() => onclickFilterCancel(cont)}
                              />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div class="ranktable_pc p_th">
                      <table>
                        <colgroup>
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Seller</th>
                            <th>Expiration</th>
                            <th>State</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>3</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>1</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>2</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>3</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>1</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>2</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>1</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>1</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>1</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>
                              <div class="name">
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
                              <div class="name price">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>
                                  0.010 KLAY <span>($30.11)</span>
                                </p>
                              </div>
                            </td>
                            <td>1</td>
                            <td>
                              <div class="name">
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
                            <td>3 days later</td>
                            <td>-</td>
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
                                    require("../img/sub/hjcollection.png")
                                      .default
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
                                      require("../img/sub/I_klaytn.svg").default
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
                                    require("../img/sub/hjcollection.png")
                                      .default
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
                                      require("../img/sub/I_klaytn.svg").default
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
                                    require("../img/sub/hjcollection.png")
                                      .default
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
                                      require("../img/sub/I_klaytn.svg").default
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
                                    require("../img/sub/hjcollection.png")
                                      .default
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
                                      require("../img/sub/I_klaytn.svg").default
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

export default connect(mapStateToProps, mapDispatchToProps)(Offers);

const statusList = ["Buy Now", "On Auction", "New", "Has Offers"];

const bundleFilterList = ["Single Item", "All", "Bundle sales"];

const categoryList = [
  "All",
  "Art",
  "Music",
  "Virtual World",
  "Trading Cards",
  "Collectibles",
  "Sports",
  "Utility",
  "ETC",
];

const sortList = [
  "Latest",
  "popularity",
  "Close to finish",
  "Low price",
  "high price",
  "A small bid",
  "A lot of bids",
  "Most seen",
  "oldest",
];

const chainList = [
  {
    img: rock,
    name: "Klaytn",
  },
];

const coinList = ["Klay"];

const offerCategoryList = ["Participation in auction", "Bid proposal"];

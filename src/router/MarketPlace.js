import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import s5 from "../img/sub/s5.png";
import sample from "../img/sub/sample.png";
import stone from "../img/sub/stone.png";
import rock from "../img/sub/rock.png";
import I_x from "../img/main/I_x.svg";

import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useState } from "react";

function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();
  const param = useParams();

  const [toggleFilter, setToggleFilter] = useState(false);
  const [bundleFilter, setBundleFilter] = useState(bundleFilterList[0]);
  const [categoryFilter, setCategoryFilter] = useState(param.category);
  const [sortFilter, setSortFilter] = useState(sortList[0]);
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
        <article class="profile_home">
          <div class={toggleFilter ? "move on deal" : "move off"}>
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
                    <img src={require("../img/sub/filter_icon.png").default} />
                    Filter
                  </h3>
                  <img
                    src={require("../img/sub/filter_close.png").default}
                    class="fc"
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
                    Items
                    <img
                      src={require("../img/sub/slide_up.png").default}
                      class="slide_up"
                    />
                  </h3>

                  <div class="open collection">
                    <input type="text" placeholder="Filter" class="s_search" />
                    <ul>
                      <li
                        class="collec_img"
                        style={{ backgroundImage: `url(${collect_img})` }}
                      >
                        <span>Item 01</span>
                      </li>
                      <li
                        class="collec_img"
                        style={{ backgroundImage: `url(${collect_img2})` }}
                      >
                        <span>Item 02</span>
                      </li>
                      <li
                        class="collec_img"
                        style={{ backgroundImage: `url(${collect_img3})` }}
                      >
                        <span>Item 03</span>
                      </li>
                      <li
                        class="collec_img"
                        style={{ backgroundImage: `url(${collect_img4})` }}
                      >
                        <span>Item 04</span>
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

                <div class="fold">
                  <h3 class="slide_tt">
                    Sales Coin
                    <img
                      src={require("../img/sub/slide_up.png").default}
                      class="slide_up"
                    />
                  </h3>

                  <div class="open">
                    <input type="text" placeholder="Filter" class="s_search" />
                    <ul>
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

            <div class="right_move">
              <div class="pad">
                <div class="real_sec">
                  <div class="slide_s slide2 mpo">
                    <div class="fl mtop">
                      <p class="total">Total 3,880,032</p>
                    </div>
                    <div class="fr">
                      <div class="select">
                        <div>{bundleFilter}</div>

                        <ul>
                          {bundleFilterList.map((cont, index) => (
                            <li
                              key={index}
                              onClick={() => setBundleFilter(cont)}
                            >
                              <a>{cont}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div class="select metc">
                        <div>{categoryFilter}</div>
                        <ul>
                          {categoryList.map((cont, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                navigate(`/marketplace/${cont}`);
                                setCategoryFilter(cont);
                              }}
                            >
                              <a>{cont}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div class="select mselect">
                        <div>{sortFilter}</div>
                        <ul>
                          {sortList.map((cont, index) => (
                            <li key={index} onClick={() => setSortFilter(cont)}>
                              <a>{cont}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="etc">
                    <ul>
                      {categoryList.map((cont, index) => (
                        <li
                          key={index}
                          className={
                            categoryFilter.toLowerCase() ===
                              cont.toLowerCase() && "onnn"
                          }
                          onClick={() => {
                            navigate(`/marketplace/${cont}`);
                            setCategoryFilter(cont);
                          }}
                        >
                          {cont}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div class="se_fi">
                    <p class="total">Selected Filter</p>
                    <ul>
                      <li class="sef" onClick={onclickFilterReset}>
                        Filter reset
                      </li>

                      {filterList.map((cont, index) => (
                        <li key={index}>
                          {cont}
                          <img
                            src={I_x}
                            alt=""
                            onClick={() => onclickFilterCancel(cont)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div class="move_item">
                    <div class="swiper-container">
                      <ol class="item move_li summary summary2">
                        <li onClick={() => navigate("/singleitem")}>
                          <a style={{ backgroundImage: `url(${s5})` }}>
                            <div class="on">
                              <ul>
                                <li class="heart off">1,389</li>
                                <li class="star off"></li>
                              </ul>
                              <div>Summer Pool</div>
                              <span>David</span>
                              <ol>
                                <li>6 minutes left</li>
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                        <li onClick={() => navigate("/singleitem")}>
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
                                <li>1.67 KLAY</li>
                              </ol>
                            </div>
                          </a>
                        </li>
                      </ol>
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

const SignPopupBox = styled.div`
  #sub {
    .profile_home {
      .move {
        .right_move {
          .pad {
            .real_sec {
              .slide_s {
                .mtop {
                  position: relative;
                }
              }
            }
          }
        }
      }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);

const statusList = ["Buy Now", "On Auction", "New", "Has Offers"];

const bundleFilterList = ["Single Item", "All", "Bundle sales"];

const categoryList = [
  "All",
  "Collectibles",
  "Digital Art",
  "Trading Cards",
  "Music",
  "Virtual Worlds",
  "Sports",
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

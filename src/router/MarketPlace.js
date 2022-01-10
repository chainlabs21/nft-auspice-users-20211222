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
    <MarketPlaceBox>
      <section id="sub">
        <article class="profile_home">
          <div class={toggleFilter ? "move on deal" : "move off"}>
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
                        <li class="on">Buy Now</li>
                        <li>On Auction</li>
                        <li>New</li>
                        <li>Has Offers</li>
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
                      <a href="" class="slide_btn">
                        Apply
                      </a>
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
                      <ul>
                        <li class="ra">
                          <input type="radio" id="rad" name="rad" />
                          <label for="rad">
                            <img
                              src={require("../img/sub/stone.png").default}
                            />
                            Ethereum
                          </label>
                        </li>
                        <li class="ra">
                          <input type="radio" id="rad2" name="rad" />
                          <label for="rad2">
                            <img src={require("../img/sub/rock.png").default} />
                            Klaytn
                          </label>
                        </li>
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
                      <ul>
                        <li class="ra">
                          <input type="radio" id="rad3" name="rad2" />
                          <label for="rad3">AUSP</label>
                        </li>
                        <li class="ra">
                          <input type="radio" id="rad4" name="rad2" />
                          <label for="rad4">WETH</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="right_move">
              <div class="pad">
                <div class="real_sec">
                  <div class="slide_s slide2">
                    <div class="fl">
                      <p class="total">Total 3,880,032</p>
                    </div>
                    <div class="fr">
                      <div class="select">
                        <div>Single item</div>
                        <ul>
                          <li>
                            <a href="">Single item</a>
                          </li>
                          <li>
                            <a href="">All</a>
                          </li>
                          <li>
                            <a href="">Bundle sales</a>
                          </li>
                        </ul>
                      </div>
                      <div class="select metc">
                        <div>All category</div>
                        <ul>
                          <li>
                            <a href="">All category</a>
                          </li>
                          <li>
                            <a href="">All</a>
                          </li>
                          <li>
                            <a href="">Art</a>
                          </li>
                          <li>
                            <a href="">Music</a>
                          </li>
                          <li>
                            <a href="">Virtual World</a>
                          </li>
                          <li>
                            <a href="">Trading Cards</a>
                          </li>
                          <li>
                            <a href="">Collectibles</a>
                          </li>
                          <li>
                            <a href="">Sports</a>
                          </li>
                          <li>
                            <a href="">Utility</a>
                          </li>
                          <li>
                            <a href="">ETC</a>
                          </li>
                        </ul>
                      </div>
                      <div class="select mselect">
                        <div>Latest</div>
                        <ul>
                          <li>
                            <a href="">Latest</a>
                          </li>
                          <li>
                            <a href="">Popularity</a>
                          </li>
                          <li>
                            <a href="">Close to finish</a>
                          </li>
                          <li>
                            <a href="">Low price</a>
                          </li>
                          <li>
                            <a href="">high price</a>
                          </li>
                          <li>
                            <a href="">A small bid</a>
                          </li>
                          <li>
                            <a href="">A lot of bids</a>
                          </li>
                          <li>
                            <a href="">Most seen</a>
                          </li>
                          <li>
                            <a href="">Oldest</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="etc">
                    <ul>
                      <li class="onnn">All</li>
                      <li>Art</li>
                      <li>Music</li>
                      <li>Virtual World</li>
                      <li>Trading Cards</li>
                      <li>Collectibles</li>
                      <li>Sports</li>
                      <li>Utility</li>
                      <li>ETC</li>
                    </ul>
                  </div>

                  <div class="se_fi">
                    <p class="total">Selected Filter</p>
                    <ul>
                      <li class="sef">Filter reset</li>
                      <li>AUSP</li>
                      <li>ETH</li>
                      <li>Ethereum</li>
                    </ul>
                  </div>

                  <div class="move_item">
                    <div class="swiper-container">
                      <ol class="item move_li summary summary2">
                        <div>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${s5})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                          <span>
                            <li>
                              <a
                                href="#"
                                style={{
                                  backgroundImage: `url(${sample})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              >
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
                                </div>
                              </a>
                            </li>
                          </span>
                        </div>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </MarketPlaceBox>
  );
}

const MarketPlaceBox = styled.div`
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

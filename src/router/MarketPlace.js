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
import { useState, useEffect } from "react";
import { generateItems } from "../mokups/items";
import moment from "moment";

function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [fromPrice, setFromPrice] = useState(0.0);
  const [toPrice, setToPrice] = useState(0.0);
  const [priceFilterToggle, setPriceFilterToggle] = useState(false);
  const [callEffect, setCallEffect] = useState(false);
  const [totalItem, setTotalItem] = useState(0);

  const handleCateFilter = (category) => {
    setCategoryFilter(category);
  };

  useEffect(() => {
    const temp = [...itemList];
    // categorFilter
    const categoryFiltered = temp.filter((v) => {
      if (categoryFilter === "All") {
        return true;
      }
      let toggle = false;
      v.categorystr.forEach((cate) => {
        if (cate === categoryFilter) {
          toggle = true;
        } else {
          toggle = false;
        }
      });
      return toggle;
    });
    // statusFilter
    let statusFiltered = [...categoryFiltered];
    let statusToggle = false;
    filterList.forEach((filter) => {
      const index = statusList.findIndex((status) => {
        return filter === status;
      });
      if (index !== -1) {
        statusToggle = true;
      }
    });

    if (statusToggle) {
      statusFiltered = categoryFiltered.filter((data) => {
        const statusToStringArr = [];
        data.status.forEach((stat) => {
          statusToStringArr.push(statusList[stat]);
        });
        const temp = filterList.filter((filter) =>
          statusToStringArr.includes(filter)
        );
        if (temp.length === filterList.length) {
          return true;
        } else {
          return false;
        }
      });
    }
    //priceFilter
    let priceFiltered = [...statusFiltered];
    if (priceFilterToggle) {
      priceFiltered = statusFiltered.filter((v) => {
        if (v.priceusd >= fromPrice && v.priceusd <= toPrice) {
          return true;
        }
        return false;
      });
    }
    setFilteredList(priceFiltered);
  }, [categoryFilter, itemList, filterList, callEffect]);

  const editFilterList = (category, cont) => {
    let dataObj = filterObj;
    dataObj[category] = cont;
    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  };

  const onclickFilterReset = () => {
    setFilterObj({});
    setFilterList([]);
    setPriceFilterToggle(false);
    setFromPrice(0);
    setToPrice(0);
  };

  const onclickFilterCancel = (cont) => {
    let dataObj = filterObj;

    for (let key in dataObj) {
      if (dataObj.hasOwnProperty(key) && dataObj[key] === cont) {
        delete dataObj[key];
      }
    }
    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  };

  useEffect(() => {
    const originItemList = generateItems(60);
    setItemList(originItemList);
    setFilteredList(originItemList);
    setTotalItem(originItemList.length);
    if (location?.state) {
      setCategoryFilter(location.state);
    }
  }, [location.state]);

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
                          <input
                            type="text"
                            value={fromPrice}
                            onChange={(e) => {
                              setFromPrice(e.target.value);
                            }}
                          />
                          <span class="usd">USD</span>
                        </div>
                        <div class="price_wrap">
                          <input
                            type="text"
                            value={toPrice}
                            onChange={(e) => {
                              setToPrice(e.target.value);
                            }}
                          />
                          <span class="usd">USD</span>
                        </div>
                      </div>
                      <a
                        class="slide_btn"
                        onClick={() => {
                          setPriceFilterToggle(true);
                          setCallEffect(!callEffect);
                        }}
                      >
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
              <div class="pad">
                <div class="real_sec">
                  <div class="slide_s slide2">
                    <div class="fl">
                      <p class="total">
                        Total {totalItem.toLocaleString("eu", "US")}
                      </p>
                    </div>
                    <div class="fr">
                      <div class="select">
                        <div>Single item</div>
                        <ul>
                          <li>
                            <a>Single item</a>
                          </li>
                          <li>
                            <a>All</a>
                          </li>
                          <li>
                            <a>Bundle sales</a>
                          </li>
                        </ul>
                      </div>
                      <div class="select metc">
                        <div>{categoryFilter ? categoryFilter : "All"}</div>
                        <ul>
                          <li
                            onClick={() => {
                              handleCateFilter("All");
                            }}
                          >
                            <a>All</a>
                          </li>
                          <li
                            onClick={() => {
                              handleCateFilter("Art");
                            }}
                          >
                            <a>Art</a>
                          </li>
                          <li
                            onClick={() => {
                              handleCateFilter("Music");
                            }}
                          >
                            <a>Music</a>
                          </li>
                          <li
                            onClick={() => {
                              handleCateFilter("Virtual World");
                            }}
                          >
                            <a>Virtual World</a>
                          </li>
                          <li
                            onClick={() => {
                              handleCateFilter("Trading Cards");
                            }}
                          >
                            <a>Trading Cards</a>
                          </li>
                          <li
                            onClick={() => {
                              handleCateFilter("Collectibles");
                            }}
                          >
                            <a>Collectibles</a>
                          </li>
                          <li
                            onClick={() => {
                              handleCateFilter("Sports");
                            }}
                          >
                            <a>Sports</a>
                          </li>
                          <li
                            onClick={() => {
                              handleCateFilter("Utility");
                            }}
                          >
                            <a>Utility</a>
                          </li>
                          <li
                            onClick={() => {
                              handleCateFilter("ETC");
                            }}
                          >
                            <a>ETC</a>
                          </li>
                        </ul>
                      </div>
                      <div class="select mselect">
                        <div>Latest</div>
                        <ul>
                          <li>
                            <a>Latest</a>
                          </li>
                          <li>
                            <a>Popularity</a>
                          </li>
                          <li>
                            <a>Close to finish</a>
                          </li>
                          <li>
                            <a>Low price</a>
                          </li>
                          <li>
                            <a>high price</a>
                          </li>
                          <li>
                            <a>A small bid</a>
                          </li>
                          <li>
                            <a>A lot of bids</a>
                          </li>
                          <li>
                            <a>Most seen</a>
                          </li>
                          <li>
                            <a>Oldest</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="etc">
                    <ul className="cartegoryList">
                      <li
                        class={
                          (!categoryFilter || categoryFilter === "All") &&
                          "onnn"
                        }
                        onClick={() => handleCateFilter("All")}
                      >
                        All
                      </li>

                      {categoryList.map((cont, index) => (
                        <li
                          class={categoryFilter === cont && "onnn"}
                          key={index}
                          onClick={() => handleCateFilter(cont)}
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
                        <li
                          key={index}
                          onClick={() => onclickFilterCancel(cont)}
                        >
                          {cont}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div class="move_item">
                    <div class="swiper-container">
                      <ol class="item move_li summary summary2">
                        <div>
                          {filteredList.map((v, i) => {
                            return (
                              <span>
                                <li>
                                  <a
                                    onClick={() => navigate("/singleitem")}
                                    style={{
                                      //backgroundImage: `url(${v.imgsrc})`,
                                      backgroundImage: `url(${s5})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "center",
                                      backgroundSize: "cover",
                                    }}
                                  >
                                    <div class="on">
                                      <ul>
                                        <li class="heart off">
                                          {v.countfavors.toLocaleString(
                                            "eu",
                                            "US"
                                          )}
                                        </li>
                                        <li class="star off"></li>
                                      </ul>
                                      <div>{v.itemid}</div>
                                      <span>{v.owner}</span>
                                      <ol>
                                        <li>{moment(v.createdat).toNow()}</li>
                                        <li>{v.tokenprice} KLAY</li>
                                      </ol>
                                    </div>
                                  </a>
                                </li>
                              </span>
                            );
                          })}
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
  .cartegoryList {
    display: flex;
    flex-wrap: wrap;
    li {
      white-space: nowrap;
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

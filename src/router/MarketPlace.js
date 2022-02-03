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
import rstone from "../img/sub/rstone.png";
import rock from "../img/sub/rock.png";
import I_x from "../img/main/I_x.svg";
import filter_icon from "../img/sub/filter_icon.png";
import I_dnArrow from "../img/icons/I_dnArrow.svg";
import loupe from "../img/sub/loupe.png";

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
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [priceFilterToggle, setPriceFilterToggle] = useState(false);
  const [callEffect, setCallEffect] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [unit, setUnit] = useState("USD");
  const [pricePopup, setPricePopup] = useState(false);

  const handleCateFilter = (category) => {
    setCategoryFilter(category);
  };

  function getSelectText() {
    switch (unit) {
      case "USD":
        return "United States Dollars (USD)";
      case "KLAY":
        return "Klaytn";
      default:
        break;
    }
  }

  function onClickOption(data) {
    setUnit(data);
    setPriceFilterToggle(false);
    setFromPrice(0.0);
    setToPrice(0.0);
    setCallEffect(!callEffect);
    setPricePopup(false);
  }

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
        if (unit === "USD") {
          if (v.priceusd >= fromPrice && v.priceusd <= toPrice) {
            return true;
          }
          return false;
        } else if (unit === "KLAY") {
          if (v.tokenprice >= fromPrice && v.tokenprice <= toPrice) {
            return true;
          }
          return false;
        }
      });
    }

    //chainsFilter
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
  useEffect(() => {
    const asyncGetItem = async () => {
      try {
        //const resp = axios.get()
      } catch (error) {}
    };
  });

  return (
    <MarketPlaceBox>
      <section id="sub">
        <article class="profile_home">
          <div class={toggleFilter ? "move on deal" : "move off"}>
            <div class="cw ucl">
              <span class="close" onClick={() => setToggleFilter(true)}>
                <img src={require("../img/sub/side_close.png").default} />
                <b class="mclose" onClick={() => setToggleFilter(true)}>
                  Filter<span>1</span>
                </b>
              </span>
              <div class="left_move">
                <form className="filterBox">
                  <div class="topBar">
                    <span className="leftBox">
                      <img src={filter_icon} alt="" />
                      <p>Filter</p>
                    </span>
                    <img
                      src={require("../img/sub/filter_close.png").default}
                      class="fc"
                      onClick={() => setToggleFilter(false)}
                    />
                  </div>

                  <details class="filterDetails">
                    <summary class="filterSummary">
                      <p className="filterTitle">Status</p>

                      <img src={I_dnArrow} class="slide_up" />
                    </summary>

                    <ul className="filterContList typeList">
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
                  </details>

                  <details class="filterDetails">
                    <summary class="filterSummary">
                      <p className="filterTitle">Price</p>

                      <img src={I_dnArrow} class="slide_up" />
                    </summary>
                    <div class="filterContList priceBox">
                      <div className="settingBox">
                        <div className="selectPosBox">
                          <div
                            className="selectBox"
                            onClick={() => setPricePopup(true)}
                          >
                            <p>{getSelectText()}</p>

                            <img src={I_dnArrow} alt="" />
                          </div>

                          {pricePopup && (
                            <ul className="optionList" onClick={onClickOption}>
                              {optionList.map((cont, index) => (
                                <li
                                  key={index}
                                  onClick={() => setUnit(cont.value)}
                                >
                                  {cont.text}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div class="priceAreaBox">
                          <div className="priceInputBox minBox">
                            <input
                              type="text"
                              value={fromPrice}
                              onChange={(e) => setFromPrice(e.target.value)}
                              placeholder="0.00"
                            />
                            <p className="unit">{unit}</p>
                          </div>

                          <p>~</p>

                          <div class="priceInputBox maxBox">
                            <input
                              type="text"
                              value={toPrice}
                              onChange={(e) => setToPrice(e.target.value)}
                              placeholder="0.00"
                            />
                            <p className="unit">{unit}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        class="applyBtn"
                        onClick={() => {
                          setPriceFilterToggle(true);
                          setCallEffect(!callEffect);
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </details>

                  <details class="filterDetails">
                    <summary class="filterSummary">
                      <p className="filterTitle">Items</p>

                      <img src={I_dnArrow} class="slide_up" />
                    </summary>

                    <div class="filterContList searchListBox">
                      <div className="inputBox">
                        <img src={loupe} alt="" />
                        <input
                          type="text"
                          placeholder="Filter"
                          class="s_search"
                        />
                      </div>

                      <ul className="searchList">
                        {filterSearchData.map((cont, index) => (
                          <li key={index}>
                            <img src={cont.img} alt="" />
                            <p>{cont.name}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>

                  <details class="filterDetails">
                    <summary class="filterSummary">
                      <p className="filterTitle">Chains</p>

                      <img src={I_dnArrow} class="slide_up" />
                    </summary>

                    <ul className="filterContList chainList">
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

                          <div className="name">
                            <img src={cont.img} />
                            {cont.name}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <details class="filterDetails">
                    <summary class="filterSummary">
                      <p className="filterTitle">Sales Coin</p>

                      <img src={I_dnArrow} class="slide_up" />
                    </summary>

                    <div class="filterContList searchListBox">
                      <div className="inputBox">
                        <img src={loupe} alt="" />
                        <input
                          type="text"
                          placeholder="Filter"
                          class="s_search"
                        />
                      </div>

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
                  </details>
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

const filterSearchData = [
  {
    img: collect_img,
    name: "Items 01",
  },
  {
    img: collect_img2,
    name: "Items 02",
  },
  {
    img: collect_img3,
    name: "Items 03",
  },
  {
    img: collect_img4,
    name: "Items 04",
  },
  {
    img: collect_img,
    name: "Items 01",
  },
  {
    img: collect_img2,
    name: "Items 02",
  },
  {
    img: collect_img3,
    name: "Items 03",
  },
  {
    img: collect_img4,
    name: "Items 04",
  },
];

const optionList = [
  {
    value: "KLAY",
    text: "Klaytn",
  },
  {
    value: "USD",
    text: "United States Dollars (USD)",
  },
];

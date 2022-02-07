import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";

import rock from "../img/sub/rock.png";
import filter_icon from "../img/sub/filter_icon.png";
import I_dnArrow from "../img/icons/I_dnArrow.svg";
import loupe from "../img/sub/loupe.png";
import heart_off from "../img/sub/heart_off.png";
import heart_on from "../img/sub/heart_on.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useState, useEffect, useLayoutEffect } from "react";
import moment from "moment";
import { API } from "../config/api";
import { putCommaAtPrice } from "../util/Util";
import { applytoken } from "../util/rest";
import { LOGGER } from "../util/common";
import { PAYMEANS_DEF } from "../config/configs";
function MarketPlace() {
  const navigate = useNavigate();
  const params = useParams();

  let loadingBusy = false;
  let itemIndex = 0;
  let itemList = [];

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [callEffect, setCallEffect] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [unit, setUnit] = useState("USD");
  const [pricePopup, setPricePopup] = useState(false);
  const [searchKey, setSearchKey] = useState(params.searchKey);

  let axios = applytoken();
  const handleCateFilter = (category) => {
    editFilterList("category", category);
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

  function onClickOption() {
    setFromPrice("");
    setToPrice("");
    setCallEffect(!callEffect);
    setPricePopup(false);
  }

  const editFilterList = (category, cont) => {
    let dataObj = filterObj;
    dataObj[category] = cont;
    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  };

  const onclickFilterReset = () => {
    setFilterObj({});
    setFilterList([]);
    setFromPrice("");
    setToPrice("");
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

  function windowScrollHander() {
    if (
      window.scrollY + window.innerHeight > document.body.clientHeight - 200 &&
      !loadingBusy
    ) {
      loadingBusy = true;
      itemIndex += 10;
      getItem(itemIndex);
    }
  }

  function getItem(itemIndex = 0) {
    const filterKeys = Object.keys(filterObj);

    // statusFilter
    let selectedStatus = 0;

    filterKeys.map((e) => {
      if (e.indexOf("status") !== -1) selectedStatus += e.slice(6) * 1;
    });

    axios
      .get(`${API.API_MERCHANDISES_LIST}/${itemIndex}/${10}`, {
        params: {
          categorystr: filterObj.category,
          salestatus: selectedStatus,
          pricemin: fromPrice,
          pricemax: toPrice,
          searchKey,
        },
      })
      .then((resp) => {
        LOGGER("wgNCeNKxXL", resp.data);
        let { status, list, payload } = resp.data;
        if (status == "OK") {
          itemList = [...itemList, ...list];
          setFilteredList([...itemList]);
          setTotalItem(payload.count);
          loadingBusy = false;
        }
      });
  }

  useLayoutEffect(() => {
    window.addEventListener("scroll", windowScrollHander);
  }, []);

  useLayoutEffect(() => {
    setSearchKey(params.searchKey);
    if (searchKey) editFilterList("searchKey", params.searchKey);
  }, [params]);

  useEffect(() => {
    getItem();
  }, [categoryFilter, filterList, callEffect]);

  return (
    <MarketPlaceBox>
      <section id="sub">
        <article className="profile_home">
          <div className={toggleFilter ? "move on deal" : "move off"}>
            <div className="cw ucl">
              <span className="close" onClick={() => setToggleFilter(true)}>
                <img src={require("../img/sub/side_close.png").default} />
                <b className="mclose" onClick={() => setToggleFilter(true)}>
                  Filter<span>1</span>
                </b>
              </span>
              <div className="left_move">
                <form className="filterBox">
                  <div className="topBar">
                    <span className="leftBox">
                      <img src={filter_icon} alt="" />
                      <p>Filter</p>
                    </span>
                    <img
                      src={require("../img/sub/filter_close.png").default}
                      className="fc"
                      onClick={() => setToggleFilter(false)}
                      alt=""
                    />
                  </div>

                  <details className="filterDetails">
                    <summary className="filterSummary">
                      <p className="filterTitle">Status</p>

                      <img src={I_dnArrow} className="slide_up" />
                    </summary>

                    <ul className="filterContList typeList">
                      {statusList.map((cont, index) => (
                        <li
                          key={index}
                          style={{ cursor: "pointer" }}
                          className={
                            filterObj[`status${cont.value}`] === cont.key &&
                            "on"
                          }
                          onClick={() =>
                            editFilterList(`status${cont.value}`, cont.key)
                          }
                        >
                          {cont.key}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <details className="filterDetails">
                    <summary className="filterSummary">
                      <p className="filterTitle">Price</p>

                      <img src={I_dnArrow} className="slide_up" />
                    </summary>
                    <div className="filterContList priceBox">
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

                        <div className="priceAreaBox">
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

                          <div className="priceInputBox maxBox">
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
                        className="applyBtn"
                        onClick={() => setCallEffect(!callEffect)}
                      >
                        Apply
                      </button>
                    </div>
                  </details>

                  <details className="filterDetails">
                    <summary className="filterSummary">
                      <p className="filterTitle">Items</p>

                      <img src={I_dnArrow} className="slide_up" />
                    </summary>

                    <div className="filterContList searchListBox">
                      <div className="inputBox">
                        <img src={loupe} alt="" />
                        <input
                          type="text"
                          placeholder="Filter"
                          className="s_search"
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

                  <details className="filterDetails">
                    <summary className="filterSummary">
                      <p className="filterTitle">Chains</p>

                      <img src={I_dnArrow} className="slide_up" />
                    </summary>

                    <ul className="filterContList chainList">
                      {chainList.map((cont, index) => (
                        <li
                          key={index}
                          className="ra"
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

                  <details className="filterDetails">
                    <summary className="filterSummary">
                      <p className="filterTitle">Sales Coin</p>

                      <img src={I_dnArrow} className="slide_up" />
                    </summary>

                    <div className="filterContList searchListBox">
                      <div className="inputBox">
                        <img src={loupe} alt="" />
                        <input
                          type="text"
                          placeholder="Filter"
                          className="s_search"
                        />
                      </div>

                      <ul className="selectList">
                        {coinList.map((cont, index) => (
                          <li
                            key={index}
                            className="ra"
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

                            <label htmlFor={cont}>{cont}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </form>
              </div>
            </div>

            <div className="right_move">
              <div className="pad">
                <div className="real_sec">
                  <div className="slide_s slide2">
                    <div className="fl">
                      <p className="total">
                        Total {totalItem.toLocaleString("eu", "US")}
                      </p>
                    </div>
                    <div className="fr">
                      <div className="select">
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
                      <div className="select metc">
                        <div>{categoryFilter ? categoryFilter : "All"}</div>
                        <ul>
                          <li onClick={() => handleCateFilter("All")}>
                            <a>All</a>
                          </li>

                          {categoryList.map((cont, index) => (
                            <li
                              key={index}
                              onClick={() => handleCateFilter(cont)}
                            >
                              <a>{cont}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="select mselect">
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

                  <div className="etc">
                    <ul className="cartegoryList">
                      <li
                        className={
                          (!categoryFilter || categoryFilter === "All") &&
                          "onnn"
                        }
                        onClick={() => handleCateFilter("All")}
                      >
                        All
                      </li>

                      {categoryList.map((cont, index) => (
                        <li
                          className={categoryFilter === cont && "onnn"}
                          key={index}
                          onClick={() => handleCateFilter(cont)}
                        >
                          {cont}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="se_fi">
                    <p className="total">Selected Filter</p>
                    <ul>
                      <li className="sef" onClick={onclickFilterReset}>
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

                  <div className="move_item">
                    <div className="swiper-container">
                      <ol className="item move_li summary summary2">
                        <div>
                          {filteredList.map((v, i) => {
                            return (
                              <span key={i}>
                                <li>
                                  <a
                                    onClick={() =>
                                      navigate(
                                        `/singleitem?itemid=${v.item.itemid}`
                                      )
                                    }
                                    style={{
                                      backgroundImage: `url(${v.item?.url})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "center",
                                      backgroundSize: "cover",
                                    }}
                                  >
                                    <div className="on">
                                      <ul>
                                        <li style={{ padding: 0 }}>
                                          <img src={heart_off} alt="" />
                                          {v.item?.countfavors}
                                        </li>
                                        <li>
                                          <img
                                            src={
                                              v.ilikethisitem
                                                ? "star_on"
                                                : "star_off"
                                            }
                                            alt=""
                                          />
                                        </li>
                                      </ul>
                                      <div>{v.item?.titlename}</div>
                                      <span>{v.author?.nickname}</span>
                                      <ol>
                                        <li>
                                          {v.minpriceorder?.expiry
                                            ? "expires " +
                                              moment
                                                .unix(v.minpriceorder?.expiry)
                                                .fromNow()
                                            : "created " +
                                              moment(
                                                v.item?.createdat
                                              ).fromNow()}{" "}
                                        </li>
                                        <li>
                                          {putCommaAtPrice(
                                            v.askpricestats?.min
                                          )}{" "}
                                          {PAYMEANS_DEF}
                                        </li>
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

export default MarketPlace;

const statusList = [
  { key: "Buy Now", value: 1 },
  { key: "On Auction", value: 2 },
  { key: "New", value: 4 },
  { key: "Has Offers", value: 8 },
];
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

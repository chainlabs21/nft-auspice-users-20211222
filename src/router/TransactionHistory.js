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
import I_dnArrow from "../img/icons/I_dnArrow.svg";
import loupe from "../img/sub/loupe.png";
import filter_icon from "../img/sub/filter_icon.png";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css"; // import "./css/style01.css"; // import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useState, useEffect } from "react";
import Myprofcommonheader from "../components/Myprofcommonheader";
import { LOGGER, getmyaddress } from "../util/common";
import { API } from "../config/api";
import { applytoken } from "../util/rest";
import moment from "moment";
import { URL_TX_SCAN } from "../config/configs";
function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [bundleFilter, setBundleFilter] = useState(bundleFilterList[0]);
  const [categoryFilter, setCategoryFilter] = useState(categoryList[0]);
  const [sortFilter, setSortFilter] = useState(sortList[0]);
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [unit, setUnit] = useState("USD");
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [priceFilterToggle, setPriceFilterToggle] = useState(false);
  const [callEffect, setCallEffect] = useState(false);
  const [pricePopup, setPricePopup] = useState(false);
  let [list, setlist] = useState([]);
  let axios = applytoken();
  let myaddress = getmyaddress();

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

  useEffect(
    (_) => {
      // if (myaddress) {
      // } else {
      //   return;
      // }
      axios
        // .get(API.API_TRANSACTIONS + `/username/${myaddress}/0/100/id/DESC`, {
        //   params: { itemdetail: 0 },
        // })
        .get(
          API.API_TRANSACTIONS +
            `/username/${myaddress}/0/100/id/DESC`,
          {
            params: { itemdetail: 0 },
          }
        )
        .then((resp) => {
          LOGGER("", resp.data);
          let { status, list } = resp.data;
          if (status == "OK") {
            setlist(list);
          }
        }); //		,  : `${apiServer}/queries/rows/transactions` // /:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval
    },
    [myaddress]
  );

  return (
    <SignPopupBox>
      <section id="sub">
        <article className="profile_home deal_box">
          <div className="collection_home">
            <img src={require("../img/sub/home_bg.png").default} />

            <Myprofcommonheader />

            <div className={toggleFilter ? "move on deal" : "move off deal"}>
              <div className="cw ucl">
                <span className="close" onClick={() => setToggleFilter(true)}>
                  <img src={require("../img/sub/side_close.png").default} />
                  <b className="mclose">
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
                      />
                    </div>

                    <details className="filterDetails">
                      <summary className="filterSummary">
                        <p className="filterTitle">Event type</p>

                        <img src={I_dnArrow} className="slide_up" />
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
                              <ul
                                className="optionList"
                                onClick={onClickOption}
                              >
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
                          onClick={() => {
                            setPriceFilterToggle(true);
                            setCallEffect(!callEffect);
                          }}
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
                  <div className="real_sec ex">
                    <ul className="tab tabb">
                      <li onClick={() => navigate("/myprof")}>Search Wallet</li>
                      <li className="onn">Transaction history</li>
                      <li onClick={() => navigate("/offers")}>Offers</li>
                      <li onClick={() => navigate("/liked")}>Liked</li>
                      <li onClick={() => navigate("/hiddenitem")}>
                        Hidden item
                      </li>
                      <li onClick={() => navigate("/referals")}>Referals</li>
                    </ul>
                    <div className="filter_list ex_d">
                      <div className="filter_left">
                        <div className="fl">
                          <a onClick={onclickFilterReset}>
                            <span>Filter reset</span>
                          </a>
                        </div>

                        {filterList.map((cont, index) => (
                          <div className="select_f" key={index}>
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
                      <div className="filter_right">
                        <div className="fr">
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

                    <div className="filter_list2">
                      <div className="f_left">
                        <div className="slide2">
                          <div className="swiper mySwiper3">
                            <ul className="swiper-wrapper">
                              <li
                                className="swiper-slide"
                                onClick={onclickFilterReset}
                              >
                                <div className="fl">
                                  <a>
                                    <span>Filter reset</span>
                                  </a>
                                </div>
                              </li>

                              {filterList.map((cont, index) => (
                                <li
                                  key={index}
                                  className="swiper-slide"
                                  onClick={() => onclickFilterCancel(cont)}
                                >
                                  <div className="select_f">
                                    <p>{cont}</p>
                                    <a>
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
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="f_right">
                        <div className="fr">
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
                            <th>Tx</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((elem, idx) => (
                            <tr key={idx}>
                              <td> {elem.typestr}</td>
                              <td>
                                <div
                                  className="name"
                                  onClick={(e) => {
                                    navigate(
                                      `/singleitem?itemid=${elem.item?.itemid}`
                                    );
                                  }}
                                >
                                  <img
                                    src={
                                      elem.item?.url ||
                                      require("../img/sub/hjcollection.png")
                                        .default
                                    }
                                    alt=""
                                  />
                                  <p>{elem.item?.titlename}</p>
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
                                  <p>{elem.price}</p>
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
                                  <p>{elem.from_}</p>
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
                                  <p>{elem.to_}</p>
                                </div>
                              </td>
                              <td>{moment(elem.createdat).fromNow()}</td>
                              <td> {elem.amount} </td>
                              <td
                                onClick={(_) => {
                                  window.open(
                                    URL_TX_SCAN[elem.nettype] +
                                      `/${elem.txhash}`
                                  );
                                }}
                              >
                                <img
                                  src={
                                    require("../img/sub/icon_link_off.png")
                                      .default
                                  }
                                  alt=""
                                />
                              </td>
                            </tr>
                          ))}
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
                                <a>
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
                                <a>
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
                                <a>
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
                                <a>
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

const SignPopupBox = styled.div`
  .mySwiper3 {
    .swiper-wrapper {
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
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

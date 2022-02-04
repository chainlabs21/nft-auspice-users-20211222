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
import { useEffect, useState } from "react";
import I_dnArrow from "../img/icons/I_dnArrow.svg";
import loupe from "../img/sub/loupe.png";
import filter_icon from "../img/sub/filter_icon.png";
import axios from "axios";
import { API } from "../config/api";
import { URL_TX_SCAN } from "../config/configs";
import moment from 'moment'

function ExploreDeal() {
  const navigate = useNavigate()
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [moMoreObj, setMoMoreObj] = useState({});
  const [dataList, setDataList] = useState([]);
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
  function onClickToggleMoreBtn(index) {
    let moreObj = moMoreObj;
    moreObj[index] = !moreObj[index];
    console.log(moreObj);
    setMoMoreObj({ ...moreObj });
  }
  useEffect(() => {
    let token_sec = localStorage.getItem("token");
    axios.defaults.headers.get.token = token_sec;
    axios.defaults.headers.post.token = token_sec;

    axios
      .get(API.API_GET_EXPLORE, {        params: { fieldname: "typestr", fieldvalues: "MINT,SALE", itemdetail : 1 },
      })
      .then((resp) => {	console.log( 'MAvjoRxUYM' , resp.data )
				let { status , list }=resp.data
        if ( status =='OK' ){
					setDataList( list)
				}
      });
  }, []);

  return (
    <SignPopupBox>
      <section id="sub">
        <article className="deal_box">
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
                </form>
              </div>
            </div>

            <div className="right_move">
              <div className="pad">
                <div className="real_sec ex">
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
                        </tr>
                      </thead>
                      <tbody>
                        {dataList.map((cont, index) => (
                          <tr key={index} onClick={_=>{
														navigate(`/singleitem?itemid=${cont.itemid}`)
													}}>
                            <td>{cont.typestr}</td>
                            <td>
                              <div className="name">
                                <img style={{width: '50px' , borderRadius:'50%'}}
                                  src={ cont.item?.url ||	require("../img/sub/collect_circle.png").default }
                                  alt=""
                                />
                                <p></p>
                              </div>
                            </td>
                            <td>
                              <div className="name price">
                                <img                                  src={require("../img/sub/I_klaytn.svg").default}                                  alt=""
                                />
                                <p>{cont.price}</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/collect_circle.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>{cont.from_}</p>
                              </div>
                            </td>
                            <td>
                              <div className="name">
                                <img
                                  src={
                                    require("../img/sub/collect_circle.png")
                                      .default
                                  }
                                  alt=""
                                />
                                <p>{cont.to_}</p>
                              </div>
                            </td>
                            <td>{ moment(cont.createdat).fromNow()  }</td>
                            <td> {cont.amount }</td>
                            <td onClick={_=>{
															window.open ( URL_TX_SCAN[cont.nettype ] + `/${cont.txhash}` )
														}}>
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
                      {[1, 2, 3, 4, 5].map((cont, index) => (
                        <li key={index}>
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
                                <h4>Sale</h4>
                                <p>Summer Pool</p>

                                <a>
                                  <span
                                    onClick={() => onClickToggleMoreBtn(index)}
                                  >
                                    {moMoreObj[index] ? "- Less" : "+ More"}
                                  </span>
                                </a>
                              </div>
                            </div>
                            <div className="num_right">
                              <div className="total">
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                <p>0.005</p>
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

                          {moMoreObj[index] && (
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
                          )}
                        </li>
                      ))}
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

const SignPopupBox = styled.div`
  .move.off .close {
  }

  .mySwiper3 {
    .swiper-wrapper {
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

export default ExploreDeal;

const statusList = ["Listing", "Sale", "Bid", "Send"];

const chainList = [
  {
    img: rock,
    name: "Klaytn",
  },
];

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

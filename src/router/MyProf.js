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
import rock from "../img/sub/rock.png";
import sample from "../img/sub/sample.png";
import click1 from "../img/sub/click1.png";

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

function MyProf({ store, setConnect }) {
  const itemListRef = useRef();
  const navigate = useNavigate();

  const [morePopupIndex, setMorePopupIndex] = useState(-1);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [filterObj, setFilterObj] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [selectItemIndex, setSelectItemIndex] = useState(-1);

  function editFilterList(category, cont) {
    let dataObj = filterObj;
    dataObj[category] = cont;

    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }

  function onClickFilterReset() {
    setFilterObj({});
    setFilterList([]);
  }

  function onClickMoreBtn(e, index) {
    e.stopPropagation();
    if (morePopupIndex === index) setMorePopupIndex(-1);
    else setMorePopupIndex(index);
  }

  function onClickFilterCancel(cont) {
    let dataObj = filterObj;

    for (var key in dataObj) {
      if (dataObj.hasOwnProperty(key) && dataObj[key] == cont) {
        delete dataObj[key];
      }
    }

    setFilterObj(dataObj);
    setFilterList([...Object.values(dataObj)]);
  }

  function onClickLink(e, link) {
    e.stopPropagation();
    navigate(`/${link}`);
  }

  return (
    <SignPopupBox>
      <section id="sub">
        <article class="profile_home">
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
                  Henry is a mixed-media artist living in the
                  <br class="mo" /> Bay Area and uses
                  <br class="pc" />a stream of consciousness
                  <br class="mo" /> approach to his work.
                </h4>
              </div>
            </div>

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
                  <ul class="tab">
                    <li class="onn">Search Wallet</li>
                    <li onClick={() => navigate("/transactionhistory")}>
                      Transaction history
                    </li>
                    <li onClick={() => navigate("/offers")}>Offers</li>
                    <li onClick={() => navigate("/liked")}>Liked</li>
                    <li onClick={() => navigate("/hiddenitem")}>Hidden item</li>
                    <li onClick={() => navigate("/referals")}>Referals</li>
                  </ul>
                  <div class="pad">
                    <div class="real_sec"></div>
                    <div class="slide_s">
                      <div class="fl">
                        <input
                          type="text"
                          placeholder="Search items, collections, creators"
                        />
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
                        <div class="select">
                          <div>Latest</div>
                          <ul>
                            <li>
                              <a>Latest</a>
                            </li>
                            <li>
                              <a>popularity</a>
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
                              <a>oldest</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="se_fi">
                      <p class="total">Selected Filter</p>
                      <ul>
                        <li class="sef" onClick={onClickFilterReset}>
                          Filter reset
                        </li>
                        {filterList.map((cont, index) => (
                          <li
                            key={index}
                            onClick={() => onClickFilterCancel(cont)}
                          >
                            {cont}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div class="move_item">
                      <div class="swiper_container">
                        <ol class="item move_li">
                          <div>
                            <span>
                              <li
                                class={selectItemIndex === 0 && "click"}
                                onClick={() => setSelectItemIndex(0)}
                              >
                                <a
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
                                      <li
                                        class="dot"
                                        onClick={(e) => onClickMoreBtn(e, 0)}
                                      >
                                        {morePopupIndex === 0 && (
                                          <div class="choose">
                                            <ul>
                                              <li>Sale</li>
                                              <li
                                                onClick={(e) =>
                                                  onClickLink(e, "/handover")
                                                }
                                              >
                                                Hand Over
                                              </li>
                                              <li>Edit</li>
                                              <li>Collection Change</li>
                                              <li>Unhide</li>
                                            </ul>
                                          </div>
                                        )}
                                      </li>
                                    </ul>
                                    <span>Mark.X collection</span>
                                    <div>Place Saint-Marc</div>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li
                                class={selectItemIndex === 1 && "click"}
                                onClick={() => setSelectItemIndex(1)}
                              >
                                <a
                                  style={{
                                    backgroundImage: `url(${sample})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li
                                        class="dot"
                                        onClick={(e) => onClickMoreBtn(e, 1)}
                                      >
                                        {morePopupIndex === 1 && (
                                          <div class="choose">
                                            <ul>
                                              <li>Sale</li>
                                              <li
                                                onClick={(e) =>
                                                  onClickLink(e, "/handover")
                                                }
                                              >
                                                Hand Over
                                              </li>
                                              <li>Edit</li>
                                              <li>Collection Change</li>
                                              <li>Unhide</li>
                                            </ul>
                                          </div>
                                        )}
                                      </li>
                                    </ul>
                                    <span>Mark.X collection</span>
                                    <div>Place Saint-Marc</div>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li
                                class={selectItemIndex === 2 && "click"}
                                onClick={() => setSelectItemIndex(2)}
                              >
                                <a
                                  style={{
                                    backgroundImage: `url(${sample})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li
                                        class="dot"
                                        onClick={(e) => onClickMoreBtn(e, 2)}
                                      >
                                        {morePopupIndex === 2 && (
                                          <div class="choose">
                                            <ul>
                                              <li>Sale</li>
                                              <li
                                                onClick={(e) =>
                                                  onClickLink(e, "/handover")
                                                }
                                              >
                                                Hand Over
                                              </li>
                                              <li>Edit</li>
                                              <li>Collection Change</li>
                                              <li>Unhide</li>
                                            </ul>
                                          </div>
                                        )}
                                      </li>
                                    </ul>
                                    <span>David</span>
                                    <div>Summer Pool</div>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li
                                class={selectItemIndex === 3 && "click"}
                                onClick={() => setSelectItemIndex(3)}
                              >
                                <a
                                  style={{
                                    backgroundImage: `url(${sample})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li
                                        class="dot"
                                        onClick={(e) => onClickMoreBtn(e, 3)}
                                      >
                                        {morePopupIndex === 3 && (
                                          <div class="choose">
                                            <ul>
                                              <li>Sale</li>
                                              <li
                                                onClick={(e) =>
                                                  onClickLink(e, "/handover")
                                                }
                                              >
                                                Hand Over
                                              </li>
                                              <li>Edit</li>
                                              <li>Collection Change</li>
                                              <li>Unhide</li>
                                            </ul>
                                          </div>
                                        )}
                                      </li>
                                    </ul>
                                    <span>David</span>
                                    <div>Summer Pool</div>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li
                                class={selectItemIndex === 4 && "click"}
                                onClick={() => setSelectItemIndex(4)}
                              >
                                <a
                                  style={{
                                    backgroundImage: `url(${sample})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li
                                        class="dot"
                                        onClick={(e) => onClickMoreBtn(e, 4)}
                                      >
                                        {morePopupIndex === 4 && (
                                          <div class="choose">
                                            <ul>
                                              <li>Sale</li>
                                              <li
                                                onClick={(e) =>
                                                  onClickLink(e, "/handover")
                                                }
                                              >
                                                Hand Over
                                              </li>
                                              <li>Edit</li>
                                              <li>Collection Change</li>
                                              <li>Unhide</li>
                                            </ul>
                                          </div>
                                        )}
                                      </li>
                                    </ul>
                                    <span>David</span>
                                    <div>Summer Pool</div>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li
                                class={selectItemIndex === 5 && "click"}
                                onClick={() => setSelectItemIndex(5)}
                              >
                                <a
                                  style={{
                                    backgroundImage: `url(${sample})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li
                                        class="dot"
                                        onClick={(e) => onClickMoreBtn(e, 5)}
                                      >
                                        {morePopupIndex === 5 && (
                                          <div class="choose">
                                            <ul>
                                              <li>Sale</li>
                                              <li
                                                onClick={(e) =>
                                                  onClickLink(e, "/handover")
                                                }
                                              >
                                                Hand Over
                                              </li>
                                              <li>Edit</li>
                                              <li>Collection Change</li>
                                              <li>Unhide</li>
                                            </ul>
                                          </div>
                                        )}
                                      </li>
                                    </ul>
                                    <span>David</span>
                                    <div>Summer Pool</div>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li
                                class={selectItemIndex === 6 && "click"}
                                onClick={() => setSelectItemIndex(6)}
                              >
                                <a
                                  style={{
                                    backgroundImage: `url(${sample})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li
                                        class="dot"
                                        onClick={(e) => onClickMoreBtn(e, 6)}
                                      >
                                        {morePopupIndex === 6 && (
                                          <div class="choose">
                                            <ul>
                                              <li>Sale</li>
                                              <li
                                                onClick={(e) =>
                                                  onClickLink(e, "/handover")
                                                }
                                              >
                                                Hand Over
                                              </li>
                                              <li>Edit</li>
                                              <li>Collection Change</li>
                                              <li>Unhide</li>
                                            </ul>
                                          </div>
                                        )}
                                      </li>
                                    </ul>
                                    <span>David</span>
                                    <div>Summer Pool</div>
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

                <div class="click_thumb">
                  <div class="thum_pic">
                    <ul>
                      <li
                        style={{
                          backgroundImage: `url(${click1})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></li>
                      <li
                        style={{
                          backgroundImage: `url(${click1})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></li>
                    </ul>
                  </div>
                  <div class="click_btn">
                    <a>Cancel</a>
                    <a class="sell">
                      Sell<span>2</span>
                    </a>
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
  .item {
    div {
      span {
        li {
          a {
            & > .on {
              height: 138px;
              padding-bottom: 25px;

              ul {
                font-size: 14px;
              }

              span {
                margin: 11px 0 0 0;
                font-size: 18px;
                line-height: 24px;
              }

              div {
                margin: 4px 0 0 0;
                font-size: 22px;
                line-height: 30px;
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProf);

const statusList = ["Buy Now", "On Auction", "New", "Has Offers"];

const chainList = [
  {
    img: rock,
    name: "Klaytn",
  },
];

const coinList = ["Klay"];

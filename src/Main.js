import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import users_list01 from "./img/main/users_list01.png";
import users_list02 from "./img/main/users_list02.png";
import users_list03 from "./img/main/users_list03.png";
import users_list04 from "./img/main/users_list04.png";
import "./css/header.css";
import "./css/footer.css";
import "./css/swiper.min.css";
import { LOGGER, gettimestr, get_deltatime_str } from "./util/common";
import { applytoken } from "./util/rest";
import { API } from "./config/api";
import { strDot } from "./util/Util";
import moment from "moment";

function Main({ store }) {
  const visualSwiperContRef = useRef();
  const visualSwiperRef = useRef();
  const trendingSwiperRef = useRef();
  const itemSwiperRef = useRef();
  const userWrapRef = useRef();
  const navigate = useNavigate();
  const [intervalId, setIntervalId] = useState();
  const [visualSwiperIndex, setVisualSwiperIndex] = useState(0);
  const [trendingItemIndex, setTrendingItemIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [userIndex, setUserIndex] = useState(0);
  let [list_newitems, setlist_newitems] = useState([]);
  let [list_trenditems, setlist_trenditems] = useState([]);
  let [list_featured, setlist_featured] = useState([]);
  let axios = applytoken();

  useEffect((_) => {
    axios.get(`${API.API_MAIN_FEATURED_ITEMS}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setlist_featured(list);
      }
    });
    axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
      LOGGER("JBwpoHdvFv", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setlist_newitems(list);
      }
    });
    axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
      LOGGER("JN8wsASyiL", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setlist_trenditems(list);
      }
    });
  }, []);

  function onClickVisualSwiperBtn() {
    if (visualSwiperRef.current?.scrollTo) {
      if (visualSwiperIndex < visualSwiperRef.current.children.length - 1) {
        visualSwiperRef.current.style.transform = `translate3d(
          -${
            visualSwiperRef.current.children[0].offsetWidth *
            (visualSwiperIndex + 1)
          }px,0,0
        )`;

        setVisualSwiperIndex(visualSwiperIndex + 1);
      } else {
        setVisualSwiperIndex(0);
        visualSwiperRef.current.style.transform = `translate3d(
          0,0,0
        )`;
      }
    }
  }

  function onClickTrendingPreBtn() {
    const wrapWidth = trendingSwiperRef.current.offsetWidth;
    const contWidth = trendingSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);
    //Math.ceil;

    if (trendingItemIndex > 0) setTrendingItemIndex(trendingItemIndex - 1);
    else setTrendingItemIndex(pageNum - 1);
  }

  function onClickTrendingNextBtn() {
    const wrapWidth = trendingSwiperRef.current.offsetWidth;
    const contWidth = trendingSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

    if (trendingItemIndex < pageNum - 1)
      setTrendingItemIndex(trendingItemIndex + 1);
    else setTrendingItemIndex(0);
  }

  function onClickItemPreBtn() {
    const wrapWidth = itemSwiperRef.current.offsetWidth;
    const contWidth = itemSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

    if (itemIndex > 0) setItemIndex(itemIndex - 1);
    else setItemIndex(pageNum - 1);
  }

  function onClickItemNextBtn() {
    const wrapWidth = itemSwiperRef.current.offsetWidth;
    const contWidth = itemSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

    if (itemIndex < pageNum - 1) setItemIndex(itemIndex + 1);
    else setItemIndex(0);
  }

  function onClickUserPreBtn() {
    const wrapWidth = userWrapRef.current.offsetWidth;
    const contWidth = userWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

    if (userIndex > 0) setUserIndex(userIndex - 1);
    else setUserIndex(pageNum - 1);
  }

  function onClickUserNextBtn() {
    const wrapWidth = userWrapRef.current.offsetWidth;
    const contWidth = userWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

    if (userIndex < pageNum - 1) setUserIndex(userIndex + 1);
    else setUserIndex(0);
  }

  useEffect(() => {
    if (visualSwiperRef.current.children.length) {
      if (intervalId) clearInterval(intervalId);
      setIntervalId(setInterval(onClickVisualSwiperBtn, 3000));
    }
    return clearInterval(intervalId);
  }, [visualSwiperIndex]);

  useEffect(() => {
    if (!trendingSwiperRef.current.children[0]) return;

    const wrapWidth = trendingSwiperRef.current.offsetWidth;
    const contWidth = trendingSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(
      trendingSwiperRef.current.children.length / itemNumByPage
    );

    if (trendingSwiperRef.current?.scrollTo) {
      if (trendingItemIndex < pageNum) {
        trendingSwiperRef.current.scrollTo({
          left: contWidth * itemNumByPage * trendingItemIndex,
          behavior: "smooth",
        });
      } else {
        trendingSwiperRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [trendingItemIndex]);

  useEffect(() => {
    if (!itemSwiperRef.current.children[0]) return;

    const wrapWidth = itemSwiperRef.current.offsetWidth;
    const contWidth = itemSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(
      itemSwiperRef.current.children.length / itemNumByPage
    );

    if (itemSwiperRef.current?.scrollTo) {
      if (itemIndex < pageNum) {
        itemSwiperRef.current.scrollTo({
          left: contWidth * itemNumByPage * itemIndex,
          behavior: "smooth",
        });
      } else {
        itemSwiperRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [itemIndex]);

  useEffect(() => {
    const wrapWidth = userWrapRef.current.offsetWidth;
    const contWidth = userWrapRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

    if (userWrapRef.current?.scrollTo) {
      if (userIndex < pageNum) {
        userWrapRef.current.scrollTo({
          left: contWidth * itemNumByPage * userIndex,
          behavior: "smooth",
        });
      } else {
        userWrapRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [userIndex]);

  return (
    <IndexBox>
      <section id="main">
        <article className="visual">
          <div className="title">
            <h2>
              <img src={require("./img/main/title.png").default} />
            </h2>
            <p>
              Make money with NFTs that are easily issued and managed.
              <br /> Only in your own NFT gallery
            </p>
            <div>
              <a onClick={() => navigate("/marketplace")}>NFT Navigation</a>
              <a onClick={() => navigate("/createitem")}>NFT Publication</a>
            </div>
          </div>
          <div className="swiper" ref={visualSwiperContRef}>
            <div className="swiper-container swiper-container-visual">
              <ol className="swiper-wrapper" ref={visualSwiperRef}>
                {list_featured
                  .sort((a, b) => (a.createdat < b.createdat ? +1 : -1))
                  .map((cont, index) => (
                    <span key={index}>
                      <li className="swiper-slide">
                        <div
                          style={{
                            backgroundImage: `url(${cont.url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <div>
                          <h3>{cont.titlename}</h3>
                          <p> {cont.username} </p>
                          <div className="info">
                            <dl>
                              <dt>Current Bid</dt>
                              <dd>
                                2.867<span>KLAY</span>
                              </dd>
                            </dl>
                            <dl>
                              <dt>Auction ending in</dt>
                              <dd>05:32:21</dd>
                            </dl>
                          </div>
                          <div className="history">
                            <span>Offer History</span>
                            <ul>
                              <li>
                                <img src={cont.author_mongo?.profileimage} />
                                <strong>{cont.askpricestats?.min} KLAY</strong>
                                <span>
                                  {gettimestr(cont.orders_sellside?.createdat)}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="button">
                            <a
                              onClick={() =>
                                navigate(`/singleitem?itemid=${cont.itemid}`)
                              }
                            >
                              View Item
                            </a>
                            <a
                              onClick={() =>
                                navigate(`/singleitem?itemid=${cont.itemid}`)
                              }
                            >
                              Place a Bid
                            </a>
                          </div>
                        </div>
                      </li>
                    </span>
                  ))}
              </ol>
            </div>

            <div className="swiper-button-prev swiper-button-visual-prev"></div>
            <div
              className="swiper-button-next swiper-button-visual-next"
              onClick={onClickVisualSwiperBtn}
            ></div>
          </div>
        </article>

        <article className="category">
          <div className="wrap">
            <h4 className="t">Market Category</h4>

            <ol className="list">
              <li>
                <a onClick={() => navigate("/marketplace", { state: "Art" })}>
                  <img src={require("./img/main/category_art.png").default} />
                  Digital Art
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/marketplace", { state: "Music" })}>
                  <img src={require("./img/main/category_music.png").default} />
                  Music
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    navigate("/marketplace", { state: "Virtual World" })
                  }
                >
                  <img
                    src={
                      require("./img/main/category_virtualworld.png").default
                    }
                  />
                  Virtual World
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    navigate("/marketplace", { state: "Trading Cards" })
                  }
                >
                  <img
                    src={
                      require("./img/main/category_tradingcards.png").default
                    }
                  />
                  Trading Cards
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    navigate("/marketplace", { state: "Collectibles" })
                  }
                >
                  <img
                    src={
                      require("./img/main/category_collectibles.png").default
                    }
                  />
                  Collectibles
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/marketplace", { state: "Sports" })}
                >
                  <img
                    src={require("./img/main/category_sports.png").default}
                  />
                  Sports
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/marketplace", { state: "Utility" })}
                >
                  <img
                    src={require("./img/main/category_utility.png").default}
                  />
                  Utility
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/marketplace", { state: "ETC" })}>
                  <img src={require("./img/main/category_etc.png").default} />
                  ETC
                </a>
              </li>
            </ol>
          </div>
        </article>

        <article className="item">
          <div className="wrap">
            <h4 className="t">Trending NFT Item</h4>

            <div className="swiper">
              <div className="swiper-container swiper-container-trendingitem">
                <ol className="item item4 buy swiper-wrapper">
                  <div className="slideBox" ref={trendingSwiperRef}>
                    {list_trenditems
                      .filter((elem) => elem.url)
                      .sort((a, b) => b.countviews - a.countviews)
                      .map((cont, index) => (
                        <span key={index}>
                          <li className="swiper-slide">
                            <a
                              onClick={() =>
                                navigate(`/singleitem?itemid=${cont.itemid}`)
                              }
                              style={{
                                backgroundImage: `url(${cont.url})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div className="on">
                                <ul>
                                  <li
                                    className={
                                      cont.ilikethisitem
                                        ? "heart on"
                                        : "heart off"
                                    }
                                  >
                                    {cont.countfavors}
                                  </li>
                                  <li>
                                    <img
                                      src={require("./img/sub/eye.jpg").default}
                                    ></img>
                                    {cont.countviews}{" "}
                                  </li>
                                  <li className="star off"> </li>
                                </ul>
                                <div>{cont.titlename} </div>
                                <span>
                                  {strDot(cont.author?.nickname, 10, 0)}
                                </span>
                                <ol>
                                  <li>
                                    {moment
                                      .unix(cont.minpriceorder?.expiry)
                                      .fromNow() ||
                                      get_deltatime_str(
                                        cont.minpriceorder?.expiry
                                      )}
                                  </li>
                                  <li>{cont.askpricestats?.min} KLAY</li>
                                </ol>
                                <p>Buy Now</p>
                              </div>
                            </a>
                          </li>
                        </span>
                      ))}
                  </div>
                </ol>
              </div>

              <div
                className="swiper-button-prev swiper-button-trendingitem-prev"
                onClick={onClickTrendingPreBtn}
              ></div>
              <div
                className="swiper-button-next swiper-button-trendingitem-next"
                onClick={onClickTrendingNextBtn}
              ></div>
            </div>
          </div>
        </article>

        <article className="item">
          <div className="wrap">
            <h4 className="t">NEW NFT Item</h4>

            <div className="swiper">
              <div className="swiper-container swiper-container-newitem">
                <ol className="item item4 summary swiper-wrapper">
                  <div className="slideBox" ref={itemSwiperRef}>
                    {list_newitems
                      .filter((elem) => elem.url)
                      .sort((a, b) => (a.createdat < b.createdat ? +1 : -1))
                      .map((cont, index) => (
                        <span key={index}>
                          <li className="swiper-slide">
                            <a
                              onClick={() =>
                                navigate(`/singleitem?itemid=${cont.itemid}`)
                              }
                              style={{
                                backgroundImage: `url(${cont.url})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div className="on">
                                <ul>
                                  <li className="heart off">
                                    {cont.countfavors}
                                  </li>
                                  <li className="star off"></li>
                                </ul>
                                <div>{cont.titlename} </div>
                                <span>
                                  {" "}
                                  {strDot(cont.author?.username, 10, 0)}{" "}
                                  {moment(cont.createdat).fromNow()}
                                </span>

                                <ol>
                                  <li>
                                    {cont.minpriceorder?.expiry
                                      ? moment
                                          .unix(cont.minpriceorder?.expiry)
                                          .fromNow()
                                      : ""}
                                  </li>
                                  <li>
                                    {cont.minpriceorder
                                      ? `${cont.askpricestats?.min} KLAY`
                                      : ""}{" "}
                                  </li>
                                </ol>
                              </div>
                            </a>
                          </li>
                        </span>
                      ))}
                  </div>
                </ol>
              </div>

              <div
                className="swiper-button-prev swiper-button-newitem-prev"
                onClick={onClickItemPreBtn}
              ></div>
              <div
                className="swiper-button-next swiper-button-newitem-next"
                onClick={onClickItemNextBtn}
              ></div>
            </div>
          </div>
        </article>

        <article className="users">
          <div className="wrap">
            <h4 className="t">Tips for Itemverse users</h4>

            <div className="swiper">
              <div className="swiper-container swiper-container-users">
                <ol className="list swiper-wrapper" ref={userWrapRef}>
                  {[1, 2].map((cont, index) => (
                    <>
                      <span key={index}>
                        <li className="swiper-slide">
                          <a>
                            <div
                              style={{
                                backgroundImage: `url(${users_list01})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <dl>
                              <dt>Basic Guide</dt>
                              <dd>Before Participating in NFT Collection</dd>
                            </dl>
                          </a>
                        </li>
                      </span>

                      <span>
                        <li className="swiper-slide">
                          <a>
                            <div
                              style={{
                                backgroundImage: `url(${users_list02})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <dl>
                              <dt>Buy NFTs</dt>
                              <dd>Discover and buy promising NFTs</dd>
                            </dl>
                          </a>
                        </li>
                      </span>
                      <span>
                        <li className="swiper-slide">
                          <a>
                            <div
                              style={{
                                backgroundImage: `url(${users_list03})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <dl>
                              <dt>production and sales</dt>
                              <dd>Easy-to-follow NFT production and sales</dd>
                            </dl>
                          </a>
                        </li>
                      </span>
                      <span>
                        <li className="swiper-slide">
                          <a>
                            <div
                              style={{
                                backgroundImage: `url(${users_list04})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <dl>
                              <dt>Itemverse Market</dt>
                              <dd>5 reasons to sell your NFTs on Itemverse</dd>
                            </dl>
                          </a>
                        </li>
                      </span>
                    </>
                  ))}
                </ol>
              </div>
              <div
                className="swiper-button-prev swiper-button-users-prev"
                onClick={onClickUserPreBtn}
              ></div>
              <div
                className="swiper-button-next swiper-button-users-next"
                onClick={onClickUserNextBtn}
              ></div>
            </div>
          </div>
        </article>
      </section>

      <footer id="footer">
        <div className="wrap">
          <div className="info">
            <div>
              <h5>
                <a onClick={() => navigate("/")}>
                  <img src={require("./img/sub/verse_logo.png").default} />
                </a>
              </h5>
              <p>
                Decentralized NFT marketplace Itemverse makes it easy and
                convenient to trade non-fungible tokens (NFTs) and crypto
                collectibles.
              </p>
              <div>
                <span>
                  <a href="mailto:contact@Itemverse.com">Contact us</a>
                </span>
                <span>
                  <a>English</a>
                </span>
              </div>
            </div>
            <div>
              <ul>
                <li>
                  <h6>MARKET</h6>
                  <ol>
                    <li>
                      <a onClick={() => navigate("/marketplace")}>
                        all about NFT
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          navigate("/marketplace", { state: "Digital Art" })
                        }
                      >
                        Digital art
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          navigate("/marketplace", { state: "Trading Card" })
                        }
                      >
                        Trading cards
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          navigate("/marketplace", { state: "Music" })
                        }
                      >
                        Music
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          navigate("/marketplace", { state: "Virtual Worlds" })
                        }
                      >
                        Virtual Worlds
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          navigate("/marketplace", { state: "Utility" })
                        }
                      >
                        Utility
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          navigate("/marketplace", { state: "Sports" })
                        }
                      >
                        Sports
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          navigate("/marketplace", { state: "ETC" })
                        }
                      >
                        ETC
                      </a>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>MY ACCOUNT</h6>
                  <ol>
                    <li>
                      <a onClick={() => navigate("/myprof")}>My Profile</a>
                    </li>
                    <li>
                      <a onClick={() => navigate("/myitem")}>My Items</a>
                    </li>
                    <li>
                      <a onClick={() => navigate("/liked")}>My Favourite</a>
                    </li>
                    <li>
                      <a onClick={() => navigate("/mywallet")}>
                        account setting
                      </a>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>EXPLORE</h6>
                  <ol>
                    <li>
                      <a onClick={() => navigate("/ranking")}>User Ranking</a>
                    </li>
                    <li>
                      <a onClick={() => navigate("/exploredeal")}>
                        Transaction details
                      </a>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>CONTACT US</h6>
                  <ol>
                    <li>
                      <a href="mailto:contact@Itemverse.com">
                        contact@Itemverse.com
                      </a>
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <div>
              <ul>
                <li>
                  <a>Privacy Policy</a>
                </li>
                <li>
                  <a>Terms of Service</a>
                </li>
              </ul>
            </div>
            <div>
              <address>
                Copyright © 2021 Itemverse. All rights reserved.
              </address>
            </div>
          </div>
        </div>
      </footer>
    </IndexBox>
  );
}

const IndexBox = styled.div`
  width: 100%;
  overflow: hidden;

  .swiper-wrapper,
  .slideBox {
    overflow-x: scroll;
    transition: 0.8s;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  #main {
    .visual {
      .swiper {
        .swiper-container {
          .swiper-wrapper {
            & > span {
              padding: 16px;

              & > li {
                margin: 0;
              }
            }
          }
        }
      }
    }

    article.collection {
      .wrap {
        .swiper {
          .swiper-container {
            .swiper-wrapper {
              & > span {
              }
            }
          }
        }
      }
    }

    article.item {
      .wrap {
        .swiper {
          .swiper-container {
            .swiper-wrapper {
              width: 100%;
              .slideListBox {
                overflow-x: scroll;
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
    // setHeaderPopup: () => dispatch(setHeaderPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

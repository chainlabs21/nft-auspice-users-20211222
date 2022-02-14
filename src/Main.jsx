import { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import users_list01 from "./img/main/users_list01.png";
import users_list02 from "./img/main/users_list02.png";
import users_list03 from "./img/main/users_list03.png";
import users_list04 from "./img/main/users_list04.png";
import I_ltArw3BlackBtn from "./img/design/I_ltArw3BlackBtn.png";
import I_rtArw3BlackBtn from "./img/design/I_rtArw3BlackBtn.png";
import title from "./img/main/title.png";

import { LOGGER, gettimestr, get_deltatime_str } from "./util/common";
import { applytoken } from "./util/rest";
import { API } from "./config/api";
import { getStyle, strDot } from "./util/Util";
import moment from "moment";
import SetErrorBar from "./util/SetErrorBar";
import DefaultHeader from "./components/header/DefaultHeader";

function Main({ store }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const visualSwiperRef = useRef();
  const collectionSwiperRef = useRef();
  const trendingSwiperRef = useRef();
  const itemSwiperRef = useRef();
  const userWrapRef = useRef();

  const [intervalId, setIntervalId] = useState();
  const [visualSwiperIndex, setVisualSwiperIndex] = useState(0);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [trendingItemIndex, setTrendingItemIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [userIndex, setUserIndex] = useState(0);
  const [creatorlist, setCreatorList] = useState([]);
  let [list_newitems, setlist_newitems] = useState([]);
  let [list_trenditems, setlist_trenditems] = useState([]);
  let [list_featured, setlist_featured] = useState([]);
  let axios = applytoken();

  useEffect((_) => {
    axios.get(`${API.API_MAIN_FEATURED_ITEMS}`).then((resp) => {
      let { status, list } = resp.data;
      if (status == "OK") {
        setlist_featured(list);
      }
    });

    axios.get(`${API.API_GET_CREATORS}`).then((resp) => {
      let { status, list } = resp.data;
      if (status == "OK") {
        setCreatorList(list);
      }
    });

    axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
      LOGGER("JN8wsASyiL", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setlist_trenditems(list);
      }
    });

    axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
      LOGGER("JBwpoHdvFv", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setlist_newitems(list);
      }
    });
  }, []);

  function onClickFavorBtn(e, itemid) {
    e.stopPropagation();
    LOGGER("CodOU75E5r");
    axios.post(`${API.API_TOGGLE_FAVOR}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, respdata, message } = resp.data;

      if (status == "OK") {
        axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
          LOGGER("JN8wsASyiL", resp.data);
          let { status, list } = resp.data;
          if (status == "OK") {
            setlist_trenditems(list);
          }
        });

        axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
          LOGGER("JBwpoHdvFv", resp.data);
          let { status, list } = resp.data;
          if (status == "OK") {
            setlist_newitems(list);
          }
        });
      } else if (message === "PLEASE-LOGIN") {
        SetErrorBar("로그인을 해주세요");
      }
    });
  }

  function onClickBookMarkBtn(e, itemid) {
    e.preventDefault();

    axios.post(`${API.API_TOGGLE_BOOKMARK}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, respdata, message } = resp.data;
      if (status == "OK") {
        if (status == "OK") {
          axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
            LOGGER("JN8wsASyiL", resp.data);
            let { status, list } = resp.data;
            if (status == "OK") {
              setlist_trenditems(list);
            }
          });

          axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
            LOGGER("JBwpoHdvFv", resp.data);
            let { status, list } = resp.data;
            if (status == "OK") {
              setlist_newitems(list);
            }
          });
        } else if (message === "PLEASE-LOGIN") {
          SetErrorBar("로그인을 해주세요");
        }
      }
    });
  }

  function onClickVisualSwiperBtn() {
    if (visualSwiperRef.current?.scrollTo) {
      if (visualSwiperIndex < visualSwiperRef.current.children.length - 1) {
        visualSwiperRef.current.style.transform = `translate3d(
          -${
            (visualSwiperRef.current.children[0].offsetWidth +
              getStyle(visualSwiperRef, "gap")) *
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

    // if (window.innerWidth < 1280) {
    //   if (visualSwiperRef.current?.scrollTo) {
    //     if (visualSwiperIndex < visualSwiperRef.current.children.length - 1) {
    //       visualSwiperRef.current.style.transform = `translate3d(
    //       -${
    //         visualSwiperRef.current.children[0].offsetWidth *
    //         (visualSwiperIndex + 1)
    //       }px,0,0
    //     )`;

    //       setVisualSwiperIndex(visualSwiperIndex + 1);
    //     } else {
    //       setVisualSwiperIndex(0);
    //       visualSwiperRef.current.style.transform = `translate3d(
    //       0,0,0
    //     )`;
    //     }
    //   }
    // } else {
    //   if (visualSwiperRef.current) visualSwiperRef.current.style.transform = "";
    //   if (visualSwiperIndex < creatorlist.length - 1)
    //     setVisualSwiperIndex(visualSwiperIndex + 1);
    //   else setVisualSwiperIndex(0);
    // }
  }

  function onClickCollectionPreBtn() {
    const wrapWidth = collectionSwiperRef.current.offsetWidth;
    const contWidth = collectionSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

    if (collectionIndex > 0) setCollectionIndex(collectionIndex - 1);
    else setCollectionIndex(pageNum - 1);
  }

  function onClickCollectionNextBtn() {
    const wrapWidth = collectionSwiperRef.current.offsetWidth;
    const contWidth = collectionSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

    if (collectionIndex < pageNum - 1) setCollectionIndex(collectionIndex + 1);
    else setCollectionIndex(0);
  }

  function onClickTrendingPreBtn() {
    const wrapWidth = trendingSwiperRef.current.offsetWidth;
    const contWidth = trendingSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

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
    if (!visualSwiperRef.current.children[0]) return;

    const contWidth = visualSwiperRef.current.children[0].offsetWidth;
    const pageNum = Math.ceil(visualSwiperRef.current.children.length);

    if (visualSwiperRef.current?.scrollTo) {
      if (visualSwiperIndex < pageNum) {
        visualSwiperRef.current.scrollTo({
          left: contWidth * visualSwiperIndex,
          behavior: "smooth",
        });
      } else {
        visualSwiperRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }

    if (visualSwiperRef.current.children.length) {
      if (intervalId) clearInterval(intervalId);
      setIntervalId(setInterval(onClickVisualSwiperBtn, 3000));
    }
    return clearInterval(intervalId);
  }, [visualSwiperIndex]);

  useEffect(() => {
    if (!collectionSwiperRef.current.children[0]) return;

    const wrapWidth = collectionSwiperRef.current.offsetWidth;
    const contWidth = collectionSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);
    if (collectionSwiperRef.current?.scrollTo) {
      if (collectionIndex < pageNum) {
        collectionSwiperRef.current.scrollTo({
          left: contWidth * itemNumByPage * collectionIndex,
          behavior: "smooth",
        });
      } else {
        collectionSwiperRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [collectionIndex]);

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

  if (isMobile)
    return (
      <MmainBox>
        <DefaultHeader />

        <section id="innerBox">
          <article className="visual">
            <div className="title">
              <h2>
                <img src={title} />
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
            <div className="swiper">
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
                                  <strong>
                                    {cont.askpricestats?.min} KLAY
                                  </strong>
                                  <span>
                                    {gettimestr(
                                      cont.orders_sellside?.createdat
                                    )}
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

          <article class="collection">
            <div class="wrap">
              <h4 class="t">Trending Collection</h4>
              <div class="swiper">
                <div class="swiper-container swiper-container-collection">
                  <ol class="list swiper-wrapper" ref={collectionSwiperRef}>
                    {creatorlist.map((cont, index) => (
                      <>
                        <span>
                          <li class="swiper-slide">
                            <a
                            // onClick={() =>
                            //   navigate(``)
                            // }
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${cont.backgroundimgsrc})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              />
                              <div>
                                <span
                                  style={{
                                    backgroundImage: `url(${cont.mongo?.profileimage})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                />
                                <dl>
                                  <dt>{cont.storename}</dt>
                                  <dd>
                                    <strong>{cont?.nickname}</strong>
                                    <p>{cont.mongo?.description}</p>
                                  </dd>
                                </dl>
                              </div>
                            </a>
                          </li>
                        </span>
                      </>
                    ))}
                  </ol>
                </div>

                <div
                  class="swiper-button-prev swiper-button-collection-prev"
                  onClick={onClickCollectionPreBtn}
                ></div>
                <div
                  class="swiper-button-next swiper-button-collection-next"
                  onClick={onClickCollectionNextBtn}
                ></div>
              </div>
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
                  <a
                    onClick={() => navigate("/marketplace", { state: "Music" })}
                  >
                    <img
                      src={require("./img/main/category_music.png").default}
                    />
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
                    onClick={() =>
                      navigate("/marketplace", { state: "Sports" })
                    }
                  >
                    <img
                      src={require("./img/main/category_sports.png").default}
                    />
                    Sports
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      navigate("/marketplace", { state: "Utility" })
                    }
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
                        .sort((a, b) => b.countfavors - a.countfavors)
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
                                      onClick={(e) =>
                                        onClickFavorBtn(e, cont.itemid)
                                      }
                                    >
                                      {cont.countfavors}
                                    </li>

                                    <li
                                      className="star off"
                                      onClick={(e) =>
                                        onClickBookMarkBtn(e, cont.itemid)
                                      }
                                    />
                                  </ul>
                                  <div>{cont.titlename}</div>
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
                                    <li
                                      className={
                                        cont.ilikethisitem
                                          ? "heart on"
                                          : "heart off"
                                      }
                                      onClick={(e) =>
                                        onClickFavorBtn(e, cont.itemid)
                                      }
                                    >
                                      {cont.countfavors}
                                    </li>
                                    <li
                                      className="star off"
                                      onClick={(e) => e.preventDefault()}
                                    />
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
                                <dd>
                                  5 reasons to sell your NFTs on Itemverse
                                </dd>
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
                            navigate("/marketplace", {
                              state: "Virtual Worlds",
                            })
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
      </MmainBox>
    );
  else
    return (
      <>
        <DefaultHeader />
        <PmainBox>
          <section className="innerBox">
            <article className="visual">
              <div className="titleContainer">
                <div className="titleInnerBox">
                  <div className="titleBox">
                    <img className="titleImg" src={title} />
                    <p className="explain">
                      Make money with NFTs that are easily issued and managed.
                      <br /> Only in your own NFT gallery
                    </p>
                  </div>

                  <div className="btnBox">
                    <button
                      className="navBtn"
                      onClick={() => navigate("/marketplace")}
                    >
                      NFT Navigation
                    </button>
                    <button
                      className="pubBtn"
                      onClick={() => navigate("/createitem")}
                    >
                      NFT Publication
                    </button>
                  </div>
                </div>
              </div>

              <div className="swiperContainer">
                <div className="swiperBox">
                  <ul className="swiperList" ref={visualSwiperRef}>
                    {list_featured
                      .sort((a, b) => (a.createdat < b.createdat ? +1 : -1))
                      .map((cont, index) => (
                        <li className="swiperContBox" key={index}>
                          <span
                            className="itemImg"
                            style={{
                              backgroundImage: `url(${cont.url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          />

                          <div className="infoContainer">
                            <div className="titleBox">
                              <strong className="title">
                                {cont.titlename}
                              </strong>
                              <strong>{cont.username}</strong>
                            </div>

                            <div className="infoBox">
                              <ul className="infoList">
                                <li>
                                  <p className="key">Current Bid</p>
                                  <span className="value">
                                    <p>2.867</p>
                                    <p className="unit">KLAY</p>
                                  </span>
                                </li>
                                <li>
                                  <p className="key">Auction ending in</p>
                                  <p className="value">05:32:21</p>
                                </li>
                              </ul>

                              <div className="bottomBox">
                                <div className="historyBox">
                                  <p className="title">Offer History</p>

                                  <span className="scrollBox">
                                    <ul className="historyList">
                                      {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                        (con, index) => (
                                          <li key={index}>
                                            <span className="profBox">
                                              <img
                                                src={
                                                  cont.author_mongo
                                                    ?.profileimage
                                                }
                                              />
                                              <strong>
                                                {cont.askpricestats?.min} KLAY
                                              </strong>
                                            </span>

                                            <p className="time">21:54</p>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </span>
                                </div>

                                <div className="btnBox">
                                  <button
                                    className="viewBtn"
                                    onClick={() =>
                                      navigate(
                                        `/singleitem?itemid=${cont.itemid}`
                                      )
                                    }
                                  >
                                    View Item
                                  </button>
                                  <button
                                    className="bidBtn"
                                    onClick={() =>
                                      navigate(
                                        `/singleitem?itemid=${cont.itemid}`
                                      )
                                    }
                                  >
                                    Place a Bid
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <button className="nextBtn" onClick={onClickVisualSwiperBtn}>
                  <img src={I_ltArw3BlackBtn} alt="" />
                </button>
              </div>
            </article>

            <article class="collection">
              <strong className="title">Trending Collection</strong>
              <div className="swiperContainer">
                <div class="swiperBox">
                  <ul class="swiperList" ref={collectionSwiperRef}>
                    {creatorlist.map((cont, index) => (
                      <li class="swiperContBox">
                        <div
                          className="bg"
                          style={{
                            backgroundImage: `url(${cont.backgroundimgsrc})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            background: "#000",
                          }}
                        />

                        <div className="infoContainer">
                          <span
                            className="profImg"
                            style={{
                              backgroundImage: `url(${cont.mongo?.profileimage})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              background: "#f00",
                            }}
                          />

                          <div className="infoBox">
                            <strong className="store">{cont.storename}</strong>
                            <strong className="nickname">
                              {cont?.nickname}
                            </strong>
                            <p className="description">
                              {cont.mongo?.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                className="preBtn pageBtn"
                onClick={onClickCollectionPreBtn}
              >
                <img src={I_ltArw3BlackBtn} alt="" />
              </button>
              <button
                className="nextBtn pageBtn"
                onClick={onClickCollectionNextBtn}
              >
                <img src={I_rtArw3BlackBtn} alt="" />
              </button>
            </article>

            <article className="category">
              <div className="wrap">
                <h4 className="t">Market Category</h4>

                <ol className="list">
                  <li>
                    <a
                      onClick={() => navigate("/marketplace", { state: "Art" })}
                    >
                      <img
                        src={require("./img/main/category_art.png").default}
                      />
                      Digital Art
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        navigate("/marketplace", { state: "Music" })
                      }
                    >
                      <img
                        src={require("./img/main/category_music.png").default}
                      />
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
                          require("./img/main/category_virtualworld.png")
                            .default
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
                          require("./img/main/category_tradingcards.png")
                            .default
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
                          require("./img/main/category_collectibles.png")
                            .default
                        }
                      />
                      Collectibles
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        navigate("/marketplace", { state: "Sports" })
                      }
                    >
                      <img
                        src={require("./img/main/category_sports.png").default}
                      />
                      Sports
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        navigate("/marketplace", { state: "Utility" })
                      }
                    >
                      <img
                        src={require("./img/main/category_utility.png").default}
                      />
                      Utility
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/marketplace", { state: "ETC" })}
                    >
                      <img
                        src={require("./img/main/category_etc.png").default}
                      />
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
                          .sort((a, b) => b.countfavors - a.countfavors)
                          .map((cont, index) => (
                            <span key={index}>
                              <li className="swiper-slide">
                                <a
                                  onClick={() =>
                                    navigate(
                                      `/singleitem?itemid=${cont.itemid}`
                                    )
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
                                        onClick={(e) =>
                                          onClickFavorBtn(e, cont.itemid)
                                        }
                                      >
                                        {cont.countfavors}
                                      </li>

                                      <li
                                        className="star off"
                                        onClick={(e) =>
                                          onClickBookMarkBtn(e, cont.itemid)
                                        }
                                      />
                                    </ul>
                                    <div>{cont.titlename}</div>
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
                                    navigate(
                                      `/singleitem?itemid=${cont.itemid}`
                                    )
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
                                        onClick={(e) =>
                                          onClickFavorBtn(e, cont.itemid)
                                        }
                                      >
                                        {cont.countfavors}
                                      </li>
                                      <li
                                        className="star off"
                                        onClick={(e) => e.preventDefault()}
                                      />
                                    </ul>
                                    <div>{cont.titlename} </div>
                                    <span>
                                      {" "}
                                      {strDot(
                                        cont.author?.username,
                                        10,
                                        0
                                      )}{" "}
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
                                  <dd>
                                    Before Participating in NFT Collection
                                  </dd>
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
                                  <dd>
                                    Easy-to-follow NFT production and sales
                                  </dd>
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
                                  <dd>
                                    5 reasons to sell your NFTs on Itemverse
                                  </dd>
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
                              navigate("/marketplace", {
                                state: "Trading Card",
                              })
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
                              navigate("/marketplace", {
                                state: "Virtual Worlds",
                              })
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
                          <a onClick={() => navigate("/ranking")}>
                            User Ranking
                          </a>
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
        </PmainBox>
      </>
    );
}

const MmainBox = styled.div``;
const PmainBox = styled.div`
  padding: 120px 0 0 0;

  & > .innerBox {
    .visual {
      display: flex;
      align-items: flex-start;

      .titleContainer {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        max-width: 50%;
        padding: 100px 138px 156px 0;
        background: #fff;
        z-index: 3;

        .titleInnerBox {
          display: flex;
          flex-direction: column;
          gap: 70px;
          max-width: 486px;
          height: 584px;

          .titleBox {
            display: flex;
            flex-direction: column;
            gap: 32px;

            .titleImg {
              width: 100%;
            }

            .explain {
              font-size: 16px;
              font-weight: 500;
              line-height: 24px;
            }
          }

          .btnBox {
            display: flex;
            gap: 20px;

            button {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 66px;
              font-size: 22px;
              font-weight: 700;
              border: solid 2px #000;
              border-radius: 60px;

              &.navBtn {
              }

              &.pubBtn {
                color: #fff;
                background: #000;
              }
            }
          }
        }
      }

      .swiperContainer {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        max-width: 50%;
        padding: 42px 0 42px 10px;

        .swiperBox {
          display: flex;
          position: relative;

          .swiperList {
            display: flex;
            gap: 20px;
            transition: all 0.8s;

            .swiperContBox {
              display: flex;
              width: 630px;
              min-width: 630px;
              height: 544px;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);

              .itemImg {
                flex: 1;
              }

              .infoContainer {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 268px;
                padding: 30px 16px 20px 16px;

                .titleBox {
                  display: flex;
                  flex-direction: column;
                  gap: 12px;

                  * {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .title {
                    font-size: 28px;
                    line-height: 35px;
                  }

                  .creator {
                    font-size: 16px;
                    line-height: 20px;
                  }
                }

                .infoBox {
                  display: flex;
                  flex-direction: column;
                  gap: 26px;

                  .infoList {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;

                    li {
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;

                      .key {
                        font-size: 14px;
                        line-height: 18px;
                        font-weight: 500;
                      }

                      .value {
                        display: flex;
                        align-items: flex-end;
                        gap: 2px;
                        font-size: 22px;
                        line-height: 22px;
                        font-weight: 900;

                        .unit {
                          font-size: 12px;
                          line-height: 16px;
                        }
                      }
                    }
                  }

                  .bottomBox {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;

                    .historyBox {
                      display: flex;
                      flex-direction: column;
                      gap: 8px;

                      .title {
                        font-size: 14px;
                      }

                      .scrollBox {
                        background: #f4f2f2;
                        border-radius: 8px;
                        padding: 10px 6px 10px 8px;

                        .historyList {
                          display: flex;
                          flex-direction: column;
                          gap: 12px;
                          height: 168px;
                          padding: 0 8px 0 0;
                          overflow-y: scroll;

                          &::-webkit-scrollbar {
                            width: 4px;
                            border: 5px solid #f6f6f6;
                          }

                          &::-webkit-scrollbar-thumb {
                            width: 4px;
                            background: #b7b7b7;
                            border-radius: 4px;
                          }

                          &::-webkit-scrollbar-track {
                            background: #f4f2f2;
                            border-radius: 4px;
                          }

                          li {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .profBox {
                              display: flex;
                              align-items: center;
                              gap: 6px;

                              img {
                                width: 28px;
                                height: 28px;
                                object-fit: cover;
                                border-radius: 50%;
                                box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
                              }

                              strong {
                                font-size: 16px;
                              }
                            }
                          }
                        }
                      }
                    }

                    .btnBox {
                      display: flex;
                      gap: 10px;

                      button {
                        flex: 1;
                        height: 34px;
                        font-size: 14px;
                        font-weight: 700;
                        border: solid 1px #000;
                        border-radius: 8px;

                        &.bidBtn {
                          color: #fff;
                          background: #000;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .nextBtn {
          position: absolute;
          left: -24px;
          z-index: 4;

          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
        }
      }
    }

    .collection {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 30px;
      max-width: 1312px;
      margin: 0 auto;
      position: relative;

      .title {
        font-size: 22px;
        font-weight: 900;
      }

      .swiperContainer {
        padding: 0 16px 20px 16px;
        overflow: hidden;
      }

      .swiperBox {
        display: flex;
        align-items: center;
        position: relative;

        .swiperList {
          display: flex;
          gap: 16px;

          .swiperContBox {
            display: flex;
            flex-direction: column;
            width: 308px;
            min-width: 308px;
            height: 480px;
            border-radius: 20px;
            box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
            overflow: hidden;

            .bg {
              height: 290px;
            }

            .infoContainer {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 40px 15px 18px 15px;
              position: relative;

              .profImg {
                width: 66px;
                height: 66px;
                border-radius: 50%;
                top: -33px;
                position: absolute;
              }

              .infoBox {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                text-align: center;

                .store {
                  font-size: 22px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }

                .nickname {
                  margin: 4px 0 0 0;
                  font-size: 14px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }

                .description {
                  flex: 1;
                  word-break: break-all;
                  margin: 16px 0 0 0;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }

    .pageBtn {
      position: absolute;

      &.preBtn {
        top: 270px;
        left: -8px;
      }
      &.nextBtn {
        top: 270px;
        right: -8px;
      }
    }
  }
`;

// const MmainBox = styled.div`
//   width: 100%;
//   overflow: hidden;

//   .swiper-wrapper,
//   .slideBox {
//     overflow-x: scroll;
//     transition: 0.8s;

//     &::-webkit-scrollbar {
//       display: none;
//     }
//   }

//   #main {
//     .visual {
//       .swiper {
//         .swiper-container {
//           .swiper-wrapper {
//             & > span {
//               padding: 16px;

//               & > li {
//                 margin: 0;
//               }
//             }
//           }
//         }
//       }
//     }

//     article.collection {
//       .wrap {
//         .swiper {
//           .swiper-container {
//             .swiper-wrapper {
//               & > span {
//               }
//             }
//           }
//         }
//       }
//     }

//     article.item {
//       .wrap {
//         .swiper {
//           .swiper-container {
//             .swiper-wrapper {
//               width: 100%;
//               .slideListBox {
//                 overflow-x: scroll;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setHeaderPopup: () => dispatch(setHeaderPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

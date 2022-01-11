import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import image01 from "./img/main/image01.png";
import image02 from "./img/main/image02.png";
import collection_list01 from "./img/main/collection_list01.png";
import collection_person01 from "./img/main/collection_person01.png";
import collection_list02 from "./img/main/collection_list02.png";
import collection_person02 from "./img/main/collection_person02.png";
import collection_list03 from "./img/main/collection_list03.png";
import collection_person03 from "./img/main/collection_person03.png";
import collection_list04 from "./img/main/collection_list04.png";
import collection_person04 from "./img/main/collection_person04.png";
import users_list01 from "./img/main/users_list01.png";
import users_list02 from "./img/main/users_list02.png";
import users_list03 from "./img/main/users_list03.png";
import users_list04 from "./img/main/users_list04.png";
import item_list01 from "./img/main/item_list01.png";
import item_list02 from "./img/main/item_list02.png";
import item_list03 from "./img/main/item_list03.png";
import item_list04 from "./img/main/item_list04.png";
import item_list05 from "./img/main/item_list05.png";
import sample from "./img/sub/sample.png";
import I_nextBtn from "./img/main/I_nextBtn.svg";
import I_prevBtn from "./img/main/I_prevBtn.svg";
import I_heartO from "./img/main/I_heartO.svg";
import I_heart from "./img/main/I_heart.svg";
import I_starO from "./img/main/I_starO.svg";
import I_star from "./img/main/I_star.svg";
// import "./css/common.css";
// import "./css/font.css";
// import "./css/layout.css";
// import "./css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "./css/header.css";
import "./css/footer.css";
import "./css/swiper.min.css";

import title from "./img/main/title.svg";

import { putCommaAtPrice } from "./util/Util";

function Main({ store }) {
  const visualSwiperContRef = useRef();
  const visualSwiperRef = useRef();
  const collectionSwiperRef = useRef();
  const trendingSwiperRef = useRef();
  const itemSwiperRef = useRef();
  const userWrapRef = useRef();

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  let pathArray = pathname.split("/");
  let pathAddress = pathArray[pathArray.length - 1];

  const [intervalId, setIntervalId] = useState();
  const [visualSwiperIndex, setVisualSwiperIndex] = useState(0);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [trendingItemIndex, setTrendingItemIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [userIndex, setUserIndex] = useState(0);

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
    const contWidth = visualSwiperRef.current.children[0].offsetWidth;
    visualSwiperContRef.current.style.width = `${contWidth * 3}px`;
  }, []);

  useEffect(() => {
    if (visualSwiperRef.current.children.length) {
      if (intervalId) clearInterval(intervalId);

      setIntervalId(setInterval(onClickVisualSwiperBtn, 3000));
    }

    return clearInterval(intervalId);
  }, [visualSwiperIndex]);

  useEffect(() => {
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
    const wrapWidth = trendingSwiperRef.current.offsetWidth;
    const contWidth = trendingSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(8 / itemNumByPage);

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
    const wrapWidth = itemSwiperRef.current.offsetWidth;
    const contWidth = itemSwiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(itemList.length / itemNumByPage);

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
        <article class="visual">
          <div class="title">
            <h2>
              <img src={require("./img/main/title.png").default} />
            </h2>
            <p>
              Make money with NFTs that are easily issued and managed.
              <br /> Only in your own NFT gallery
            </p>
            <div>
              <a onClick={() => navigate("/marketplace")}>NFT Navigation</a>
              <a onClick={() => navigate("/marketplace")}>NFT Publication</a>
            </div>
          </div>
          <div class="swiper" ref={visualSwiperContRef}>
            <div class="swiper-container swiper-container-visual">
              <ol class="swiper-wrapper" ref={visualSwiperRef}>
                {[1, 2].map((cont, index) => (
                  <span key={index}>
                    <li class="swiper-slide">
                      <div
                        style={{
                          backgroundImage: `url(${image01})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></div>
                      <div>
                        <h3>Irregular Shape</h3>
                        <p>Guzuman</p>
                        <div class="info">
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
                        <div class="history">
                          <span>Offer History</span>
                          <ul>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                            <li>
                              <img
                                src={
                                  require("./img/main/image_person01.png")
                                    .default
                                }
                              />
                              <strong>5.44 KLAY</strong>
                              <span>21:54</span>
                            </li>
                          </ul>
                        </div>
                        <div class="button">
                          <a onClick={() => navigate("/singleitem")}>
                            View Item
                          </a>
                          <a onClick={() => navigate("/singleitem")}>
                            Place a Bid
                          </a>
                        </div>
                      </div>
                    </li>
                  </span>
                ))}
              </ol>
            </div>

            <div class="swiper-button-prev swiper-button-visual-prev"></div>
            <div
              class="swiper-button-next swiper-button-visual-next"
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
                  {[1, 2].map((cont, index) => (
                    <>
                      <span>
                        <li class="swiper-slide">
                          <a onClick={() => navigate("/singleitem")}>
                            <div
                              style={{
                                backgroundImage: `url(${collection_list01})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div>
                              <span
                                sstyle={{
                                  backgroundImage: `url(${collection_person01})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              ></span>
                              <dl>
                                <dt>Lalaredtu's Collection</dt>
                                <dd>
                                  <strong>Lalaredtu</strong>
                                  <p>
                                    This collection is a collection of 80
                                    individual works and has been exhibited at
                                    the Museum of Modern Art.
                                  </p>
                                </dd>
                              </dl>
                            </div>
                          </a>
                        </li>
                      </span>
                      <span>
                        <li class="swiper-slide">
                          <a onClick={() => navigate("/singleitem")}>
                            <div
                              style={{
                                backgroundImage: `url(${collection_list02})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div>
                              <span
                                style={{
                                  backgroundImage: `url(${collection_person02})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              ></span>
                              <dl>
                                <dt>Emilie</dt>
                                <dd>
                                  <strong>Antoin</strong>
                                  <p>
                                    dot image collection It was made for game
                                    development and was very popular.
                                  </p>
                                </dd>
                              </dl>
                            </div>
                          </a>
                        </li>
                      </span>
                      <span>
                        <li class="swiper-slide">
                          <a onClick={() => navigate("/singleitem")}>
                            <div
                              style={{
                                backgroundImage: `url(${collection_list03})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div>
                              <span
                                style={{
                                  backgroundImage: `url(${collection_person03})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              ></span>
                              <dl>
                                <dt>la piscine</dt>
                                <dd>
                                  <strong>Antoin</strong>
                                  <p>
                                    This collection pays homage to the works of
                                    Bead Hockney, allowing you to appreciate
                                    David's work with a different feel.
                                  </p>
                                </dd>
                              </dl>
                            </div>
                          </a>
                        </li>
                      </span>
                      <span>
                        <li class="swiper-slide">
                          <a onClick={() => navigate("/singleitem")}>
                            <div
                              style={{
                                backgroundImage: `url(${collection_list04})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div>
                              <span
                                style={{
                                  backgroundImage: `url(${collection_person04})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              ></span>
                              <dl>
                                <dt>Bleu</dt>
                                <dd>
                                  <strong>Henry junior</strong>
                                  <p>
                                    It is a work made with thickly pressed
                                    paint, and you can appreciate the collection
                                    in a variety of beautiful colors.
                                  </p>
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

        <article class="category">
          <div class="wrap">
            <h4 class="t">Market Category</h4>

            <ol class="list">
              <li>
                <a
                  onClick={() =>
                    navigate("/marketplace", { state: "Digital Art" })
                  }
                >
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
                    navigate("/marketplace", { state: "Virtual Worlds" })
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
                    navigate("/marketplace", { state: "Trading Card" })
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

        <article class="item">
          <div class="wrap">
            <h4 class="t">Trending NFT Item</h4>

            <div class="swiper">
              <div class="swiper-container swiper-container-trendingitem">
                <ol class="item item4 buy swiper-wrapper">
                  <div className="slideBox" ref={trendingSwiperRef}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((cont, index) => (
                      <span>
                        <li class="swiper-slide">
                          <a
                            onClick={() => navigate("/singleitem")}
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
                                <li>1.67 KLAY</li>
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
                class="swiper-button-prev swiper-button-trendingitem-prev"
                onClick={onClickTrendingPreBtn}
              ></div>
              <div
                class="swiper-button-next swiper-button-trendingitem-next"
                onClick={onClickTrendingNextBtn}
              ></div>
            </div>
          </div>
        </article>

        <article class="item">
          <div class="wrap">
            <h4 class="t">NEW NFT Item</h4>

            <div class="swiper">
              <div class="swiper-container swiper-container-newitem">
                <ol class="item item4 summary swiper-wrapper">
                  <div className="slideBox" ref={itemSwiperRef}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((cont, index) => (
                      <span>
                        <li class="swiper-slide">
                          <a
                            onClick={() => navigate("/singleitem")}
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
                                <li>1.67 KLAY</li>
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
                class="swiper-button-prev swiper-button-newitem-prev"
                onClick={onClickItemPreBtn}
              ></div>
              <div
                class="swiper-button-next swiper-button-newitem-next"
                onClick={onClickItemNextBtn}
              ></div>
            </div>
          </div>
        </article>

        <article class="users">
          <div class="wrap">
            <h4 class="t">Tips for Itemverse users</h4>

            <div class="swiper">
              <div class="swiper-container swiper-container-users">
                <ol class="list swiper-wrapper" ref={userWrapRef}>
                  {[1, 2].map((cont, index) => (
                    <>
                      <span>
                        <li class="swiper-slide">
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
                        <li class="swiper-slide">
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
                        <li class="swiper-slide">
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
                        <li class="swiper-slide">
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
                class="swiper-button-prev swiper-button-users-prev"
                onClick={onClickUserPreBtn}
              ></div>
              <div
                class="swiper-button-next swiper-button-users-next"
                onClick={onClickUserNextBtn}
              ></div>
            </div>
          </div>
        </article>
      </section>

      <footer id="footer">
        <div class="wrap">
          <div class="info">
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
          <div class="copy">
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
              <address>Copyright © 2021 Itemverse. All rights reserved.</address>
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
            width: 100%;
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

const trendingItemList = [
  {
    img: item_list01,
    like: true,
    likeCount: 1389,
    favorite: true,
    title: "Summer Pool",
    creator: "David",
    time: "6 minutes left",
    price: "0.35 KLAY",
  },
  {
    img: item_list02,
    like: false,
    likeCount: 2865,
    favorite: false,
    title: "Donald Duck",
    creator: "Carson",
    time: "7 days left",
    price: "1.67 KLAY",
  },
  {
    img: item_list03,
    like: true,
    likeCount: 589,
    favorite: false,
    title: "A Girl",
    creator: "Mark.X",
    time: "3 days left",
    price: "0.97 KLAY",
  },
  {
    img: item_list04,
    like: false,
    likeCount: 713,
    favorite: true,
    title: "Crushed Heard and aaaaaa",
    creator: "Alexandro Ambrosia",
    time: "365 days left",
    price: "12.62 KLAY",
  },
  {
    img: item_list05,
    like: false,
    likeCount: 295,
    favorite: false,
    title: "With Dogs",
    creator: "AP.GOD.Ryan",
    time: "17 minutes left",
    price: "1.02 KLAY",
  },
  {
    img: item_list01,
    like: true,
    likeCount: 1389,
    favorite: true,
    title: "Summer Pool",
    creator: "David",
    time: "6 minutes left",
    price: "0.35 KLAY",
  },
  {
    img: item_list02,
    like: false,
    likeCount: 2865,
    favorite: false,
    title: "Donald Duck",
    creator: "Carson",
    time: "7 days left",
    price: "1.67 KLAY",
  },
  {
    img: item_list03,
    like: true,
    likeCount: 589,
    favorite: false,
    title: "A Girl",
    creator: "Mark.X",
    time: "3 days left",
    price: "0.97 KLAY",
  },
  {
    img: item_list04,
    like: false,
    likeCount: 713,
    favorite: true,
    title: "Crushed Heard and aaaaaa",
    creator: "Alexandro Ambrosia",
    time: "365 days left",
    price: "12.62 KLAY",
  },
  {
    img: item_list05,
    like: false,
    likeCount: 295,
    favorite: false,
    title: "With Dogs",
    creator: "AP.GOD.Ryan",
    time: "17 minutes left",
    price: "1.02 KLAY",
  },
];
const itemList = [
  {
    img: item_list01,
    like: true,
    likeCount: 1389,
    favorite: true,
    title: "Summer Pool",
    creator: "David",
    time: "6 minutes left",
    price: "0.35 KLAY",
  },
  {
    img: item_list02,
    like: false,
    likeCount: 2865,
    favorite: false,
    title: "Donald Duck",
    creator: "Carson",
    time: "7 days left",
    price: "1.67 KLAY",
  },
  {
    img: item_list03,
    like: true,
    likeCount: 589,
    favorite: false,
    title: "A Girl",
    creator: "Mark.X",
    time: "3 days left",
    price: "0.97 KLAY",
  },
  {
    img: item_list04,
    like: false,
    likeCount: 713,
    favorite: true,
    title: "Crushed Heard and aaaaaa",
    creator: "Alexandro Ambrosia",
    time: "365 days left",
    price: "12.62 KLAY",
  },
  {
    img: item_list05,
    like: false,
    likeCount: 295,
    favorite: false,
    title: "With Dogs",
    creator: "AP.GOD.Ryan",
    time: "17 minutes left",
    price: "1.02 KLAY",
  },
  {
    img: item_list01,
    like: true,
    likeCount: 1389,
    favorite: true,
    title: "Summer Pool",
    creator: "David",
    time: "6 minutes left",
    price: "0.35 KLAY",
  },
  {
    img: item_list02,
    like: false,
    likeCount: 2865,
    favorite: false,
    title: "Donald Duck",
    creator: "Carson",
    time: "7 days left",
    price: "1.67 KLAY",
  },
  {
    img: item_list03,
    like: true,
    likeCount: 589,
    favorite: false,
    title: "A Girl",
    creator: "Mark.X",
    time: "3 days left",
    price: "0.97 KLAY",
  },
  {
    img: item_list04,
    like: false,
    likeCount: 713,
    favorite: true,
    title: "Crushed Heard and aaaaaa",
    creator: "Alexandro Ambrosia",
    time: "365 days left",
    price: "12.62 KLAY",
  },
  {
    img: item_list05,
    like: false,
    likeCount: 295,
    favorite: false,
    title: "With Dogs",
    creator: "AP.GOD.Ryan",
    time: "17 minutes left",
    price: "1.02 KLAY",
  },
];

const userList = [
  {
    img: users_list01,
    title: "Basic Guide",
    explain: "Before Participating in NFT Items",
  },
  {
    img: users_list02,
    title: "Buy NFTs",
    explain: "Discover and buy promising NFTs",
  },
  {
    img: users_list03,
    title: "production and sales",
    explain: "Easy-to-follow NFT production and sales",
  },
  {
    img: users_list04,
    title: "Itemverse Market",
    explain: "5 reasons to sell your NFTs on Itemverse",
  },
  {
    img: users_list01,
    title: "Basic Guide",
    explain: "Before Participating in NFT Items",
  },
  {
    img: users_list02,
    title: "Buy NFTs",
    explain: "Discover and buy promising NFTs",
  },
  {
    img: users_list03,
    title: "production and sales",
    explain: "Easy-to-follow NFT production and sales",
  },
  {
    img: users_list04,
    title: "Itemverse Market",
    explain: "5 reasons to sell your NFTs on Itemverse",
  },
];

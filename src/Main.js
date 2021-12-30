import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import image01 from "./img/main/image01.png";
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
  const swiperRef = useRef();
  const collectionRef = useRef();
  const trendingItemRef = useRef();
  const itemRef = useRef();
  const userRef = useRef();

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  let pathArray = pathname.split("/");
  let pathAddress = pathArray[pathArray.length - 1];

  const [intervalId, setIntervalId] = useState();
  const [titleswiperIndex, setTitleSwiperIndex] = useState(0);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [trendingItemIndex, setTrendingItemIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [userIndex, setUserIndex] = useState(0);

  function onClickTitleSwiper() {
    if (swiperRef.current?.scrollTo) {
      if (titleswiperIndex < swiperRef.current.children.length - 1) {
        swiperRef.current.scrollTo({
          left:
            swiperRef.current.children[0].offsetWidth * (titleswiperIndex + 1),
          behavior: "smooth",
        });
        setTitleSwiperIndex(titleswiperIndex + 1);
      } else {
        setTitleSwiperIndex(0);
        swiperRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  }

  function onClickCollectionPreBtn() {
    const wrapWidth = collectionRef.current.offsetWidth;
    const contWidth = collectionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(collectionList.length / itemNumByPage);

    if (collectionIndex > 0) setCollectionIndex(collectionIndex - 1);
    else setCollectionIndex(pageNum - 1);
  }

  function onClickCollectionNextBtn() {
    const wrapWidth = collectionRef.current.offsetWidth;
    const contWidth = collectionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(collectionList.length / itemNumByPage);

    if (collectionIndex < pageNum - 1) setCollectionIndex(collectionIndex + 1);
    else setCollectionIndex(0);
  }

  function onClickTrendingItemPreBtn() {
    const wrapWidth = trendingItemRef.current.offsetWidth;
    const contWidth = trendingItemRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(trendingItemList.length / itemNumByPage);

    if (trendingItemIndex > 0) setTrendingItemIndex(trendingItemIndex - 1);
    else setTrendingItemIndex(pageNum - 1);
  }

  function onClickTrendingItemNextBtn() {
    const wrapWidth = trendingItemRef.current.offsetWidth;
    const contWidth = trendingItemRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(trendingItemList.length / itemNumByPage);

    if (trendingItemIndex < pageNum - 1)
      setTrendingItemIndex(trendingItemIndex + 1);
    else setTrendingItemIndex(0);
  }

  function onClickItemPreBtn() {
    const wrapWidth = itemRef.current.offsetWidth;
    const contWidth = itemRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(itemList.length / itemNumByPage);

    if (itemIndex > 0) setItemIndex(itemIndex - 1);
    else setItemIndex(pageNum - 1);
  }

  function onClickItemNextBtn() {
    const wrapWidth = itemRef.current.offsetWidth;
    const contWidth = itemRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(itemList.length / itemNumByPage);

    if (itemIndex < pageNum - 1) setItemIndex(itemIndex + 1);
    else setItemIndex(0);
  }

  function onClickUserPreBtn() {
    const wrapWidth = userRef.current.offsetWidth;
    const contWidth = userRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(userList.length / itemNumByPage);

    if (userIndex > 0) setUserIndex(userIndex - 1);
    else setUserIndex(pageNum - 1);
  }

  function onClickUserNextBtn() {
    const wrapWidth = userRef.current.offsetWidth;
    const contWidth = userRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(userList.length / itemNumByPage);

    if (userIndex < pageNum - 1) setUserIndex(userIndex + 1);
    else setUserIndex(0);
  }

  useEffect(() => {
    if (swiperRef.current.children.length) {
      if (intervalId) clearInterval(intervalId);

      setIntervalId(setInterval(onClickTitleSwiper, 3000));
    }

    return clearInterval(intervalId);
  }, [titleswiperIndex]);

  useEffect(() => {
    const wrapWidth = collectionRef.current.offsetWidth;
    const contWidth = collectionRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(collectionList.length / itemNumByPage);

    if (collectionRef.current?.scrollTo) {
      if (collectionIndex < pageNum) {
        collectionRef.current.scrollTo({
          left: contWidth * itemNumByPage * collectionIndex,
          behavior: "smooth",
        });
      } else {
        collectionRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [collectionIndex]);

  useEffect(() => {
    const wrapWidth = trendingItemRef.current.offsetWidth;
    const contWidth = trendingItemRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(collectionList.length / itemNumByPage);

    if (trendingItemRef.current?.scrollTo) {
      if (trendingItemIndex < pageNum) {
        trendingItemRef.current.scrollTo({
          left: contWidth * itemNumByPage * trendingItemIndex,
          behavior: "smooth",
        });
      } else {
        trendingItemRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [trendingItemIndex]);

  useEffect(() => {
    const wrapWidth = itemRef.current.offsetWidth;
    const contWidth = itemRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(itemList.length / itemNumByPage);

    if (itemRef.current?.scrollTo) {
      if (itemIndex < pageNum) {
        itemRef.current.scrollTo({
          left: contWidth * itemNumByPage * itemIndex,
          behavior: "smooth",
        });
      } else {
        itemRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [itemIndex]);

  useEffect(() => {
    const wrapWidth = userRef.current.offsetWidth;
    const contWidth = userRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(userList.length / itemNumByPage);

    if (userRef.current?.scrollTo) {
      if (userIndex < pageNum) {
        userRef.current.scrollTo({
          left: contWidth * itemNumByPage * userIndex,
          behavior: "smooth",
        });
      } else {
        userRef.current.scrollTo({
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
          <div class="titleBox">
            <div className="topBox">
              <img src={title} />
              <p>
                Make money with NFTs that are easily issued and managed.
                <br /> Only in your own NFT gallery
              </p>
            </div>
            <div className="btnBox">
              <button
                className="navBtn"
                onClick={() => navigate("/marketplace/All")}
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

          <div className="swiperBox">
            <button className="rightBtn" onClick={onClickTitleSwiper}>
              <img src={I_nextBtn} alt="" />
            </button>
            <ul className="swiper" ref={swiperRef}>
              {[1, 2, 3].map((cont, index) => (
                <li class="swiper-slide" key={index}>
                  <div className="innerBox">
                    <img src={image01} alt="" />

                    <div className="textBox">
                      <div className="topBox">
                        <h3
                          className="title"
                          style={{
                            padding: 0,
                          }}
                        >
                          Irregular Shape
                        </h3>
                        <p className="creator">Guzuman</p>
                      </div>

                      <div className="bottomBox">
                        <div className="infoBox">
                          <dl className="price">
                            <dt>Current Bid</dt>
                            <dd>
                              2.867<span>KLAY</span>
                            </dd>
                          </dl>
                          <dl className="time">
                            <dt>Auction ending in</dt>
                            <dd>05:32:21</dd>
                          </dl>
                        </div>

                        <div class="history pc">
                          <span className="label">Offer History</span>
                          <ul className="historyList">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((cont, index) => (
                              <li key={index}>
                                <span>
                                  <img
                                    src={
                                      require("./img/main/image_person01.png")
                                        .default
                                    }
                                  />
                                  <strong>5.44 KLAY</strong>
                                </span>

                                <span>
                                  <span>21:54</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div class="buttonBox pc">
                          <button
                            className="viewBtn"
                            onClick={() => navigate("/singleitem")}
                          >
                            View Item
                          </button>
                          <button
                            className="placeBtn"
                            onClick={() => navigate("/singleitem")}
                          >
                            Place a Bid
                          </button>
                        </div>

                        <div class="buttonBox m">
                          <button className="placeBtn">Place a Bid</button>
                          <button className="viewBtn">View Artwork</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article class="collection">
          <div class="wrap" style={{ padding: 0 }}>
            <h4 class="t">Trending Item</h4>

            <div className="swiperBox">
              <ul className="swiper" ref={collectionRef}>
                {collectionList.map((cont, index) => (
                  <li key={index}>
                    <div
                      className="innerBox"
                      onClick={() => navigate("/bundleitem")}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <img className="item" src={cont.item} alt="" />

                      <div className="infoBox">
                        <img className="profImg" src={cont.person} alt="" />

                        <div className="titleBox">
                          <strong className="title">{cont.title}</strong>
                          <p className="creator">{cont.creator}</p>
                        </div>

                        <div className="description">{cont.description}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="prevBtn" onClick={onClickCollectionPreBtn}>
                <img src={I_prevBtn} alt="" />
              </button>

              <button
                className="nextBtn"
                id="locShadow"
                onClick={onClickCollectionNextBtn}
              >
                <img src={I_nextBtn} alt="" />
              </button>
            </div>
          </div>
        </article>

        <article class="category">
          <h4 class="t">Market Category</h4>

          <ol class="list">
            <li
              onClick={() => navigate("/marketplace/All")}
              style={{ cursor: "pointer" }}
            >
              <img src={require("./img/header/menu_all_off.png").default} />
              All
            </li>
            <li
              onClick={() => navigate("/marketplace/Collectibles")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={require("./img/header/menu_collectibles_off.png").default}
              />
              Collectibles
            </li>
            <li
              onClick={() => navigate("/marketplace/Digital Art")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={require("./img/header/menu_digitalart_off.png").default}
              />
              Digital Art
            </li>
            <li
              onClick={() => navigate("/marketplace/Trading Card")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={require("./img/header/menu_tradingcard_off.png").default}
              />
              Trading Cards
            </li>
            <li
              onClick={() => navigate("/marketplace/Music")}
              style={{ cursor: "pointer" }}
            >
              <img src={require("./img/header/menu_music_off.png").default} />
              Music
            </li>
            <li
              onClick={() => navigate("/marketplace/Virtual Worlds")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={require("./img/header/menu_virtualworlds_off.png").default}
              />
              Virtual Worlds
            </li>
            <li
              onClick={() => navigate("/marketplace/Sports")}
              style={{ cursor: "pointer" }}
            >
              <img src={require("./img/header/menu_sports_off.png").default} />
              Sports
            </li>
            <li
              onClick={() => navigate("/marketplace/ETC")}
              style={{ cursor: "pointer" }}
            >
              <img src={require("./img/main/category_etc.png").default} />
              ETC
            </li>
          </ol>
        </article>

        <article class="item">
          <h4 class="t">Trending NFT Item</h4>

          <div className="swiperBox">
            <ul className="swiper" ref={trendingItemRef}>
              {trendingItemList.map((cont, index) => (
                <li key={index}>
                  <div
                    className="innerBox"
                    onClick={() => navigate("/singleitem")}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="item"
                      style={{
                        backgroundImage: `url(${cont.img})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="infoBox">
                        <div className="topBar">
                          <span className="like">
                            <img src={cont.like ? I_heartO : I_heart} alt="" />

                            <p>{putCommaAtPrice(cont.likeCount)}</p>
                          </span>

                          <span className="favorite">
                            <img
                              src={cont.favorite ? I_starO : I_star}
                              alt=""
                            />
                          </span>
                        </div>

                        <div className="titleBox">
                          <p className="title">{cont.title}</p>
                          <p className="creator">{cont.creator}</p>
                        </div>

                        <div className="info">
                          <p className="time">{cont.time}</p>
                          <p className="price">{cont.price}</p>
                        </div>
                      </div>
                    </div>

                    <button className="buyBtn" onClick={() => {}}>
                      Buy Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button className="prevBtn" onClick={onClickTrendingItemPreBtn}>
              <img src={I_prevBtn} alt="" />
            </button>

            <button className="nextBtn" onClick={onClickTrendingItemNextBtn}>
              <img src={I_nextBtn} alt="" />
            </button>
          </div>
        </article>

        <article class="item">
          <h4 class="t">NEW NFT Item</h4>

          <div className="swiperBox">
            <ul className="swiper" ref={itemRef}>
              {itemList.map((cont, index) => (
                <li key={index}>
                  <div
                    className="innerBox"
                    onClick={() => navigate("/singleitem")}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="item"
                      style={{
                        backgroundImage: `url(${cont.img})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="infoBox">
                        <div className="topBar">
                          <span className="like">
                            <img src={cont.like ? I_heartO : I_heart} alt="" />

                            <p>{putCommaAtPrice(cont.likeCount)}</p>
                          </span>

                          <span className="favorite">
                            <img
                              src={cont.favorite ? I_starO : I_star}
                              alt=""
                            />
                          </span>
                        </div>

                        <div className="titleBox">
                          <p className="title">{cont.title}</p>
                          <p className="creator">{cont.creator}</p>
                        </div>

                        <div className="info">
                          <p className="time">{cont.time}</p>
                          <p className="price">{cont.price}</p>
                        </div>
                      </div>
                    </div>

                    <button className="buyBtn" onClick={() => {}}>
                      Buy Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button className="prevBtn" onClick={onClickItemPreBtn}>
              <img src={I_prevBtn} alt="" />
            </button>

            <button className="nextBtn" onClick={onClickItemNextBtn}>
              <img src={I_nextBtn} alt="" />
            </button>
          </div>
        </article>

        <article class="users">
          <h4 class="t">Tips for Itemverse users</h4>

          <div className="swiperBox">
            <ul className="swiper" ref={userRef}>
              {userList.map((cont, index) => (
                <li key={index}>
                  <div className="innerBox">
                    <img src={cont.img} alt="" />
                    <div className="infoBox">
                      <p className="title">{cont.title}</p>
                      <p className="explain">{cont.explain}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button className="prevBtn" onClick={onClickUserPreBtn}>
              <img src={I_prevBtn} alt="" />
            </button>

            <button className="nextBtn" onClick={onClickUserNextBtn}>
              <img src={I_nextBtn} alt="" />
            </button>
          </div>
        </article>
      </section>

      <footer id="footer">
        <div class="wrap">
          <div class="info">
            <div>
              <h5>
                <button href="./">
                  <img src={require("./img/header/logo.png").default} />
                </button>
              </h5>
              <p>
                Decentralized NFT marketplace Itemverse makes it easy and
                convenient to trade non-fungible tokens (NFTs) and crypto
                collectibles.
              </p>
              <div>
                <span>
                  <button href="mailto:contact@Itemverse.com">
                    Contact us
                  </button>
                </span>
                <span>
                  <button>English</button>
                </span>
              </div>
            </div>
            <div>
              <ul>
                <li>
                  <h6>MARKET</h6>
                  <ol>
                    <li>
                      <button onClick={() => navigate("/marketplace/All")}>
                        all about NFT
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/marketplace/Collectibles")}
                      >
                        Collectibles
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/marketplace/Digital Art")}
                      >
                        Digital Art
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/marketplace/Trading Card")}
                      >
                        Trading Card
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/marketplace/Music")}>
                        Music
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/marketplace/Virtual Worlds")}
                      >
                        Virtual Worlds
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/marketplace/Sports")}>
                        Sports
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/marketplace/ETC")}>
                        ETC
                      </button>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>MY ACCOUNT</h6>
                  <ol>
                    <li>
                      <button onClick={() => navigate("/myprof")}>
                        Profile setting
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/mycollection")}>
                        My Item
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/liked")}>
                        My Favourite
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/mywallet")}>
                        account setting
                      </button>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>EXPLORE</h6>
                  <ol>
                    <li>
                      <button onClick={() => navigate("/ranking")}>
                        User Ranking
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/exploredeal")}>
                        Transaction details
                      </button>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>CONTACT US</h6>
                  <ol>
                    <li>
                      <button href="mailto:contact@Itemverse.com">
                        contact@Itemverse.com
                      </button>
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
                  <button>Privacy Policy</button>
                </li>
                <li>
                  <button>Terms of Service</button>
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

  #main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .swiperBox {
      .swiper {
        display: flex;
        align-items: center;
        overflow-x: scroll;
        /* scroll-snap-type: x mandatory; */
        position: relative;

        &::-webkit-scrollbar {
          display: none;
        }

        li {
          /* scroll-snap-align: center; */
        }
      }

      .prevBtn,
      .nextBtn {
        position: absolute;
        z-index: 3;

        &.prevBtn {
          transform: translate(-8px, 0);
        }

        &.nextBtn {
          right: 0;
          transform: translate(8px, 0);
        }
      }
    }

    .visual {
      display: flex;
      justify-content: space-between;
      gap: 6.6%;
      padding: 100px 0 120px 120px;
      overflow: hidden;

      & > .titleBox {
        display: flex;
        flex-direction: column;
        gap: 100px;
        max-width: 670px;
        padding: 20px 0 0 0;

        .topBox {
          display: flex;
          flex-direction: column;
          gap: 34px;

          p {
            font-size: 24px;
            line-height: 42px;
          }
        }

        .btnBox {
          display: flex;
          gap: 28px;

          button {
            width: 320px;
            height: 90px;
            font-size: 32px;
            font-weight: bold;
            border-radius: 60px;

            &.navBtn {
              border: solid 2px #000;
            }

            &.pubBtn {
              color: #fff;
              background: #000;
            }
          }
        }
      }

      .swiperBox {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;

        .rightBtn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #000;
          position: absolute;
          z-index: 1;
          transform: translate(-12px, 0);

          img {
            width: 100%;
          }
        }

        .swiper {
          display: flex;
          align-items: center;
          overflow-x: scroll;
          /* scroll-snap-type: x mandatory; */

          &::-webkit-scrollbar {
            display: none;
          }

          .swiper-slide {
            /* scroll-snap-align: center; */
            padding: 20px;

            .innerBox {
              display: flex;
              max-width: 840px;
              max-height: 750px;
              border-radius: 20px;
              box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
              overflow: hidden;

              & > img {
                width: 63%;
                object-fit: cover;
              }

              .textBox {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 37%;
                padding: 6.66% 3% 3% 3%;
                overflow: hidden;

                .topBox {
                  .title {
                    font-size: 40px;
                    font-weight: bold;
                  }

                  .creator {
                    font-size: 22px;
                    font-weight: bold;
                  }
                }

                .bottomBox {
                  display: flex;
                  flex-direction: column;
                  gap: 34px;
                  overflow: hidden;

                  .infoBox {
                    display: flex;
                    flex-direction: column;
                    gap: 34px;

                    .price,
                    .time {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;

                      dt {
                        font-size: 14px;
                        font-weight: 500;
                      }

                      dd {
                        font-size: 30px;
                        font-weight: bold;

                        span {
                          font-size: 16px;
                        }
                      }
                    }
                  }

                  .history {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    overflow: hidden;

                    .label {
                      font-size: 14px;
                      font-weight: 500;
                    }

                    .historyList {
                      display: flex;
                      flex-direction: column;
                      gap: 12px;
                      height: 184px;
                      padding: 14px 16px;
                      background: #f8f8f8;
                      border-radius: 8px;
                      overflow-y: scroll;

                      &::-webkit-scrollbar {
                        width: 12px;
                        background-color: #f8f8f8;
                      }

                      &::-webkit-scrollbar-thumb {
                        border-radius: 12px;
                        background-color: #b7b7b7;
                        background-clip: padding-box;
                        border: 4px solid transparent;
                      }

                      li {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 30px;
                        font-size: 14px;

                        span {
                          display: flex;
                          align-items: center;
                          gap: 10px;
                        }
                      }
                    }
                  }

                  .buttonBox {
                    display: flex;
                    gap: 8px;

                    &.m {
                      display: none;
                    }

                    button {
                      flex: 1;
                      height: 42px;
                      font-size: 16px;
                      font-weight: bold;
                      border-radius: 8px;
                      border: solid 1px #000;

                      &.placeBtn {
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
    }

    .collection {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 1720px;

      .wrap {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;

        .t {
          padding: 0 20px;
        }

        .swiperBox {
          display: flex;
          align-items: center;
          position: relative;

          .swiper {
            display: flex;
            align-items: center;
            padding: 20px;
            overflow-x: scroll;

            li {
              padding: 0 40px 0 0;
              .innerBox {
                min-width: 390px;
                width: 390px;
                height: 628px;
                border-radius: 20px;
                box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
                overflow: hidden;
                position: relative;

                .item {
                  width: 100%;
                  height: 380px;
                  object-fit: cover;
                  position: relative;
                }

                .infoBox {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 19px;
                  padding: 0 20px;
                  position: relative;
                  z-index: 1;

                  .profImg {
                    width: 85px;
                    height: 85px;
                    border-radius: 50%;
                    position: absolute;
                    transform: translate(0, -55%);
                  }

                  .titleBox {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 13px;
                    padding: 62px 0 0 0;

                    .title {
                      font-size: 24px;
                    }

                    .creator {
                      font-size: 18px;
                      font-weight: 500;
                    }
                  }

                  .description {
                    flex: 1;
                    font-size: 14px;
                    text-align: center;
                    line-height: 2;
                    overflow-y: scroll;

                    &::-webkit-scrollbar {
                      display: none;
                    }
                  }
                }
              }
            }
          }

          .prevBtn,
          .nextBtn {
            position: absolute;
            z-index: 3;

            &.prevBtn {
              transform: translate(-8px, 0);
            }

            &.nextBtn {
              right: 0;
              transform: translate(8px, 0);
            }
          }
        }
      }
    }

    .category {
      display: flex;
      flex-direction: column;
      gap: 40px;
      max-width: 1720px;
      width: 100%;
      padding: 0 20px;

      .list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        overflow: unset;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 192px;
          width: 192px;
          height: 64px;
          margin: 0;
          letter-spacing: -0.2px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          position: relative;

          img {
            width: 20px;
            height: 20px;
            left: 20px;
            position: absolute;
          }

          &:nth-of-type(2),
          &:nth-of-type(4),
          &:nth-of-type(6) {
            justify-content: space-between;
            padding: 0 20px;

            img {
              left: 0;
              position: relative;
            }
          }
        }
      }
    }

    & > .item {
      display: flex;
      flex-direction: column;
      gap: 40px;
      max-width: 1720px;
      width: 100%;

      .t {
        padding: 0 20px;
      }

      .swiperBox {
        display: flex;
        align-items: center;
        position: relative;

        .swiper {
          display: flex;
          align-items: center;
          width: 100%;
          overflow-x: scroll;
          padding: 0 20px;

          li {
            padding: 0 20px 0 0;

            .innerBox {
              display: flex;
              flex-direction: column;
              width: 320px;
              height: 520px;
              border-radius: 20px;
              overflow: hidden;

              .item {
                display: flex;
                align-items: flex-end;
                width: 100%;
                height: 456px;
                object-fit: contain;

                .infoBox {
                  width: 100%;
                  height: 150px;
                  color: #fff;
                  padding: 10px 20px 16px 20px;
                  background: rgba(0, 0, 0, 0.3);
                  -webkit-backdrop-filter: blur(6px);
                  backdrop-filter: blur(6px);

                  .topBar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .like {
                      display: flex;
                      align-items: center;
                      gap: 10px;
                      color: #fff;
                      font-weight: 500;

                      img {
                        width: 20px;
                      }
                    }

                    .favorite {
                      width: 20px;
                    }
                  }

                  .titleBox {
                    display: flex;
                    flex-direction: column;
                    margin: 10px 0 0 0;
                    font-weight: 500;

                    .title {
                      font-size: 26px;
                      line-height: 36px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }

                    .creator {
                      font-size: 18px;
                      line-height: 22px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                  }

                  .info {
                    display: flex;
                    justify-content: space-between;
                    margin: 12px 0 0 0;

                    .time {
                      font-size: 14px;
                      color: #e5e5e5;
                    }

                    .price {
                      font-size: 18px;
                    }
                  }
                }
              }

              .buyBtn {
                flex: 1;
                font-size: 18px;
                font-weight: 500;
                color: #fff;
                background: #222;
              }
            }
          }
        }
      }
    }

    .users {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 1720px;
      width: 100%;

      .t {
        padding: 0 20px;
      }

      .swiperBox {
        display: flex;
        align-items: center;
        position: relative;

        .swiper {
          display: flex;
          align-items: center;
          width: 100%;
          overflow-x: scroll;
          padding: 20px;

          li {
            padding: 0 40px 0 0;

            .innerBox {
              display: flex;
              flex-direction: column;
              width: 390px;
              height: 416px;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);

              img {
                height: 300px;
              }

              .infoBox {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 9px;
                padding: 20px;

                .title {
                  font-size: 26px;
                  font-weight: 500;
                }

                .explain {
                  font-size: 18px;
                  color: #555;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1800px) and (min-width: 1440px) {
    #main {
      .visual {
        .swiperBox {
          .swiper {
            .swiper-slide {
              .innerBox {
                .textBox {
                  .bottomBox {
                    gap: 20px;

                    .infoBox {
                      .price,
                      .time {
                        flex-direction: column;
                        align-items: unset;

                        dd {
                          text-align: end;
                        }
                      }
                    }

                    .history {
                      .historyList {
                        height: 100px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .collection,
      .category,
      .item,
      .users {
        max-width: 1290px;

        &.item {
          .swiperBox {
            width: 1040px;
          }
        }

        &.users {
          .swiperBox {
            width: 1250px;

            .swiper {
              li {
                padding: 0 20px 0 0;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1440px) {
    #main {
      .visual {
        flex-direction: column;
        align-items: center;
        gap: 40px;
        padding: 100px 0 0 0;
        margin: 0 0 50px 0;

        .titleBox {
          padding: 0;
        }

        .swiperBox {
          max-width: 920px;
          padding: 0 0 0 20px;

          .swiper {
            .swiper-slide {
              .innerBox {
                height: 1140px;
              }
            }
          }
        }
      }

      .collection,
      .category,
      .item,
      .users {
        max-width: 860px;

        &.category {
          .list {
            justify-content: center;
          }
        }

        &.item {
          .swiperBox {
            width: 700px;
          }
        }
        &.users {
          .swiperBox {
            width: 840px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 920px) {
    #main {
      .swiperBox {
        .nextBtn,
        .prevBtn {
          width: 36px;

          &.nextBtn {
            transform: translate(-7px, 0);
          }

          &.prevBtn {
            display: none;
          }
        }
      }

      .visual {
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 0;

        .titleBox {
          align-items: center;
          gap: 26px;
          width: 310px;

          .topBox {
            align-items: center;

            img {
              width: 262px;
            }

            p {
              font-size: 12px;
              line-height: 1.67;
            }
          }

          .btnBox {
            gap: 10px;

            button {
              width: 150px;
              height: 42px;
              font-size: 16px;
            }
          }
        }

        .swiperBox {
          max-width: 360px;

          .rightBtn {
            width: 36px;
            height: 36px;
            right: 0;
            transform: translate(-7px, 0);
          }

          .swiper {
            .swiper-slide {
              .innerBox {
                display: flex;
                flex-direction: column;
                height: 570px;

                img {
                  width: 100%;
                  height: 56%;
                }

                .textBox {
                  flex: 1;
                  width: 100%;
                  padding: 15px 15px 25px 15px;

                  .topBox {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;

                    .title {
                      font-size: 24px;
                    }

                    .creator {
                      font-size: 14px;
                      color: #555;
                    }
                  }

                  .bottomBox {
                    height: unset;

                    .infoBox {
                      flex-direction: row;
                      gap: unset;
                      justify-content: space-between;

                      .price,
                      .time {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;

                        dt {
                          font-size: 12px;
                          font-weight: bold;
                          color: #000;
                        }

                        dd {
                          font-size: 24px;
                          font-weight: 900;

                          span {
                            font-size: 24px;
                          }
                        }
                      }
                    }

                    .history {
                      display: none;
                    }

                    .buttonBox {
                      &.pc {
                        display: none;
                      }

                      &.m {
                        display: flex;

                        button {
                          font-size: 14px;
                          font-weight: 500;
                          border-radius: 21px;
                        }

                        .placeBtn {
                        }

                        .viewBtn {
                          border: solid 2px #000;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .collection {
        max-width: 360px;

        .wrap {
          .swiperBox {
            .swiper {
              li {
                width: 340px;
                padding: 0 20px 0 0;

                .innerBox {
                  min-width: 320px;
                  width: 320px;
                  height: 498px;

                  .item {
                    height: 300px;
                  }

                  .infoBox {
                    gap: 22px;

                    .profImg {
                      width: 44px;
                      height: 44px;
                    }

                    .titleBox {
                      gap: 8px;
                      padding: 38px 0 0 0;
                    }

                    .description {
                      font-size: 12px;
                    }
                  }
                }
              }
            }
          }
        }
        .nextBtn#locShadow {
          transform: translate(-5px, 0);
        }
      }

      .category {
        max-width: 360px;

        .list {
          gap: 12px;

          li {
            width: 156px;
            min-width: 156px;
            height: 42px;
            font-size: 16px;

            &:nth-of-type(n + 3):nth-of-type(-n + 5) {
              justify-content: center;
            }

            img {
              display: none;
            }
          }
        }
      }

      .item {
        gap: 30px;
        max-width: 360px;

        .swiperBox {
          max-width: 360px;

          .list {
            li {
              width: 156px;
              min-width: 156px;
              height: 42px;
              font-size: 16px;

              img {
                display: none;
              }
            }
          }
        }
      }

      .users {
        gap: 10px;
        max-width: 360px;

        .swiperBox {
          max-width: 360px;

          .swiper {
            li {
              .innerBox {
                width: 320px;
                height: 340px;

                img {
                  height: 246px;
                }

                .infoBox {
                  gap: 8px;
                  padding: 15px 17px;

                  .title {
                    font-size: 20px;
                  }

                  .explain {
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  #footer {
    button {
      text-align: start;
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

const collectionList = [
  {
    item: collection_list01,
    person: collection_person01,
    title: "Lalaredtu's Collection",
    creator: "Lalaredtu",
    description: (
      <p>
        This item is a item of 80 individual works and has been exhibited at the
        Museum of Modern Art.
      </p>
    ),
  },
  {
    item: collection_list02,
    person: collection_person02,
    title: "Emilie",
    creator: "Antoin",
    description: (
      <p>
        dot image item It was made for game
        <br /> development and was very popular.
      </p>
    ),
  },
  {
    item: collection_list03,
    person: collection_person03,
    title: "la piscine",
    creator: "Antoin",
    description: (
      <p>
        This item pays homage to the works of
        <br /> Bead Hockney, allowing you to appreciate
        <br /> David's work with a different feel.
      </p>
    ),
  },
  {
    item: collection_list04,
    person: collection_person04,
    title: "Bleu",
    creator: "Henry junior",
    description: (
      <p>
        It is a work made with thickly pressed
        <br /> paint, and you can appreciate the item in
        <br /> a variety of beautiful colors.
      </p>
    ),
  },
  {
    item: collection_list01,
    person: collection_person01,
    title: "Lalaredtu's Item",
    creator: "Lalaredtu",
    description:
      "This item is a item of 80 individual works and has been exhibited at the Museum of Modern Art.",
  },
  {
    item: collection_list02,
    person: collection_person02,
    title: "Emilie",
    creator: "Antoin",
    description:
      "dot image item It was made for game development and was very popular.",
  },
  {
    item: collection_list03,
    person: collection_person03,
    title: "la piscine",
    creator: "Antoin",
    description:
      "This item pays homage to the works of Bead Hockney, allowing you to appreciate David's work with a different feel.",
  },
  {
    item: collection_list04,
    person: collection_person04,
    title: "Bleu",
    creator: "Henry junior",
    description:
      "It is a work made with thickly pressed paint, and you can appreciate the collection in a variety of beautiful colors.",
  },
  {
    item: collection_list04,
    person: collection_person04,
    title: "Bleu",
    creator: "Henry junior",
    description:
      "It is a work made with thickly pressed paint, and you can appreciate the collection in a variety of beautiful colors.",
  },
];

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

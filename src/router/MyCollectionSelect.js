import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import s2 from "../img/sub/s2.png";
import s6 from "../img/sub/s6.png";
import s7 from "../img/sub/s7.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";

import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { useEffect, useRef, useState } from "react";
import { isUserMobile } from "../util/Util";

function MyFavorite({ store }) {
  // const navigate = useNavigate();
  // const recentlyRef = useRef();
  // const onSaleRef = useRef();
  // const onAuctionRef = useRef();

  // const [recentlyIndex, setRecentlyIndex] = useState(0);
  // const [onSaleIndex, setOnSaleIndex] = useState(0);
  // const [onAuctionIndex, setOnAuctionIndex] = useState(0);
  // const [mMenuPopup, setMMenuPopup] = useState(false);

  // function onClickRecentlyPreBtn() {
  //   const wrapWidth = recentlyRef.current.offsetWidth;
  //   const contWidth = recentlyRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (recentlyIndex > 0) setRecentlyIndex(recentlyIndex - 1);
  //   else setRecentlyIndex(pageNum - 1);
  // }

  // function onClickRecentlyNextBtn() {
  //   const wrapWidth = recentlyRef.current.offsetWidth;
  //   const contWidth = recentlyRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (recentlyIndex < pageNum - 1) setRecentlyIndex(recentlyIndex + 1);
  //   else setRecentlyIndex(0);
  // }

  // function onClickOnSalePreBtn() {
  //   const wrapWidth = onSaleRef.current.offsetWidth;
  //   const contWidth = onSaleRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (onSaleIndex > 0) setOnSaleIndex(onSaleIndex - 1);
  //   else setOnSaleIndex(pageNum - 1);
  // }

  // function onClickOnSaleNextBtn() {
  //   const wrapWidth = onSaleRef.current.offsetWidth;
  //   const contWidth = onSaleRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (onSaleIndex < pageNum - 1) setOnSaleIndex(onSaleIndex + 1);
  //   else setOnSaleIndex(0);
  // }

  // function onClickOnAuctionPreBtn() {
  //   const wrapWidth = onAuctionRef.current.offsetWidth;
  //   const contWidth = onAuctionRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (onAuctionIndex > 0) setOnAuctionIndex(onAuctionIndex - 1);
  //   else setOnAuctionIndex(pageNum - 1);
  // }

  // function onClickOnAuctionNextBtn() {
  //   const wrapWidth = onAuctionRef.current.offsetWidth;
  //   const contWidth = onAuctionRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (onAuctionIndex < pageNum - 1) setOnAuctionIndex(onAuctionIndex + 1);
  //   else setOnAuctionIndex(0);
  // }

  // useEffect(() => {
  //   const wrapWidth = recentlyRef.current.offsetWidth;
  //   const contWidth = recentlyRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (recentlyRef.current?.scrollTo) {
  //     if (recentlyIndex < pageNum) {
  //       recentlyRef.current.scrollTo({
  //         left: contWidth * itemNumByPage * recentlyIndex,
  //         behavior: "smooth",
  //       });
  //     } else {
  //       recentlyRef.current.scrollTo({
  //         left: 0,
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // }, [recentlyIndex]);

  // useEffect(() => {
  //   const wrapWidth = onSaleRef.current.offsetWidth;
  //   const contWidth = onSaleRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (onSaleRef.current?.scrollTo) {
  //     if (onSaleIndex < pageNum) {
  //       onSaleRef.current.scrollTo({
  //         left: contWidth * itemNumByPage * onSaleIndex,
  //         behavior: "smooth",
  //       });
  //     } else {
  //       onSaleRef.current.scrollTo({
  //         left: 0,
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // }, [onSaleIndex]);

  // useEffect(() => {
  //   const wrapWidth = onAuctionRef.current.offsetWidth;
  //   const contWidth = onAuctionRef.current.children[0].offsetWidth;
  //   const itemNumByPage = Math.floor(wrapWidth / contWidth);
  //   const pageNum = Math.ceil(10 / itemNumByPage);

  //   if (onAuctionRef.current?.scrollTo) {
  //     if (onAuctionIndex < pageNum) {
  //       onAuctionRef.current.scrollTo({
  //         left: contWidth * itemNumByPage * onAuctionIndex,
  //         behavior: "smooth",
  //       });
  //     } else {
  //       onAuctionRef.current.scrollTo({
  //         left: 0,
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // }, [onAuctionIndex]);

  return (
    <SignPopupBox>
      <section id="sub">
        <article class="profile_home">
          <div class="collection_home colletcmarket">
            <img src={require("../img/sub/home_bg.png").default} />
            <div class="wrap">
              <div class="collection_detail">
                <div class="pro_img">
                  <img
                    src={require("../img/sub/home_profile.png").default}
                    class="dotimg"
                  />
                  <div class="home_icons mhome home12 on">
                    <div class="mhome_wrap">
                      <ul>
                        <li>
                          <a href="">Transaction History</a>
                        </li>
                        <li>
                          <a href="">Changing information</a>
                        </li>
                        <li>
                          <a href="">Loyalty History</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <h2 class="notop">Henry junior's Collection</h2>
                <h4>
                  Henry is a mixed-media artist living in the
                  <br class="mo" /> Bay Area and uses
                  <br class="pc" />a stream of consciousness
                  <br class="mo" /> approach to his work.
                </h4>
                <div class="numbers">
                  <ul>
                    <li>
                      <h5>Items</h5>
                      <p>296</p>
                    </li>
                    <li>
                      <h5>Owners</h5>
                      <p>102</p>
                    </li>
                    <li>
                      <h5>Avg price</h5>
                      <p>
                        2.22<b>ETH</b>
                        <span>$ 307.21</span>
                      </p>
                    </li>
                    <li>
                      <h5>Volume Traded</h5>
                      <p>
                        73.12<span>$ 307.21</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="move off">
              <div class="right_move">
                <div class="real_sec">
                  <div class="item marbo">
                    <div class="full">
                      <h4 class="t releft">Recently Listed</h4>
                      <a href="" class="replus">
                        Register a new item
                      </a>
                    </div>
                    <div class="swiper">
                      <div class="swiper-container swiper-container-newitem">
                        <ol class="item item5 summary swiper-wrapper">
                          <div className="slideBox">
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s2})`,
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
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s6})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s8})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s7})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s6})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s6})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                          </div>
                        </ol>
                      </div>
                      <div class="swiper-button-prev swiper-button-newitem-prev"></div>
                      <div class="swiper-button-next swiper-button-newitem-next"></div>
                    </div>
                  </div>

                  <div class="item marbo">
                    <h4 class="t">On Sale Item</h4>
                    <div class="swiper">
                      <div class="swiper-container swiper-container-newitem newitem2">
                        <ol class="item item5 summary swiper-wrapper">
                          <div className="slideBox">
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s2})`,
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
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s6})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
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
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s8})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s7})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s6})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                          </div>
                        </ol>
                      </div>
                      <div class="swiper-button-prev swiper-button-newitem-prev newitemprev2"></div>
                      <div class="swiper-button-next swiper-button-newitem-next newitemnext2"></div>
                    </div>
                  </div>

                  <div class="item marbo">
                    <h4 class="t">On Auction</h4>
                    <div class="swiper">
                      <div class="swiper-container swiper-container-newitem newitem3">
                        <ol class="item item5 summary swiper-wrapper">
                          <div className="slideBox">
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s2})`,
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
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s6})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s8})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s7})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s6})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                            <span>
                              <li class="swiper-slide">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage: `url(${s6})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div class="on">
                                    <ul>
                                      <li class="heart on">1,389</li>
                                      <li class="star on"></li>
                                    </ul>
                                    <div>Summer Pool</div>
                                    <span>David</span>
                                    <ol>
                                      <li>6 minutes left</li>
                                      <li>1.67 AUSP</li>
                                    </ol>
                                  </div>
                                  <div class="top blk">
                                    <ul>
                                      <li></li>
                                      <li class="dot">
                                        <div class="choose">
                                          <ul>
                                            <li>Sale</li>
                                            <li>Hand Over</li>
                                            <li>Edit</li>
                                            <li>Collection Change</li>
                                            <li>Unhide</li>
                                          </ul>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </a>
                              </li>
                            </span>
                          </div>
                        </ol>
                      </div>
                      <div class="swiper-button-prev swiper-button-newitem-prev newitemprev3"></div>
                      <div class="swiper-button-next swiper-button-newitem-next newitemnext3"></div>
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
  .swiper-wrapper,
  .slideBox {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    transition: 0.8s;

    &::-webkit-scrollbar {
      display: none;
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

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorite);

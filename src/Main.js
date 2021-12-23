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
import I_rtArw3 from "./img/main/I_rtArw3.svg";
import sample from "./img/sub/sample.png";
import "./css/common.css";
import "./css/font.css";
import "./css/layout.css";
import "./css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "./css/header.css";
import "./css/footer.css";
import "./css/swiper.min.css";

import title from "./img/main/title.svg";

function Main({ store, setConnect }) {
  const swiperRef = useRef();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  let pathArray = pathname.split("/");
  let pathAddress = pathArray[pathArray.length - 1];

  const [intervalId, setIntervalId] = useState();
  const [swiperIndex, setSwiperIndex] = useState(0);

  function featuredIntervalFunc() {
    if (swiperRef.current?.scrollTo) {
      if (swiperIndex < swiperRef.current.children.length - 1) {
        swiperRef.current.scrollTo({
          left: swiperRef.current.children[0].offsetWidth * (swiperIndex + 1),
          behavior: "smooth",
        });
        setSwiperIndex(swiperIndex + 1);
      } else {
        setSwiperIndex(0);
        swiperRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  }

  useEffect(() => {
    if (swiperRef.current.children.length) {
      if (intervalId) clearInterval(intervalId);

      setIntervalId(setInterval(featuredIntervalFunc, 3000));
    }

    return clearInterval(intervalId);
  }, [swiperIndex]);

  return (
    <IndexBox>
      <section id="main">
        <article class="visual">
          <div class="title">
            <h2>
              <img src={title} />
            </h2>
            <p>
              Make money with NFTs that are easily issued and managed. Only in
              your own NFT gallery
            </p>
            <div>
              <a href="#">NFT Navigation</a>
              <a href="#">NFT Publication</a>
            </div>
          </div>

          <div className="swiperBox">
            <button className="rightBtn" onClick={() => {}}>
              <img src={I_rtArw3} alt="" />
            </button>
            <ul className="swiper" ref={swiperRef}>
              {[1, 2, 3].map((cont, index) => (
                <li class="swiper-slide" key={index}>
                  <div className="innerBox">
                    <img src={image01} alt="" />

                    <div>
                      <h3>Irregular Shape</h3>
                      <p>Guzuman</p>
                      <div class="info">
                        <dl>
                          <dt>Current Bid</dt>
                          <dd>
                            2.867<span>AUSP</span>
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
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                          <li>
                            <img
                              src={
                                require("./img/main/image_person01.png").default
                              }
                            />
                            <strong>5.44 AUSP</strong>
                            <span>21:54</span>
                          </li>
                        </ul>
                      </div>
                      <div class="button">
                        <a href="#">View Item</a>
                        <a href="#">Place a Bid</a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <div class="swiper">
            <div class="swiper-container swiper-container-visual">
              <ol class="swiper-wrapper"></ol>
            </div>

            <div class="swiper-button-prev swiper-button-visual-prev"></div>
            <div class="swiper-button-next swiper-button-visual-next"></div>
          </div> */}
        </article>

        <article class="collection">
          <div class="wrap">
            <h4 class="t">Trending Collection</h4>
            <div class="swiper">
              <div class="swiper-container swiper-container-collection">
                <ol class="list swiper-wrapper">
                  <li class="swiper-slide">
                    <a href="#">
                      <div
                        style={{ backgroundImage: `url(${collection_list01})` }}
                      ></div>
                      <div>
                        <span
                          style={{
                            backgroundImage: `url(${collection_person01})`,
                          }}
                        ></span>
                        <dl>
                          <dt>Lalaredtu's Collection</dt>
                          <dd>
                            <strong>Lalaredtu</strong>
                            <p>
                              This collection is a collection of 80 individual
                              works and has been exhibited at the Museum of
                              Modern Art.
                            </p>
                          </dd>
                        </dl>
                      </div>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#">
                      <div
                        style={{ backgroundImage: `url(${collection_list02})` }}
                      ></div>
                      <div>
                        <span
                          style={{
                            backgroundImage: `url(${collection_person02})`,
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
                  <li class="swiper-slide">
                    <a href="#">
                      <div
                        style={{ backgroundImage: `url(${collection_list03})` }}
                      ></div>
                      <div>
                        <span
                          style={{
                            backgroundImage: `url(${collection_person03})`,
                          }}
                        ></span>
                        <dl>
                          <dt>la piscine</dt>
                          <dd>
                            <strong>Antoin</strong>
                            <p>
                              This collection pays homage to the works of Bead
                              Hockney, allowing you to appreciate David's work
                              with a different feel.
                            </p>
                          </dd>
                        </dl>
                      </div>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#">
                      <div
                        style={{ backgroundImage: `url(${collection_list04})` }}
                      ></div>
                      <div>
                        <span
                          style={{
                            backgroundImage: `url(${collection_person04})`,
                          }}
                        ></span>
                        <dl>
                          <dt>Bleu</dt>
                          <dd>
                            <strong>Henry junior</strong>
                            <p>
                              It is a work made with thickly pressed paint, and
                              you can appreciate the collection in a variety of
                              beautiful colors.
                            </p>
                          </dd>
                        </dl>
                      </div>
                    </a>
                  </li>
                </ol>
              </div>

              <div class="swiper-button-prev swiper-button-collection-prev"></div>
              <div class="swiper-button-next swiper-button-collection-next"></div>
            </div>
          </div>
        </article>

        <article class="category">
          <div class="wrap">
            <h4 class="t">Market Category</h4>

            <ol class="list">
              <li>
                <a href="#">
                  <img src={require("./img/main/category_art.png").default} />
                  Art
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={require("./img/main/category_music.png").default} />
                  Music
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src={
                      require("./img/main/category_virtualworld.png").default
                    }
                  />
                  Virtual World
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src={
                      require("./img/main/category_tradingcards.png").default
                    }
                  />
                  Trading Cards
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src={
                      require("./img/main/category_collectibles.png").default
                    }
                  />
                  Collectibles
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src={require("./img/main/category_sports.png").default}
                  />
                  Sports
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src={require("./img/main/category_utility.png").default}
                  />
                  Utility
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={require("./img/main/category_etc.png").default} />
                  etc
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
                <ol class="item item5 buy swiper-wrapper">
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                        <p>Buy Now</p>
                      </div>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                        <p>Buy Now</p>
                      </div>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                        <p>Buy Now</p>
                      </div>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                        <p>Buy Now</p>
                      </div>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                        <p>Buy Now</p>
                      </div>
                    </a>
                  </li>
                </ol>
              </div>

              <div class="swiper-button-prev swiper-button-trendingitem-prev"></div>
              <div class="swiper-button-next swiper-button-trendingitem-next"></div>
            </div>
          </div>
        </article>

        <article class="item">
          <div class="wrap">
            <h4 class="t">NEW NFT Item</h4>

            <div class="swiper">
              <div class="swiper-container swiper-container-newitem">
                <ol class="item item4 summary swiper-wrapper">
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#" style={{ backgroundImage: `url(${sample})` }}>
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
                    </a>
                  </li>
                </ol>
              </div>

              <div class="swiper-button-prev swiper-button-newitem-prev"></div>
              <div class="swiper-button-next swiper-button-newitem-next"></div>
            </div>
          </div>
        </article>

        <article class="users">
          <div class="wrap">
            <h4 class="t">Tips for Auspice users</h4>

            <div class="swiper">
              <div class="swiper-container swiper-container-users">
                <ol class="list swiper-wrapper">
                  <li class="swiper-slide">
                    <a href="#">
                      <div
                        style={{ backgroundImage: `url(${users_list01})` }}
                      ></div>
                      <dl>
                        <dt>Basic Guide</dt>
                        <dd>Before Participating in NFT Collection</dd>
                      </dl>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#">
                      <div
                        style={{ backgroundImage: `url(${users_list02})` }}
                      ></div>
                      <dl>
                        <dt>Buy NFTs</dt>
                        <dd>Discover and buy promising NFTs</dd>
                      </dl>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#">
                      <div
                        style={{ backgroundImage: `url(${users_list03})` }}
                      ></div>
                      <dl>
                        <dt>production and sales</dt>
                        <dd>Easy-to-follow NFT production and sales</dd>
                      </dl>
                    </a>
                  </li>
                  <li class="swiper-slide">
                    <a href="#">
                      <div
                        style={{ backgroundImage: `url(${users_list04})` }}
                      ></div>
                      <dl>
                        <dt>Auspice Market</dt>
                        <dd>5 reasons to sell your NFTs on Auspice</dd>
                      </dl>
                    </a>
                  </li>
                </ol>
              </div>

              <div class="swiper-button-prev swiper-button-users-prev"></div>
              <div class="swiper-button-next swiper-button-users-next"></div>
            </div>
          </div>
        </article>
      </section>

      <footer id="footer">
        <div class="wrap">
          <div class="info">
            <div>
              <h5>
                <a href="./">
                  <img src={require("./img/footer/logo.png").default} />
                </a>
              </h5>
              <p>
                Decentralized NFT marketplace AUSPICE makes it easy and
                convenient to trade non-fungible tokens (NFTs) and crypto
                collectibles.
              </p>
              <div>
                <span>
                  <a href="mailto:contact@Auspice.com">Contact us</a>
                </span>
                <span>
                  <a href="#">English</a>
                </span>
              </div>
            </div>
            <div>
              <ul>
                <li>
                  <h6>MARKET</h6>
                  <ol>
                    <li>
                      <a href="#">all about NFT</a>
                    </li>
                    <li>
                      <a href="#">Digital art</a>
                    </li>
                    <li>
                      <a href="#">Trading cards</a>
                    </li>
                    <li>
                      <a href="#">Music</a>
                    </li>
                    <li>
                      <a href="#">Virtual Worlds</a>
                    </li>
                    <li>
                      <a href="#">Utility</a>
                    </li>
                    <li>
                      <a href="#">Sports</a>
                    </li>
                    <li>
                      <a href="#">ETC</a>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>MY ACCOUNT</h6>
                  <ol>
                    <li>
                      <a href="#">Profile setting</a>
                    </li>
                    <li>
                      <a href="#">My Collectiont</a>
                    </li>
                    <li>
                      <a href="#">My Favourite</a>
                    </li>
                    <li>
                      <a href="#">account setting</a>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>EXPLORE</h6>
                  <ol>
                    <li>
                      <a href="#">User Ranking</a>
                    </li>
                    <li>
                      <a href="#">Transaction details</a>
                    </li>
                  </ol>
                </li>
                <li>
                  <h6>CONTACT US</h6>
                  <ol>
                    <li>
                      <a href="mailto:contact@Auspice.com">
                        contact@Auspice.com
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
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div>
              <address>Copyright © 2021 AUSPICE. All rights reserved.</address>
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
    .visual {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      user-select: none;

      .swiperBox {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;

        .rightBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #000;
          position: absolute;
          z-index: 1;
          transform: translate(-50%, 0);
        }

        .swiper {
          display: flex;
          align-items: center;

          padding: 4px;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;

          &::-webkit-scrollbar {
            display: none;
          }

          .swiper-slide {
            scroll-snap-align: center;
            padding: 0 70px 0 0;
            
            .innerBox {
              display: flex;
              width: 840px;
              height: 750px;
              border-radius: 20px;
              box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
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

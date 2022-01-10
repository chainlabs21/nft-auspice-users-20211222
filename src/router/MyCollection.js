import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

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
import { useRef, useState } from "react";

function MyCollection({ store, setConnect }) {
  const navigate = useNavigate();
  const collectionRef = useRef();

  const [popupIndex, setPopupIndex] = useState(-1);

  function onclickCollectionPopupBtn(index) {
    if (index === popupIndex) setPopupIndex(-1);
    else setPopupIndex(index);
  }

  return (
    <SignPopupBox>
      <section id="sub">
        <article class="profile_home">
          <div class="collection_home add">
            <div class="move off">
              <div class="right_move">
                <div class="real_sec">
                  <ul class="tab tab4">
                    <li class="onn">my collection</li>
                    <li>Profile Management</li>
                    <li>My Favorite</li>
                    <li>Account Management</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="wrap">
              <div class="collection_detail noimg">
                <div class="pro_img"></div>
                <h2>Add Collection</h2>
                <h4>
                  After creating a collection, register a new NFT.
                  <br />
                  Organize your own gallery with different concepts for each
                  collection.
                </h4>
                <div class="ad_btn">
                  <a href="">Create a new collection</a>
                  <a href="" class="line">
                    Load from contract
                  </a>
                </div>
              </div>

              <div class="item">
                <div class="wrap">
                  <h4 class="t">Other works in this collection</h4>

                  <div class="swiper">
                    <div class="swiper-container swiper-container-trendingitem">
                      <ol class="item item4 buy swiper-wrapper">
                        <div>
                          <span>
                            <li class="swiper-slide">
                              <a
                                href="#"
                                style={{ backgroundImage: `url(${sample})` }}
                              >
                                <article class="choose choose2 on">
                                  <ul>
                                    <li>Changing Information</li>
                                    <li>Royalty</li>
                                  </ul>
                                </article>
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
                          </span>

                          <span>
                            <li class="swiper-slide">
                              <a
                                href="#"
                                style={{ backgroundImage: `url(${sample})` }}
                              >
                                <article class="choose choose2 on">
                                  <ul>
                                    <li>Changing Information</li>
                                    <li>Royalty</li>
                                  </ul>
                                </article>
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
                          </span>

                          <span>
                            <li class="swiper-slide">
                              <a
                                href="#"
                                style={{ backgroundImage: `url(${sample})` }}
                              >
                                <article class="choose choose2 on">
                                  <ul>
                                    <li>Changing Information</li>
                                    <li>Royalty</li>
                                  </ul>
                                </article>
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
                          </span>

                          <span>
                            <li class="swiper-slide">
                              <a
                                href="#"
                                style={{ backgroundImage: `url(${sample})` }}
                              >
                                <article class="choose choose2 on">
                                  <ul>
                                    <li>Changing Information</li>
                                    <li>Royalty</li>
                                  </ul>
                                </article>
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
                          </span>

                          <span>
                            <li class="swiper-slide">
                              <a
                                href="#"
                                style={{ backgroundImage: `url(${sample})` }}
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
                                  <p>Buy Now</p>
                                </div>
                              </a>
                            </li>
                          </span>
                        </div>
                      </ol>
                    </div>

                    <div class="swiper-button-prev swiper-button-trendingitem-prev pcno"></div>
                    <div class="swiper-button-next swiper-button-trendingitem-next pcno"></div>
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

const SignPopupBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCollection);

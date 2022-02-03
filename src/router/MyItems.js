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

function MyItems({ store, setConnect }) {
  const navigate = useNavigate();
  const collectionRef = useRef();

  const [popupIndex, setPopupIndex] = useState(-1);

  function onclickCollectionPopupBtn(e, index) {
    e.stopPropagation();
    if (index === popupIndex) setPopupIndex(-1);
    else setPopupIndex(index);
  }

  function onClickLink(e, link) {
    e.stopPropagation();
    navigate(`/${link}`);
  }

  return (
    <MyItemsBox>
      <section id="sub">
        <article class="profile_home">
          <div class="collection_home add">
            <div class="move off">
              <div class="right_move">
                <div class="real_sec">
                  <ul class="tab tab4">
                    <li class="onn">My collection</li>
                    <li onClick={() => navigate("/myprof")}>
                      Profile Management
                    </li>
                    <li onClick={() => navigate("/liked")}>My Favorite</li>
                    <li onClick={() => navigate("/mywallet")}>
                      Account Management
                    </li>
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
                  <a onClick={() => navigate("/createitem")}>
                    Create a new collection
                  </a>
                  <a onClick={() => navigate("/importcontract")} class="line">
                    Load from contract
                  </a>
                </div>
              </div>

              <div class="item">
                <div class="wrap">
                  <h4 class="t">My Collection</h4>

                  <div class="swiper">
                    <div class="swiper-container swiper-container-trendingitem">
                      <ol class="item item4 buy swiper-wrapper">
                        <div>
                          {[1, 2, 3, 4].map((cont, index) => (
                            <span>
                              <li
                                class="swiper-slide"
                                onClick={(e) => navigate("/mycollectionselect")}
                              >
                                <a
                                  style={{ backgroundImage: `url(${sample})` }}
                                >
                                  <article class="choose choose2 on">
                                    {popupIndex === index && (
                                      <ul>
                                        <li
                                          onClick={(e) =>
                                            onClickLink(e, "editcollection")
                                          }
                                        >
                                          Changing Information
                                        </li>
                                        <li
                                          onClick={(e) =>
                                            onClickLink(e, "loyaltycheck")
                                          }
                                        >
                                          Royalty
                                        </li>
                                      </ul>
                                    )}
                                  </article>
                                  <div class="on">
                                    <ul>
                                      <li class="heart off">1,389</li>
                                      <li
                                        class="dot"
                                        onClick={(e) =>
                                          onclickCollectionPopupBtn(e, index)
                                        }
                                      ></li>
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

                    <div class="swiper-button-prev swiper-button-trendingitem-prev pcno"></div>
                    <div class="swiper-button-next swiper-button-trendingitem-next pcno"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </MyItemsBox>
  );
}

const MyItemsBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyItems);

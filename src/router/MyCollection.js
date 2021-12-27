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
                    <li class="onn">my item</li>
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
                <h2>Add Item</h2>
                <h4>
                  After creating a item, register a new NFT.
                  <br />
                  Organize your own gallery with different concepts for each
                  item.
                </h4>
                <div class="ad_btn">
                  <a onClick={() => navigate("/createcollection")}>
                    Create a new item
                  </a>
                  <a class="line" onClick={() => navigate("/importcontract")}>
                    Load from contract
                  </a>
                </div>
              </div>

              <div class="item">
                <h4 class="t">My Item</h4>
                <div class="swiper-container">
                  <ol class="item item5 buy" ref={collectionRef}>
                    {collectionList.map((bottomText, index) => (
                      <li
                        key={index}
                        onClick={() => navigate("/mycollectionselect")}
                      >
                        <a style={{ backgroundImage: `url(${sample})` }}>
                          <div class="on">
                            <ul>
                              <li></li>
                              <li
                                className={
                                  popupIndex === index ? "dot on" : "dot"
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onclickCollectionPopupBtn(index);
                                }}
                              >
                                <div class="choose choose2">
                                  <ul onClick={() => setPopupIndex(-1)}>
                                    <li
                                      onClick={() =>
                                        navigate("/editcollection")
                                      }
                                    >
                                      Changing Information
                                    </li>
                                    <li
                                      onClick={() => navigate("/loyaltycheck")}
                                    >
                                      Royalty
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                            <div>Summer Pool</div>
                            <span>David</span>
                            <span class="nft">
                              This item is a item of 80 individual
                              works and has been exhibited at the Museum of
                              Modern Art.
                            </span>
                            <p>{bottomText}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ol>
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

const collectionList = ["NFT1", "NFT12", "NFT100", "NFT20", "NFT30"];

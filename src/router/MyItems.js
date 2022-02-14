import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import sample from "../img/sub/sample.png";




// import "./css/style01.css";
// import "./css/style02.css";




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
        <article className="profile_home">
          <div className="collection_home add">
            <div className="move off">
              <div className="right_move">
                <div className="real_sec">
                  <ul className="tab tab4">
                    <li className="onn">My collection</li>
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
            <div className="wrap">
              <div className="collection_detail noimg">
                <div className="pro_img"></div>
                <h2>Add Collection</h2>
                <h4>
                  After creating a collection, register a new NFT.
                  <br />
                  Organize your own gallery with different concepts for each
                  collection.
                </h4>
                <div className="ad_btn">
                  <a onClick={() => navigate("/createitem")}>
                    Create a new collection
                  </a>
                  <a onClick={() => navigate("/importcontract")} className="line">
                    Load from contract
                  </a>
                </div>
              </div>

              <div className="item">
                <div className="wrap">
                  <h4 className="t">My Collection</h4>

                  <div className="swiper">
                    <div className="swiper-container swiper-container-trendingitem">
                      <ol className="item item4 buy swiper-wrapper">
                        <div>
                          {[1, 2, 3, 4].map((cont, index) => (
                            <span>
                              <li
                                className="swiper-slide"
                                onClick={(e) => navigate("/mycollectionselect")}
                              >
                                <a
                                  style={{ backgroundImage: `url(${sample})` }}
                                >
                                  <article className="choose choose2 on">
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
                                            onClickLink(e, "royaltycheck")
                                          }
                                        >
                                          Royalty
                                        </li>
                                      </ul>
                                    )}
                                  </article>
                                  <div className="on">
                                    <ul>
                                      <li className="heart off">1,389</li>
                                      <li
                                        className="dot"
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

                    <div className="swiper-button-prev swiper-button-trendingitem-prev pcno"></div>
                    <div className="swiper-button-next swiper-button-trendingitem-next pcno"></div>
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

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

function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();

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
                <h4 class="t">My Collection</h4>
                <div class="swiper-container">
                  <ol class="item item5 buy">
                    <li>
                      <a href="#" style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li></li>
                            <li class="dot">
                              <div class="choose choose2">
                                <ul>
                                  <li>Changing Information</li>
                                  <li>Royalty</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <span class="nft">
                            This collection is a collection of 80 individual
                            works and has been exhibited at the Museum of Modern
                            Art.
                          </span>
                          <p>NFT 1</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li></li>
                            <li class="dot">
                              <div class="choose choose2">
                                <ul>
                                  <li>Changing Information</li>
                                  <li>Royalty</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <span class="nft">
                            This collection is a collection of 80 individual
                            works and has been exhibited at the Museum of Modern
                            Art.
                          </span>
                          <p>NFT 12</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li></li>
                            <li class="dot">
                              <div class="choose choose2">
                                <ul>
                                  <li>Changing Information</li>
                                  <li>Royalty</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <span class="nft">
                            This collection is a collection of 80 individual
                            works and has been exhibited at the Museum of Modern
                            Art.
                          </span>
                          <p>NFT 100</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li></li>
                            <li class="dot">
                              <div class="choose choose2">
                                <ul>
                                  <li>Changing Information</li>
                                  <li>Royalty</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <span class="nft">
                            This collection is a collection of 80 individual
                            works and has been exhibited at the Museum of Modern
                            Art.
                          </span>
                          <p>NFT 20</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ backgroundImage: `url(${sample})` }}>
                        <div class="on">
                          <ul>
                            <li></li>
                            <li class="dot">
                              <div class="choose choose2">
                                <ul>
                                  <li>Changing Information</li>
                                  <li>Royalty</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                          <div>Summer Pool</div>
                          <span>David</span>
                          <span class="nft">
                            This collection is a collection of 80 individual
                            works and has been exhibited at the Museum of Modern
                            Art.
                          </span>
                          <p>NFT 30</p>
                        </div>
                      </a>
                    </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);

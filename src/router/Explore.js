import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s5 from "../img/sub/s5.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";
import rstone from "../img/sub/rstone.png";
import dollar from "../img/sub/rstone.png";

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
        <article class="rank_box">
          <div class="move rank_pc">
            <div class="right_move">
              <div class="pad">
                <div class="real_sec">
                  <div class="slide_s slide2">
                    <div class="ranking">
                      <h4 class="top5">Rankings</h4>
                      <p>
                        We publish the best collections every hour by analyzing
                        multiple indicators from multiple angles
                      </p>
                    </div>
                  </div>

                  <div class="etc">
                    <ul>
                      <li class="onnn">All</li>
                      <li>Collectibles</li>
                      <li>Digital Art</li>
                      <li>Trading Cards</li>
                      <li>Music</li>
                      <li>Virtual Worlds</li>
                      <li>Utility</li>
                      <li>Sports</li>
                    </ul>
                  </div>

                  <div class="ranktable">
                    <table>
                      <colgroup>
                        <col style={{ width: "8%" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>
                            <strong>Rnak</strong>
                            <a href="">
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>Collection</strong>
                            <a href="">
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              Total
                              <br class="br_m" />
                              volume
                            </strong>
                            <a href="">
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              7day
                              <br />
                              trading
                              <br class="br_m" />
                              volume
                            </strong>
                            <a href="">
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              7day
                              <br />
                              change
                            </strong>
                            <a href="">
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              Average
                              <br />
                              price
                            </strong>
                            <a href="">
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>Owner</strong>
                            <a href="">
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              Number
                              <br />
                              of items
                            </strong>
                            <a href="">
                              <span></span>
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="on">
                          <td>
                            <div class="rankings">
                              <span>1</span>
                              <img
                                src={require("../img/sub/crown.png").default}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Collection1</p>
                            </div>
                          </td>
                          <td>45,323 ETH</td>
                          <td>88.01 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>256</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>cryptopunks</p>
                            </div>
                          </td>
                          <td>27,322 ETH</td>
                          <td>77.11 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>35</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>art book</p>
                            </div>
                          </td>
                          <td>21,323 ETH</td>
                          <td>66.00 ETH</td>
                          <td>-39.88%</td>
                          <td>22.00</td>
                          <td>4,325</td>
                          <td>33</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>good friend</p>
                            </div>
                          </td>
                          <td>12,555 ETH</td>
                          <td>88.01 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>11</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>ZED Run</p>
                            </div>
                          </td>
                          <td>5,323 ETH</td>
                          <td>88.01 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>33</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Meebits</p>
                            </div>
                          </td>
                          <td>4,303 ETH</td>
                          <td>88.01 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>11</td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>SandBox</p>
                            </div>
                          </td>
                          <td>2,365 ETH</td>
                          <td>88.01 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>22</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>The Gamer</p>
                            </div>
                          </td>
                          <td>823 ETH</td>
                          <td>88.01 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>55</td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Rarible</p>
                            </div>
                          </td>
                          <td>93 ETH</td>
                          <td>88.01 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>3</td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>
                            <div class="name">
                              <img
                                src={
                                  require("../img/sub/collect_circle.png")
                                    .default
                                }
                                alt=""
                              />
                              <p>Yetis</p>
                            </div>
                          </td>
                          <td>63 ETH</td>
                          <td>88.01 ETH</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="move rank_m">
            <div class="slide_s slide2">
              <div class="etc swiper mySwiper">
                <ul class="swiper-wrapper">
                  <li class="swiper-slide on">
                    <a href="">All</a>
                  </li>
                  <li class="swiper-slide">
                    <a href="">Collectibles</a>
                  </li>
                  <li class="swiper-slide">
                    <a href="">Digital Art</a>
                  </li>
                  <li class="swiper-slide">
                    <a href="">Trading Cards</a>
                  </li>
                  <li class="swiper-slide">
                    <a href="">Music</a>
                  </li>
                  <li class="swiper-slide">
                    <a href="">Virtual Worlds</a>
                  </li>
                  <li class="swiper-slide">
                    <a href="">Utility</a>
                  </li>
                  <li class="swiper-slide">
                    <a href="">Sports</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="right_move">
              <div class="pad">
                <div class="real_sec">
                  <div class="rank_title">
                    <div class="ranking">
                      <h4 class="top5">Rankings</h4>
                      <p>
                        We publish the best collections every hour by
                        <br /> analyzing multiple indicators from multiple
                        angles
                      </p>
                    </div>
                    <div class="replace">
                      <a href="">
                        <img
                          src={require("../img/sub/exchange_gray.png").default}
                          alt=""
                        />
                        <span>Replace</span>
                      </a>
                    </div>
                  </div>

                  <div class="ranktable">
                    <ul>
                      <li>
                        <div class="content">
                          <div class="num">
                            <span>1</span>
                          </div>
                          <div class="name_left">
                            <div class="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                              <img
                                src={require("../img/sub/crown.png").default}
                                class="first"
                                alt=""
                              />
                            </div>
                            <div class="txt">
                              <p>Summer Pool</p>
                              <a href="">
                                <span class="more">+ More</span>
                                <span class="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div class="num_right">
                            <div class="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/eth_icon.png").default
                                  }
                                  alt=""
                                />
                                45,323
                              </p>
                            </div>
                            <div class="percent">
                              <p>250.33%</p>
                            </div>
                          </div>
                        </div>
                        <div class="slide_s slide2">
                          <div class="etc swiper mySwiper2">
                            <ul class="swiper-wrapper">
                              <li class="swiper-slide">
                                <p>7d trading volume</p>
                                <span>45,323 ETH</span>
                              </li>
                              <li class="swiper-slide">
                                <p>Average price</p>
                                <span>156.37</span>
                              </li>
                              <li class="swiper-slide">
                                <p>Owner</p>
                                <span>4,325</span>
                              </li>
                              <li class="swiper-slide">
                                <p>Number of items</p>
                                <span>256</span>
                              </li>
                            </ul>
                            <div class="swiper-scrollbar"></div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="content">
                          <div class="num">
                            <span>1</span>
                          </div>
                          <div class="name_left">
                            <div class="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div class="txt">
                              <p>Summer Pool</p>
                              <a href="">
                                <span class="more">+ More</span>
                                <span class="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div class="num_right">
                            <div class="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/eth_icon.png").default
                                  }
                                  alt=""
                                />
                                45,323
                              </p>
                            </div>
                            <div class="percent">
                              <p>250.33%</p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="content">
                          <div class="num">
                            <span>2</span>
                          </div>
                          <div class="name_left">
                            <div class="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div class="txt">
                              <p>Summer Pool</p>
                              <a href="">
                                <span class="more">+ More</span>
                                <span class="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div class="num_right">
                            <div class="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/eth_icon.png").default
                                  }
                                  alt=""
                                />
                                45,323
                              </p>
                            </div>
                            <div class="percent">
                              <p>250.33%</p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="content">
                          <div class="num">
                            <span>3</span>
                          </div>
                          <div class="name_left">
                            <div class="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div class="txt">
                              <p>Summer Pool</p>
                              <a href="">
                                <span class="more">+ More</span>
                                <span class="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div class="num_right">
                            <div class="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/eth_icon.png").default
                                  }
                                  alt=""
                                />
                                45,323
                              </p>
                            </div>
                            <div class="percent">
                              <p>250.33%</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="next">
                    <div class="left">
                      <a href="">
                        <p>
                          <span></span>1 ~ 100
                        </p>
                      </a>
                    </div>
                    <div class="right">
                      <a href="">
                        <p>
                          101 ~ 201<span></span>
                        </p>
                      </a>
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

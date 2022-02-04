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
import { useState } from "react";

function Ranking({ store, setConnect }) {
  const navigate = useNavigate();

  const [category, setCategory] = useState(categoryList[0]);

  return (
    <SignPopupBox>
      <section id="sub">
        <article className="rank_box">
          <div className="move rank_pc">
            <div className="right_move">
              <div className="pad">
                <div className="real_sec">
                  <div className="slide_s slide2">
                    <div className="ranking">
                      <h4 className="top5">Rankings</h4>
                      <p>
                        We publish the best collections every hour by analyzing
                        multiple indicators from multiple angles
                      </p>
                    </div>
                  </div>

                  <div className="etc">
                    <ul>
                      {categoryList.map((cont, index) => (
                        <li
                          className={category === cont && "onnn"}
                          key={index}
                          onClick={() => setCategory(cont)}
                        >
                          {cont}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="ranktable">
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
                            <strong>Rank</strong>
                            <a>
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>Collection</strong>
                            <a>
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              Total
                              <br className="br_m" />
                              volume
                            </strong>
                            <a>
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              7day
                              <br />
                              trading
                              <br className="br_m" />
                              volume
                            </strong>
                            <a>
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              7day
                              <br />
                              change
                            </strong>
                            <a>
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              Average
                              <br />
                              price
                            </strong>
                            <a>
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>Owner</strong>
                            <a>
                              <span></span>
                            </a>
                          </th>
                          <th>
                            <strong>
                              Number
                              <br />
                              of items
                            </strong>
                            <a>
                              <span></span>
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="on">
                          <td>
                            <div className="rankings">
                              <span>1</span>
                              <img
                                src={require("../img/sub/crown.png").default}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <div className="name">
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
                          <td>45,323 KLAY</td>
                          <td>88.01 KLAY</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>256</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <div className="name">
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
                          <td>27,322 KLAY</td>
                          <td>77.11 KLAY</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>35</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <div className="name">
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
                          <td>21,323 KLAY</td>
                          <td>66.00 KLAY</td>
                          <td>-39.88%</td>
                          <td>22.00</td>
                          <td>4,325</td>
                          <td>33</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <div className="name">
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
                          <td>12,555 KLAY</td>
                          <td>88.01 KLAY</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>11</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <div className="name">
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
                          <td>5,323 KLAY</td>
                          <td>88.01 KLAY</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>33</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>
                            <div className="name">
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
                          <td>4,303 KLAY</td>
                          <td>88.01 KLAY</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>11</td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>
                            <div className="name">
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
                          <td>2,365 KLAY</td>
                          <td>88.01 KLAY</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>22</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>
                            <div className="name">
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
                          <td>823 KLAY</td>
                          <td>88.01 KLAY</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>55</td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td>
                            <div className="name">
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
                          <td>93 KLAY</td>
                          <td>88.01 KLAY</td>
                          <td>250.33%</td>
                          <td>156.37</td>
                          <td>4,325</td>
                          <td>3</td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>
                            <div className="name">
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
                          <td>63 KLAY</td>
                          <td>88.01 KLAY</td>
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
          <div className="move rank_m">
            <div className="slide_s slide2">
              <div className="etc swiper mySwiper">
                <ul className="swiper-wrapper">
                  {categoryList.map((cont, index) => (
                    <li
                      className={category === cont && "swiper-slide on"}
                      key={index}
                      onClick={() => setCategory(cont)}
                    >
                      <a>{cont}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right_move">
              <div className="pad">
                <div className="real_sec">
                  <div className="rank_title">
                    <div className="ranking">
                      <h4 className="top5">Rankings</h4>
                      <p>
                        We publish the best collections every hour by
                        <br /> analyzing multiple indicators from multiple
                        angles
                      </p>
                    </div>
                    <div className="replace">
                      <a>
                        <img
                          src={require("../img/sub/exchange_gray.png").default}
                          alt=""
                        />
                        <span>Replace</span>
                      </a>
                    </div>
                  </div>

                  <div className="ranktable">
                    <ul>
                      <li>
                        <div className="content">
                          <div className="num">
                            <span>1</span>
                          </div>
                          <div className="name_left">
                            <div className="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                              <img
                                src={require("../img/sub/crown.png").default}
                                className="first"
                                alt=""
                              />
                            </div>
                            <div className="txt">
                              <p>Summer Pool</p>
                              <a>
                                <span className="more">+ More</span>
                                <span className="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div className="num_right">
                            <div className="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                45,323
                              </p>
                            </div>
                            <div className="percent">
                              <p>250.33%</p>
                            </div>
                          </div>
                        </div>
                        <div className="slide_s slide2">
                          <div className="etc swiper mySwiper2">
                            <ul className="swiper-wrapper">
                              <li className="swiper-slide">
                                <p>7d trading volume</p>
                                <span>45,323 KLAY</span>
                              </li>
                              <li className="swiper-slide">
                                <p>Average price</p>
                                <span>156.37</span>
                              </li>
                              <li className="swiper-slide">
                                <p>Owner</p>
                                <span>4,325</span>
                              </li>
                              <li className="swiper-slide">
                                <p>Number of items</p>
                                <span>256</span>
                              </li>
                            </ul>
                            <div className="swiper-scrollbar"></div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="num">
                            <span>1</span>
                          </div>
                          <div className="name_left">
                            <div className="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div className="txt">
                              <p>Summer Pool</p>
                              <a>
                                <span className="more">+ More</span>
                                <span className="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div className="num_right">
                            <div className="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                45,323
                              </p>
                            </div>
                            <div className="percent">
                              <p>250.33%</p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="num">
                            <span>2</span>
                          </div>
                          <div className="name_left">
                            <div className="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div className="txt">
                              <p>Summer Pool</p>
                              <a>
                                <span className="more">+ More</span>
                                <span className="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div className="num_right">
                            <div className="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                45,323
                              </p>
                            </div>
                            <div className="percent">
                              <p>250.33%</p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="num">
                            <span>3</span>
                          </div>
                          <div className="name_left">
                            <div className="img">
                              <img
                                src={
                                  require("../img/sub/hjcollection.png").default
                                }
                                alt=""
                              />
                            </div>
                            <div className="txt">
                              <p>Summer Pool</p>
                              <a>
                                <span className="more">+ More</span>
                                <span className="less">- Less</span>
                              </a>
                            </div>
                          </div>
                          <div className="num_right">
                            <div className="total">
                              <p>
                                <img
                                  src={
                                    require("../img/sub/I_klaytn.svg").default
                                  }
                                  alt=""
                                />
                                45,323
                              </p>
                            </div>
                            <div className="percent">
                              <p>250.33%</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="next">
                    <div className="left">
                      <a>
                        <p>
                          <span></span>1 ~ 100
                        </p>
                      </a>
                    </div>
                    <div className="right">
                      <a>
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

const SignPopupBox = styled.div`
  .rank_m {
    & > .slide_s {
      .mySwiper {
        .swiper-wrapper {
          display: flex;
          overflow-x: scroll;

          &::-webkit-scrollbar {
            display: none;
          }

          li {
            width: 23%;
            min-width: 23%;
          }
        }
      }
    }

    .right_move {
      .ranktable {
        ul {
          li {
            .slide_s {
              .mySwiper2 {
                .swiper-wrapper {
                  display: flex;
                  overflow-x: scroll;

                  &::-webkit-scrollbar {
                    height: 4px;
                  }
                  &::-webkit-scrollbar-thumb {
                    background-color: #b7b7b7;

                    border-radius: 4px;
                  }

                  &::-webkit-scrollbar-track {
                    border-radius: 4px;
                  }

                  li {
                    min-width: 50%;
                    width: 50%;
                  }
                }
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
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);

const categoryList = [
  "All",
  "Collectibles",
  "Digital Art",
  "Trading Cards",
  "Music",
  "Virtual Worlds",
  "Utility",
  "Sports",
];

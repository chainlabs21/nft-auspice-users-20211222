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
import click1 from "../img/sub/click1.png";
import ho_img from "../img/sub/ho_img.png";






// import "./css/style01.css";
// import "./css/style02.css";





function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <section id="sub">
        <article className="profile_home">
          <div className="collection_home">
            <img src={require("../img/sub/home_bg.png").default} />

            <div className="wrap">
              <div className="collection_detail">
                <div className="pro_img">
                  <img src={require("../img/sub/home_profile.png").default} />
                  <div className="home_icons">
                    <a >
                      <img src={require("../img/sub/re.png").default} />
                    </a>
                    <a >
                      <img src={require("../img/sub/share.png").default} />
                    </a>
                  </div>
                </div>
                <h2 className="notop">Henry junior's Item</h2>
                <h3>0x97bc...8cad2</h3>
                <h4>
                  Henry is a mixed-media artist living in the
                  <br className="mo" /> Bay Area and uses
                  <br className="pc" />a stream of consciousness
                  <br className="mo" /> approach to his work.
                </h4>
              </div>
            </div>

            <div className="move off">
              <div className="cw ucl">
                <span className="close">
                  <img src={require("../img/sub/side_close.png").default} />
                  <b className="mclose">
                    Filter<span>1</span>
                  </b>
                </span>
                <div className="left_move">
                  <form>
                    <div className="filter">
                      <h3 className="filt">
                        <img
                          src={require("../img/sub/filter_icon.png").default}
                        />
                        Filter
                      </h3>
                      <img
                        src={require("../img/sub/filter_close.png").default}
                        className="fc"
                      />
                    </div>
                    <div className="fold status">
                      <h3 className="slide_tt">
                        Status
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open status">
                        <ul>
                          <li className="on">Buy Now</li>
                          <li>On Auction</li>
                          <li>New</li>
                          <li>Has Offers</li>
                        </ul>
                      </div>
                    </div>

                    <div className="fold">
                      <h3 className="slide_tt">
                        Price
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open">
                        <select>
                          <option disabled selected hidden>
                            United States Dollars (USD)
                          </option>
                          <option>100</option>
                        </select>
                        <div className="price_area">
                          <div className="price_wrap">
                            <input type="text" placeholder="0.00" />
                            <span className="usd">USD</span>
                          </div>
                          <div className="price_wrap">
                            <input type="text" placeholder="0.00" />
                            <span className="usd">USD</span>
                          </div>
                        </div>
                        <a  className="slide_btn">
                          Apply
                        </a>
                      </div>
                    </div>

                    <div className="fold">
                      <h3 className="slide_tt">
                        Items
                        <img src="../img/sub/slide_up.png" className="slide_up" />
                      </h3>

                      <div className="open collection">
                        <input
                          type="text"
                          placeholder="Filter"
                          className="s_search"
                        />
                        <ul>
                          <li
                            className="collec_img"
                            style={{ backgroundImage: `url(${collect_img})` }}
                          >
                            <span>Item 01</span>
                          </li>
                          <li
                            className="collec_img"
                            style={{ backgroundImage: `url(${collect_img2})` }}
                          >
                            <span>Item 02</span>
                          </li>
                          <li
                            className="collec_img"
                            style={{ backgroundImage: `url(${collect_img3})` }}
                          >
                            <span>Item 03</span>
                          </li>
                          <li
                            className="collec_img"
                            style={{ backgroundImage: `url(${collect_img4})` }}
                          >
                            <span>Item 04</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="fold">
                      <h3 className="slide_tt">
                        Chains
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open">
                        <ul>
                          <li className="ra">
                            <input type="radio" id="rad" name="rad" />
                            <label htmlFor="rad">
                              <img
                                src={require("../img/sub/stone.png").default}
                              />
                              Klaytn
                            </label>
                          </li>
                          <li className="ra">
                            <input type="radio" id="rad2" name="rad" />
                            <label htmlFor="rad2">
                              <img
                                src={require("../img/sub/rock.png").default}
                              />
                              Klaytn
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="fold">
                      <h3 className="slide_tt">
                        Sales Coin
                        <img
                          src={require("../img/sub/slide_up.png").default}
                          className="slide_up"
                        />
                      </h3>

                      <div className="open">
                        <input
                          type="text"
                          placeholder="Filter"
                          className="s_search"
                        />
                        <ul>
                          <li className="ra">
                            <input type="radio" id="rad3" name="rad2" />
                            <label htmlFor="rad3">KLAY</label>
                          </li>
                          <li className="ra">
                            <input type="radio" id="rad4" name="rad2" />
                            <label htmlFor="rad4">WETH</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="right_move">
                <div className="real_sec">
                  <ul className="tab">
                    <li>Search Wallet</li>
                    <li>Transaction history</li>
                    <li>Offers</li>
                    <li>Liked</li>
                    <li className="onn">Hidden item</li>
                    <li>Referals</li>
                  </ul>
                  <div className="pad">
                    <div className="slide_s">
                      <div className="fl">
                        <input
                          type="text"
                          placeholder="Search items, creators"
                        />
                      </div>
                      <div className="fr">
                        <div className="select">
                          <div>Single item</div>
                          <ul>
                            <li>
                              <a >Single item</a>
                            </li>
                            <li>
                              <a >All</a>
                            </li>
                            <li>
                              <a >Bundle sales</a>
                            </li>
                          </ul>
                        </div>
                        <div className="select">
                          <div>Latest</div>
                          <ul>
                            <li>
                              <a >Latest</a>
                            </li>
                            <li>
                              <a >popularity</a>
                            </li>
                            <li>
                              <a >Close to finish</a>
                            </li>
                            <li>
                              <a >Low price</a>
                            </li>
                            <li>
                              <a >high price</a>
                            </li>
                            <li>
                              <a >A small bid</a>
                            </li>
                            <li>
                              <a >A lot of bids</a>
                            </li>
                            <li>
                              <a >Most seen</a>
                            </li>
                            <li>
                              <a >oldest</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="move_item">
                      <div className="swiper_container">
                        <ol className="item move_li">
                          <li>
                            <a
                              href="#"
                              style={{ backgroundImage: `url(${s5})` }}
                            >
                              <div className="on">
                                <ul>
                                  <li className="heart off">1,389</li>
                                  <li className="dot">
                                    <div className="choose">
                                      <ul>
                                        <li>Sale</li>
                                        <li>Hand Over</li>
                                        <li>Edit</li>
                                        <li>Item Change</li>
                                        <li>Unhide</li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                                <span>Mark.X item</span>
                                <div>Place Saint-Marc</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              style={{ backgroundImage: `url(${sample})` }}
                            >
                              <div className="on">
                                <ul>
                                  <li className="heart on">1,389</li>
                                  <li className="dot">
                                    <div className="choose">
                                      <ul>
                                        <li>Sale</li>
                                        <li>Hand Over</li>
                                        <li>Edit</li>
                                        <li>Item Change</li>
                                        <li>Unhide</li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                                <span>Mark.X item</span>
                                <div>Place Saint-Marc</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              style={{ backgroundImage: `url(${sample})` }}
                            >
                              <div className="on">
                                <ul>
                                  <li className="heart on">1,389</li>
                                  <li className="dot">
                                    <div className="choose">
                                      <ul>
                                        <li>Sale</li>
                                        <li>Hand Over</li>
                                        <li>Edit</li>
                                        <li>Item Change</li>
                                        <li>Unhide</li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                                <span>David</span>
                                <div>Summer Pool</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              style={{ backgroundImage: `url(${sample})` }}
                            >
                              <div className="on">
                                <ul>
                                  <li className="heart on">1,389</li>
                                  <li className="dot">
                                    <div className="choose">
                                      <ul>
                                        <li>Sale</li>
                                        <li>Hand Over</li>
                                        <li>Edit</li>
                                        <li>Item Change</li>
                                        <li>Unhide</li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                                <span>David</span>
                                <div>Summer Pool</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              style={{ backgroundImage: `url(${sample})` }}
                            >
                              <div className="on">
                                <ul>
                                  <li className="heart on">1,389</li>
                                  <li className="dot">
                                    <div className="choose">
                                      <ul>
                                        <li>Sale</li>
                                        <li>Hand Over</li>
                                        <li>Edit</li>
                                        <li>Item Change</li>
                                        <li>Unhide</li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                                <span>David</span>
                                <div>Summer Pool</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              style={{ backgroundImage: `url(${sample})` }}
                            >
                              <div className="on">
                                <ul>
                                  <li className="heart on">1,389</li>
                                  <li className="dot">
                                    <div className="choose">
                                      <ul>
                                        <li>Sale</li>
                                        <li>Hand Over</li>
                                        <li>Edit</li>
                                        <li>Item Change</li>
                                        <li>Unhide</li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                                <span>David</span>
                                <div>Summer Pool</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              style={{ backgroundImage: `url(${sample})` }}
                            >
                              <div className="on">
                                <ul>
                                  <li className="heart on">1,389</li>
                                  <li className="dot">
                                    <div className="choose">
                                      <ul>
                                        <li>Sale</li>
                                        <li>Hand Over</li>
                                        <li>Edit</li>
                                        <li>Item Change</li>
                                        <li>Unhide</li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                                <span>David</span>
                                <div>Summer Pool</div>
                              </div>
                            </a>
                          </li>
                        </ol>
                      </div>
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

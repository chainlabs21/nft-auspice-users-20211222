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
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css"; // import "./css/style01.css"; // import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import Myprofcommonheader  from '../components/Myprofcommonheader'

function Referals({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <section id="sub">
        <article class="profile_home deal_box">
          <div class="collection_home">
            <img src={require("../img/sub/home_bg.png").default} />

<Myprofcommonheader />
{/**             <div class="wrap">
              <div class="collection_detail">
                <div class="pro_img">
                  <img src={require("../img/sub/home_profile.png").default} />
                  <div class="home_icons">
                    <a>
                      <img src={require("../img/sub/re.png").default} />
                    </a>
                    <a>
                      <img src={require("../img/sub/share.png").default} />
                    </a>
                  </div>
                </div>
                <h2 class="notop">Henry junior's Item</h2>
                <h3>0x97bc...8cad2</h3>
                <h4>
                  Henry is a mixed-media artist living in the Bay Area and uses
                  <br /> a stream of consciousness approach to his work.
                </h4>
              </div>
            </div>
*/}

            <div class="move off deal mdeal">
              <div class="right_move">
                <div class="real_sec">
                  <ul class="tab">
                    <li onClick={() => navigate("/myprof")}>Search Wallet</li>
                    <li onClick={() => navigate("/transactionhistory")}>
                      Transaction history
                    </li>
                    <li onClick={() => navigate("/offers")}>Offers</li>
                    <li onClick={() => navigate("/liked")}>Liked</li>
                    <li onClick={() => navigate("/hiddenitem")}>Hidden item</li>
                    <li class="onn">Referals</li>
                  </ul>
                  <div class="referals">
                    <div class="re_text">
                      <span class="refe">Referals</span>
                      <h2>Itemverse Friend Recommendation</h2>
                      <h3>
                        Share your referral link! When a new user who accesses
                        this link purchases a product,
                        <br />
                        an additional 1% of the sales amount is paid. Referral
                        rewards are paid in lump sum every month.
                        <br />
                        However, due to gas cost, only referrals exceeding 0.005
                        KLAY will be processed.
                      </h3>
                    </div>
                    <div class="link">
                      <h4>My Link</h4>
                      <div class="copy">
                        <input type="text" readonly disabled />
                        <span>
                          https://KLAY.io/market/?ref=0x97b155a698d4bdec4c4bf3a92e9071190093cafb
                        </span>
                        <a class="copybtn">
                          <img
                            src={require("../img/sub/btn_copy.png").default}
                          />
                        </a>
                      </div>
                      <h4 class="mlink">Referral Sales History</h4>
                    </div>

                    <div class="ranktable_pc rp2">
                      <div className="scrollBox">
                        <table>
                          <colgroup>
                            <col style={{ width: "*" }} />
                            <col style={{ width: "16%" }} />
                            <col style={{ width: "*" }} />
                            <col style={{ width: "*" }} />
                            <col style={{ width: "*" }} />
                            <col style={{ width: "*" }} />
                            <col style={{ width: "*" }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Sellers</th>
                              <th>Time Sold</th>
                              <th>Payment Date</th>
                              <th>Payment</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div class="name">
                                  <img
                                    src={
                                      require("../img/sub/collect_circle.png")
                                        .default
                                    }
                                    alt=""
                                  />
                                  <p>Summer Pool</p>
                                </div>
                              </td>
                              <td>
                                <div class="name price">
                                  <img
                                    src={
                                      require("../img/sub/I_klaytn.svg").default
                                    }
                                    alt=""
                                  />
                                  <p>
                                    0.010 KLAY<span>($30.11)</span>
                                  </p>
                                </div>
                              </td>
                              <td>1</td>
                              <td>
                                <div class="name">
                                  <img
                                    src={
                                      require("../img/sub/collect_circle.png")
                                        .default
                                    }
                                    alt=""
                                  />
                                  <p>TIDREDQ34...</p>
                                </div>
                              </td>
                              <td>2021.01.01</td>
                              <td>2021.06</td>
                              <td>0.0001 KLAY</td>
                            </tr>
                            <tr>
                              <td>
                                <div class="name">
                                  <img
                                    src={
                                      require("../img/sub/collect_circle.png")
                                        .default
                                    }
                                    alt=""
                                  />
                                  <p>Donald DUck</p>
                                </div>
                              </td>
                              <td>
                                <div class="name price">
                                  <img
                                    src={
                                      require("../img/sub/I_klaytn.svg").default
                                    }
                                    alt=""
                                  />
                                  <p>
                                    0.5000 KLAY<span>($30.11)</span>
                                  </p>
                                </div>
                              </td>
                              <td>1</td>
                              <td>
                                <div class="name">
                                  <img
                                    src={
                                      require("../img/sub/collect_circle.png")
                                        .default
                                    }
                                    alt=""
                                  />
                                  <p>VOE837548...</p>
                                </div>
                              </td>
                              <td>11 days later</td>
                              <td>2021.06</td>
                              <td>0.0005 KLAY</td>
                            </tr>
                          </tbody>
                        </table>
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

const SignPopupBox = styled.div`
  #sub {
    .deal_box {
      .move {
        .right_move {
          .real_sec {
            padding: 0;
          }
        }
      }
    }
  }

  .rp2 {
    overflow: hidden;

    .scrollBox {
      height: 100%;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #b7b7b7;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
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

export default connect(mapStateToProps, mapDispatchToProps)(Referals);

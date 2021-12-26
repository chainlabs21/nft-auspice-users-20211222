import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import s2 from "../img/sub/s2.png";
import s6 from "../img/sub/s6.png";
import s7 from "../img/sub/s7.png";
import s8 from "../img/sub/s8.png";
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

function LoyaltyCheck({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <section id="sub">
        <article class="ntfsell_box">
          <div class="sellbg">
            <div class="ntfsell_con">
              <div class="top1">
                <a onClick={() => navigate(-1)}>
                  <img
                    src={require("../img/sub/nft_arrow.png").default}
                    alt=""
                  />
                </a>
                <strong>Collection home</strong>
              </div>
              <div class="sell_wrap sell_wrap2">
                <div class="create">
                  <p class="loyal">Loyalty check</p>
                  <h2 class="notop">Collection 1</h2>
                  <form action="">
                    <div class="form">
                      <ul>
                        <li>
                          <p>
                            The payment is only paid when more than 0.1 ETH has
                            been accumulated, and deposits are made in batches
                            every month. Deposit date and time are subject to
                            change.
                          </p>
                          <div class="exc">
                            <a class="cso">Change sort order</a>
                          </div>
                          <div class="loytable con3">
                            <table>
                              <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>Item</th>
                                  <th>Sale Price</th>
                                  <th>Quantity</th>
                                  <th>Pay royalties</th>
                                  <th>Payment date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="ig">A girl</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>2</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>payment due</td>
                                </tr>
                                <tr>
                                  <td class="ig">Crushed Hea...</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>1</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>2021.04.01</td>
                                </tr>
                                <tr>
                                  <td class="ig">Summer Pool</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>1</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>2021.03.31</td>
                                </tr>
                                <tr>
                                  <td class="ig">Donald DUck</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>10</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>2021.03.05</td>
                                </tr>
                                <tr>
                                  <td class="ig">Summer Pool</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>107</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>2021.01.08</td>
                                </tr>
                                <tr>
                                  <td class="ig">Crushed Hea...</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>107</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>2021.01.01</td>
                                </tr>
                                <tr>
                                  <td class="ig">Crushed Hea...</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>107</td>
                                  <td>
                                    <img
                                      src={
                                        require("../img/sub/rstone.png").default
                                      }
                                      alt="stone"
                                    />
                                    0.01
                                  </td>
                                  <td>2021.01.01</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyCheck);

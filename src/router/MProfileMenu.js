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
        <article class="wallet_wrap">
          <div class="move on">
            <div class="left_move wallet_left" style={{ display: "block" }}>
              <div class="mwallet">
                <a >Account settings</a>
              </div>
              <form>
                <div class="w1">
                  <h3>
                    My wallet<span>0x9bb...carfb</span>
                  </h3>
                </div>
                <div class="w2">
                  <h3>General settings</h3>
                </div>
                <div class="w3">
                  <h3>Notification settings</h3>
                </div>
              </form>
            </div>

            <div class="right_move wallet_right tor">
              <h2>Notification settings</h2>
              <p>
                Please select the type of notifications you want to receive from
                this account
              </p>
              <div class="wr togpad">
                <ul>
                  <li class="toline">
                    <h5>Sales of products</h5>
                    <p class="tsub">
                      Notification when someone purchases an item that is
                      registered for sale
                    </p>
                    <div class="tog">
                      <input type="checkbox" id="tog" />
                      <label for="tog"></label>
                    </div>
                  </li>
                  <li class="toline">
                    <h5>Bidding</h5>
                    <p class="tsub">
                      Notify when someone has participated in a bid for an item
                    </p>
                    <div class="tog">
                      <input type="checkbox" id="tog" />
                      <label for="tog"></label>
                    </div>
                  </li>
                  <li class="toline">
                    <h5>Accept the offer</h5>
                    <p class="tsub">
                      If the item owner who offered the price accepts the offer
                    </p>
                    <div class="tog">
                      <input type="checkbox" id="tog" />
                      <label for="tog"></label>
                    </div>
                  </li>
                  <li class="toline">
                    <h5>Auction Period Expired</h5>
                    <p class="tsub">
                      Notification when the period of an auction set has expired
                    </p>
                    <div class="tog">
                      <input type="checkbox" id="tog" />
                      <label for="tog"></label>
                    </div>
                  </li>
                  <li class="toline">
                    <h5>Bid exceeded</h5>
                    <p class="tsub">
                      When there is a higher bid for an item you bid on
                    </p>
                    <div class="tog">
                      <input type="checkbox" id="tog" />
                      <label for="tog"></label>
                    </div>
                  </li>
                  <li class="toline">
                    <h5>Referral Sales</h5>
                    <p class="tsub">When someone you refer purchases an item</p>
                    <div class="tog">
                      <input type="checkbox" id="tog" />
                      <label for="tog"></label>
                    </div>
                  </li>
                  <li class="toline">
                    <h5>Minimum bid criteria</h5>
                    <p class="tsub">
                      You will only be notified when you receive an offer above
                      this KLAY amount
                    </p>
                    <div class="mbc">
                      <ol>
                        <li>
                          <h3 style={{ backgroundImage: `url(${rstone})` }}>
                            KLAY
                          </h3>
                          <span>0.005</span>
                        </li>
                        <li>
                          <h3 style={{ backgroundImage: `url(${dollar})` }}>
                            USD
                          </h3>
                          <span>30.88</span>
                        </li>
                      </ol>
                    </div>
                  </li>
                </ul>
                <a  class="wbtn mm">
                  Save
                </a>
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

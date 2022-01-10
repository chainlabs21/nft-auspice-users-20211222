import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useState } from "react";

import { setAllPopupOff } from "../util/store";
import rstone from "../img/sub/rstone.png";
import dollar from "../img/sub/dollar.png";
import I_dnArwGray from "../img/header/I_dnArwGray.svg";

function Main({ store, setAllPopupOff }) {
  const navigate = useNavigate();

  const [category, setCategory] = useState(0);

  function onclickCategory(index) {
    if (category === index) setCategory(0);
    else setCategory(index);
  }

  function onclickWallet() {
    setAllPopupOff();
    navigate("/connectwallet");
  }

  return (
    <MaccountPopupBox className="mMenuBox">
      <section id="sub">
        <article class="wallet_wrap">
          <div class="move on">
            <div class="left_move wallet_left" style={{ display: "block" }}>
              <div class="mwallet">
                <a href="">Account settings</a>
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
                      this ETH amount
                    </p>
                    <div class="mbc">
                      <ol>
                        <li>
                          <h3
                            style={{
                              backgroundImage: `url(${rstone})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          >
                            ETH
                          </h3>
                          <span>0.005</span>
                        </li>
                        <li>
                          <h3
                            style={{
                              backgroundImage: `url(${dollar})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          >
                            USD
                          </h3>
                          <span>30.88</span>
                        </li>
                      </ol>
                    </div>
                  </li>
                </ul>
                <a href="" class="wbtn mm">
                  Save
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>
    </MaccountPopupBox>
  );
}

const MaccountPopupBox = styled.nav``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const marketList = [
  "All",
  "collectibles",
  "Digital Art",
  "Trading Card",
  "music",
  "Virtual Worlds",
  "sports",
];

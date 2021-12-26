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
import "../css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";

function Mywallet({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <section id="sub">
    <article class="wallet_wrap">
      <div class="move on">
        <div class="left_move wallet_left">
          <form>
            <div class="w1 on">
              <h3>My wallet<span>0x9bb...carfb</span></h3>
            </div>
            <div class="w2">
              <h3>General settings</h3>
            </div>
            <div class="w3">
              <h3>Notification settings</h3>
            </div>
          </form>
        </div>

        <div class="right_move wallet_right">
          <h2>My wallet</h2>
          <div class="mwr">
            <div class="wr">
              <ul>
                <li>
                  <h4>Wallet address</h4>
                  <div><input type="text" placeholder="Please enter your username"/><a href="">copy</a></div>
                </li>
              </ul>
              <a href="" class="wbtn">Logout</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mywallet);
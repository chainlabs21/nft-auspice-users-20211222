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

function LogOut({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <section id="sub">
    <article class="login_wrap">
      <div class="floatwrap">
        <div class="login">
          <h2>Log in with your wallet</h2>
          <div class="emo"><img src={require("../img/sub/join_1.png").default}/></div>
          <a  class="log">Login</a>
          <div class="below on">
            <a ><h3>Log in with another wallet<img src={require("../img/sub/pop_select.png").default} class="down"/><img src={require("../img/sub/pop_select_up.png").default} class="up"/></h3></a>
            <ul>
              <li>
                <a >
                  <img src={require("../img/sub/join_3.png").default}/>
                  <p>Wallet Connect</p>
                </a>
              </li>
              <li>
                <a >
                  <img src={require("../img/sub/join_2.png").default}/>
                  <p>Conbase</p>
                </a>
              </li>
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);

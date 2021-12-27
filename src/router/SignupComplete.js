import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import WalletConnectSDK from "walletconnect";
import axios from "axios";

function SignupComplete({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap">
          <div class="box bot3">
            <div class="top0 p2">
              <h2>Sign up is complete.</h2>
              <p>
                Email verification is complete and you can use
                <br class="m_br" /> all functions.
                <br />
                Create your own NFT item.
              </p>
            </div>
            <div class="btn">
              <ul>
                <li>
                  <a onClick={() => navigate("/")}>Home</a>
                </li>
                <li>
                  <a onClick={() => navigate("/")}>Issuing NFTs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section id="sub">
        <article class="popup_box"></article>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupComplete);

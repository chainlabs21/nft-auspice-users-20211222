import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

import I_klaytn from "../img/sub/I_klaytn.svg";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import WalletConnectSDK from "walletconnect";
import axios from "axios";
import { useEffect } from "react";

function ConnectWallet({ store, setConnect }) {
  const navigate = useNavigate();

  async function connectKaikas() {
    const accounts = await window.klaytn.enable();
    setConnect(accounts[0]);
    navigate("/joinmembership");
  }

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap">
          <a onClick={() => navigate(-1)} class="close" id="info_close">
            <img src={require("../img/sub/exit_48.png").default} alt="" />
          </a>
          <div class="box line">
            <div class="top0 p1">
              <h2>Please connect an available wallet</h2>
              <p>Please connect an available wallet or create a new one</p>
            </div>
            <div class="wallet_pc">
              <ul>
                <li>
                  <a onClick={connectKaikas}>
                    <img src={I_klaytn} alt="" />
                    <p>klaytn</p>
                  </a>
                </li>
              </ul>
            </div>

            <div class="wallet_m">
              <ul>
                <li>
                  <a onClick={connectKaikas}>
                    <img src={I_klaytn} alt="" />
                    <p>klaytn</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="bottom">
            <p>Copyright © 2021 Itemverse. All rights reserved.</p>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>

      <section id="sub">
        <article class="popup_box"></article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .wallet_pc {
    ul {
      img {
        width: 96px;
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: (walletAddress) => dispatch(setConnect(walletAddress)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);

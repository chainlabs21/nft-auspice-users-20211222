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

function Signup02({ store, setConnect }) {
  const navigate = useNavigate();

  async function connetMetaMask() {
    return new Promise((resolve, reject) => {
      let { ethereum } = window;

      if (ethereum) {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            sessionStorage.setItem("wallet", "metamask");
            sessionStorage.setItem("address", res[0]);

            setConnect(res[0]);
          })
          .catch((err) => console.log(err));
      } else {
        // SetErrorBar("지갑이 지원되지 않는 환경입니다");
        // setTimeout(() => window.open(installMetaMaskUrl, "_blank"), 2000);
      }
    });
  }

  async function connectCoinbase() {
    axios
      .get(
        "https://www.coinbase.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URL&state=SECURE_RANDOM&scope=wallet:accounts:read"
      )
      .then((res) => console.log(res));
  }

  async function connectkWalletConnect() {
    await localStorage.removeItem("walletconnect");

    const wc = new WalletConnectSDK();
    try {
      wc.connect()
        .then((res) => {
          console.log(res);
          sessionStorage.setItem("wallet", "walletconnect");
          sessionStorage.setItem("address", res.accounts);
          setConnect(res[0]);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap">
          <div class="box">
            <div class="top0 p2">
              <h2>Email verification required</h2>
              <p>Please complete email verification to continue</p>
            </div>
            <div class="btn">
              <ul>
                <li>
                  <a onClick={() => navigate(-1)}>Cancel</a>
                </li>
                <li>
                  <a onClick={() => navigate("/signup02")}>Send Email</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup02);

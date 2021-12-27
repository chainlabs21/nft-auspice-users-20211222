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

function ConnectWallet({ store, setConnect }) {
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
            navigate("/joinmembership");

          })
          .catch((err) => console.log(err));
      } else {
        // SetErrorBar("지갑이 지원되지 않는 환경입니다");
        // setTimeout(() => window.open(installMetaMaskUrl, "_blank"), 2000);
      }
    });
  }

  async function connectCoinbase() {
    let { ethereum } = window;

    if (ethereum) {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          sessionStorage.setItem("wallet", "metamask");
          sessionStorage.setItem("address", res[0]);

          setConnect(res[0]);
          navigate("/joinmembership");
        })
        .catch((err) => console.log(err));
    } else {
      // SetErrorBar("지갑이 지원되지 않는 환경입니다");
      // setTimeout(() => window.open(installMetaMaskUrl, "_blank"), 2000);
    }
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
          sessionStorage.setItem("wallet", "walletconnect");
          sessionStorage.setItem("address", res.accounts);

          setConnect(res[0]);
          navigate("/joinmembership");
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
                  <span>BEST</span>
                  <a onClick={connetMetaMask}>
                    <img
                      src={require("../img/sub/join_1.png").default}
                      alt=""
                    />
                    <p>Metamask</p>
                  </a>
                </li>
                <li>
                  <a onClick={connectCoinbase}>
                    <img
                      src={require("../img/sub/join_2.png").default}
                      alt=""
                    />
                    <p>Coinbase</p>
                  </a>
                </li>
                <li>
                  <a onClick={connectkWalletConnect}>
                    <img
                      src={require("../img/sub/join_3.png").default}
                      alt=""
                    />
                    <p>Walletconnect</p>
                  </a>
                </li>
              </ul>
            </div>

            <div class="wallet_m">
              <ul>
                <li>
                  <a onClick={connetMetaMask}>
                    <div class="txt">
                      <img
                        src={require("../img/sub/join_1.png").default}
                        alt=""
                      />
                      <p>Metamask</p>
                    </div>
                    <span>BEST</span>
                  </a>
                </li>
                <li>
                  <a onClick={connectCoinbase}>
                    <img
                      src={require("../img/sub/join_2.png").default}
                      alt=""
                    />
                    <p>Coinbase</p>
                  </a>
                </li>
                <li>
                  <a onClick={connectkWalletConnect}>
                    <img
                      src={require("../img/sub/join_3.png").default}
                      alt=""
                    />
                    <p>Walletconnect</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="bottom">
            <p>Copyright © 2021 AUSPICE. All rights reserved.</p>
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

const SignPopupBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);

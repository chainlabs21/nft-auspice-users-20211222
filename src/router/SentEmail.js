import { connect, useSelector } from "react-redux";
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

function SentEmail({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SendEmailBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap confirm">
          <a onClick={() => navigate(-1)} class="close" id="info_close">
            <img src={require("../img/sub/icon_close.png").default} alt="" />
          </a>
          <div class="box">
            <div class="top0 p2">
              <h2>A verification email has been sent</h2>
              <p>
                If you do not receive an email, please check
                <br />
                your spam mailbox.
              </p>
            </div>
            <div class="btn one">
              <ul>
                <li>
                  <a onClick={() => navigate("/")}>OK</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SendEmailBox>
  );
}

const SendEmailBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SentEmail);

import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import s1 from "../img/sub/s2.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s9 from "../img/sub/s9.png";
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

function VerifyAccountPopup({ store, off }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap guidance">
          <div class="top4">
            <strong>Guidance on how to verify your account</strong>
            <a onClick={() => off()} class="close" id="info_close">
              <img src={require("../img/sub/icon_close.png").default} alt="" />
            </a>
          </div>
          <div class="howto">
            <p>
              Please check the connected external wallet and complete the
              transaction.
              <br />
              The contract approval process is performed only once per account
              <br />
              for the first time.
            </p>
            <div class="img_m">
              <img src={require("../img/sub/img_process.png").default} alt="" />
            </div>
            <div class="inst_con">
              <div class="instrucion line1">
                <div class="dropdown on">
                  <a>
                    <span></span>
                  </a>
                  <div class="bot_title">
                    <strong>Instruction</strong>
                    <p>
                      When you sell items for the first time in your account,
                      you need to go
                      <br />
                      through the contract approval process.
                    </p>
                  </div>
                  <div class="info">
                    <p>
                      - If you are trading for the first time, you will need to
                      reset your account. The process
                      <br /> &nbsp;&nbsp;of sending 0 Ether to verify that the
                      account is a valid account proceeds.
                      <br />
                    </p>
                    <p>
                      - Please complete the signature to create a sales list.
                      <br />
                    </p>
                    <p>
                      - Gas fee is paid only for the first time, and subsequent
                      listings are supported
                      <br />
                      &nbsp; free of charge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="img_pc">
              <img src={require("../img/sub/img_process.png").default} alt="" />
            </div>
            <p>
              Please wait until this process is complete. Depending on the
              Ethereum
              <br />
              mainnet and gas
              <br /> price quotes, it can take from a few minutes to
              <br /> several hours.
            </p>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccountPopup);

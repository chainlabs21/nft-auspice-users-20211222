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
import axios from "axios";
import { ERR_MSG } from "../config/messages";
import { API } from "../config/api";
import { getuseraddress } from "../util/common";
import { useSelector } from "react-redux";

function SentEmailDetail({ store, setConnect }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  function onClickResend() {
    window.location.reload();
  }

  const handleSendEmail = () => {
    const useraddress = getuseraddress();
    const asyncSendEmail = async () => {
      if (useraddress === null) {
        alert(ERR_MSG.ERR_NO_ADDRESS);
        return;
      }
      try {
        const resp = await axios.get(
          API.API_VERIFY_EMAIL_SEND + `/${userData.maria.email}/${useraddress}`
        );
        console.log(resp);
      } catch (error) {
        alert(ERR_MSG.ERR_AXIOS_REQUEST);
      }
    };
    // navigate("/resent")
    asyncSendEmail();
  };

  return (
    <SentEmailDetailBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap confirm">
          <a onClick={() => navigate(-1)} class="close" id="info_close">
            <img src={require("../img/sub/exit_48.png").default} alt="" />
          </a>
          <div class="box bot2">
            <div class="top0 p3">
              <h2>A verification email has been sent.</h2>
              <p>
                Please check the verification email in your mailbox
                (user@mail.com). <br />
                If you select the verification button in the email, membership
                registration is complete.
              </p>
            </div>
            <div class="notice_pc">
              <div class="notice_inner">
                <h3>Notice</h3>
                <ul class="notice_info">
                  <li>
                    <img
                      src={require("../img/sub/notice.png").default}
                      alt=""
                    />
                    <p>
                      The verification email is only valid for 24 hours from the
                      time it was sent,
                      <br />
                      and the existing verification code expires when re-sent.
                      Be sure to
                      <br />
                      check the last received email.
                    </p>
                  </li>
                  <li>
                    <img
                      src={require("../img/sub/notice.png").default}
                      alt=""
                    />
                    <p>
                      If you do not receive the email, please check your spam
                      folder.
                    </p>
                  </li>
                </ul>
              </div>
              <div class="btn one">
                <ul>
                  <li>
                    <a onClick={handleSendEmail}>Resend Email</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="notice_m">
              <h3>Notice</h3>
              <ul class="notice_info">
                <li>
                  <img src={require("../img/sub/notice.png").default} alt="" />
                  <p>
                    The verification email is only valid for 24 hours from the
                    time it was sent, and the existing verification code expires
                    when re-sent. Be sure to check the last received email.
                  </p>
                </li>
                <li>
                  <img src={require("../img/sub/notice.png").default} alt="" />
                  <p>
                    If you do not receive the email, please check your spam
                    folder.
                  </p>
                </li>
              </ul>
            </div>
            <div class="btn one2">
              <ul>
                <li>
                  <a onClick={onClickResend}>Resend Email</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SentEmailDetailBox>
  );
}

const SentEmailDetailBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SentEmailDetail);

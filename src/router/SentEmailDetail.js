import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";





// import "./css/style01.css";
// import "./css/style02.css";




import axios from "axios";
import { ERR_MSG } from "../config/messages";
import { API } from "../config/api";
import { getuseraddress } from "../util/common";

import { useSelector } from "react-redux";

function SentEmailDetail({ store, setConnect }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const address = useSelector((state) => state.wallet.address);

  function onClickResend() {
    window.location.reload();
  }

  const handleSendEmail = () => {
    console.log(address)
    const useraddress = address;
    const asyncSendEmail = async () => {
      if (useraddress === null) {
        alert(ERR_MSG.ERR_NO_ADDRESS);
        return;
      }
      try {
        if (userData ==null){
        const resp = await axios.get(
          API.API_VERIFY_EMAIL_SEND + `/${userData.maria.email}/${useraddress}`
        );
        }else{
          const resp = await axios.get(`${API.API_USER_INFO}/${address}`)
          await axios.get(API.API_VERIFY_EMAIL_SEND+`/${resp.data.payload.maria.email}`)

        }

        console.log(userData);
      } catch (error) {
        alert(ERR_MSG.ERR_AXIOS_REQUEST);
      }
    };
    // navigate("/resent")
    asyncSendEmail();
  };

  return (
    <SentEmailDetailBox>
      <div className="popup info" id="info_popup">
        <div className="box_wrap confirm">
          <a onClick={() => navigate(-1)} className="close" id="info_close">
            <img src={require("../img/sub/exit_48.png").default} alt="" />
          </a>
          <div className="box bot2">
            <div className="top0 p3">
              <h2>A verification email has been sent.</h2>
              <p>
                Please check the verification email in your mailbox
                (user@mail.com). <br />
                If you select the verification button in the email, membership
                registration is complete.
              </p>
            </div>
            <div className="notice_pc">
              <div className="notice_inner">
                <h3>Notice</h3>
                <ul className="notice_info">
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
              <div className="btn one">
                <ul>
                  <li>
                    <a onClick={handleSendEmail}>Resend Email</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="notice_m">
              <h3>Notice</h3>
              <ul className="notice_info">
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
            <div className="btn one2">
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

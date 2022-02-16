import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";

import I_x from "../../img/icons/I_x.svg";
import I_noticeChk from "../../img/icons/I_noticeChk.png";

import axios from "axios";
import { ERR_MSG } from "../../config/messages";
import { API } from "../../config/api";
import { getuseraddress } from "../../util/common";
import { useSelector } from "react-redux";

export default function SentEmailDetail() {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const isMobile = useSelector((state) => state.common.isMobile);

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

  if (isMobile)
    return (
      <MsentEmailDetailBox>
        <section className="popupBox">
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={I_x} alt="" />
            </button>
          </article>

          <article className="contBox">
            <div className="titleBox">
              <strong className="title">
                A verification email has been sent.
              </strong>
              <p className="explain">
                Please check the verification email in your mailbox
                (user@mail.com).
                <br />
                If you select the verification button in the email, membership
                registration is complete.
              </p>
            </div>

            <div className="noticeContainer">
              <strong className="noticeTitle">Notice</strong>

              <ul className="noticeList">
                <li>
                  <img src={I_noticeChk} alt="" />
                  <p>
                    The verification email is only valid for 24 hours from the
                    time it was sent, and the existing verification code expires
                    when re-sent. Be sure to check the last received email.
                  </p>
                </li>

                <li>
                  <img src={I_noticeChk} alt="" />
                  <p>
                    If you do not receive the email, please check your spam
                    folder.
                  </p>
                </li>
              </ul>
            </div>
          </article>

          <div className="btnBox">
            <button className="cancelBtn" onClick={handleSendEmail}>
              OK
            </button>
          </div>
        </section>
      </MsentEmailDetailBox>
    );
  else
    return (
      <PsentEmailDetailBox>
        <section className="popupBox">
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={I_x} alt="" />
            </button>
          </article>

          <article className="contBox">
            <div className="titleBox">
              <strong className="title">
                A verification email has been sent.
              </strong>
              <p className="explain">
                Please check the verification email in your mailbox
                (user@mail.com).
                <br />
                If you select the verification button in the email, membership
                registration is complete.
              </p>
            </div>

            <div className="noticeContainer">
              <strong className="noticeTitle">Notice</strong>

              <ul className="noticeList">
                <li>
                  <img src={I_noticeChk} alt="" />
                  <p>
                    The verification email is only valid for 24 hours from the
                    time it was sent, and the existing verification code expires
                    when re-sent. Be sure to check the last received email.
                  </p>
                </li>

                <li>
                  <img src={I_noticeChk} alt="" />
                  <p>
                    If you do not receive the email, please check your spam
                    folder.
                  </p>
                </li>
              </ul>
            </div>
          </article>

          <div className="btnBox">
            <button className="cancelBtn" onClick={handleSendEmail}>
              OK
            </button>
          </div>
        </section>
      </PsentEmailDetailBox>
    );
}

const MsentEmailDetailBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  .popupBox {
    display: flex;
    flex-direction: column;
    width: 88.88vw;
    max-height: 90%;
    padding: 4.44vw;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow-y: scroll;

    .topBar {
      display: flex;
      justify-content: flex-end;
      .exitBtn {
        width: 5.55vw;
      }
    }

    .contBox {
      display: flex;
      flex-direction: column;
      gap: 10vw;
      margin: 5vw 0 0 0;

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 2.22vw;

        .title {
          font-size: 4.44vw;
        }

        .explain {
          font-size: 3.33vw;
          font-weight: 500;
        }
      }

      .noticeContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7.77vw;
        padding: 9.44vw 4.44vw 11.11vw 4.44vw;
        background: #f3f3f3;
        border-radius: 2.22vw;

        .noticeTitle {
          font-size: 5vw;
          color: #011218;
        }

        .noticeList {
          display: flex;
          flex-direction: column;
          gap: 24px;

          li {
            display: flex;
            flex-direction: column;
            gap: 2.77vw;
            font-size: 3.33vw;
            font-weight: 500;
            line-height: 5.55vw;

            img {
              width: 6.66vw;
              height: 6.66vw;
            }
          }
        }
      }
    }

    .btnBox {
      display: flex;
      justify-content: center;
      margin: 11.11vw 0 0 0;

      button {
        width: 100%;
        height: 15.55vw;
        font-size: 4.44vw;
        font-weight: 700;
        border-radius: 7.77vw;
        color: #fff;
        background: #000;
      }
    }
  }
`;

const PsentEmailDetailBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  .popupBox {
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 40px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .topBar {
      display: flex;
      justify-content: flex-end;
      .exitBtn {
        width: 20px;
      }
    }

    .contBox {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .title {
          font-size: 22px;
        }

        .explain {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    .noticeContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      padding: 30px 20px 40px 20px;
      background: #f3f3f3;
      border-radius: 8px;

      .noticeTitle {
        font-size: 22px;
        color: #011218;
      }

      .noticeList {
        display: flex;
        flex-direction: column;
        gap: 24px;

        li {
          display: flex;
          gap: 16px;
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;

          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    .btnBox {
      display: flex;
      justify-content: center;
      margin: 30px 0 0 0;

      button {
        width: 240px;
        height: 56px;
        font-size: 22px;
        font-weight: 700;
        border-radius: 60px;
        color: #fff;
        background: #000;
      }
    }
  }
`;

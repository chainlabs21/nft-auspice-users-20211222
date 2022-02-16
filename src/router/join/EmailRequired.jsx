import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";

import { API } from "../../config/api";
import axios from "axios";
import { getuseraddress, LOGGER } from "../../util/common";
import { ERR_MSG } from "../../config/messages";

export default function EmailRequired() {
  const navigate = useNavigate();

  const useraddress = getuseraddress();
  const { userData } = useSelector((state) => state.user);
  const isMobile = useSelector((state) => state.common.isMobile);

  const handleSendEmail = () => {
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
        LOGGER(error);
        alert(ERR_MSG.ERR_AXIOS_REQUEST);
      }
    };
    // navigate("/resent")
    asyncSendEmail();
  };

  if (isMobile)
    return (
      <MsignPopupBox>
        <section className="popupBox">
          <article className="titleBox">
            <strong className="title">Email verification required</strong>
            <p className="explain">
              Please complete email verification to continue
            </p>
          </article>
          <article className="btnBox">
            <button className="cancelBtn" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button className="sendBtn" onClick={handleSendEmail}>
              Send Email
            </button>
          </article>
        </section>
      </MsignPopupBox>
    );
  else
    return (
      <PsignPopupBox>
        <section className="popupBox">
          <article className="titleBox">
            <strong className="title">Email verification required</strong>
            <p className="explain">
              Please complete email verification to continue
            </p>
          </article>
          <article className="btnBox">
            <button className="cancelBtn" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button className="sendBtn" onClick={handleSendEmail}>
              Send Email
            </button>
          </article>
        </section>
      </PsignPopupBox>
    );
}

const MsignPopupBox = styled.div`
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
    gap: 8.33vw;
    width: 86.11vw;
    padding: 13.88vw 5.55vw 8.33vw 5.55vw;
    background: #fff;
    border-radius: 5.55vw;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .titleBox {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 2.22vw;

      .title {
        font-size: 4.44vw;
      }

      .explain {
        font-size: 3.33vw;
        font-weight: 500;
      }
    }

    .btnBox {
      display: flex;
      justify-content: space-between;
      gap: 2.77vw;

      button {
        flex: 1;
        height: 10.55vw;
        font-size: 3.88vw;
        font-weight: 700;
        border-radius: 7.77vw;

        &.cancelBtn {
          border: solid 2px #000;
        }

        &.sendBtn {
          color: #fff;
          background: #000;
        }
      }
    }
  }
`;

const PsignPopupBox = styled.div`
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
    gap: 60px;
    width: 600px;
    padding: 40px 50px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .titleBox {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .title {
        font-size: 22px;
      }

      .explain {
        font-size: 16px;
      }
    }

    .btnBox {
      display: flex;
      justify-content: space-between;
      gap: 20px;

      button {
        flex: 1;
        height: 56px;
        font-size: 22px;
        font-weight: 700;
        border-radius: 60px;

        &.cancelBtn {
          border: solid 2px #000;
        }

        &.sendBtn {
          color: #fff;
          background: #000;
        }
      }
    }
  }
`;

import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";

import I_x from "../../img/icons/I_x.svg";

import WalletConnectSDK from "walletconnect";
import { useTranslation } from "react-i18next";

export default function SentEmail() {
  const { t }  = useTranslation(['locale'])
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MsentEmail>
        <section className="popupBox">
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate('/')}>
              <img src={I_x} alt="" />
            </button>
          </article>
          <article className="contBox">
            <div className="titleBox">
              <strong className="title">
                A verification email has been sent
              </strong>
              <p className="explain">
                If you do not receive an email, please check
                <br />
                your spam mailbox.
              </p>
            </div>
            <article className="btnBox">
              <button className="cancelBtn" onClick={() => navigate("/")}>
                OK
              </button>
            </article>
          </article>
        </section>
      </MsentEmail>
    );
  else
    return (
      <PsentEmail>
        <section className="popupBox">
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate('/')}>
              <img src={I_x} alt="" />
            </button>
          </article>
          <article className="contBox">
            <div className="titleBox">
              <strong className="title">
                {t('sentemail:TITLE')}
              </strong>
              <p className="explain">
                {t('sentemail:EXPLAIN')}
              </p>
            </div>
            <article className="btnBox">
              <button className="cancelBtn" onClick={() => navigate("/")}>
                {t('sentemail:OK')}
              </button>
            </article>
          </article>
        </section>
      </PsentEmail>
    );
}

const MsentEmail = styled.div`
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
    gap: 3.33vw;
    width: 86.11vw;
    padding: 4.44vw;
    background: #fff;
    border-radius: 5.55vw;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

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
      gap: 7.77vw;
      text-align: center;

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
    }

    .btnBox {
      display: flex;
      justify-content: center;

      button {
        width: 36.11vw;
        height: 10.55vw;
        font-size: 3.88vw;
        font-weight: 700;
        border-radius: 7.77vw;
        color: #fff;
        background: #000;
      }
    }
  }
`;

const PsentEmail = styled.div`
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
      gap: 60px;

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

    .btnBox {
      display: flex;
      justify-content: center;

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

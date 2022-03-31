import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// import "./css/style01.css";
// import "./css/style02.css";

import WalletConnectSDK from "walletconnect";
import axios from "axios";

export default function SignupComplete({ store, setConnect }) {
  const navigate = useNavigate();
  const { t }  = useTranslation(['locale'])

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MsignupComplete>
        <section className="popupBox">
          <article className="titleBox">
            <strong className="title">Sign up is complete.</strong>
            <p className="explain">
              Email verification is complete and you can use all functions.
              Create your own NFT collection.
            </p>
          </article>
          <article className="btnBox">
            <button className="cancelBtn" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button className="sendBtn" onClick={()=>navigate("/marketplace")}>
              Issuing NFTs
            </button>
          </article>
        </section>
      </MsignupComplete>
    );
  else
    return (
      <PsignupComplete>
        <section className="popupBox">
          <article className="titleBox">
            <strong className="title">{t('signupcomplete:TITLE')}</strong>
            <p className="explain">
              {t('signupcomplete:EXPLAIN')}
            </p>
          </article>
          <article className="btnBox">
            <button className="cancelBtn" onClick={() => navigate('/')}>
              {t('signupcomplete:CANCEL')}
            </button>
            <button className="sendBtn" onClick={()=>navigate("/marketplace")}>
              {t('signupcomplete:ISSUE_NFT')}
            </button>
          </article>
        </section>
      </PsignupComplete>
    );
}

const MsignupComplete = styled.div`
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

const PsignupComplete = styled.div`
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


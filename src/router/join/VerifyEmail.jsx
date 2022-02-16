import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";

import I_x from "../../img/icons/I_x.svg";

import WalletConnectSDK from "walletconnect";
import axios from "axios";
import queryString from "query-string";
import { useEffect } from "react";
import { API } from "../../config/api";
import { ERR_MSG } from "../../config/messages";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  useEffect(() => {
    const query = queryString.parse(search);
    const asyncVerify = async () => {
      try {
        const resp = await axios.post(
          API.API_COMPLETE_EMAIL_VERIFY +
            `/${query.address}/${query.email}/${query.verifycode}`
        );
        if (resp.data.status === "OK") {
          navigate("/signupcomplete");
        } else {
          navigate("/emailfailed");
        }
      } catch (error) {
        alert(ERR_MSG.ERR_AXIOS_REQUEST);
        console.log(error);
      }
    };
    asyncVerify();
  }, [search]);

  if (isMobile)
    return (
      <MverifyEmail>
        <section className="popupBox">
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={I_x} alt="" />
            </button>
          </article>
          <article className="contBox">
            <div className="titleBox">
              <strong className="title">Verify Email</strong>
              <p className="explain">We examine your email...</p>
            </div>
            <article className="btnBox">
              <button className="cancelBtn" onClick={() => navigate("/")}>
                OK
              </button>
            </article>
          </article>
        </section>
      </MverifyEmail>
    );
  else
    return (
      <PverifyEmail>
        <section className="popupBox">
          <article className="topBar">
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={I_x} alt="" />
            </button>
          </article>
          <article className="contBox">
            <div className="titleBox">
              <strong className="title">Verify Email</strong>
              <p className="explain">We examine your email...</p>
            </div>
            <article className="btnBox">
              <button className="cancelBtn" onClick={() => navigate("/")}>
                OK
              </button>
            </article>
          </article>
        </section>
      </PverifyEmail>
    );
}

const MverifyEmail = styled.div`
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

const PverifyEmail = styled.div`
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

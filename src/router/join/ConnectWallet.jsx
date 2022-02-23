import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setaddress, setConnect, setmyinfo } from "../../util/store";
import styled from "styled-components";

import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_x from "../../img/icons/I_x.svg";

import { API } from "../../config/api";
import { ERR_MSG, messages } from "../../config/messages";
import axios from "axios";
import { SET_USER_DATA, SET_ADDRESS, SET_LOGIN } from "../../reducers/userReducer";
import { useEffect } from "react";
import SetErrorBar from "../../util/SetErrorBar";
import { STRINGER, LOGGER } from "../../util/common";
// function ConnectWallet( Setmyinfo ) {
function ConnectWallet({ Setmyinfo, Setaddress }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const isMobile = useSelector((state) => state.common.isMobile);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const resp = await axios.get(API.API_GET_MY_INFO);
      dispatch({
        type: SET_USER_DATA.type,
        payload: resp.data.payload,
      });
      if (resp.data.payload.maria.emailverified === 0) {
        navigate("/emailrequired");
      } else {
        navigate(-1);
      }
    } catch (error) {
      SetErrorBar(ERR_MSG.ERR_AXIOS_REQUEST);
      console.log(error);
    }
  };

  async function connectKaikas() {
    const accounts = await window.klaytn.enable();
    LOGGER("wkhuemnasP000", accounts);
    let address = accounts[0];
    dispatch({ type: SET_ADDRESS, payload: { value: address }}); // acco unts[0]
    //setConnect(address);
    localStorage.setItem("address", address); // acco unts[0]
    const loginData = {
      address, // : acco unts[0]
      cryptotype: "eth",
    };
    //    try {
      /*
    let address_local = localStorage.getItem("address");
    let token = localStorage.getItem("token");
    if (address_local && token) {
      SetErrorBar(`이미 ${address}에 연결되어 있습니다`);
      navigate("/");
      return;
    } else {
    }*/
    //			if (address_local == ){}
    //console.log("LET'S CHECK : ")
    const resp = await axios.post(API.API_USERS_LOGIN, loginData);
    LOGGER("UkTGc6semq@login", resp.data); //   API_USERS _LOGIN: `${apiServer}/users/login/crypto`,
    let { status, respdata, payload } = resp.data;
    console.log("LET'S CHECK : "+resp.data)
    if (status === "OK") {
      localStorage.setItem("token", respdata);
      localStorage.setItem("address", address);
      axios.defaults.headers.common["token"] = resp.data.respdata;
      //console.log("LET IT BE TRUE")
      dispatch({ type: SET_LOGIN, payload: { value: true }});
      SetErrorBar(messages.MSG_LOGGEDIN);
      let { myinfo_maria, myinfo_mongo } = payload;
      if (myinfo_maria && myinfo_mongo) {
        Setmyinfo({ ...myinfo_mongo, myinfo_maria });
        localStorage.setItem(
          "myinfo",
          STRINGER({ ...myinfo_mongo, myinfo_maria })
        );
      } else {
        localStorage.removeItem("myinfo");
      }
      //Setaddress(address);
      
     
      navigate("/");
    } else {
      SetErrorBar(messages.MSG_PLEASEJOIN);
      navigate("/joinmembership");
      return;

      switch (resp.data.message) {
        case "NOT-FOUND":
          navigate("/joinmembership");
          break;
        default:
          SetErrorBar(ERR_MSG.ERR_AXIOS_REQUEST);
          console.log(resp.data.message);
      }
    }
  }
  if (isMobile)
    return (
      <MsignPopupBox>
        <section className="popupBox">
          <article className="contBox">
            <div className="topBar">
              <button className="exitBtn" onClick={() => navigate(-1)}>
                <img src={I_x} alt="" />
              </button>

              <div className="titleBox">
                <strong className="title">
                  Please connect an available wallet
                </strong>

                <p className="explain">
                  Please connect an available wallet
                  <br />
                  or create a new one
                </p>
              </div>
            </div>

            <ul className="walletList">
              <li onClick={connectKaikas}>
                <span className="infoBox">
                  <img src={I_klaytn} alt="" />
                  <p>klaytn</p>
                </span>
              </li>
            </ul>
          </article>
          <article className="bottomBar">
            <p className="copyright">
              Copyright © 2021 AUSPICE. All rights reserved.
            </p>

            <span className="termBox">
              <button className="privacyBtn" onClick={() => {}}>
                Privacy Policy
              </button>
              |
              <button className="termBtn" onClick={() => {}}>
                Terms of Service
              </button>
            </span>
          </article>
        </section>
      </MsignPopupBox>
    );
  else
    return (
      <PsignPopupBox>
        <section className="popupBox">
          <article className="contBox">
            <div className="topBar">
              <button className="exitBtn" onClick={() => navigate(-1)}>
                <img src={I_x} alt="" />
              </button>

              <div className="titleBox">
                <strong className="title">
                  Please connect an available wallet
                </strong>

                <p className="explain">
                  Please connect an available wallet or create a new one
                </p>
              </div>
            </div>

            <ul className="walletList">
              <li>
                <button onClick={connectKaikas}>
                  <img src={I_klaytn} alt="" />
                  <p>klaytn</p>
                </button>
              </li>
            </ul>
          </article>
          <article className="bottomBar">
            <p className="copyright">
              Copyright © 2021 AUSPICE. All rights reserved.
            </p>

            <span className="termBox">
              <button className="privacyBtn" onClick={() => {}}>
                Privacy Policy
              </button>
              |
              <button className="termBtn" onClick={() => {}}>
                Terms of Service
              </button>
            </span>
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
    width: 88.88vw;
    height: 126.38vw;
    background: #fff;
    border-radius: 5.55vw;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .contBox {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8.33vw;
      padding: 6.94vw;

      .topBar {
        display: flex;
        flex-direction: column;
        gap: 6.66vw;

        .exitBtn {
          align-self: flex-end;

          img {
            width: 5.55vw;
          }
        }

        .titleBox {
          display: flex;
          flex-direction: column;
          gap: 2.22vw;

          .title {
            font-size: 4.44vw;
            line-height: 5vw;
          }

          .explain {
            font-size: 3.33vw;
            font-weight: 500;
            line-height: 4.44vw;
            color: #011218;
          }
        }
      }

      .walletList {
        border: solid 1px #e8e8e8;
        border-radius: 2.22vw;
        overflow: hidden;

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 15.55vw;
          padding: 0 3.88vw;

          .infoBox {
            display: flex;
            align-items: center;
            gap: 2.22vw;
            font-size: 4.44vw;
            font-weight: 700;
            line-height: 4.44vw;
            color: #011218;

            img {
              width: 6.66vw;
              height: 6.66vw;
              object-fit: contain;
            }
          }
        }
      }
    }

    .bottomBar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 3.33vw;
      height: 22.77vw;
      padding: 0 6.94vw;
      font-size: 3.33vw;
      color: #fff;
      background: #222;

      .copyright {
      }

      .termBox {
        display: flex;
        align-items: center;
        gap: 2.5vw;

        button {
          font-size: 3.33vw;
          color: #fff;
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
    width: 840px;
    height: 524px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .contBox {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      flex: 1;
      padding: 40px;

      .topBar {
        display: flex;
        flex-direction: column;

        .exitBtn {
          align-self: flex-end;

          img {
            width: 20px;
          }
        }

        .titleBox {
          display: flex;
          flex-direction: column;
          gap: 14px;

          .title {
            font-size: 22px;
            line-height: 30px;
          }

          .explain {
            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
            color: #011218;
          }
        }
      }

      .walletList {
        display: flex;
        justify-content: space-between;
        padding: 30px 82px;

        li {
          button {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 20px;
            font-size: 20px;
            font-weight: 700;
            line-height: 28px;
            color: #011218;

            img {
              width: 96px;
              height: 96px;
              object-fit: contain;
            }
          }
        }
      }
    }

    .bottomBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 56px;
      padding: 0 30px;
      font-size: 12px;
      color: #fff;
      background: #222;

      .copyright {
      }

      .termBox {
        display: flex;
        align-items: center;
        gap: 13px;

        button {
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
    Setmyinfo: (payload) => dispatch(setmyinfo(payload)),
    Setaddress: (payload) => dispatch(setaddress(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);

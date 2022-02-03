import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect, setmyinfo } from "../util/store";
import styled from "styled-components";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";
import I_klaytn from "../img/sub/I_klaytn.svg";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { API } from "../config/api";
import { ERR_MSG, messages } from "../config/messages";
import axios from "axios";
import { GET_USER_DATA } from "../reducers/userSlice";
import { SET_ADDRESS } from "../reducers/walletSlice";
import { useEffect } from "react";
import SetErrorBar from "../util/SetErrorBar";
import { STRINGER, LOGGER } from "../util/common";
function ConnectWallet(Setmyinfo) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect((_) => {}, []);
  const getUserInfo = async () => {
    try {
      const resp = await axios.get(API.API_GET_USER_INFO);
      dispatch({
        type: GET_USER_DATA.type,
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
    LOGGER("wkhuemnasP", accounts);
    let address = accounts[0];
    dispatch({ type: SET_ADDRESS.type, payload: address }); // acco unts[0]
    setConnect(address);
    localStorage.setItem("address", address); // acco unts[0]
    const loginData = {
      address, // : acco unts[0]
      cryptotype: "eth",
    };
    //    try {
    let address_local = localStorage.getItem("address");
    let token = localStorage.getItem("token");
    if (address_local && token) {
      SetErrorBar(`이미 ${address}에 연결되어 있습니다`);
      return;
    } else {
    }
    //			if (address_local == ){}

    const resp = await axios.post(API.API_USERS_LOGIN, loginData); //   API_USERS_LOGIN: `${apiServer}/users/login/crypto`,
    let { status, respdata, payload } = resp.data;
    if (status === "OK") {
      localStorage.setItem("token", respdata);
      axios.defaults.headers.common["token"] = resp.data.respdata;
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
      } // 					getUserInfo()
    } else {
      // if (resp.data.status === "ERR") {
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
    /**     } catch (error) {
      SetErrorBar(ERR_MSG.ERR_AXIOS_REQUEST);
      console.log(error);
    }*/
  }

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap">
          <a onClick={() => navigate(-1)} class="close" id="info_close">
            <img src={require("../img/sub/exit_48.png").default} alt="" />
          </a>
          <div class="box line">
            <div class="top0 p1">
              <h2>Please connect an available wallet</h2>
              <p>Please connect an available wallet or create a new one</p>
            </div>
            <div class="wallet_pc">
              <ul>
                <li>
                  <a onClick={connectKaikas}>
                    <img src={I_klaytn} alt="" />
                    <p>klaytn</p>
                  </a>
                </li>
              </ul>
            </div>

            <div class="wallet_m">
              <ul>
                <li>
                  <a onClick={connectKaikas}>
                    <img src={I_klaytn} alt="" />
                    <p>klaytn</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="bottom">
            <p>Copyright © 2021 Itemverse. All rights reserved.</p>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>

      <section id="sub">
        <article class="popup_box"></article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .wallet_pc {
    ul {
      img {
        width: 96px;
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);

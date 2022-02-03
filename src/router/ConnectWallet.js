import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

import I_klaytn from "../img/sub/I_klaytn.svg";

// import "./css/style01.css";
// import "./css/style02.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import { API } from "../config/api";
import { ERR_MSG } from "../config/messages";
import axios from "axios";
import { GET_USER_DATA } from "../reducers/userSlice";
import { SET_ADDRESS } from "../reducers/walletSlice";
import { useEffect } from "react";
import SetErrorBar from "../util/SetErrorBar";

function ConnectWallet() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    dispatch({ type: SET_ADDRESS.type, payload: accounts[0] });
    setConnect(accounts[0]);
    const loginData = {
      address: accounts[0],
      cryptotype: "eth",
    };

    try {
      const resp = await axios.post(API.API_USERS_LOGIN, loginData);
      if (resp.data.status === "OK" && resp.data.respdata) {
        localStorage.setItem("token", resp.data.respdata);
        axios.defaults.headers.common["token"] = resp.data.respdata;
        getUserInfo();
      } else if (resp.data.status === "ERR") {
        switch (resp.data.message) {
          case "NOT-FOUND":
            navigate("/joinmembership");
            break;
          default:
            SetErrorBar(ERR_MSG.ERR_AXIOS_REQUEST);
            console.log(resp.data.message);
        }
      }
    } catch (error) {
      SetErrorBar(ERR_MSG.ERR_AXIOS_REQUEST);
      console.log(error);
    }
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

export default ConnectWallet;

import { useSelector } from "react-redux";
import styled from "styled-components";
import wallet_sub from "../../img/sub/wallet_sub.png";
import icon_wallet_off from "../../img/sub/icon_wallet_off.png";
import icon_wallet_on from "../../img/sub/icon_wallet_on.png";
import icon_set_off from "../../img/sub/icon_set_off.png";
import icon_set_on from "../../img/sub/icon_set_on.png";
import icon_noti_off from "../../img/sub/icon_noti_off.png";
import icon_noti_on from "../../img/sub/icon_noti_on.png";

import { useLocation, useNavigate } from "react-router";
import DetailHeader from "../header/DetailHeader";

export default function AccountLeftBar({ off }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickNav(url) {
    navigate(url, { state: { toggle: true } });
    off();
  }

  if (isMobile)
    return (
      <MaccountLeftBar>
        <DetailHeader title={"Account Setting"} />

        <li onClick={() => onClickNav("/mywallet")}>
          <span className="leftBox">
            <img className="on" src={icon_wallet_on} alt="" />
            <img className="off" src={icon_wallet_off} alt="" />
            <strong>My wallet</strong>
          </span>

          <span className="addressBox">
            <p className="address">0x9Bb...Carf</p>
            <button className="copyBtn" onClick={() => {}}>
              <img src={wallet_sub} alt="" />
            </button>
          </span>
        </li>
        <li onClick={() => onClickNav("/generalsettings")}>
          <span className="leftBox">
            <img className="on" src={icon_set_on} alt="" />
            <img className="off" src={icon_set_off} alt="" />
            <strong>General settings</strong>
          </span>
        </li>
        <li onClick={() => onClickNav("/notificationsettings")}>
          <span className="leftBox">
            <img className="on" src={icon_noti_on} alt="" />
            <img className="off" src={icon_noti_off} alt="" />
            <strong>Notification settings</strong>
          </span>
        </li>
      </MaccountLeftBar>
    );
  else {
    return (
      <PaccountLeftBar>
        <li
          className={pathname === "/mywallet" && "on"}
          onClick={() => navigate("/mywallet")}
        >
          <span className="leftBox">
            <img className="on" src={icon_wallet_on} alt="" />
            <img className="off" src={icon_wallet_off} alt="" />
            <strong>My wallet</strong>
          </span>

          <span className="addressBox">
            <p className="address">0x9Bb...Carf</p>
            <button className="copyBtn" onClick={() => {}}>
              <img src={wallet_sub} alt="" />
            </button>
          </span>
        </li>
        <li
          className={pathname === "/generalsettings" && "on"}
          onClick={() => navigate("/generalsettings")}
        >
          <span className="leftBox">
            <img className="on" src={icon_set_on} alt="" />
            <img className="off" src={icon_set_off} alt="" />
            <strong>General settings</strong>
          </span>
        </li>
        <li
          className={pathname === "/notificationsettings" && "on"}
          onClick={() => navigate("/notificationsettings")}
        >
          <span className="leftBox">
            <img className="on" src={icon_noti_on} alt="" />
            <img className="off" src={icon_noti_off} alt="" />
            <strong>Notification settings</strong>
          </span>
        </li>
      </PaccountLeftBar>
    );
  }
}

const MaccountLeftBar = styled.nav`
  background: #fff;
  top: 72px;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 3;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15.55vw;
    padding: 0 5.55vw;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;

    &:active {
      color: #fff;
      background: #000;

      .leftBox {
        img {
          &.on {
            display: block;
          }

          &.off {
            display: none;
          }
        }
      }
    }

    .leftBox {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 4.44vw;

      img {
        width: 6.66vw;
        height: 6.66vw;
        object-fit: cover;

        &.on {
          display: none;
        }

        &.off {
          display: block;
        }
      }
    }

    .addressBox {
      display: flex;
      align-items: center;
      gap: 1.11vw;

      .address {
        font-weight: 3.88vw;
        color: #b2b2b2;
      }

      .copyBtn {
        img {
          width: 6.66vw;
        }
      }
    }
  }
`;

const PaccountLeftBar = styled.nav`
  width: 350px;
  background: #fff;
  border-right: 1px solid #d9d9d9;
  top: 120px;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 3;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 76px;
    padding: 0 12px 0 30px;
    font-size: 20px;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;

    &.on {
      color: #fff;
      background: #000;

      .leftBox {
        img {
          &.on {
            display: block;
          }

          &.off {
            display: none;
          }
        }
      }
    }

    .leftBox {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        width: 24px;
        height: 24px;
        object-fit: cover;

        &.on {
          display: none;
        }

        &.off {
          display: block;
        }
      }
    }

    .addressBox {
      display: flex;
      align-items: center;
      gap: 4px;

      .address {
      }

      .copyBtn {
        img {
          width: 30px;
        }
      }
    }
  }
`;

import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useState } from "react";

import { setAllPopupOff } from "../util/store";
import I_dnArw from "../img/header/I_dnArw.svg";
import I_dnArwGray from "../img/header/I_dnArwGray.svg";

function Main({ store, setAllPopupOff }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState(0);

  function onclickCategory(index) {
    if (category === index) setCategory(0);
    else setCategory(index);
  }

  function onclickWallet() {
    setAllPopupOff();
    navigate("/connectwallet");
  }

  return (
    <HeaderBox className="mMenuBox">
      <ul className="categoryList">
        <li>
          <div
            className="topBar"
            style={{
              color: category === 1 && "#fff",
              background: category === 1 && "#222",
            }}
            onClick={() => onclickCategory(1)}
          >
            <p>Marketplace</p>
            {category === 1 ? (
              <img className="grayArw" src={I_dnArwGray} alt="" />
            ) : (
              <img src={I_dnArw} alt="" />
            )}
          </div>

          {category === 1 && (
            <ul className="categoryLink" onClick={setAllPopupOff}>
              {marketList.map((cont, index) => (
                <li
                  key={index}
                  onClick={() => navigate(`/marketplace/${cont}`)}
                >
                  {cont}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <div
            className="topBar"
            style={{
              color: category === 2 && "#fff",
              background: category === 2 && "#222",
            }}
            onClick={() => onclickCategory(2)}
          >
            <p>Explore</p>
            {category === 2 ? (
              <img className="grayArw" src={I_dnArwGray} alt="" />
            ) : (
              <img src={I_dnArw} alt="" />
            )}
          </div>

          {category === 2 && (
            <ul className="categoryLink" onClick={setAllPopupOff}>
              <li onClick={() => navigate("/exploredeal")}>
                Transaction details
              </li>
              <li onClick={() => navigate("/ranking")}>Ranking</li>
            </ul>
          )}
        </li>

        <li>
          <div
            className="topBar"
            style={{
              color: category === 3 && "#fff",
              background: category === 3 && "#222",
            }}
            onClick={() => onclickCategory(3)}
          >
            <p>My page</p>
            {category === 3 ? (
              <img className="grayArw" src={I_dnArwGray} alt="" />
            ) : (
              <img src={I_dnArw} alt="" />
            )}
          </div>

          {category === 3 && (
            <ul className="categoryLink" onClick={setAllPopupOff}>
              <li onClick={() => navigate("/myprof")}>My Profile</li>
              <li onClick={() => navigate("/myitem")}>My Item</li>
              <li>Bookmark</li>
              <li onClick={() => navigate("/mywallet")}>Account Setting</li>
            </ul>
          )}
        </li>
        <li>
          <div className="topBar">
            <p>Eng</p>
            <img src={I_dnArw} alt="" />
          </div>
        </li>
      </ul>

      <article className="btnBox">
        <button className="connectWalletBtn" onClick={onclickWallet}>
          Connect Wallet
        </button>
      </article>
    </HeaderBox>
  );
}

const HeaderBox = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: #fff;
  position: fixed;
  top: 95px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;

  .categoryList {
    li {
      font-size: 18px;
      font-weight: 500;

      .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        padding: 0 20px;
        cursor: pointer;

        .grayArw {
          transform: rotate(180deg);
        }
      }

      .categoryLink {
        border-bottom: 1px solid #e8e8e8;

        li {
          display: flex;
          align-items: center;
          height: 48px;
          padding: 0 30px;
          font-size: 16px;
          text-transform: capitalize;
          color: #727272;
          cursor: pointer;
        }
      }
    }
  }

  .btnBox {
    display: flex;
    justify-content: center;
    padding: 0 20px;

    .connectWalletBtn {
      width: 100%;
      height: 55px;
      font-size: 18px;
      font-weight: bold;
      text-transform: capitalize;
      color: #fff;
      border-radius: 28px;
      background-color: #222;
    }
  }

  @media screen and (min-width: 1025px) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    top: 85px;
  }

  @media screen and (max-width: 640px) {
    top: 75px;
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const marketList = [
  "All",
  "collectibles",
  "Digital Art",
  "Trading Card",
  "music",
  "Virtual Worlds",
  "sports",
];

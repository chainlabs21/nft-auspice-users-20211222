import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../img/header/logo.png";
import I_search from "../../img/icons/I_search.png";
import I_hamburger from "../../img/icons/I_hamburger.png";
import I_x from "../../img/icons/I_x.svg";
import search_form from "../../img/header/search_form.png";
import menu_all from "../../img/header/menu_all.png";
import menu_all_off from "../../img/header/menu_all_off.png";
import menu_collectibles from "../../img/header/menu_collectibles.png";
import menu_collectibles_off from "../../img/header/menu_collectibles_off.png";
import menu_digitalart from "../../img/header/menu_digitalart.png";
import menu_digitalart_off from "../../img/header/menu_digitalart_off.png";
import menu_tradingcard from "../../img/header/menu_tradingcard.png";
import menu_tradingcard_off from "../../img/header/menu_tradingcard_off.png";
import menu_music from "../../img/header/menu_music.png";
import menu_music_off from "../../img/header/menu_music_off.png";
import menu_virtualworlds from "../../img/header/menu_virtualworlds.png";
import menu_virtualworlds_off from "../../img/header/menu_virtualworlds_off.png";
import menu_sports from "../../img/header/menu_sports.png";
import menu_sports_off from "../../img/header/menu_sports_off.png";
import I_dnArw from "../../img/header/I_dnArw.svg";
import { strDot } from "../../util/Util";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { onClickCopy } from "../../util/common";
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../config/messages";
import MmenuPopup from "./MmenuPoupup";
import axios from "axios";
import {API} from "../../config/api"
import { SET_USER_DATA, SET_ADDRESS, SET_LOGIN } from "../../reducers/userReducer";

export default function DefaultHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = useSelector((state) => state.common.isMobile);
  const {walletAddress, isloggedin} = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [mMenuPopup, setMenuPopup] = useState(false);
  function checklogin(){
    console.log(window.klaytn.enable()[0])
    //console.log(isloggedin+" : "+walletAddress)
    if (!localStorage.getItem("token")) return;
    //if (localStorage.getItem("address") != window.klaytn.enable()[0])
    console.log(localStorage.getItem("token"))
    axios.defaults.headers.common["token"] = localStorage.getItem("token");
    axios.get(`${API.API_USER_CHECK}`, {address: localStorage.getItem("address")})
    .then((resp) => {
      console.log(resp)
      if (resp.status==200){
        dispatch({ type: SET_LOGIN, payload: { value: true }});
        dispatch({type: SET_ADDRESS, payload:{value: localStorage.getItem("address")}})
        dispatch({type: SET_USER_DATA, payload:{ value: resp.data.payload}})
        //console.log(resp)
        //dispatch({ type: SET_USER_DATA, payload: { value: true }});
      }
    })

  }
  useEffect(()=>{
    checklogin()
    
  }, [])

  function onClickConnectWallet() {
    !isloggedin && navigate("/connectwallet");
  }

  if (isMobile)
    return (
      <>
        {mMenuPopup && <MmenuPopup off={setMenuPopup} />}
        <MdefaultHeaderBox>
          <section className="innerBox">
            <article className="leftBox">
              <button className="logoBtn" onClick={() => navigate("/")}>
                <img src={logo} alt="" />
              </button>
            </article>

            <article className="rightBox">
              <button className="searchBtn" onClick={() => {}}>
                <img src={I_search} alt="" />
              </button>
              {mMenuPopup ? (
                <button
                  className="menuBtn on"
                  onClick={() => setMenuPopup(false)}
                >
                  <img src={I_x} alt="" />
                </button>
              ) : (
                <button
                  className="menuBtn off"
                  onClick={() => setMenuPopup(true)}
                >
                  <img src={I_hamburger} alt="" />
                </button>
              )}
            </article>
          </section>
        </MdefaultHeaderBox>
      </>
    );
  else
    return (
      <PdefaultHeaderBox>
        <section className="innerBox">
          <article className="leftBox">
            <button className="logoBtn" onClick={() => navigate("/")}>
              <img src={logo} alt="" />
            </button>

            <div className="searchBox">
              <button className="searchBtn" onClick={() => {}}>
                <img src={search_form} alt="" />
              </button>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items, collections, creators"
              />
            </div>
          </article>

          <article className="rightBox">
            <nav>
              <li className="marketPlaceBox">
                <span className="posBox">
                  <button
                    className="marketPlace"
                    onClick={() => navigate("/marketplace")}
                  >
                    Marketplace
                  </button>

                  <ul className="popupBox marketPlace">
                    {marketPlacePopupList.map((cont, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          navigate("/marketplace?category="+cont.state)
                        }
                      >
                        <img className="offImg" src={cont.offImg} alt="" />
                        <img className="onImg" src={cont.onImg} alt="" />
                        <p>{cont.text}</p>
                      </li>
                    ))}
                  </ul>
                </span>
              </li>

              <li>
                <span className="posBox">
                  <button
                    className="explore"
                    onClick={() => navigate("/exploredeal")}
                  >
                    Explore
                  </button>

                  <ul className="popupBox explore">
                    <li onClick={() => navigate("/exploredeal")}>
                      Transaction details
                    </li>
                    <li onClick={() => navigate("/ranking")}>Ranking</li>
                  </ul>
                </span>
              </li>

              <li style={{ display: isloggedin && walletAddress ? "flex" : "none" }}>
                <span className="posBox">
                  <button
                    className="mypage"
                    onClick={() => navigate("/searchwallet")}
                  >
                    Mypage
                  </button>

                  <ul className="popupBox mypage">
                    <li onClick={() => navigate("/searchwallet")}>My Profile</li>
                    <li onClick={() => navigate("/createitem")}>
                      Publish NFT
                    </li>
                    <li onClick={() => navigate("/liked")}>Bookmark</li>
                    <li onClick={() => navigate("/mywallet")}>
                      Account Setting
                    </li>
                  </ul>
                </span>
              </li>

              <li>
                <span className="posBox langBox">
                  <span className="blank" />
                  <button className="lang" onClick={() => {SetErrorBar('준비중입니다.')}}>
                    ENG
                  </button>
                  <img src={I_dnArw} alt="" />
                </span>
              </li>
            </nav>

            <button
              className="connectBtn"
              onClick={() => {
                isloggedin&&
                walletAddress &&
                  onClickCopy(walletAddress) &&
                  SetErrorBar(messages.MSG_COPIED);
                onClickConnectWallet();
              }}
            >
              {(isloggedin && walletAddress) ? strDot(walletAddress, 8, 0) : "Connect Wallet"}
            </button>
          </article>
        </section>
      </PdefaultHeaderBox>
    );
}

const MdefaultHeaderBox = styled.header`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 72px;
  background: #fff;
  top: 0;
  z-index: 4;
  position: fixed;

  .innerBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 5.55vw;

    .leftBox {
      .logoBtn {
        img {
          height: 42px;
        }
      }
    }

    .rightBox {
      display: flex;
      align-items: center;
      gap: 14px;

      img {
        height: 24px;
      }

      .menuBtn {
        &.on {
          img {
            height: 20px;
          }
        }
      }
    }
  }
`;

const PdefaultHeaderBox = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120px;
  background: #fff;
  top: 0;
  z-index: 4;
  position: fixed;
  box-shadow: 0 3px 20px 0 rgb(0 0 0 / 10%);

  .innerBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1680px;

    @media screen and (max-width: 1680px) {
      padding: 0 20px;
    }

    .leftBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      width: 100%;
      height: 56px;
      max-width: 530px;

      .searchBox {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 290px;
        height: 56px;
        padding: 0 18px;
        border: solid 1px #bbb;
        border-radius: 28px;

        input {
          flex: 1;
          font-size: 14px;

          &::placeholder {
          }
        }
      }
    }

    .rightBox {
      display: flex;
      align-items: center;
      max-width: 700px;
      height: 56px;
      gap: 26px;

      nav {
        display: flex;
        height: 100%;

        & > li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;

          &.marketPlaceBox {
            margin: 0 10px 0 0;
          }

          .posBox {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            height: 100%;

            &.langBox {
              width: 100%;
              padding: 0 8px;
              justify-content: space-between;

              img,
              .blank {
                width: 24px;
              }
            }

            &:hover {
              .popupBox {
                display: flex;
              }
            }

            button {
              display: flex;
              align-items: center;
              font-size: 20px;
              font-weight: 500;
            }

            .popupBox {
              display: none;
              flex-direction: column;
              width: 160px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
              top: 56px;
              position: absolute;
              overflow: hidden;

              li {
                display: flex;
                align-items: center;
                gap: 12px;
                width: 100%;
                height: 48px;
                padding: 0 0 0 11px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;

                .onImg {
                  display: none;
                }

                &:hover {
                  color: #fff;
                  background: #222;

                  .offImg {
                    display: none;
                  }
                  .onImg {
                    display: block;
                  }
                }
              }
            }
          }
        }
      }

      .connectBtn {
        width: 182px;
        height: 100%;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        background: #222;
        border-radius: 28px;
      }
    }
  }
`;

const marketPlacePopupList = [
  {
    onImg: menu_all,
    offImg: menu_all_off,
    text: "All",
    state: "all",
  },
  {
    onImg: menu_collectibles,
    offImg: menu_collectibles_off,
    text: "Collectibles",
    state: "collectibles",
  },
  {
    onImg: menu_digitalart,
    offImg: menu_digitalart_off,
    text: "Digital Art",
    state: "art",
  },
  {
    onImg: menu_tradingcard,
    offImg: menu_tradingcard_off,
    text: "Trading Card",
    state: "trading cards",
  },
  {
    onImg: menu_music,
    offImg: menu_music_off,
    text: "Music",
    state: "Music",
  },
  {
    onImg: menu_virtualworlds,
    offImg: menu_virtualworlds_off,
    text: "Virtual Worlds",
    state: "virtual world",
  },
  {
    onImg: menu_sports,
    offImg: menu_sports_off,
    text: "Sports",
    state: "sports",
  },
];

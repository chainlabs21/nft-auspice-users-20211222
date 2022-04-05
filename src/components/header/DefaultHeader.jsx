import { useEffect, useState, useRef} from "react";
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
import i18n from "../../i18n";
import {SET_SEARCH} from "../../reducers/filterReducer"
import { useTranslation } from "react-i18next";
import ConnectWalletPopup from "./ConnectWalletPopup";
import MyWalletPopup from "./MyWalletPopup";
import ConfirmationPopup from "../ConfirmationPopup"

export default function DefaultHeader(props) {
  const { t }  = useTranslation(['locale'])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = useSelector((state) => state.common.isMobile);
  const {walletAddress, isloggedin} = useSelector((state) => state.user);

  const ssearch = useSelector((state)=>state.filter.search)
  const [search, setSearch] = useState('')
  const [mMenuPopup, setMenuPopup] = useState(false);
  const [categoryGroup, setCategoryGroup]=useState([])
  const [ toggleConnectWallet, setToggleConnectWallet] = useState(false);
  const [toggleAlert, setToggleAlert] = useState(false);

  useEffect(()=>{
    setSearch(ssearch)
    setCategoryGroup([])
    axios.get(`${API.API_GET_ITEM_CATEGORIES}`).then((resp)=>{
      let categories = resp.data.list
      categories.map((v, i)=>{
        setCategoryGroup(pre=> [...pre, {code:v.category, text: v.textdisp}])
      })
    })
  },[])

  function onClickConnectWallet() {
    !isloggedin && navigate("/connectwallet");
  }
  
  function checklogin(localtion){
    if(!isloggedin)
    setToggleAlert(true)
    else
    navigate("/support")
  }

  function handleSearch(e={key:'Enter'}){
    if(e.key=="Enter"){
      console.log(search)
      dispatch({type: SET_SEARCH, payload:{value: search}});
      navigate("/marketplace/all")
      //props.search(search)
    }
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
      <>{toggleAlert&&<ConfirmationPopup off={setToggleAlert} content={t('header:PLEASE_LOGIN')}/>}
      <PdefaultHeaderBox>
        <section className="innerBox">
          <article className="leftBox">
            <button className="logoBtn" onClick={() => navigate("/")}>
              <img className="logo" src={logo} alt="" />
            </button>

            <nav>
              <li className="marketPlaceBox">
                <span className="posBox">
                  <button
                    className="marketPlace"
                    onClick={() => navigate("/marketplace/all")}
                  >
                    {t('header:MARKETPLACE')}
                  </button>

                  <ul className="popupBox marketPlace">
                    {
                      categoryGroup.map((cont, index)=>{
                        if(index==0){return;}
                        else return(<li
                        key={index}
                        onClick={() =>
                          navigate("/marketplace/"+cont.code)
                        }
                      >
                        <img className="offImg" src={`http://itemverse1.net/assets/header/marketicons/menu_${cont.code}_off.png`} alt="" />
                        <img className="onImg" src={`http://itemverse1.net/assets/header/marketicons/menu_${cont.code}.png`} alt="" />
                        <p>{cont.text}</p>
                      </li>)
})
                    }
                    {/* {marketPlacePopupList.map((cont, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          navigate("/marketplace/"+cont.state)
                        }
                      >
                        <img className="offImg" src={cont.offImg} alt="" />
                        <img className="onImg" src={cont.onImg} alt="" />
                        <p>{cont.text}</p>
                      </li>
                    ))} */}
                  </ul>
                </span>
              </li>

              <li>
                <span className="posBox">
                  <button
                    className="explore"
                    onClick={() => navigate("/exploredealhistory")}
                  >
                    {t('header:EXPLORE')}
                  </button>

                  <ul className="popupBox explore" style={{display:'none'}}>
                    <li onClick={() => navigate("/exploredealhistory")}>
                      Transaction details
                    </li>
                    <li onClick={() => navigate("/ranking")}>Ranking</li>
                  </ul>
                </span>
              </li>

              <li>
                <span className="posBox">
                  <button
                    className="notice"
                    onClick={() => navigate("/Notice")}
                  >
                    {t('header:SUPPORT')}
                  </button>

                  <ul className="popupBox notice">
                    <li onClick={() => navigate("/notice")}>Notice</li>
                    <li onClick={() => navigate("/faq")}>FAQ</li>
                    <li onClick={() => checklogin('/support')}>Support Ticket</li>
                  </ul>
                </span>
              </li>

              <li style={{ display: isloggedin && walletAddress ? "flex" : "none" }}>
                <span className="posBox">
                  <button
                    className="mypage"
                    onClick={() => navigate("/mypage/searchwallet/")}
                  >
                    {t('header:MYPAGE')}
                  </button>

                  <ul className="popupBox mypage">
                    <li onClick={() => navigate("/mypage/searchwallet/")}>{t('header:MY_PROFILE')}</li>
                    <li onClick={() => navigate("/createitem")}>
                      {t('header:PUBLISH')}
                    </li>
                    <li onClick={() => navigate("/mypage/liked/"+walletAddress)}>{t('header:BOOKMARK')}</li>
                    <li onClick={() => navigate("/mywallet")}>
                      {t('header:ACC_SETTING')}
                    </li>
                  </ul>
                </span>
              </li>
              </nav>

            {/* <div className="searchBox">
              <button className="searchBtn" onClick={() => {handleSearch()}}>
                <img src={search_form} alt="" />
              </button>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={e=>{handleSearch(e)}}
                placeholder={t('header:SEARCH_HOLDER')}
              />
            </div> */}
          </article>

          <article className="rightBox">
          <div className="topRight">
            <nav>
              <li>
                <span className="posBox langBox">
                <div className="langHolder">
                <img src={menu_virtualworlds} alt="" style={{filter: "brightness(40%"}} />
                  <button className="lang">
                    Eng
                  </button>
                  </div>
                  <span className="blank"></span>
                  <ul className="popupBox notice">
                    <li onClick={() => i18n.changeLanguage('kr')}>KOR</li>
                    <li onClick={() => i18n.changeLanguage('en')}>ENG</li>
                  </ul>
                </span>
              </li>
              <li>
              <span className="connectBox">
              <button
              className="connectBtn"
              onClick={() => {
                setToggleConnectWallet(!toggleConnectWallet)
                
                // if(isloggedin && walletAddress){
                //   onClickCopy(walletAddress);
                //   SetErrorBar(messages.MSG_COPIED);
                // }else{
                //   onClickConnectWallet();
                // }
              }}
            >
              {(isloggedin && walletAddress) ? strDot(walletAddress, 8, 0) : "Connect Wallet"}
            </button>
            {toggleConnectWallet && !isloggedin && <ConnectWalletPopup />}
            {toggleConnectWallet && isloggedin && <MyWalletPopup  />}
            </span>
              </li>
            </nav>


            </div>
            <div className="searchBox">
              <button className="searchBtn" onClick={() => {handleSearch()}}>
                <img src={search_form} alt="" />
              </button>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={e=>{handleSearch(e)}}
                placeholder={t('header:SEARCH_HOLDER')}
              />
            </div> 
          </article>
        </section>
      </PdefaultHeaderBox>
      </>
    );
}

const MdefaultHeaderBox = styled.header`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 72px;
  background: #fff;
  top: 0;
  z-index: 10;
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
  height: 163px;
  background: #fff;
  top: 0;
  z-index: 20;
  position: fixed;
  box-shadow: 0 3px 20px 0 rgb(0 0 0 / 10%);

  .innerBox {
    margin-top: 23px;
    display: flex;
    justify-content: space-between;
    //align-items: center;
    width: 100%;
    max-width: 1680px;

    @media screen and (max-width: 1680px) {
      padding: 0 20px;
    }

    .leftBox {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 29px;
      width: 100%;
      height: 56px;
      max-width: 530px;
      .logoBtn{
        display: flex;
      .logo{
        height:57px;
      }
      }
      nav {
        display: flex;
        height: 100%;

        & > li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 150px;
          height: 40px;
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
              top: 40px;
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

      
    }

    .rightBox {
      
      display: flex;
      align-items: center;
      max-width: 700px;
      height: 56px;
      gap: 20px;

      flex-direction: column;
      .topRight{
        display: flex;
        height: 57px;
      nav {
        display: flex;
        height: 57px;

        & > li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;

          .connectBox{
            display: flex;
            justify-content: flex-end;
            align-items: left;
            position: relative;
            height: 100%;
            .connectBtn {
              //justify-content: center;
              //align-items: center;
              //position: relative;
              width: 182px;
              height: 100%;
              font-size: 20px;
              font-weight: 500;
              color: #fff;
              background: #222;
              border-radius: 28px;
              //display: flex;
            
      }

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
              .langHolder{
                display: flex;

                .lang{
                  margin-left: 7px;
                font-size: 16px;
                font-weight: normal;
                color: #656565;

              }
              }
              

              img,
              .blank {
                width: 24px;
              }
            }

            &:hover {
              .popupBox {
                right: 40px;
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
              width: 100px;
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
      

      
    }
    .searchBox {
      display: flex;
      justify-content: flex-end;
        flex: 1;
        width: 293px;
        align-items: center;
        gap: 10px;
        
        padding: 0 18px;
        border: solid 1px #bbb;
        border-radius: 28px;

        input {
          flex: 1;
          font-size: 14px;
          height: 38px;
          width: 100%;
          &::placeholder {
          }
        }
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

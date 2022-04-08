import { connect, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { setaddress, setConnect, setmyinfo } from "../../util/store";
import styled, { ThemeConsumer } from "styled-components";
import { writeSig } from "../../util/verifySig";

import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_metamask from "../../img/sub/I_metamask.svg";
import I_user from "../../img/header/I_user.svg";

import { API } from "../../config/api";
import { ERR_MSG, messages } from "../../config/messages";
import axios from "axios";
import { SET_USER_DATA, SET_ADDRESS, SET_LOGIN, SET_WALLET_TYPE } from "../../reducers/userReducer";
import { useEffect } from "react";
import SetErrorBar from "../../util/SetErrorBar";
import { STRINGER, LOGGER } from "../../util/common";
import JoinMemberShip from "../../router/join/JoinMemberShip";

import { useTranslation} from "react-i18next"

import Caver from "caver-js";

// function ConnectWallet( Setmyinfo ) {
function ConnectWalletPopup({ Setmyinfo, Setaddress }) {
  const { t }  = useTranslation(['locale'])
  const navigate = useNavigate();
  const { walletAddress, userData } = useSelector((state) => state.user);
  const isMobile = useSelector((state) => state.common.isMobile);
  const dispatch = useDispatch();
  const [toggleJoin, setToggleJoin] = useState(false);

    //-------LOGIN FUNCTION
    function login(address, TYPE){
      console.log(address)
      axios
        .post(API.API_USERS_LOGIN, { address: address, cryptotype: "ETH" })
        .then((resp) => {
          console.log(resp)
          let { status, respdata } = resp.data;
          if (status === "OK") {
            localStorage.setItem("token", respdata);
            console.log("tokeeen"+respdata)
            axios.defaults.headers.common["token"] = resp.data.respdata;
            localStorage.setItem("address", address);
            localStorage.setItem("walletType", TYPE);
            dispatch({
              type: SET_ADDRESS,
              payload:{
                value: address
              }
            });
            dispatch({
              type: SET_USER_DATA,
              payload:{ 
              value: resp.data.payload.myinfo_maria,
              }
            });
            dispatch({
              type: SET_WALLET_TYPE,
              payload:{
                value: TYPE
              }
            });
            dispatch({
              type: SET_LOGIN,
              payload:{
                value: true
              }
            });
            //getUserInfo()
            navigate("/")
            SetErrorBar(messages.MSG_ADDRESS_CHANGED + `: ${address}`);
          } else if (status === "ERR") {
            localStorage.removeItem("token");
            axios.defaults.headers.common["token"] = "";
          }
        });
    };
    /////////////////////////////////////////////////////////////////////

  const getUserInfo = async () => {
    try {
      const resp = await axios.get(API.API_GET_MY_INFO);
      console.log(resp.data.payload.maria)
      dispatch({
        type: SET_USER_DATA,
        payload: resp.data.payload.maria,
      });
      if (resp.data.payload.maria.emailverified === 0) {
        navigate("/emailrequired");
      } else {
        navigate('/');
      }
    } catch (error) {
      SetErrorBar(ERR_MSG.ERR_AXIOS_REQUEST);
      console.log(error);
    }
  };

  async function connectWallet(TYPE){
    let {ethereum, klaytn} = window;
    //let accounts =""
  //   async function select(TYPE){
  //   switch(TYPE){
  //     case 1:
  //       return await ethereum.enable();
  //     case 2: 

  //     return await klaytn.enable()
  //   }
  // }
  // const accounts = await select(TYPE)
  //const accounts = await ethereum.request({method: 'eth_requestAccounts'})
  if (!klaytn){alert('install klaytn please'); return;}
  window.klaytn.enable().then((account)=>{
    dispatch({ type: SET_ADDRESS, payload: {value: account[0] }}); 

    axios.get(`${API.API_USER_INFO}/${account[0]}`).then(async(resp)=>{
      console.log("DATA:: "+resp.data.payload)
      await dispatch({
        type: SET_USER_DATA,
        payload: {value: resp.data.payload},
      });
      if(resp.data.payload.maria==null) {
        //console.log('hello')
        //navigate("/joinmembership")
        setToggleJoin(true)
        return;
      }
      else if(resp.data.payload.maria.email == null){
        console.log('hello')
        navigate("/emailchange")
        return;
      }
      else if(resp.data.payload.maria.emailverified == 0){
        navigate("/sentEmailDetail")
        return
      }
      else{
        axios.get(`${API.API_GET_NONCE}/${account[0]}`).then((nonce)=>{
          console.log(nonce)
          writeSig(account[0], nonce.data.code)
          //const caver = new Caver(klaytn);
          //caver.klay.sign()


        })
        login(account[0], TYPE)
        console.log('hello')
      }
    })
  })
}

useEffect(()=>{
  console.log(userData)
}, [userData])
    return (<>
      {toggleJoin&&<JoinMemberShip off={setToggleJoin}/>}
      <PsignPopupBox>
        <section className="popupBoxCW">
          <article className="contBox">
            <div className="topBar">
              <div className="titleBox">
              <img style={{ width: '48px', height: '48px', margin: '0px'}}
              src={I_user} 
              alt="" />
                <strong className="title">
                {t('connectwallet:P_MY_WALLET')}
                </strong>
              </div>
            </div>

            <ul className="walletList">
              <li className="listitem">
                <button onClick={()=>{connectWallet(0)}}>
                  <img src={I_klaytn} alt="" />
                  <p>Kaikas</p>
                </button>
              </li>
              <li className="listitem">
                <button onClick={()=>{connectWallet(1)}}>
                  <img src={I_metamask} alt="" />
                  <p>MetaMask</p>
                </button>
              </li>
            </ul>
            <p className='description'>{t('connectwallet:P_DESC')}</p>
          </article>
          <article className="bottomBar">
              <button className="moreBtn" onClick={() => {navigate('/faq')}}>
                {t('connectwallet:P_GUIDE')}
              </button>
          </article>
        </section>
      </PsignPopupBox>
      </>
    );
}

const PsignPopupBox = styled.div`
  .popupBoxCW {
    display: flex;
              flex-direction: column;
              width: 320px;
              background-color: #fff;
              border-radius: 20px;
              box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
              top: 70px;
              position: absolute;
              overflow: hidden;
              right: 0;
              padding: 16px 15px 20px 15px;

    .contBox {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      flex: 1;
      

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
          height: 48px;
          display: flex;
          flex-direction: row;
          gap: 3px;

          .title {
            font-size: 16px;
            line-height: 48px;
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
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        
        border-radius: 8px;
        border: solid 1px #e8e8e8;

        .listitem {
          padding: 16px 14px;
          button {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            gap: 20px;
            font-size: 20px;
            font-weight: 700;
            line-height: 28px;
            color: #011218;

            img {
              width: 24px;
              object-fit: contain;
            }
            p{
              font-size: 16px;
              font-weight: 600;
              height: 24px;
              line-height: 24px;
            }
          }
        }
        .listitem + .listitem{
          border-top: solid 1px #e8e8e8;
          //padding-top: 16px;
        }
      }

      .description{
        display: flex;
        margin-top: 15px;
        font-size: 12px;
        font-weight: normal;
      }
    }

    .bottomBar {
      padding-top: 21px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;

      .moreBtn{
        width: 127px;
        height: 42px;
        background-color: #fff;
        border: solid 1px #7a7a7a;
        border-radius: 21px;
        flex-direction: row;
      justify-content: flex-end;
      //right:0;
      font-size: 16px;
  font-weight: bold;
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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWalletPopup);

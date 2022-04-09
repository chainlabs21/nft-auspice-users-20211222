import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setaddress, setConnect, setmyinfo } from "../../util/store";
import styled from "styled-components";
import { useState, FC } from "react";
import { ReactSortable } from "react-sortablejs";
import { onClickCopy } from "../../util/common";

import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_metamask from "../../img/sub/I_metamask.svg";
import I_Arw from "../../img/icons/I_dnArrow.svg";
import I_copy from "../../img/sub/wallet_sub.png";
import I_refresh from "../../img/icons/I_refresh.svg"
import I_drag from "../../img/icons/I_drag.svg"

import { API } from "../../config/api";
import { ERR_MSG, messages } from "../../config/messages";
import axios from "axios";
import { SET_USER_DATA, SET_ADDRESS, SET_LOGIN, SET_WALLET_TYPE } from "../../reducers/userReducer";
import { useEffect } from "react";
import SetErrorBar from "../../util/SetErrorBar";
import { STRINGER, LOGGER } from "../../util/common";
import JoinMemberShip from "../../router/join/JoinMemberShip";

import { useTranslation} from "react-i18next"

// function ConnectWallet( Setmyinfo ) {
function MyWalletPopUp({ Setmyinfo, Setaddress }) {

  const walletList=[
    {
      id: 0,
      icon: I_klaytn,
      name: 'Kaikas'
    },
    {
      id: 1,
      icon: I_metamask,
      name: 'Metamask'
    }
  ]

  const [tokenLists, setTokenLists]=useState([
    {
      id: 0,
      icon: I_klaytn,
      name: 'KLAY',
      amount: 10
    },
    {
      id: 1,
      icon: I_metamask,
      name: 'ATT',
      amount: 0.07
    },
    {
      id: 2,
      icon: I_metamask,
      name: 'BUSD',
      amount: 137
    },
    {
      id: 3,
      icon: I_metamask,
      name: 'USDT',
      amount: 7
    }
  ])


  const { t }  = useTranslation(['locale'])
  const navigate = useNavigate();
  const { walletType, walletAddress, userData } = useSelector((state) => state.user);
  const isMobile = useSelector((state) => state.common.isMobile);
  const [rotate, setRotate] = useState(false);
  const [amount, setAmount] =useState(0)
  const dispatch = useDispatch();
  const [toggleJoin, setToggleJoin] = useState(false);
  const [wType, setWType] = useState(-1);

  useState(()=>{
    setWType(localStorage.getItem("walletType"))
  }, [localStorage])

  //-onClick 충전하기
  function handleCharge(){

  }

  // 새로고침 눌렀을 떄
  function handleRefresh(){
    setAmount(0)
  }

  //지갑 주소 복사
  function handleCopy(){
    onClickCopy(walletAddress)
  }

  function handleLogOut(){
    return new Promise((resolve, reject) => {
      axios.post(API.API_LOGOUT).then((resp) => {
        LOGGER("3LyOB7GcWr@logout", resp.data);
        let { status } = resp.data;
        if (status === "OK") {
          //          SetLogut();
          localStorage.removeItem("token");
          localStorage.removeItem("address");
          localStorage.removeItem("provider");
          localStorage.removeItem("walletType");
          dispatch({
            type: SET_LOGIN,
            payload:{
              value: false
            }
          })
          dispatch({
            type: SET_ADDRESS,
            payload:{
              value: null
            }
          });
          dispatch({
            type: SET_WALLET_TYPE,
            payload:{
              value: null
            }
          });
          dispatch({
            type: SET_USER_DATA,
            payload:{
              value: null
            }
          });
          resolve(true);
        } else {
          resolve(null);
        }
      });
    });
  }

    //-------LOGIN FUNCTION
    function login(address, type){
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
            localStorage.setItem("walletType", type);
            dispatch({
              type: SET_ADDRESS,
              payload:{
                value: address
              }
            });
            dispatch({
              type: SET_WALLET_TYPE,
              payload:{
                value: type
              }
            });
            dispatch({
              type: SET_LOGIN,
              payload:{
                value: true
              }
            });
            getUserInfo()
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
      console.log(resp)
      dispatch({
        type: SET_USER_DATA,
        payload: {
          value: resp.data.payload.myinfo_maria
        }
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
      console.log("DATA:: "+resp)
      await dispatch({
        type: SET_USER_DATA,
        payload: {value: resp.data.payload.maria},
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
          
            <div className="topBar">
              <div className="titleBox">
              <img style={{ width: '32px', height: '32px', margin: '8px', borderRadius: '50%'}}
              src={userData?.profileimageurl || I_klaytn} 
              alt="" />
                <strong className="title">
                {t('connectwallet:P_MY_WALLET')}
                </strong>
              </div>
              <img className="Arw" style={rotate?{transform: 'rotate(180deg)', transition: '0.4s'}:{transform: 'rotate(0deg)', transition: '0.4s'}} src={I_Arw} onClick={()=>{setRotate(!rotate)}}/>
            </div>
              {rotate &&<article className="contBox">
              <ul className="walletList">
              {walletList.map((v, i)=>{
                console.log(v)
                return(
                  <li key={i} className={"listitem " + (v.id == wType &&'listitem-selected')}>
                  <button onClick={()=>{connectWallet(v.id)}}>
                    <img src={v.icon} alt="" />
                    <p>{v.name}</p>
                  </button>
                </li>
                )
              })}
              </ul>
            </article>}
            <div className="walletinfoBar">

              <img className="walleticon" 
              src={walletList[0].icon || I_klaytn} 
              alt="" />
                <p className="title">
                {walletAddress}
                </p>
                <img className="Arw" src={I_copy} onClick={()=>{handleCopy()}}/>
            </div>
          <article className="contBox">
              <div className="charge">
                <div className="inputBox">
                <div className="infoBox">
                <p style={{display: 'flex'}}>총 금액</p>
                <img alt="" src={I_refresh} onClick={()=>{handleRefresh()}}/>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={e=>setAmount(e.target.value)}
                 />
                </div>
                <div className="chargeBtn" onClick={()=>{handleCharge()}}>
                  충전하기
                </div>
              </div>

              <ReactSortable className="tokenList" list={tokenLists} setList={setTokenLists} handler=".listitem.rightItem.moveBtn">
              {tokenLists.map((v, i)=>{
                return(
                  <div className="listitem">
                  <button onClick={()=>{}}>
                    <img src={v.icon} alt="" />
                    <p>{v.name}</p>
                  </button>
                  <div className="rightItem">
                  <div className="tokenInfo">
                  <p className="tokenAmount">{v.amount}</p>
                  <p className="tokenPrice">$ 10.5 USD</p>

                  </div>
                  <div className="moveBtn">
                  <img style={{marginTop: '4px'}}src={I_drag}/>
                  </div>
                  </div>
                </div>
                )
              })}
              </ReactSortable>
          </article>
          <article className="bottomBar">
              <button className="moreBtn" onClick={() => {handleLogOut()}}>
                {t('connectwallet:LOGOUT')}
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
    

    .topBar {
      padding: 16px 15px 14px 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .Arw{
        width: 24px;
        height: 24px;
        margin: 8px;
      }

      .exitBtn {
        align-self: flex-end;
        img {
          width: 20px;
        }
      }
      .titleBox {
        display: flex;
        height: 48px;
        display: flex;
        flex-direction: row;
        gap: 3px;
        .title {
          font-size: 16px;
          line-height: 48px;
          text-overflow: ellipsis;
        }
        .explain {
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
          color: #011218;
        }
      }
    }

    .walletinfoBar {
      margin-left: 16px;
      padding: 0 0px 20px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 288px;
      border-bottom: solid 1px #ccc;
      gap: 6px;

        .walleticon{
          width: 24px; 
          height: 24px;
          margin-left: 8px;
        }
        .title {
          
          //display: flex;
          //width:100px;
          font-size: 12px;
          line-height: 24px;
          text-align: left;
          justify-content: flex-start;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .Arw{
        display: flex;
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      
    }

    .contBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      width: 320px;
      flex: 1;
      .walletList {
        overflow:hidden;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        background-color: #d9d9d9;
        margin-bottom: 21px;

        .listitem {
          width: 320px;
          padding: 16px 14px;
          background-color: #d9d9d9;
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
              font-weight: normal;
              height: 24px;
              line-height: 24px;
            }
          }
          &-selected{
            background-color: #222;
            color: #fff;
            button {
              color:#fff;
              p{
                color:#fff;
              }
            }
          }
        }

        .listitem + .listitem{
          border-top: solid 1px #e8e8e8;
          //padding-top: 16px;
        }
      }

      .charge{
        display: flex;
        flex-direction: column;
        width: 290px;
        height: 168px;
        background-color: #f4f4f4;
        border: solid 1px #7a7a7a;
        border-radius: 8px;
        margin-top: 30px;
        overflow: hidden;
        .inputBox{
          display:flex;
          flex:1;
          width: 100%;
          flex-direction: column;
          .infoBox{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 290px;
            height: 50%;
            p{
              display: flex;
              margin: 14px 0 0 14px;
              font-size: 16px;
              font-weight: bold;
              color: #7a7a7a;
            }
            img{
              display: flex;
              margin: 14px 14px 0 14px;
              width: 24px;
              height: 24px;
            }
          }
          input{
            padding: 14px;
            height: 50%;
            text-align: right;
            font-size: 30px;
            font-weight: bold;

          }
        }
        .chargeBtn{
          cursor: pointer;
          display: flex;
          height: 52px;
          color: #fff;
          background-color: #222;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;

        }


      }

      .tokenList{
        display: flex;
        flex-direction: column;
        width: 290px;
        height: 100%;
        background-color: #f4f4f4;
        border: solid 1px #b1b1b1;
        border-radius: 8px;
        margin-top: 30px;
        overflow: hidden;
        .listitem{
          display: flex;
          padding: 14px;
          flex-direction: row;
          justify-content: space-between;
          button{
            display: flex;
            flex-direction: row;
            //width: 100%;
            gap: 8px;
            img{
              width: 24px;
              margin-top: 4px;
            }
            p{
              line-height: 32px;
              font-size: 16px;
              font-weight: 600;
            }
          }
          .rightItem{
            display: flex;
            gap: 14px;
          .tokenInfo{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            p{
              display: flex;
              font-size: 14px;
              font-weight: normal;
            }
            .tokenAmount{
              justify-content: flex-end;
              color: #000;
              font-weight: bold;
            }
            .tokenPrice{
              justify-content: flex-end;
              color: #7a7a7a;
            }
          }
          }
        }
        li+li{
          border-top: solid 1px #b1b1b1;
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
      padding-top: 28px;
      padding-bottom: 28px;
      display: flex;
      justify-content: center;
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

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletPopUp);

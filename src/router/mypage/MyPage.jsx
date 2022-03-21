import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import MyPageHeader from "../../components/mypage/MyPageHeader"
import MySearchWallet from "../../components/mypage/MySearchWallet";
import MyTransactionHistory from "../../components/mypage/MyTransactionHistory";
import MyOffers from"../../components/mypage/MyOffers";
import MyLiked from"../../components/mypage/MyLiked";
import { useSearchParams } from "react-router-dom";
import TransactionHistoryFilter from "../../components/mypage/mypageFilter";

import side_close from "../../img/sub/side_close.png";
import filter_icon2 from "../../img/sub/filter_icon2.png";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/header/DefaultHeader";
import PopupBg from "../../components/PopupBg";
import { D_categoryList } from "../../data/D_mypage";
import SelectPopup from "../../components/SelectPopup";
import { D_itemFilter, D_sortFilter } from "../../data/D_marketPlace";
import Filter from "../../components/common/DefaultFilter";
import { strDot } from "../../util/Util";
import axios from 'axios';
import { LOGGER } from "../../util/common";
import { API } from "../../config/api";
import { RESET_FILTER, SET_STATUS_FILTER } from "../../reducers/filterReducer";
import {   D_SStatusList} from "../../data/D_filter"


export default function MyPage() {
  const isMobile = useSelector((state) => state.common.isMobile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {walletAddress, isloggedin} = useSelector((state)=>state.user)
  let [searchParams, setSearchParams] = useSearchParams();
  const [targetData, setTargetData] = useState();
  const [ searchAddress, setSearchAddress]=useState();
  const [searchTargetAddr, setSearchTargetAddr]=useState()

  const PATH_NAMES=['searchwallet', 'transactionhistory', 'offers', 'liked']
  function getUserInfo(address){
    console.log(`${API.API_USER_INFO}/${address}`)
    axios.get(`${API.API_USER_INFO}/${address}`).then((resp)=>{
      let {maria} = resp.data.payload;
      console.log(maria)
      setTargetData(maria)
    })
  }
  useEffect(()=>{
    console.log(pathname)
    if(pathname.split('/')[3]){
      setSearchAddress(pathname.split('/')[3])
      
    }else{
      navigate('/mypage/searchwallet/'+walletAddress)
    }
      // if (pathname.split('/')[2] === '' || !pathname.split('/')[2]){
      //   navigate('/mypage/searchwallet')
      // }
      // if(pathname.split('/')[3] != '' || pathname.split('/')[3]){
      //   setSearchAddress(pathname.split('/')[3])
      //   console.log((pathname.split('/')[3]))
      // }else{
      //   setSearchAddress(walletAddress)
      // }
  }, [pathname])

  useEffect(async ()=>{

    if (searchAddress) getUserInfo(searchAddress)
  },[searchAddress])
  
  // useEffect(()=>{
  //   if( searchAddress ) return;
  //   if(isloggedin){
  //     setSearchAddress(walletAddress)
  //   }else{
  //     navigate('/')
  //   }
  // }, [searchAddress])
  //const isMobile = useSelector((state) => state.common.isMobile);


    return (
      <PMyPage>
        <DefaultHeader />
           <MyPageHeader address={searchAddress} targetData={targetData}/>
           <nav className={isMobile?"mo":"navBar"}>
              {D_categoryList.map((nav, index) => (
                <button
                  key={index}
                  className={nav.url === "/"+pathname.split('/')[2] && "on"}
                  onClick={() => navigate(`/mypage${nav.url}/${searchAddress}`)}
                >
                  {nav.text}
                </button>
              ))}
            </nav>
           {pathname.split('/')[2] === PATH_NAMES[0]&& <MySearchWallet address={searchAddress}/>}
           {pathname.split('/')[2] === PATH_NAMES[1]&& <MyTransactionHistory address={searchAddress}/>}
           {pathname.split('/')[2] === PATH_NAMES[2]&& <MyOffers address={searchAddress}/>}
           {pathname.split('/')[2] === PATH_NAMES[3]&& <MyLiked address={searchAddress}/>}
           <div style={{height: "72px"}}/>
        </PMyPage>

    );
}

const MsearchWallet = styled.div`
  padding: 72px 0 0 0;
  position: relative;
`;

const PMyPage = styled.div`
  position: relative;
  height: 100%;

.navBar {
      display: flex;
      border: 2px solid #000;
      width: 1280px;
      margin:  0 auto;
      margin-top: 72px;
      button {
        flex: 1;
        height: 56px;
        font-size: 18px;
        font-weight: 700;

        &.on {
          color: #fff;
          background: #000;
        }

        &:nth-of-type(n + 2) {
          border-left: 2px solid #000;
        }
      }
    }
    .mo{
      display: flex;
      flex-wrap: wrap;
      margin: 5.55vw;
      border: 2px solid #000;

      button {
        flex: 1;
        min-width: 50%;
        height: 13.33vw;
        font-size: 4.44vw;
        font-weight: 700;

        &.on {
          color: #fff;
          background: #000;
        }

        &:nth-of-type(n + 3) {
          border-top: 2px solid #000;
        }
        &:nth-of-type(2n) {
          border-left: 2px solid #000;
        }
      }
    }
`;

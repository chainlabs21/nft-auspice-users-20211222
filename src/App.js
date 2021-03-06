import { connect, useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import Main from "./Main";
//import "./css/bootstrap.css"
import "react-toastify/dist/ReactToastify.css";

import ConnectWallet from "./router/join/ConnectWallet";
import EmailRequired from "./router/join/EmailRequired";
import JoinMemberShip from "./router/join/JoinMemberShip";
import Signup from "./router/join/Signup";
import EmailFailed from "./router/join/EmailFailed";
import SignupComplete from "./router/join/SignupComplete";
import SentEmail from "./router/join/SentEmail";
import EmailChange from "./router/join/EmailChange";
import MyPage from "./router/mypage/MyPage";
import Notice from "./router/support/Notice";
import SendTicket from "./router/support/SendTicket";
import FAQ from "./router/support/faq";
//import NoticeTest from "./router/support/NoticeTest"
import NoticeDetail from "./router/support/NoticeDetail";
import PopupNotice from "./router/support/PopupNotice";
//import FAQ from "./router/support/faq"

import MarketPlace from "./router/market/MarketPlace";
import SingleItem from "./router/market/SingleItem";
import BundleItem from "./router/BundleItem";
import MyItems from "./router/mypage/MyItems";
import CreateCollection from "./router/CreateCollection";
import EditCollection from "./router/EditCollection";
import ImportContract from "./router/ImportContract";
import MyCollectionSelect from "./router/MyCollectionSelect";
import Royaltycheck from "./router/market/Royaltycheck";
import CreateItem from "./router/mint/CreateItem";
import SaleItem from "./router/mint/SaleItem";
import AuctionBid from "./router/AuctionBid";
import SaleBundle from "./router/SaleBundle";
import SearchWallet from "./router/mypage/SearchWallet";
import HandOver from "./router/HandOver";
import MoveCollection from "./router/MoveCollection";
import TransactionHistory from "./router/mypage/TransactionHistory";
import Offers from "./router/mypage/Offers";
import Liked from "./router/mypage/Liked";
import HiddenItem from "./router/mypage/HiddenItem";
import Referals from "./router/mypage/Referals";
import Mywallet from "./router/accountSetting/Mywallet";
import VerifyEmail from "./router/join/VerifyEmail";
import GeneralSettings from "./router/accountSetting/GeneralSettings";
import NotificationSettings from "./router/accountSetting/NotificationSettings";
import ExploreDealHistory from "./router/explore/ExploreDealHistory";
import Ranking from "./router/explore/Ranking";
import MheaderPopup from "./components/MheaderPopup";
import List from "./util/List";
import SentEmailDetail from "./router/join/SentEmailDetail";
import SelectItem from "./router/SelectItem";
import LogOut from "./router/LogOut";
import MaccountPopup from "./components/MaccountPopup";
import { useEffect } from "react";
import axios from "axios";
import SetErrorBar from "./util/SetErrorBar";
import { API } from "./config/api";
import { messages } from "./config/messages";
import GlobalStyle from "./components/globalStyle";
import { setmyinfo, setaddress } from "./util/store";
import { LOGGER } from "./util/common";
import { is_two_addresses_same } from "./util/eth";
import EditItem from "./router/EditItem";
import EventListener from "./components/common/EventListener";

import "./css/font.css";
import "./css/footer.css";
import "./css/layout.css";
import "./css/style.css";
import "./css/swiper.min.css";
import { SET_ADDRESS, SET_LOGIN, SET_USER_DATA } from "./reducers/userReducer";
import SupportTicket from "./router/support/SupportTicket";
import { ToastContainer } from "react-toastify";
import PopupBg from "./components/PopupBg";

function App({ store, setHref, setConnect, Setmyinfo, Setaddress }) {
  const { mHeaderPopup } = useSelector((state) => state.store);
  const { walletAddress } = useSelector((state) => state.user);
  const [popups, setPopups] = useState([]);

  const dispatch = useDispatch();
  //const navigate =useNavigate();
  const login = (address) => {
    console.log("????????? ??????" + address);
    //--------LET LOGIN
    axios
      .post(API.API_USERS_LOGIN, { address: address, cryptotype: "ETH" })
      .then((resp) => {
        console.log(resp);
        let { status, respdata } = resp.data;
        if (status === "OK") {
          localStorage.setItem("token", respdata);
          axios.defaults.headers.common["token"] = resp.data.respdata;
          localStorage.setItem("address", address);
          Setaddress(address);
          dispatch({ type: SET_ADDRESS, payload: { value: address } });
          console.log(address);
          SetErrorBar(messages.MSG_ADDRESS_CHANGED + `: ${address}`);
        } else if (status === "ERR") {
          localStorage.removeItem("token");
          axios.defaults.headers.common["token"] = "";
          console.log("NO DATA FOUND");
        }
      });
    //--------------------------------------
  };

  const on_wallet_disconnect = (_) => {
    let token_sec = localStorage.getItem("token");
    if (token_sec) {
    } else {
      LOGGER("h9T8jyxy0L@no token");
      return;
    }
    axios.defaults.headers.get.token = token_sec;
    axios.defaults.headers.post.token = token_sec;
    return new Promise((resolve, reject) => {
      axios.post(API.API_LOGOUT).then((resp) => {
        LOGGER("3LyOB7GcWr@logout", resp.data);
        let { status } = resp.data;
        if (status === "OK") {
          //          SetLogut();
          localStorage.removeItem("token");
          resolve(true);
        } else {
          resolve(null);
        }
      });
    });
  };

  const onClickClosePopup = (index) => {
    let popupList = popups;

    popupList = popupList.filter((v) => v.id !== index);
    setPopups(popupList);
  };

  useEffect(
    async (_) => {
      let { klaytn } = window;
      if (klaytn) {
      } else {
        return;
      }
      klaytn.on("accountsChanged", async (accounts) => {
        dispatch({ type: SET_LOGIN, payload: { value: false } });
        dispatch({ type: SET_ADDRESS, payload: { value: null } });
        console.log(accounts);
        let address = accounts[0];
        let address_local = localStorage.getItem("address");
        if (
          address &&
          address_local &&
          is_two_addresses_same(address, address_local)
        ) {
          console.log("???????");
          return;
        } else {
        }
        await on_wallet_disconnect();
        if (address) {
          // disp atch({ type: SET_ADDRESS.type, payload: accounts[0] });				//				let address = accounts[0]
          //				Setaddress( address )
          //login(address);
        } else {
          SetErrorBar(messages.MSG_WALLET_DISCONNECTED);
          on_wallet_disconnect();
        }
      });
    },
    [window.klaytn]
  );

  useEffect(() => {
    LOGGER("poMFHstZg8", window.klaytn?.selectedAddress);
    //dispatch({type:SET_ADDRESS, payload:{value: window.klaytn?.selectedAddress}})
    setTimeout((_) => {
      let { klaytn } = window;
      if (klaytn) {
      } else {
        return;
      }
      let { selectedAddress: address } = klaytn;
      if (address) {
        SetErrorBar(messages.MSG_CURRENT_ADDRESS_IS + address);
        Setaddress(address);
        if (localStorage.getItem("token")) {
          //					get_user_data()
        } else {
          //console.log("let's go"+address)
          //login(address);
        }
      }
      if (window.klaytn?.selectedAddress) {
        //				Setaddress ( window.klaytn?.selectedAddress ) /**       dispa tch({        type: SET_ADDRESS.type,        payload: window.klaytn.selectedAddress,			});			*/
        //			if (userData === null) {
        //			get_user_data();
        //	}
      }
    }, 3 * 1000);
  });

  useEffect(() => {
    if (localStorage.getItem("address") == walletAddress) {
      return;
    }
    //login(walletAddress)
  }, [walletAddress]);

  function checklogin(account) {
    //console.log(isloggedin+" : "+walletAddress)
    if (!localStorage.getItem("token") || !account) return;
    //if (localStorage.getItem("address") != window.klaytn.enable()[0])
    axios.defaults.headers.common["token"] = localStorage.getItem("token");
    axios.get(`${API.API_USER_CHECK}/${account}`).then((resp) => {
      console.log(resp);
      if (resp.data.status == "OK") {
        dispatch({ type: SET_LOGIN, payload: { value: true } });
        dispatch({ type: SET_ADDRESS, payload: { value: account } });
        dispatch({ type: SET_USER_DATA, payload: { value: resp.data.list } });
        //console.log(resp)
        //dispatch({ type: SET_USER_DATA, payload: { value: true }});
      } else if (resp.data.status == "ERR") {
        console.log(resp.data.message);
      }
    });
  }

  useEffect(() => {
    axios.get(`${API.API_GET_NOTICE_CONTENT}/all`).then((resp) => {
      console.log("popup", resp);
      let { list } = resp.data;

      if (list) {
        list = list.filter(
          (v) => !localStorage.getItem(`disableNoticePopup${v.id}`)
        );

        setPopups(list);
      }
    });

    dispatch({ type: SET_LOGIN, payload: { value: false } });
    if (!window.klaytn) {
      return;
    }
    window.klaytn._kaikas.isUnlocked().then((resp) => {
      if (resp) {
        window.klaytn._kaikas.isApproved().then((rresp) => {
          window.klaytn.enable().then((rresp) => {
            console.log(rresp);
            checklogin(rresp[0]);
          });
        });
      }
    });
  }, []);

  return (
    <AppBox className="appBox">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        rel="stylesheet"
        type="text/css"
      />

      <HashRouter>
        {/* <Header /> */}
        <EventListener />
        {popups.map((v, i) => {
          return (
            <PopupNotice
              key={i}
              content={v.contentbody}
              index={v.id}
              off={onClickClosePopup}
              style={{ zIndex: i + 1000 }}
            />
          );
        })}

        {popups.length ? <PopupBg bg /> : <></>}

        <GlobalStyle />

        <Routes>
          <Route path="/index" element={<List />} />
          <Route path="/" element={<Main />} />

          <Route path="/connectwallet" element={<ConnectWallet />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/emailrequired" element={<EmailRequired />} />
          <Route path="/sentemail" element={<SentEmail />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/joinmembership" element={<JoinMemberShip />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailfailed" element={<EmailFailed />} />
          <Route path="/sentemaildetail" element={<SentEmailDetail />} />
          <Route path="/signupcomplete" element={<SignupComplete />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/sendticket" element={<SendTicket />} />
          {/* <Route path="/noticett" element={<NoticeTest />} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<SupportTicket />} />

          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/:pagekey" element={<MyPage />} />
          <Route path="/mypage/:pagekey/:walletaddress" element={<MyPage />} />
          <Route path="/marketplace/:searchKey" element={<MarketPlace />} />
          <Route path="/singleitem" element={<SingleItem />} />
          <Route path="/bundleitem" element={<BundleItem />} />
          <Route path="/selectitem" element={<SelectItem />} />
          <Route path="/emailchange" element={<EmailChange />} />

          <Route path="/myitems" element={<MyItems />} />
          <Route path="/royaltycheck" element={<Royaltycheck />} />

          <Route path="/createitem" element={<CreateItem />} />
          <Route path="/saleitem" element={<SaleItem />} />
          <Route path="/auctionbid" element={<AuctionBid />} />
          <Route path="/salebundle" element={<SaleBundle />} />

          <Route path="/searchwallet" element={<SearchWallet />} />

          <Route path="/transactionhistory" element={<TransactionHistory />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/hiddenitem" element={<HiddenItem />} />
          <Route path="/referals" element={<Referals />} />

          <Route path="/mywallet" element={<Mywallet />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/generalsettings" element={<GeneralSettings />} />
          <Route
            path="/notificationsettings"
            element={<NotificationSettings />}
          />

          <Route path="/exploredealhistory" element={<ExploreDealHistory />} />
          <Route path="/ranking" element={<Ranking />} />
          {/*
            <Route path="/handover" element={<HandOver />} /> 
            <Route path="/movecollection" element={<MoveCollection />} />
            <Route path="/editcollection" element={<EditCollection />} />
            <Route path="/importcontract" element={<ImportContract />} />
            <Route path="/mycollectionselect" element={<MyCollectionSelect />} />
            <Route path="/createcollection" element={<CreateCollection />} />
           */}
        </Routes>

        {mHeaderPopup && <MheaderPopup />}
        {store.maccountPopup && <MaccountPopup />}
      </HashRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AppBox>
  );
}

const AppBox = styled.div`
  width: 100%;
  background: #fff;
  position: relative;

  .filterBtn {
    z-index: 2;

    &.mo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 27.77vw;
      height: 13.33vw;
      padding: 0 5.55vw;
      font-size: 4.44vw;
      font-weight: 700;
      color: #fff;
      background: #1c7eff;
      border-radius: 6.66vw;
      right: 5.55vw;
      bottom: 5.55vw;
      position: fixed;

      img {
        width: 5vw;
      }
    }

    &.pc {
      left: -6px;
      top: 246px;
      position: absolute;

      img {
        height: 64px;
      }

      &.withBg {
        top: 790px;
      }
    }
  }

  a,
  img {
    cursor: pointer;
  }

  .selectList {
    li {
      display: flex;
      align-items: center;
      gap: 20px;
      cursor: pointer;

      .chkBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        border: solid 2px #d9d9d9;
        border-radius: 50%;

        span {
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
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
    Setmyinfo: (payload) => dispatch(setmyinfo(payload)),
    Setaddress: (payload) => dispatch(setaddress(payload)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

// import MarketPlaceItem14 from "./router/MarketPlace_item14";
// import ItemInfo01 from "./router/ItemInfo01";
// import ItemInfo02 from "./router/ItemInfo02";

// import ItemInfo04 from "./router/ItemInfo04";
// import Nftsell04 from "./router/Nftsell04";
// import Nftsell05 from "./router/VerifyAccountPopup";
// import Nftsell05Off from "./router/Nftsell05Off";
// import Buynft01 from "./router/Buynft01";
// import Buynft02 from "./router/Buynft02";
// import Buynft03 from "./router/Buynft03";
// import Buynft04 from "./router/Buynft04";
// import Profile02 from "./router/saleitem";
// import Profile03 from "./router/Profile03";
// import Profile05 from "./router/Profile05";
// import Profile07Off from "./router/Profile07Off";
// import Profile13 from "./router/Profile13";
// import Profile17 from "./router/Profile17";
// import LogOut from "./router/LogOut";
// import MProfileMenu from "./router/MProfileMenu";

/** 1.  ???????????? ??????
2.  1??? ?????? ?????? ?????????
  ????????? ?????? (?????? ?????? ????????????)
  ??????????????????/??????
  ????????????(???????????????)/??????
  ?????????
  ????????? ??? ????????????
  ??? ????????????
  ???????????? ????????????
  ??? ????????????
--------
3. ???????????? ??????
????????????, ?????????, ????????????/??????, ????????? , ??????, ?????? ?????? ?????????, ??????????????? ?????????

4. ???????????? ????????????(??????)
*/

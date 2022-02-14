import { connect, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Main from "./Main";

import ConnectWallet from "./router/ConnectWallet";
import EmailRequired from "./router/EmailRequired";
import JoinMemberShip from "./router/JoinMemberShip";
import Signup from "./router/Signup";
import EmailFailed from "./router/EmailFailed";
import SignupComplete from "./router/SignupComplete";
import SentEmail from "./router/SentEmail";

import MarketPlace from "./router/MarketPlace";
import SingleItem from "./router/SingleItem";
import BundleItem from "./router/BundleItem";
import MyItems from "./router/MyItems";
import CreateCollection from "./router/CreateCollection";
import EditCollection from "./router/EditCollection";
import ImportContract from "./router/ImportContract";
import MyCollectionSelect from "./router/MyCollectionSelect";
import Royaltycheck from "./router/Royaltycheck";
import CreateItem from "./router/CreateItem";
import SaleFixed from "./router/SaleFixed";
import AuctionBid from "./router/AuctionBid";
import SaleBundle from "./router/SaleBundle";
import MyProf from "./router/MyProf";
import HandOver from "./router/HandOver";
import MoveCollection from "./router/MoveCollection";
import TransactionHistory from "./router/TransactionHistory";
import Offers from "./router/Offers";
import Liked from "./router/Liked";
import HiddenItem from "./router/HiddenItem";
import Referals from "./router/Referals";
import Mywallet from "./router/Mywallet";
import VerifyEmail from "./router/VerifyEmail";
import GeneralSettings from "./router/GeneralSettings";
import NotificationSettings from "./router/NotificationSettings";
import ExploreDeal from "./router/ExploreDeal";
import Ranking from "./router/Ranking";
import MheaderPopup from "./components/MheaderPopup";
import List from "./util/List";
import SentEmailDetail from "./router/SentEmailDetail";
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
import { LOGGER, PARSER } from "./util/common";
import { is_two_addresses_same } from "./util/eth";
import EditItem from "./router/EditItem";

import "./css/font.css";
import "./css/footer.css";
import "./css/layout.css";
import "./css/style.css";
import "./css/swiper.min.css";
import EventListener from "./components/EventListener";

function App({ store, setHref, setConnect, Setmyinfo, Setaddress }) {
  const { mHeaderPopup } = useSelector((state) => state.store);
  const login = (address) => {
    axios
      .post(API.API_USERS_LOGIN, { address: address, cryptotype: "ETH" })
      .then((resp) => {
        let { status, respdata } = resp.data;
        if (status === "OK") {
          localStorage.setItem("token", respdata);
          axios.defaults.headers.common["token"] = resp.data.respdata;
          localStorage.setItem("address", address);
          Setaddress(address);
          SetErrorBar(messages.MSG_ADDRESS_CHANGED + `: ${address}`);
        } else if (status === "ERR") {
          localStorage.removeItem("token");
          axios.defaults.headers.common["token"] = "";
        }
      });
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
        if (status == "OK") {
          //          SetLogut();
          localStorage.removeItem("token");
          resolve(true);
        } else {
          resolve(null);
        }
      });
    });
  };

  useEffect(
    async (_) => {
      let { klaytn } = window;
      if (klaytn) {
      } else {
        return;
      }
      klaytn.on("accountsChanged", async (accounts) => {
        console.log(accounts);
        let address = accounts[0];
        let address_local = localStorage.getItem("address");
        if (
          address &&
          address_local &&
          is_two_addresses_same(address, address_local)
        ) {
          return;
        } else {
        }
        await on_wallet_disconnect();
        if (address) {
          // disp atch({ type: SET_ADDRESS.type, payload: accounts[0] });				//				let address = accounts[0]
          //				Setaddress( address )
          login(address);
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
          login(address);
        }
      }
      if (window.klaytn?.selectedAddress) {
        //				Setaddress ( window.klaytn?.selectedAddress ) /**       dispa tch({        type: SET_ADDRESS.type,        payload: window.klaytn.selectedAddress,			});			*/
        //			if (userData === null) {
        //			get_user_data();
        //	}
      }
    }, 3 * 1000);
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
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;700&display=swap"
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
        <GlobalStyle />

        <Routes>
          <Route path="/index" element={<List />} />
          <Route path="/" element={<Main />} />
          <Route path="/connectwallet" element={<ConnectWallet />} />
          <Route path="/emailrequired" element={<EmailRequired />} />
          <Route path="/sentemail" element={<SentEmail />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/joinmembership" element={<JoinMemberShip />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailfailed" element={<EmailFailed />} />
          <Route path="/sentemaildetail" element={<SentEmailDetail />} />
          <Route path="/signupcomplete" element={<SignupComplete />} />

          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/marketplace/:searchKey" element={<MarketPlace />} />
          <Route path="/singleitem" element={<SingleItem />} />
          <Route path="/bundleitem" element={<BundleItem />} />
          <Route path="/selectitem" element={<SelectItem />} />

          <Route path="/myitem" element={<MyItems />} />
          <Route path="/createcollection" element={<CreateCollection />} />
          <Route path="/editcollection" element={<EditCollection />} />
          <Route path="/importcontract" element={<ImportContract />} />
          <Route path="/mycollectionselect" element={<MyCollectionSelect />} />
          <Route path="/royaltycheck" element={<Royaltycheck />} />

          <Route path="/createitem" element={<CreateItem />} />
          <Route path="/salefixed" element={<SaleFixed />} />
          <Route path="/auctionbid" element={<AuctionBid />} />
          <Route path="/salebundle" element={<SaleBundle />} />

          <Route path="/handover" element={<HandOver />} />
          <Route path="/movecollection" element={<MoveCollection />} />
          <Route path="/myprof" element={<MyProf />} />
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
          <Route path="/maccountpopup" element={<MaccountPopup />} />
          <Route path="/exploredeal" element={<ExploreDeal />} />
          <Route path="/ranking" element={<Ranking />} />

          <Route path="/edititem" element={<EditItem />} />
          {/*
          <Route path="/mprofilemenu" element={<MProfileMenu />} />
          */}
        </Routes>

        {mHeaderPopup && <MheaderPopup />}
        {store.maccountPopup && <MaccountPopup />}
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  width: 100%;
  background: #fff;
  position: relative;

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
// import Profile02 from "./router/SaleFixed";
// import Profile03 from "./router/Profile03";
// import Profile05 from "./router/Profile05";
// import Profile07Off from "./router/Profile07Off";
// import Profile13 from "./router/Profile13";
// import Profile17 from "./router/Profile17";
// import LogOut from "./router/LogOut";
// import MProfileMenu from "./router/MProfileMenu";

/** 1.  카이카스 연동
2.  1차 구현 가능 리스트
  아이템 등록 (사본 발행 기능포함)
  고정가격판매/구매
  경매입찰(최고가경매)/구매
  로얄티
  아이템 별 거래내역
  내 거래내역
  커뮤니티 거래내역
  내 정보관리
--------
3. 업데이트 스펙
묶음판매, 레퍼럴, 경매입찰/구매, 컬렉션 , 양도, 잠금 해제 콘텐츠, 메타데이터 프리징

4. 컨트랙트 불러오기(미정)
*/

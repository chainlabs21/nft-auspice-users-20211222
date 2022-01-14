import { connect, useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Main from "./Main";
import Header from "./Header";
import ConnectWallet from "./router/ConnectWallet";
import EmailRequired from "./router/EmailRequired";
import RecentEmail from "./router/RecentEmail";
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
import LoyaltyCheck from "./router/LoyaltyCheck";
import CreateItem from "./router/CreateItem";
import SaleFixed from "./router/SaleFixed";
import AuctionBid from "./router/AuctionBid";
import SaleBundle from "./router/SaleBundle";
// import MarketPlaceItem14 from "./router/MarketPlace_item14";
// import ItemInfo01 from "./router/ItemInfo01";
// import ItemInfo02 from "./router/ItemInfo02";
// import EditItem from "./router/EditItem";
// import ItemInfo04 from "./router/ItemInfo04";
// import Nftsell04 from "./router/Nftsell04";

// import Nftsell05 from "./router/VerifyAccountPopup";
// import Nftsell05Off from "./router/Nftsell05Off";
// import Buynft01 from "./router/Buynft01";
// import Buynft02 from "./router/Buynft02";
// import Buynft03 from "./router/Buynft03";
// import Buynft04 from "./router/Buynft04";
import MyProf from "./router/MyProf";
// import Profile02 from "./router/SaleFixed";
// import Profile03 from "./router/Profile03";
import HandOver from "./router/HandOver";
// import Profile05 from "./router/Profile05";
import MoveCollection from "./router/MoveCollection";
import TransactionHistory from "./router/TransactionHistory";
// import Profile07Off from "./router/Profile07Off";
import Offers from "./router/Offers";
import Liked from "./router/Liked";
// import Profile13 from "./router/Profile13";
import HiddenItem from "./router/HiddenItem";
import Referals from "./router/Referals";
import Mywallet from "./router/Mywallet";
import VerifyEmail from "./router/VerifyEmail";
// import Profile17 from "./router/Profile17";
// import LogOut from "./router/LogOut";
import GeneralSettings from "./router/GeneralSettings";
import NotificationSettings from "./router/NotificationSettings";
// import MProfileMenu from "./router/MProfileMenu";
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
import { MSG } from "./config/messages";
import { SET_ADDRESS } from "./reducers/walletSlice";
import { GET_USER_DATA } from "./reducers/userSlice";

function App({ store, setHref, setConnect }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const on_wallet_disconnect = (_) => {
    let token_sec = localStorage.getItem("token");
    axios.defaults.headers.get.token = token_sec;
    axios.defaults.headers.post.token = token_sec;
    axios.post(API.API_LOGOUT).then((resp) => {
      let { status } = resp.data;
      if (status === "OK") {
        axios.defaults.headers.common["token"] = "";
        localStorage.removeItem("token");
      }
    });
  };

  const get_user_data = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        axios.defaults.headers.common["token"] = token;
        console.log("default Token:", token);
        const resp = await axios.get(API.API_GET_USER_INFO);
        dispatch({ type: GET_USER_DATA.type, payload: resp.data });
        console.log("login");
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    window.klaytn.on("accountsChanged", (accounts) => {
      console.log(accounts);
      if (accounts[0]) {
        dispatch({ type: SET_ADDRESS.type, payload: accounts[0] });
        let address = accounts[0];
        axios
          .post(API.API_USERS_LOGIN, { address: address, cryptotype: "ETH" })
          .then((resp) => {
            let { status, respdata } = resp.data;
            if (status === "OK") {
              localStorage.setItem("token", respdata);
              axios.defaults.headers.common["token"] = resp.data.respdata;
            } else if (status === "ERR") {
              localStorage.removeItem("token");
              axios.defaults.headers.common["token"] = "";
            }
          });
      } else {
        SetErrorBar(MSG.MSG_WALLET_DISCONNECTED);
        on_wallet_disconnect();
      }
    });
  }, [window.klaytn]);

  useEffect(() => {
    if (window.klaytn.selectedAddress) {
      dispatch({
        type: SET_ADDRESS.type,
        payload: window.klaytn.selectedAddress,
      });
      if (userData === null) {
        get_user_data();
      }
    }
  }, []);

  return (
    <AppBox
      className="appBox"
      width={window.innerWidth}
      height={window.innerHeight}
    >
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
        href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        rel="stylesheet"
        type="text/css"
      />

      <HashRouter>
        <Header />

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
          <Route path="/singleitem" element={<SingleItem />} />
          <Route path="/bundleitem" element={<BundleItem />} />
          <Route path="/selectitem" element={<SelectItem />} />

          <Route path="/myitem" element={<MyItems />} />
          <Route path="/createcollection" element={<CreateCollection />} />
          <Route path="/editcollection" element={<EditCollection />} />
          <Route path="/importcontract" element={<ImportContract />} />
          <Route path="/mycollectionselect" element={<MyCollectionSelect />} />
          <Route path="/loyaltycheck" element={<LoyaltyCheck />} />

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

          {/*
          <Route path="/edititem" element={<EditItem />} />
          <Route path="/mprofilemenu" element={<MProfileMenu />} />


          */}
        </Routes>

        {store.mHeaderPopup && <MheaderPopup />}
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

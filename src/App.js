import { connect } from "react-redux";
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
import MyCollection from "./router/MyCollection";
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
// import Offers from "./router/Offers";
import Liked from "./router/Liked";
// import Profile13 from "./router/Profile13";
import HiddenItem from "./router/HiddenItem";
import Referals from "./router/Referals";
import Mywallet from "./router/Mywallet";
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

function App({ store, setHref, setConnect }) {
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
          <Route path="/joinmembership" element={<JoinMemberShip />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailfailed" element={<EmailFailed />} />
          <Route path="/sentemaildetail" element={<SentEmailDetail />} />
          <Route path="/signupcomplete" element={<SignupComplete />} />

          <Route path="/marketplace/:category" element={<MarketPlace />} />
          <Route path="/singleitem" element={<SingleItem />} />
          <Route path="/bundleitem" element={<BundleItem />} />
          <Route path="/selectitem" element={<SelectItem />} />

          <Route path="/mycollection" element={<MyCollection />} />
          <Route path="/createcollection" element={<CreateCollection />} />
          <Route path="/editcollection" element={<EditCollection />} />
          <Route path="/importcontract" element={<ImportContract />} />
          <Route path="/mycollectionselect" element={<MyCollectionSelect />} />
          <Route path="/loyaltycheck" element={<LoyaltyCheck />} />

          <Route path="/createitem" element={<CreateItem />} />
          <Route path="/salefixed" element={<SaleFixed />} />
          <Route path="/auctionbid" element={<AuctionBid />} />
          <Route path="/salebundle" element={<SaleBundle />} />

          <Route path="/myprof" element={<MyProf />} />
          <Route path="/handover" element={<HandOver />} />
          <Route path="/movecollection" element={<MoveCollection />} />
          <Route path="/transactionhistory" element={<TransactionHistory />} />
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
          <Route path="/offers" element={<Offers />} />
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
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

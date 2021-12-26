import { connect } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./components/globalStyle";
import Main from "./Main";
import Header from "./Header";
import ConnectWallet from "./router/ConnectWallet";
import EmailRequired from "./router/EmailRequired";
import RecentEmail from "./router/RecentEmail";
import JoinMemberShip from "./router/JoinMemberShip";
import Signup from "./router/Signup";
import EmailFailed from "./router/EmailFailed";
import SignupComplete from "./router/SignupComplete";
import SentEmail from "./router/SendEmail";
import MarketPlace from "./router/MarketPlace";
import SingleItem from "./router/SingleItem";
import BundleItem from "./router/BundleItem";
import MyCollection from "./router/MyCollection";
import CreateCollection from "./router/CreateCollection";
import EditCollection from "./router/EditCollection";
import ImportContract from "./router/ImportContract";
import MyCollectionSelect from "./router/MyCollectionSelect";
import LoyaltyCheck from "./router/LoyaltyCheck";
import MarketPlaceItem14 from "./router/MarketPlace_item14";
import ItemInfo01 from "./router/ItemInfo01";
import ItemInfo02 from "./router/ItemInfo02";
import ItemInfo03 from "./router/ItemInfo03";
import ItemInfo04 from "./router/ItemInfo04";
import Nftsell from "./router/Nftsell";
import SaleFixed from "./router/SaleFixed";
import AuctionBid from "./router/AuctionBid";
import Nftsell04 from "./router/Nftsell04";
import SaleBundle from "./router/SaleBundle";
import Nftsell05 from "./router/VerifyAccountPopup";
import Nftsell05Off from "./router/Nftsell05Off";
import Buynft01 from "./router/Buynft01";
import Buynft02 from "./router/Buynft02";
import Buynft03 from "./router/Buynft03";
import Buynft04 from "./router/Buynft04";
import MyProf from "./router/MyProf";
import Profile02 from "./router/SaleFixed";
import Profile03 from "./router/Profile03";
import Profile04 from "./router/Profile04";
import Profile05 from "./router/Profile05";
import Profile06 from "./router/Profile06";
import Profile07 from "./router/Profile07";
import Profile07Off from "./router/Profile07Off";
import Profile09 from "./router/Profile09";
import Liked from "./router/Liked";
import Profile13 from "./router/Profile13";
import Profile14 from "./router/Profile14";
import Profile15 from "./router/Profile15";
import Mywallet from "./router/Mywallet";
import Profile17 from "./router/Profile17";
import Profile18 from "./router/Profile18";
import Profile19 from "./router/Profile19";
import Profile21 from "./router/Profile21";
import MProfileMenu from "./router/MProfileMenu";
import ExploreDeal from "./router/ExploreDeal";
import Explore from "./router/Explore";
import MheaderPopup from "./components/MheaderPopup";
import List from "./util/List";

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

      <GlobalStyle />
      <HashRouter>
        <Header />

        <Routes>
          <Route path="/index" element={<List />} />

          <Route path="/" element={<Main />} />

          <Route path="/connectwallet" element={<ConnectWallet />} />
          <Route path="/joinmembership" element={<JoinMemberShip />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sentemail" element={<SentEmail />} />
          <Route path="/signupcomplete" element={<SignupComplete />} />
          <Route path="/emailfailed" element={<EmailFailed />} />
          <Route path="/emailrequired" element={<EmailRequired />} />
          <Route path="/recentemail" element={<RecentEmail />} />

          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/singleitem" element={<SingleItem />} />
          <Route path="/bundleitem" element={<BundleItem />} />

          <Route path="/mycollection" element={<MyCollection />} />
          <Route path="/createcollection" element={<CreateCollection />} />
          <Route path="/editcollection" element={<EditCollection />} />
          <Route path="/importcontract" element={<ImportContract />} />
          <Route path="/mycollectionselect" element={<MyCollectionSelect />} />
          <Route path="/loyaltycheck" element={<LoyaltyCheck />} />
          {/* <Route path="/marketplace14" element={<MarketPlaceItem14 />} /> */}

          <Route path="/nftsell" element={<Nftsell />} />
          <Route path="/salefixed" element={<SaleFixed />} />
          <Route path="/auctionbid" element={<AuctionBid />} />
          <Route path="/salebundle" element={<SaleBundle />} />
          {/* <Route path="/nftsell04" element={<Nftsell04 />} />
          <Route path="/nftsell05" element={<Nftsell05 />} />
          <Route path="/nftsell05off" element={<Nftsell05Off />} /> */}

          {/* <Route path="/buynft02" element={<Buynft02 />} /> */}

          <Route path="/myprof" element={<MyProf />} />
          <Route path="/profile02" element={<Profile02 />} />
          <Route path="/profile03" element={<Profile03 />} />
          <Route path="/profile04" element={<Profile04 />} />
          <Route path="/profile05" element={<Profile05 />} />
          <Route path="/profile06" element={<Profile06 />} />
          <Route path="/profile07" element={<Profile07 />} />
          <Route path="/profile07off" element={<Profile07Off />} />
          <Route path="/profile09" element={<Profile09 />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/profile13" element={<Profile13 />} />
          <Route path="/profile14" element={<Profile14 />} />
          <Route path="/profile15" element={<Profile15 />} />
          <Route path="/mywallet" element={<Mywallet />} />
          <Route path="/profile17" element={<Profile17 />} />
          <Route path="/profile18" element={<Profile18 />} />
          <Route path="/profile19" element={<Profile19 />} />
          <Route path="/profile21" element={<Profile21 />} />
          <Route path="/mprofilemenu" element={<MProfileMenu />} />
          <Route path="/exploredeal" element={<ExploreDeal />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>

        {store.mHeaderPopup && <MheaderPopup />}
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  width: 100%;
  padding: 120px 0 0 0;
  background: #fff;
  position: relative;

  @media screen and (max-width: 1280px) {
    padding: 70px 0 0 0;
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

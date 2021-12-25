import { connect } from "react-redux";
import { HashRouter,  Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./components/globalStyle";
import Main from "./Main";
import Header from "./Header";
import Signup from "./router/Signup";
import Signup01 from "./router/Signup01";
import Signup02 from "./router/Signup02";
import Signup03 from "./router/Signup03";
import Signup04 from "./router/Signup04";
import Signup05 from "./router/Signup05";
import Signup06 from "./router/Signup06";
import Signup07 from "./router/Signup07";
import MarketPlaceItem from "./router/MarketPlace_item";
import MarketPlaceItem04 from "./router/MarketPlace_item04";
import MarketPlaceItem05 from "./router/MarketPlace_item05";
import MarketPlaceItem06 from "./router/MarketPlace_item06";
import MarketPlaceItem07 from "./router/MarketPlace_item07";
import MarketPlaceItem08 from "./router/MarketPlace_item08";
import MarketPlaceItem09 from "./router/MarketPlace_item09";
import MarketPlaceItem10 from "./router/MarketPlace_item10";
import MarketPlaceItem11 from "./router/MarketPlace_item11";
import MarketPlaceItem12 from "./router/MarketPlace_item12";
import MarketPlaceItem13 from "./router/MarketPlace_item13";
import MarketPlaceItem14 from "./router/MarketPlace_item14";
import ItemInfo01 from "./router/ItemInfo01";
import ItemInfo02 from "./router/ItemInfo02";
import ItemInfo03 from "./router/ItemInfo03";
import ItemInfo04 from "./router/ItemInfo04";
import Nftsell from "./router/Nftsell";
import Nftsell02 from "./router/Nftsell02";
import Nftsell03 from "./router/Nftsell03";
import Nftsell04 from "./router/Nftsell04";
import Nftsell04Off from "./router/Nftsell04Off";
import Nftsell05 from "./router/Nftsell05";
import Nftsell05Off from "./router/Nftsell05Off";
import Buynft01 from "./router/Buynft01";
import Buynft02 from "./router/Buynft02";
import Buynft03 from "./router/Buynft03";
import Buynft04 from "./router/Buynft04";
import Profile01 from "./router/Profile01";
import Profile02 from "./router/Profile02";
import Profile03 from "./router/Profile03";
import Profile04 from "./router/Profile04";
import Profile05 from "./router/Profile05";
import Profile06 from "./router/Profile06";
import Profile07 from "./router/Profile07";
import Profile07Off from "./router/Profile07Off";
import Profile09 from "./router/Profile09";
import Profile12 from "./router/Profile12";
import Profile13 from "./router/Profile13";
import Profile14 from "./router/Profile14";
import Profile15 from "./router/Profile15";
import Profile16 from "./router/Profile16";
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

          <Route path="/signup" element={<Signup />} />
          <Route path="/signup01" element={<Signup01 />} />
          <Route path="/signup02" element={<Signup02 />} />
          <Route path="/signup03" element={<Signup03 />} />
          <Route path="/signup04" element={<Signup04 />} />
          <Route path="/signup05" element={<Signup05 />} />
          <Route path="/signup06" element={<Signup06 />} />
          <Route path="/signup07" element={<Signup07 />} />

          <Route path="/marketplace" element={<MarketPlaceItem />} />
          <Route path="/marketplace04" element={<MarketPlaceItem04 />} />
          <Route path="/marketplace05" element={<MarketPlaceItem05 />} />
          <Route path="/marketplace06" element={<MarketPlaceItem06 />} />
          <Route path="/marketplace07" element={<MarketPlaceItem07 />} />
          <Route path="/marketplace08" element={<MarketPlaceItem08 />} />
          <Route path="/marketplace09" element={<MarketPlaceItem09 />} />
          <Route path="/marketplace10" element={<MarketPlaceItem10 />} />
          <Route path="/marketplace11" element={<MarketPlaceItem11 />} />
          <Route path="/marketplace12" element={<MarketPlaceItem12 />} />
          <Route path="/marketplace13" element={<MarketPlaceItem13 />} />
          <Route path="/marketplace14" element={<MarketPlaceItem14 />} />

          <Route path="/iteminfo01" element={<ItemInfo01 />} />
          <Route path="/iteminfo02" element={<ItemInfo02 />} />
          <Route path="/iteminfo03" element={<ItemInfo03 />} />
          <Route path="/iteminfo04" element={<ItemInfo04 />} />

          <Route path="/nftsell" element={<Nftsell />} />
          <Route path="/nftsell02" element={<Nftsell02 />} />
          <Route path="/nftsell03" element={<Nftsell03 />} />
          <Route path="/nftsell04" element={<Nftsell04 />} />
          <Route path="/nftsell04off" element={<Nftsell04Off />} />
          <Route path="/nftsell05" element={<Nftsell05 />} />
          <Route path="/nftsell05off" element={<Nftsell05Off />} />

          <Route path="/buynft01" element={<Buynft01 />} />
          <Route path="/buynft02" element={<Buynft02 />} />
          <Route path="/buynft03" element={<Buynft03 />} />
          <Route path="/buynft04" element={<Buynft04 />} />

          <Route path="/profile01" element={<Profile01 />} />
          <Route path="/profile02" element={<Profile02 />} />
          <Route path="/profile03" element={<Profile03 />} />
          <Route path="/profile04" element={<Profile04 />} />
          <Route path="/profile05" element={<Profile05 />} />
          <Route path="/profile06" element={<Profile06 />} />
          <Route path="/profile07" element={<Profile07 />} />
          <Route path="/profile07off" element={<Profile07Off />} />
          <Route path="/profile09" element={<Profile09 />} />
          <Route path="/profile12" element={<Profile12 />} />
          <Route path="/profile13" element={<Profile13 />} />
          <Route path="/profile14" element={<Profile14 />} />
          <Route path="/profile15" element={<Profile15 />} />
          <Route path="/profile16" element={<Profile16 />} />
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
    padding: 100px 0 0 0;
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

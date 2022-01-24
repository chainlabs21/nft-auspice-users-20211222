import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import "./css/common.css";
import "./css/font.css";
import "./css/layout.css";
import "./css/style.css";
import I_x from "./img/main/I_x.svg";
// import "./css/style01.css";
// import "./css/style02.css";
// import "./css/header.css";
import "./css/footer.css";
import "./css/swiper.min.css";
import { useState, useEffect } from "react";
import { setAllPopupOff, setMHeaderPopup } from "./util/store";

function Header({ store, setAllPopupOff, setMHeaderPopup }) {
  const navigate = useNavigate();
  const { mHeaderPopup } = useSelector((state) => state.store);
  const [search, setSearch] = useState("");
  let [address, setaddress] = useState();
  useEffect(
    (_) => {
      let { address } = store;
      if (address) {
      } else {
        return;
      }
      setaddress(address);
    },
    [store.address]
  );
  useEffect((_) => {
    let { address } = store;
    if (address) {
      setaddress(address);
    } else {
      return;
    }
  }, []);
  function onClickConnectWallet() {
    if (window.klaytn.selectedAddress) navigate("/joinmembership");
    else navigate("/connectwallet");
  }

  return (
    <HeaderBox id="header">
      <h1>
        <a onClick={() => navigate("/")}>
          <img src={require("./img/header/logo.png").default} alt={"logo"} />
        </a>
      </h1>

      <form>
        <input
          type="text"
          name="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items, collections, creators"
        />
        <button type="submit">
          <img src={require("./img/header/search_form.png").default} />
        </button>
      </form>

      <a id="search" onClick={() => navigate("/marketplace")}>
        <img src={require("./img/header/search_icon.png").default} />
      </a>
      {mHeaderPopup ? (
        <img id="mobile" src={I_x} alt="" onClick={setAllPopupOff} />
      ) : (
        <a id="mobile" onClick={setMHeaderPopup}>
          <span></span>
        </a>
      )}

      <nav>
        <ul>
          <li>
            <a onClick={() => navigate("/marketplace")}>Marketplace</a>
            <ol>
              <li>
                <a onClick={() => navigate("/marketplace", { state: "All" })}>
                  <img
                    src={require("./img/header/menu_all.png").default}
                    class="on"
                  />
                  <img
                    src={require("./img/header/menu_all_off.png").default}
                    class="off"
                  />
                  All
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    navigate("/marketplace", { state: "Collectibles" })
                  }
                >
                  <img
                    src={require("./img/header/menu_collectibles.png").default}
                    class="on"
                  />
                  <img
                    src={
                      require("./img/header/menu_collectibles_off.png").default
                    }
                    class="off"
                  />
                  Collectibles
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/marketplace", { state: "Art" })}>
                  <img
                    src={require("./img/header/menu_digitalart.png").default}
                    class="on"
                  />
                  <img
                    src={
                      require("./img/header/menu_digitalart_off.png").default
                    }
                    class="off"
                  />
                  Digital Art
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    navigate("/marketplace", { state: "Trading Cards" })
                  }
                >
                  <img
                    src={require("./img/header/menu_tradingcard.png").default}
                    class="on"
                  />
                  <img
                    src={
                      require("./img/header/menu_tradingcard_off.png").default
                    }
                    class="off"
                  />
                  Trading Card
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/marketplace", { state: "Music" })}>
                  <img
                    src={require("./img/header/menu_music.png").default}
                    class="on"
                  />
                  <img
                    src={require("./img/header/menu_music_off.png").default}
                    class="off"
                  />
                  Music
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    navigate("/marketplace", { state: "Virtual World" })
                  }
                >
                  <img
                    src={require("./img/header/menu_virtualworlds.png").default}
                    class="on"
                  />
                  <img
                    src={
                      require("./img/header/menu_virtualworlds_off.png").default
                    }
                    class="off"
                  />
                  Virtual Worlds
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/marketplace", { state: "Sports" })}
                >
                  <img
                    src={require("./img/header/menu_sports.png").default}
                    class="on"
                  />
                  <img
                    src={require("./img/header/menu_sports_off.png").default}
                    class="off"
                  />
                  Sports
                </a>
              </li>
            </ol>
          </li>
          <li>
            <a onClick={() => navigate("/exploredeal")}>Explore</a>
            <ol>
              <li>
                <a onClick={() => navigate("/exploredeal")}>
                  Transaction details
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/ranking")}>Ranking</a>
              </li>
            </ol>
          </li>
          <li>
            <a onClick={() => navigate("/myprof")}>Mypage</a>
            <ol>
              <li>
                <a onClick={() => navigate("/myprof")}>My Profile</a>
              </li>
              <li>
                <a onClick={() => navigate("/mycollectionselect")}>My Items</a>
              </li>
              <li>
                <a onClick={() => navigate("/liked")}>Bookmark</a>
              </li>
              <li>
                <a onClick={() => navigate("/mywallet")}>Account Setting</a>
              </li>
            </ol>
          </li>
          <li class="country">
            <a>ENG</a>
          </li>
          <li class="wallet">
            <a onClick={onClickConnectWallet}>
              {address ? address : "Connect Wallet"}
            </a>
            <span>{address}</span>
          </li>
        </ul>
      </nav>
    </HeaderBox>
  );
}

const HeaderBox = styled.header`
  &#header {
    #mobile {
      cursor: pointer;
    }

    nav {
      ul {
        & > li {
          &:hover {
            ol {
              display: block;
            }
          }
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
    setAllPopupOff: () => dispatch(setAllPopupOff()),
    setMHeaderPopup: () => dispatch(setMHeaderPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

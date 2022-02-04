import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import "./css/common.css";
import "./css/font.css";
import "./css/layout.css";
import "./css/style.css";
import I_x from "./img/main/I_x.svg";
import "./css/footer.css";
import "./css/swiper.min.css";
import { useState, useEffect } from "react";
import { setAllPopupOff, setMHeaderPopup, setaddress } from "./util/store";
import { getmyaddress } from "./util/common";
import { strDot } from "./util/Util";
import I_spinner from "./img/icons/I_spinner.svg";
import { onClickCopy } from "./util/common";
import SetErrorBar from "./util/SetErrorBar";
import { messages } from "./config/messages";
function Header({ store, setAllPopupOff, setMHeaderPopup, Setaddress }) {
  const navigate = useNavigate();
  const { mHeaderPopup } = useSelector((state) => state.store);
  const [search, setSearch] = useState("");
  let [address, setaddress] = useState();
  let [isloader, setisloader] = useState(false);
  useEffect(
    (_) => {
      let { isloader } = store;
      setisloader(isloader);
    },
    [store.isloader]
  );
  useEffect((_) => {
    const spinner = document.querySelector("#Spinner");
    spinner.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 1000,
        iterations: Infinity,
      }
    );
  }, []);
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
    let token;
    if (address) {
      setaddress(address);
    } else if ((token = localStorage.getItem("token"))) {
      let myaddress = getmyaddress();
      if (myaddress) {
        Setaddress(address);
        setaddress(address);
      } else {
      }
    } else {
      return;
    }
  }, []);
  useEffect(
    (_) => {
      let { klaytn } = window;
      if (klaytn) {
      }
      if (klaytn.selectedAddress) {
        setaddress(klaytn.selectedAddress); // address )
        Setaddress(address);
        localStorage.setItem("address", address);
      }
    },
    [window.klaytn]
  );
  function onClickConnectWallet() {
    let { selectedAddress } = window?.klaytn;
    if (selectedAddress) {
      setaddress(strDot(selectedAddress, 5, 4));
    } //		else if ( ) {navigate("/joinmembership"); }
    else {
      navigate("/connectwallet");
    }
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></div>
      <img
        id="Spinner"
        className="spinner"
        src={I_spinner}
        alt=""
        style={{
          display: isloader ? "inline" : "none",
          width: "50px",
          position: "fixed",
          left: "50%",
          top: "1%",
        }}
      />

      <nav>
        <ul style={{}}>
          <li>
            <a onClick={() => navigate("/marketplace")}>Marketplace</a>
            <ol>
              <li>
                <a onClick={() => navigate("/marketplace", { state: "All" })}>
                  <img
                    src={require("./img/header/menu_all.png").default}
                    className="on"
                  />
                  <img
                    src={require("./img/header/menu_all_off.png").default}
                    className="off"
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
                    className="on"
                  />
                  <img
                    src={
                      require("./img/header/menu_collectibles_off.png").default
                    }
                    className="off"
                  />
                  Collectibles
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/marketplace", { state: "Art" })}>
                  <img
                    src={require("./img/header/menu_digitalart.png").default}
                    className="on"
                  />
                  <img
                    src={
                      require("./img/header/menu_digitalart_off.png").default
                    }
                    className="off"
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
                    className="on"
                  />
                  <img
                    src={
                      require("./img/header/menu_tradingcard_off.png").default
                    }
                    className="off"
                  />
                  Trading Card
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/marketplace", { state: "Music" })}>
                  <img
                    src={require("./img/header/menu_music.png").default}
                    className="on"
                  />
                  <img
                    src={require("./img/header/menu_music_off.png").default}
                    className="off"
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
                    className="on"
                  />
                  <img
                    src={
                      require("./img/header/menu_virtualworlds_off.png").default
                    }
                    className="off"
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
                    className="on"
                  />
                  <img
                    src={require("./img/header/menu_sports_off.png").default}
                    className="off"
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
          <li style={{ display: address ? "inline" : "none" }}>
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
          <li className="country">
            <a>ENG</a>
          </li>
          <li className="wallet" style={{ width: "200px" }}>
            <a
              onClick={(e) => {
                address &&
                  onClickCopy(address) &&
                  SetErrorBar(messages.MSG_COPIED);
                onClickConnectWallet();
              }}
            >
              {address ? strDot(address, 4, 2) : "Connect Wallet"}
            </a>
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
    Setaddress: (payload) => dispatch(setaddress(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

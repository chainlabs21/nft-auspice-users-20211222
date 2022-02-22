import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import I_x from "./img/main/I_x.svg";

import { useState, useEffect } from "react";
import { setAllPopupOff, setMHeaderPopup, setaddress } from "./util/store";
import { getmyaddress, LOGGER } from "./util/common";
import { strDot } from "./util/Util";
import { onClickCopy } from "./util/common";
import SetErrorBar from "./util/SetErrorBar";
import { messages } from "./config/messages";

function Header({ store, setAllPopupOff, setMHeaderPopup, Setaddress }) {
  const navigate = useNavigate();
  const { mHeaderPopup } = useSelector((state) => state.store);
  const [search, setSearch] = useState("");
  let [address, setaddress] = useState();

  /** 	useEffect(_=>{
		const spinner = document.querySelector("#Spinner");
    spinner.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 1000,
        iterations: Infinity,
      }
    )
	} , [] )*/

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
      if (!klaytn) return;
      if (klaytn.selectedAddress) {
        setaddress(klaytn.selectedAddress); // address )
        Setaddress(address);
        localStorage.setItem("address", address);
      }
    },
    [window.klaytn]
  );

  function onClickConnectWallet() {
    let { klaytn } = window;
    if (!klaytn) return;
    console.log(klaytn);
    let { selectedAddress } = klaytn;
    if (selectedAddress) {
      setaddress(strDot(selectedAddress, 5, 4));
    } //		else if ( ) {navigate("/joinmembership"); }
    else {
      LOGGER("nav to connectwallet");
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

        <button
          type="button"
          onClick={() => navigate(`/marketplace/${search}`)}
        >
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
          <li style={{ display: address ? "inline-block" : "none" }}>
            <a onClick={() => navigate("/searchwallet")}>Mypage</a>
            <ol>
              <li>
                <a onClick={() => navigate("/searchwallet")}>My Profile</a>
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
          <li className="wallet">
            <a
              onClick={(e) => {
                address &&
                  onClickCopy(address) &&
                  SetErrorBar(messages.MSG_COPIED);
                onClickConnectWallet();
              }}
            >
              {address ? strDot(address, 8, 0) : "Connect Wallet"}
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

import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

import "./css/common.css";
import "./css/font.css";
import "./css/layout.css";
import "./css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

// import "./css/header.css";
import "./css/footer.css";
import "./css/swiper.min.css";
import { useState } from "react";

import I_dnArw from "./img/header/I_dnArw.svg";
import I_menu from "./img/header/I_menu.svg";
import I_x from "./img/main/I_x.svg";
import {setAllPopupOff, setMHeaderPopup } from "./util/store";

function Main({ store, setAllPopupOff,setMHeaderPopup }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (
    <HeaderBox id="header">
      <section className="leftBox">
        <button className="logo" onClick={() => navigate("/")}>
          <img src={require("./img/header/logo.png").default} />
        </button>

        <article className="searchBox">
          <button onClick={() => setSearch("")}>
            <img src={require("./img/header/search_form.png").default} />
          </button>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items, collections, creators"
          />
        </article>
      </section>

      <section className="rightBox">
        <nav className="mNav">
          <button className="" onClick={() => {}}>
            <img src={require("./img/header/search_icon.png").default} />
          </button>

          {store.mHeaderPopup ? (
            <button className="" onClick={setAllPopupOff}>
              <img src={I_x} alt="" />
            </button>
          ) : (
            <button className="" onClick={setMHeaderPopup}>
              <img src={I_menu} alt="" />
            </button>
          )}
        </nav>

        <nav className="pcNav">
          <ul className="categoryList">
            <li onClick={() => navigate("/marketplace")}>
              <p>Marketplace</p>
              <ol>
                <li>
                  <img
                    src={require("./img/header/menu_all.png").default}
                    class="on"
                  />
                  <img
                    src={require("./img/header/menu_all_off.png").default}
                    class="off"
                  />
                  All
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
                  <img
                    src={require("./img/header/menu_music.png").default}
                    class="on"
                  />
                  <img
                    src={require("./img/header/menu_music_off.png").default}
                    class="off"
                  />
                  Music
                </li>
                <li>
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
                </li>
                <li>
                  <img
                    src={require("./img/header/menu_sports.png").default}
                    class="on"
                  />
                  <img
                    src={require("./img/header/menu_sports_off.png").default}
                    class="off"
                  />
                  Sports
                </li>
              </ol>
            </li>
            <li>
              <p href="#">Explore</p>
              <ol>
                <li>Transaction details</li>
                <li>Ranking</li>
              </ol>
            </li>
            <li>
              <p href="#">Mypage</p>
              <ol>
                <li>My Profile</li>
                <li>Bookmark</li>
                <li>Account Setting</li>
              </ol>
            </li>
            <li class="country">
              <p>ENG</p>
              <img src={I_dnArw} alt="" />
            </li>
          </ul>
          <button class="wallet" onClick={() => navigate("/signup")}>
            <p>Connect Wallet</p>
          </button>
        </nav>
      </section>
    </HeaderBox>
  );
}

const HeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 120px;
  padding: 0 50px;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
  z-index: 4;

  .leftBox {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    max-width: 730px;

    .logo {
      img {
        width: 195px;
      }
    }

    .searchBox {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 18px;
      max-width: 480px;
      height: 56px;
      padding: 0 25px;
      border-radius: 28px;
      border: solid 1px #bbb;

      button {
        img {
          min-width: 20px;
          width: 20px;
        }
      }

      input {
        flex: 1;
        height: 100%;
        font-size: 16px;
        border: none;

        &::placeholder {
          color: #bbb;
        }
      }
    }
  }

  .rightBox {
    display: flex;
    align-items: center;
    height: 100%;

    .mNav {
      display: none;

      button{
        width: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
    }

    nav {
      display: flex;
      align-items: center;
      gap: 30px;
      height: 100%;

      .categoryList {
        display: flex;
        align-items: center;
        height: 100%;

        & > li {
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 120px;
          min-width: 100px;
          height: 100%;
          cursor: pointer;
          position: relative;

          &:nth-of-type(1) {
            margin: 0 10px 0 0;
          }

          p {
            font-size: 20px;
            font-weight: 500;
          }

          &.country {
            img {
              right: 8px;
              position: absolute;
            }
          }

          ol {
            display: none;
            width: 160px;
            background: #fff;
            border-radius: 8px;
            z-index: 6;
            top: 90px;
            position: absolute;
            overflow: hidden;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);

            li {
              display: flex;
              align-items: center;
              gap: 12px;
              width: 100%;
              height: 48px;
              padding: 0 10px;

              &:hover {
                color: #fff;
                background: #222;

                img {
                  &:nth-of-type(1) {
                    display: block;
                  }
                  &:nth-of-type(2) {
                    display: none;
                  }
                }
              }

              img {
                &:nth-of-type(1) {
                  display: none;
                }
                &:nth-of-type(2) {
                  display: block;
                }
              }
            }
          }

          &:hover {
            ol {
              display: block;
            }
          }
        }
      }

      .wallet {
        width: 218px;
        height: 48px;
        border-radius: 28px;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        background: #222;
      }
    }
  }

  @media screen and (max-width: 1280px) {
    height: 70px;
    padding: 18px;
    box-shadow: unset;

    .leftBox {
      .logo {
        img {
          width: 150px;
        }
      }
    }

    .rightBox {
      .mNav {
        display: flex;
      }

      .pcNav {
        display: none;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .leftBox {
      .searchBox {
        display: none;
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);

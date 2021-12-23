import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

import "./css/common.css";
import "./css/font.css";
import "./css/layout.css";
import "./css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "./css/header.css";
import "./css/footer.css";
import "./css/swiper.min.css";

function Main({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <HeaderBox id="header">
      <h1>
        <a href="./">
          <img src={require("./img/header/logo.png").default} />
        </a>
      </h1>

      <form>
        <input
          type="text"
          name="text"
          value=""
          placeholder="Search items, collections, creators"
        />
        <button type="submit">
          <img src={require("./img/header/search_form.png").default} />
        </button>
      </form>

      <a id="search" href="#">
        <img src={require("./img/header/search_icon.png").default} />
      </a>
      <a id="mobile" href="javascript:void(0); ">
        <span></span>
      </a>

      <nav>
        <ul>
          <li onClick={() => navigate("/marketplace")}>
            <a>Marketplace</a>
            <ol>
              <li>
                <a>
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
                <a>
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
                <a>
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
                <a>
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
                <a>
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
                <a>
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
                <a>
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
            <a href="#">Explore</a>
            <ol>
              <li>
                <a href="#">Transaction details</a>
              </li>
              <li>
                <a href="#">Ranking</a>
              </li>
            </ol>
          </li>
          <li>
            <a href="#">Mypage</a>
            <ol>
              <li>
                <a href="#">My Profile</a>
              </li>
              <li>
                <a href="#">Bookmark</a>
              </li>
              <li>
                <a href="#">Account Setting</a>
              </li>
            </ol>
          </li>
          <li class="country">
            <a href="#">ENG</a>
          </li>
          <li class="wallet">
            <a onClick={() => navigate("/signup")}>Connect Wallet</a>
          </li>
        </ul>
      </nav>
    </HeaderBox>
  );
}

const HeaderBox = styled.header`
  nav {
    ul {
      li {
        ol {
          display: none;
        }

        &:hover {
          ol {
            display: block !important;
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
    // setHeaderPopup: () => dispatch(setHeaderPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

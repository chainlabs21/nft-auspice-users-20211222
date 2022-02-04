import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useState } from "react";

import { setAllPopupOff } from "../util/store";
import rstone from "../img/sub/rstone.png";
import dollar from "../img/sub/dollar.png";
import I_dnArwGray from "../img/header/I_dnArwGray.svg";

function Main({ store, setAllPopupOff }) {
  const navigate = useNavigate();

  const [category, setCategory] = useState(0);

  function onclickCategory(index) {
    if (category === index) setCategory(0);
    else setCategory(index);
  }

  function onclickWallet() {
    setAllPopupOff();
    navigate("/connectwallet");
  }

  return (
    <MaccountPopupBox className="mMenuBox">
      <section id="sub">
        <article className="wallet_wrap">
          <div className="move on">

            <div className="left_move wallet_left" style={{ display: "block" }}>
              <div className="mwallet">
                <a onClick={() => navigate(-1)}>Account settings</a>
              </div>
              <form>
                <div className="w1" onClick={() => navigate("/mywallet")}>
                  <h3>
                    My wallet<span>0x9bb...carfb</span>
                  </h3>
                </div>
                <div className="w2" onClick={() => navigate("/mywallet")}>
                  <h3>General settings</h3>
                </div>
                <div className="w3" onClick={() => navigate("/mywallet")}>
                  <h3>Notification settings</h3>
                </div>
              </form>
            </div>
						
          </div>
        </article>
      </section>
    </MaccountPopupBox>
  );
}

const MaccountPopupBox = styled.nav``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const marketList = [
  "All",
  "collectibles",
  "Digital Art",
  "Trading Card",
  "music",
  "Virtual Worlds",
  "sports",
];

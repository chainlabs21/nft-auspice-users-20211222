import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s5 from "../img/sub/s5.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";
import click1 from "../img/sub/click1.png";
import ho_img from "../img/sub/ho_img.png";

import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";

function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <section id="sub">
        <article class="ntfsell_box">
          <div class="sellbg">
            <div class="ntfsell_con">
              <div class="top1">
                <a href="">
                  <img
                    src={require("../img/sub/nft_arrow.png").default}
                    alt=""
                  />
                </a>
                <strong>Profile home</strong>
              </div>
              <div class="sell_wrap">
                <div class="create">
                  <h2>Move Collection</h2>
                  <h3>Please select a collection to move.</h3>
                  <form action="">
                    <div class="form">
                      <div class="movecollection">
                        <div class="select">
                          <div>
                            <span>Henry junior's Collection 01</span>
                          </div>
                          <ul>
                            <li>
                              <a href="">
                                Henry junior's Collection 01
                                <span class="arrow"></span>
                              </a>
                            </li>
                            <li>
                              <a href="">Henry junior's Collection 02</a>
                            </li>
                            <li>
                              <a href="">Henry junior's Collection 03</a>
                            </li>
                          </ul>
                        </div>
                        <p class="sma">
                          Collections may take up to an hour to move.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="move_btn">
                <a href="" class="move">
                  Move
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);

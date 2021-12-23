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
                    <img src={require("../img/sub/nft_arrow.png").default} alt=""/>
                </a>
                <strong>Profile home</strong>
            </div>
            <div class="sell_wrap ho_wrap">
              <div class="create">
                  <h2>Hand Over</h2>
                  <form action="">
                    <div class="form">
                      <ul>
                        <li>
                          <div class="ho">
                            <ol>
                              <li>
                                <span class="hoimg" style={{backgroundImage:`url(${ho_img})`}}></span>
                                <div class="ho_info">
                                  <h3>renoir collection</h3>
                                  <h4>Verger de pommiers</h4>
                                  <h5>Register the collection logo. Please select an image file.<br/>Square image (recommended size 350 x 350)</h5>
                                </div>
                              </li>
                              <li>
                                <span class="hoimg" style={{backgroundImage:`url(${ho_img})`}}></span>
                                <div class="ho_info">
                                  <h3>renoir collection</h3>
                                  <h4>Au parc</h4>
                                  <h5>Register the collection logo. Please select an image file.<br/>Square image (recommended size 350 x 350)</h5>
                                </div>
                              </li>
                            </ol>
                          </div>
                        </li>
                        <li class="padline">
                          <h3>Enter your ERC20 wallet address or ENS name to send.</h3>
                          <p class="sma">Gas charges are incurred when transferring.</p>
                          <div class="inputbox">
                            <input type="text" placeholder="Ex) 0x8df35...   or   wallet001.eth"/>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
              </div>
            </div>
            <div class="create_btn send_btn">
              <a href="" class="send">Send</a>
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

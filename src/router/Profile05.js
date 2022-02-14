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






// import "./css/style01.css";
// import "./css/style02.css";





function MarketPlace({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <section id="sub">
        <article className="ntfsell_box">
          <div className="sellbg">
            <div className="ntfsell_con">
              <div className="top1">
                <a >
                  <img
                    src={require("../img/sub/nft_arrow.png").default}
                    alt=""
                  />
                </a>
                <strong>Profile home</strong>
              </div>
              <div className="sell_wrap">
                <div className="create">
                  <h2>Move Item</h2>
                  <h3>Please select a item to move.</h3>
                  <form action="">
                    <div className="form">
                      <div className="movecollection">
                        <div className="select">
                          <div>
                            <span>Henry junior's Item 01</span>
                          </div>
                          <ul>
                            <li>
                              <a >
                                Henry junior's Item 01
                                <span className="arrow"></span>
                              </a>
                            </li>
                            <li>
                              <a >Henry junior's Item 02</a>
                            </li>
                            <li>
                              <a >Henry junior's Item 03</a>
                            </li>
                          </ul>
                        </div>
                        <p className="sma">
                          Items may take up to an hour to move.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="move_btn">
                <a  className="move">
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

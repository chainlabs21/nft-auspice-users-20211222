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




// import "./css/style01.css";
// import "./css/style02.css";



import { useState, useEffect } from "react";
import { getmyaddress, onClickCopy, LOGGER } from "../util/common";
import { strDot } from "../util/Util";
function Mywallet({ store, setConnect }) {
  const navigate = useNavigate();
  let [myaddress, setmyaddress] = useState(getmyaddress());
  return (
    <SignPopupBox>
      <section id="sub">
        <article className="wallet_wrap">
          <div className="move on">
            <div className="left_move wallet_left">
              <form>
                <div className="w1 on">
                  <h3>
                    My wallet
                    <span> {strDot(myaddress, 6, 2)} </span>
                  </h3>
                </div>
                <div
                  className="w2"
                  onClick={() => {
                    navigate("/generalsettings");
                  }}
                >
                  <h3>General settings</h3>
                </div>
                <div
                  className="w3"
                  onClick={() => navigate("/notificationsettings")}
                >
                  <h3>Notification settings</h3>
                </div>
              </form>
            </div>

            <div className="right_move wallet_right">
              <h2>My wallet</h2>
              <div className="mwr">
                <div className="wr">
                  <ul>
                    <li>
                      <h4>Wallet address</h4>
                      <div>
                        <div className="de">
                          <input type="text" disabled />
                          <span className="defalut_text">
                            {myaddress ? myaddress : ""}
                          </span>
                        </div>
                        <a
                          className="btn_copy"
                          onClick={(_) => onClickCopy(myaddress)}
                        >
                          copy
                        </a>
                      </div>
                    </li>
                  </ul>
                  <a onClick={() => navigate("/logout")} className="wbtn">
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .w1,
  .w2,
  .w3 {
    cursor: pointer;
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mywallet);

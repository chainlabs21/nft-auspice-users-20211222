import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";
import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";
import WalletConnectSDK from "walletconnect";
import axios from "axios";

function Signup02({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap joinwidth">
          <div className="innerBox">
            <a href="javascript:void(0);" class="close" id="info_close">
              <img src={require("../img/sub/icon_close.png").default} alt="" />
            </a>
            <div class="box m1">
              <div class="top0 p0">
                <h2>Sign up</h2>
              </div>
              <form>
                <div class="form">
                  <div class="join j_file">
                    <h3>Photo registration</h3>
                    <ul>
                      <li>
                        <div class="photo">
                          <input type="file" name id="file" />
                          <label for="file"></label>
                        </div>
                        <div class="filename">
                          <p>You can register photos up to 200MB or less.</p>
                        </div>
                      </li>

                      <li>
                        <a>Registration</a>
                      </li>
                    </ul>
                  </div>
                  <div class="user join">
                    <h3>User name</h3>
                    <textarea
                      type="text"
                      placeholder="Less than 5-20 characters, only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
                    ></textarea>
                    <span>Usernames that can be used</span>
                    <span class="red">
                      Invalid nickname. It must be less than 20 characters.
                    </span>
                  </div>
                  <div class="w_adress join">
                    <h3>Wallet adress</h3>
                    <input
                      type="text"
                      placeholder="Please enter your wallet address"
                    />
                  </div>
                  <div class="email join">
                    <h3>Email</h3>
                    <input
                      type="email"
                      placeholder="Please enter your email address"
                    />
                    <span>A valid email address.</span>
                    <span class="red">This is an invalid email address.</span>
                  </div>
                  <div class="check">
                    <ul>
                      <li>
                        <input type="checkbox" name="" id="agree" />
                        <label for="agree">
                          <h4>19 years of age or older (required)</h4>
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" name="" id="agree2" />
                        <label for="agree2">
                          <h4>
                            Subscribe <a>Terms of Service</a>(required)
                          </h4>
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" name="" id="agree3" />
                        <label for="agree3">
                          <h4>
                            <a>
                              Personal Information Collection
                              <br /> and Usage
                            </a>{" "}
                            Agreement (required)
                          </h4>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="btn sign4">
                  <ul>
                    <li>
                      <a onClick={() => navigate("/")}>Cancel</a>
                    </li>
                    <li>
                      <a onClick={() => navigate("/signup05")}>Sign Up</a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <section id="sub">
        <article class="popup_box"></article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .box_wrap {
    width: 1000px;
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup02);

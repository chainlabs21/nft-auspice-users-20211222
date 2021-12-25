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

function Signup02({ store }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap">
          <div class="box">
            <div class="top0 p2">
              <h2>Email verification required</h2>
              <p>Please complete email verification to continue</p>
            </div>
            <div class="btn">
              <ul>
                <li>
                  <a onClick={() => navigate(-1)}>Cancel</a>
                </li>
                <li>
                  <a onClick={() => navigate("/signup02")}>Send Email</a>
                </li>
              </ul>
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

const SignPopupBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup02);

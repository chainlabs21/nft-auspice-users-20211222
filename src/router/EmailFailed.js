import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import WalletConnectSDK from "walletconnect";
import axios from "axios";

function EmailFailed({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <div className="popup info" id="info_popup">
        <div className="box_wrap confirm">
          <div className="box bot2">
            <div className="top0 p2">
              <h2>Email verification failed.</h2>
              <p>Please complete email verification to continue.</p>
            </div>
            <div className="btn">
              <ul>
                <li>
                  <a onClick={() => navigate("/")}>Cancel</a>
                </li>
                <li>
                  <a onClick={() => navigate("/sentemaildetail")}>
                    Resend Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section id="sub">
        <article className="popup_box"></article>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailFailed);

import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";





// import "./css/style01.css";
// import "./css/style02.css";




import WalletConnectSDK from "walletconnect";
import axios from "axios";

function SignupComplete({ store, setConnect }) {
  const navigate = useNavigate();

  return (
    <SignPopupBox>
      <div className="popup info" id="info_popup">
        <div className="box_wrap confirm">
          <div className="box bot3">
            <div className="top0 p2">
              <h2>Sign up is complete.</h2>
              <p>
                Email verification is complete and you can use
                <br className="m_br" /> all functions.
                <br />
                Create your own NFT collection.
              </p>
            </div>
            <div className="btn">
              <ul>
                <li>
                  <a onClick={() => navigate("/")}>Home</a>
                </li>
                <li>
                  <a onClick={() => navigate("/marketplace")}>Issuing NFTs</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupComplete);

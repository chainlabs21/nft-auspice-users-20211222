import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";





// import "./css/style01.css";
// import "./css/style02.css";




import WalletConnectSDK from "walletconnect";
import axios from "axios";
import queryString from "query-string";
import { useEffect } from "react";
import { API } from "../config/api";
import { ERR_MSG } from "../config/messages";

function VerifyEmail({ store, setConnect }) {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const query = queryString.parse(search);
    const asyncVerify = async () => {
      try {
        const resp = await axios.post(
          API.API_COMPLETE_EMAIL_VERIFY +
            `/${query.email}/${query.verifycode}`
        );
        if (resp.data.status === "OK") {
          navigate("/signupcomplete");
        } else {
          navigate("/emailfailed");
        }
      } catch (error) {
        alert(ERR_MSG.ERR_AXIOS_REQUEST);
        console.log(error);
      }
    };
    asyncVerify();
  }, [search]);

  return (
    <VerfyEmailBox>
      <div className="popup info" id="info_popup">
        <div className="box_wrap confirm">
          <a onClick={() => navigate(-1)} className="close" id="info_close">
            <img src={require("../img/sub/icon_close.png").default} alt="" />
          </a>
          <div className="box">
            <div className="top0 p2">
              <h2>Verify Email</h2>
              <p>We examine your email...</p>
            </div>
            <div className="btn one">
              <ul>
                <li>
                  <a onClick={() => navigate("/")}>OK</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </VerfyEmailBox>
  );
}
const VerfyEmailBox = styled.div``;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

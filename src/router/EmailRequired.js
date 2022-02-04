import { connect, useSelector } from "react-redux";
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
import { API } from "../config/api";
import axios from "axios";
import { getuseraddress, LOGGER } from "../util/common";
import { ERR_MSG } from "../config/messages";

function EmailRequired({ store }) {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const useraddress = getuseraddress();
  const handleSendEmail = () => {
    const asyncSendEmail = async () => {
      if (useraddress === null) {
        alert(ERR_MSG.ERR_NO_ADDRESS);
        return;
      }
      try {
        const resp = await axios.get(
          API.API_VERIFY_EMAIL_SEND + `/${userData.maria.email}/${useraddress}`
        );
        console.log(resp);
      } catch (error) { LOGGER(error)
        alert(ERR_MSG.ERR_AXIOS_REQUEST);
      }
    };
    // navigate("/resent")
    asyncSendEmail();
  };

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap confirm">
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
                  <a onClick={handleSendEmail}>Send Email</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailRequired);

import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import sample from "../img/sub/sample.png";

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
                <strong>Collection home</strong>
              </div>
              <div class="sell_wrap sell_wrap2">
                <div class="create">
                  <h2>Import contract</h2>
                  <form action="">
                    <div class="form">
                      <ul>
                        <li>
                          <h3>
                            Please enter the ERC721 / ERC1155 contract address
                          </h3>
                          <p>
                            Enter the contract address for which NFT issuance
                            has been completed in Ethereum
                          </p>
                          <div class="inputbox">
                            <div class="txt">
                              <textarea
                                type="text"
                                placeholder="Please enter an ERC721 or ERC 1155 address"
                                class="text2"
                              ></textarea>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div class="create_btn mcrea">
                <a href="">Import contract</a>
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

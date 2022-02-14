import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import sample from "../img/sub/sample.png";






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
                <a>
                  <img
                    src={require("../img/sub/nft_arrow.png").default}
                    alt=""
                  />
                </a>
                <strong>Item home</strong>
              </div>
              <div className="sell_wrap sell_wrap2">
                <div className="create">
                  <h2>Import contract</h2>
                  <form action="">
                    <div className="form">
                      <ul>
                        <li>
                          <h3>
                            Please enter the ERC721 / ERC1155 contract address
                          </h3>
                          <p>
                            Enter the contract address for which NFT issuance
                            has been completed in Klaytn
                          </p>
                          <div className="inputbox">
                            <div className="txt">
                              <textarea
                                type="text"
                                placeholder="Please enter an ERC721 or ERC 1155 address"
                                className="text2"
                              ></textarea>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div className="create_btn mcrea">
                <a>Import contract</a>
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

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { D_NavList } from "../../data/D_header";
import I_dnArrow from "../../img/icons/I_dnArrow.svg";
import I_upArwWhite from "../../img/icons/I_upArwWhite.svg";
import { onClickCopy } from "../../util/common";
import { strDot } from "../../util/Util";
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../config/messages";

export default function MmenuPopup({ off }) {
  const navigate = useNavigate();
  const {isloggedin, walletAddress} = useSelector((state)=>state.user)

  function onClickNav(url) {
    navigate(url);
    off();
  }

  return (
    <MmenuPopupBox>
      <article className="navArticle">
        {D_NavList.map((nav, index) => (
          <details key={index} className="statusDetail">
            <summary className="filterSummary">
              <p className="title">{nav.title}</p>

              <img className="arwImg off" src={I_dnArrow} alt="" />
              <img className="arwImg on" src={I_upArwWhite} alt="" />
            </summary>

            <ul className="navList">
              {nav.detailNav.map((detNav, index) => (
                <li key={index} onClick={() => onClickNav(detNav.url)}>
                  {detNav.text}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </article>

      <button className="connectBtn"
              onClick={() => {
                if(isloggedin && walletAddress){
                  onClickCopy(walletAddress);
                  SetErrorBar(messages.MSG_COPIED);
                }else{
                  navigate("/connectwallet");
                }
              }}
            >
              {(isloggedin && walletAddress) ? strDot(walletAddress, 8, 0) : "Connect Wallet"}
      </button>
    </MmenuPopupBox>
  );
}

const MmenuPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background: #fff;
  top: 72px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11;
  position: fixed;
  overflow-y: scroll;

  .navArticle {
    flex: 1;

    details {
      &[open] {
        border-bottom: 1px solid #e8e8e8;

        summary {
          color: #fff;
          background: #222;

          .arwImg {
            &.off {
              display: none;
            }

            &.on {
              display: block;
            }
          }
        }
      }

      summary {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 15.55vw;
        padding: 0 5.55vw;
        font-size: 5vw;
        font-weight: 500;

        .arwImg {
          width: 4.44vw;
          &.on {
            display: none;
          }
        }
      }

      .navList {
        li {
          display: flex;
          align-items: center;
          height: 13.33vw;
          padding: 0 8.33vw;
          font-size: 4.44vw;
          color: #727272;
          font-weight: 500;
        }
      }
    }
  }

  .connectBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15.27vw;
    min-height: 15.27vw;
    margin: 8.33vw 5.55vw;
    font-size: 5vw;
    font-weight: 700;
    color: #fff;
    background: #222;
    border-radius: 7.77vw;
  }
`;

import styled from "styled-components";
import icon_close from "../../../img/sub/icon_close.png";
import twitter from "../../../img/sub/twitter.png";
import telegram from "../../../img/sub/telegram.png";
import facebook from "../../../img/sub/facebook.png";
import link from "../../../img/sub/link.png";
import { onClickCopy } from "../../../util/common";
import { singleitem_url } from "../../../util/common";
import SetErrorBar from "../../../util/SetErrorBar";
import { messages } from "../../../config/messages";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function NowSalePopup({ off, itemid, itemdata }) {
  let navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);
  useEffect(()=>{
    console.log(itemdata)
  },[])

  if (isMobile)
    return (
      <MnowSalePopupBox>
        <article className="topBar">
          <strong className="title">Your item is now listed for sale</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={icon_close} alt="" />
          </button>
        </article>

        <article className="contBox">
          <div className="itemBox cont">
            <img src={itemdata?.item?.url} alt="" />
          </div>

          <div className="btnBox cont">
            <div className="shareBox">
              <p className="title">Share your listing</p>

              <ul className="snsList">
                <li>
                  <img src={twitter} alt="" />
                </li>
                <li>
                  <img src={telegram} alt="" />
                </li>
                <li>
                  <img src={facebook} alt="" />
                </li>
                <li
                  onClick={(_) => {
                    onClickCopy(singleitem_url(itemid));
                    SetErrorBar(messages.MSG_COPIED);
                  }}
                >
                  <img src={link} alt="" />
                </li>
              </ul>
            </div>

            <button
              className="viewBtn"
              onClick={() => {
                navigate(`/singleitem?itemid=${itemid}`);
              }}
            >
              View Item
            </button>
          </div>
        </article>
      </MnowSalePopupBox>
    );
  else
    return (
      <PnowSalePopupBox>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Your item is now listed for sale</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={icon_close} alt="" />
          </button>
        </article>

        <article className="contBox">
          <div className="itemBox cont">
            <img src={itemdata?.item?.url} alt="" />
          </div>

          <div className="btnBox cont">
            <div className="shareBox">
              <p className="title">Share your listing</p>

              <ul className="snsList">
                <li>
                  <img src={twitter} alt="" />
                </li>
                <li>
                  <img src={telegram} alt="" />
                </li>
                <li>
                  <img src={facebook} alt="" />
                </li>
                <li
                  onClick={(_) => {
                    onClickCopy(singleitem_url(itemdata?.item?.itemid));
                    SetErrorBar(messages.MSG_COPIED);
                  }}
                >
                  <img src={link} alt="" />
                </li>
              </ul>
            </div>

            <button
              className="viewBtn"
              onClick={() => {
                navigate(`/singleitem?itemid=${itemdata?.item?.itemid}`);
              }}
            >
              View Item
            </button>
          </div>
        </article>
      </PnowSalePopupBox>
    );
}

const MnowSalePopupBox = styled.section`
  width: 88.88vw;
  max-height: 90vh;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2.77vw;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 6;
  transform: translate(-50%, -50%);
  overflow-y: scroll;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 13.88vw;
    min-height: 13.88vw;
    padding: 0 5.55vw;
    font-size: 4.44vw;

    .title {
      font-family: "Poppins", sans-serif;
    }

    .blank,
    .exitBtn img {
      width: 5.55vw;
    }
  }

  .contBox {
    border-top: 1px solid #e8e8e8;
    padding: 0 3.88vw;

    .cont {
      display: flex;

      &:nth-child(n + 2) {
        border-top: 1px solid #e8e8e8;
      }

      &.itemBox {
        justify-content: center;
        align-items: center;
        padding: 5.55vw 0;

        img {
          width: 30.55vw;
          height: 30.55vw;
          border-radius: 1vw;
          object-fit: cover;
        }
      }

      &.btnBox {
        flex-direction: column;
        gap: 10.25vw;
        padding: 4vw 0 6.25vw 0;

        .shareBox {
          display: flex;
          flex-direction: column;
          gap: 4.75vw;

          .title {
            font-size: 4.44vw;
            font-weight: 500;
            font-family: "Poppins", sans-serif;
          }

          .snsList {
            display: flex;
            justify-content: center;
            gap: 3.88vw;

            li {
              cursor: pointer;
              width: 13.88vw;
              height: 13.88vw;

              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
          }
        }

        .viewBtn {
          align-self: center;
          width: 100%;
          height: 15.55vw;
          font-size: 4.44vw;
          font-family: "Roboto", sans-serif;
          font-weight: 700;
          color: #fff;
          background: #222;
          border-radius: 6.66vw;
        }
      }
    }
  }
`;

const PnowSalePopupBox = styled.section`
  width: 600px;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;
  @media screen and (max-width: 768px) {
    width: 75vw;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2.5vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    z-index: 6;
  }

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 20px;
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 9vw;
      padding: 0 2.5vw;
    }

    .title {
      font-size: 22px;
      font-weight: 700;
      font-family: Poppins;
      @media screen and (max-width: 768px) {
        font-size: 2.75vw;
        font-weight: 700;
      }
    }

    .blank,
    .exitBtn img {
      width: 30px;
      @media screen and (max-width: 768px) {
        width: 3.75vw;
      }
    }
  }

  .contBox {
    border-top: 1px solid #e8e8e8;
    padding: 0 30px;
    @media screen and (max-width: 768px) {
      padding: 0 3.75vw;
    }

    .cont {
      display: flex;

      &:nth-child(n + 2) {
        border-top: 1px solid #e8e8e8;
      }

      &.itemBox {
        justify-content: center;
        align-items: center;
        height: 326px;
        @media screen and (max-width: 768px) {
          height: 40.75vw;
        }

        img {
          width: 190px;
          height: 190px;
          border-radius: 8px;
          object-fit: cover;
          @media screen and (max-width: 768px) {
            width: 23.75vw;
            height: 23.75vw;
            border-radius: 1vw;
          }
        }
      }

      &.btnBox {
        flex-direction: column;
        gap: 82px;
        padding: 32px 0 50px 0;
        @media screen and (max-width: 768px) {
          gap: 10.25vw;
          padding: 4vw 0 6.25vw 0;
        }

        .shareBox {
          display: flex;
          flex-direction: column;
          gap: 38px;
          @media screen and (max-width: 768px) {
            gap: 4.75vw;
          }

          .title {
            font-size: 22px;
            font-weight: 500;
            font-family: Poppins;
            @media screen and (max-width: 768px) {
              font-size: 2.75vw;
            }
          }

          .snsList {
            display: flex;
            justify-content: center;
            gap: 26px;
            @media screen and (max-width: 768px) {
              gap: 3.25vw;
            }

            li {
              width: 80px;
              height: 80px;
              cursor: pointer;
              @media screen and (max-width: 768px) {
                width: 10vw;
                height: 10vw;
              }

              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
          }
        }

        .viewBtn {
          align-self: center;
          width: 350px;
          height: 56px;
          font-size: 22px;
          font-family: Roboto;
          font-weight: 700;
          color: #fff;
          background: #222;
          border-radius: 28px;

          @media screen and (max-width: 768px) {
            width: 43.75vw;
            height: 7vw;
            font-size: 2.75vw;
            border-radius: 3.5vw;
          }
        }
      }
    }
  }
`;

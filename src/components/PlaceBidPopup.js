import styled from "styled-components";
import icon_close from "../img/sub/icon_close.png";
import I_klaytn from "../img/sub/I_klaytn.svg";
import chk_on from "../img/sub/chk_on.png";
import chk_off from "../img/sub/chk_off.png";
import { useState } from "react";
import { putCommaAtPrice } from "../util/Util";

export default function PlaceBidPopup({ off }) {
  const [price, setPrice] = useState();
  const [termList, setTermList] = useState(new Array(2).fill(false));

  function onClickTerm(index) {
    let dataList = termList;

    dataList[index] = !dataList[index];
    setTermList([...dataList]);
  }
  console.log(termList);

  return (
    <PlaceBidPopupBox>
      <article className="topBar">
        <span className="blank" />
        <strong className="title"> Place a bid</strong>
        <button className="exitBtn" onClick={() => off()}>
          <img src={icon_close} alt="" />
        </button>
      </article>

      <article className="contBox">
        <div className="priceBox">
          <div className="alarmBox">
            Warning! Contains items that have not been reviewed and approved
          </div>

          <div className="inputBox">
            <span className="tokenBox">
              <img src={I_klaytn} alt="" />
              <p>KLAY</p>
            </span>

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="place a token"
            />

            <span className="exchange">${putCommaAtPrice(9000)}</span>
          </div>
        </div>

        <div className="btnBox">
          <ul className="termList">
            <li>
              <button className="chkBtn" onClick={() => onClickTerm(0)}>
                <img src={termList[0] ? chk_on : chk_off} alt="" />
              </button>

              <p className="term">
                Aware that Auspice contains one item that has not been reviewed
                and approved
              </p>
            </li>

            <li>
              <button className="chkBtn" onClick={() => onClickTerm(1)}>
                <img src={termList[1] ? chk_on : chk_off} alt="" />
              </button>

              <p className="term">
                I agree to Auspice's&nbsp;
                <u>Terms of Service</u>
              </p>
            </li>
          </ul>

          <button className="confirmBtn" onClick={() => off()}>
            Place Bid
          </button>
        </div>
      </article>
    </PlaceBidPopupBox>
  );
}

const PlaceBidPopupBox = styled.div`
  &,
  * {
    box-sizing: border-box;
  }

  width: 600px;
  height: 500px;
  padding: 0 0 42px 0;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 1002;

  @media screen and (max-width: 768px) {
    width: 75vw;
    padding: 0 0 5.25vw 0;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2.5vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    z-index: 1002;
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
      font-size: 24px;
      font-weight: 700;
      font-family: Poppins;
      @media screen and (max-width: 768px) {
        font-size: 3vw;
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
    padding: 32px 30px 0 30px;
    border-top: 1px solid #e8e8e8;
    @media screen and (max-width: 768px) {
      padding: 4vw 3.75vw 0 3.75vw;
    }

    .priceBox {
      display: flex;
      flex-direction: column;
      gap: 40px;
      padding: 0 0 36px 0;
      @media screen and (max-width: 768px) {
        gap: 5vw;
        padding: 0 0 4.5vw 0;
      }

      .alarmBox {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 62px;
        font-size: 16px;
        font-weight: 500;
        color: #ff1c1c;
        border: solid 1px #ff1c1c;
        border-radius: 8px;

        @media screen and (max-width: 768px) {
          height: 7.75vw;
          font-size: 2vw;
          border-radius: 1vw;
        }
      }

      .inputBox {
        display: flex;
        height: 50px;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        overflow: hidden;

        @media screen and (max-width: 768px) {
          height: 6.25vw;
          border-radius: 1vw;
        }

        & > *:nth-child(n + 2) {
          flex: 1;
          padding: 0 14px;
          font-weight: 500;
          text-align: end;
          border-left: 1px solid #d9d9d9;

          @media screen and (max-width: 768px) {
            padding: 0 1.75vw;
          }
        }

        .tokenBox {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          width: 104px;
          font-size: 16px;
          line-height: 16px;
          background: #fbfbfb;

          @media screen and (max-width: 768px) {
            gap: 0.5vw;
            width: 13vw;
            font-size: 2vw;
            line-height: 2vw;
          }

          img {
            width: 24px;
            height: 24px;
            object-fit: contain;
            @media screen and (max-width: 768px) {
              width: 3vw;
              height: 3vw;
            }
          }
        }

        input {
        }

        .exchange {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }

    .btnBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 62px;
      padding: 32px 0 0 0;
      border-top: 1px solid #e8e8e8;
      @media screen and (max-width: 768px) {
        gap: 7.75vw;
        padding: 4vw 0 0 0;
      }

      .termList {
        display: flex;
        flex-direction: column;
        gap: 20px;
        @media screen and (max-width: 768px) {
          gap: 2.5vw;
        }

        li {
          display: flex;
          gap: 16px;
          font-size: 16px;
          font-weight: 500;
          @media screen and (max-width: 768px) {
            gap: 2vw;
            font-size: 2vw;
          }

          .chkBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border: solid 1px #222;
            border-radius: 2px;

            @media screen and (max-width: 768px) {
              width: 2.5vw;
              height: 2.5vw;
              border-radius: 0.25vw;
            }
          }

          .term {
            flex: 1;
            line-height: 20px;
            @media screen and (max-width: 768px) {
              line-height: 2.5vw;
            }

            u {
              color: #1c7eff;
            }
          }
        }
      }

      .confirmBtn {
        width: 350px;
        height: 50px;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        background: #222;
        border-radius: 28px;

        @media screen and (max-width: 768px) {
          width: 43.75vw;
          height: 6.25vw;
          font-size: 2.5vw;
          border-radius: 3.5vw;
        }
      }
    }
  }
`;

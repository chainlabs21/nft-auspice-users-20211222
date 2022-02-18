import styled from "styled-components";
import icon_close from "../../../img/sub/icon_close.png";
// import item1 from "../../../img/popup/item1.png";
import I_klaytn from "../../../img/sub/I_klaytn.svg";
import loader from "../../../img/sub/loader.png";
import { useEffect } from "react";
import moment from "moment";
import { TIMEFORMATSTR } from "../../../config/configs";
import axios from "axios";
import { API } from "../../../config/api";
import { PAYMEANS_DEF } from "../../../config/configs";
import { useState } from "react";
import { LOGGER } from "../../../util/common";
import { useSelector } from "react-redux";

export default function CertificationContractPopup({
  off,
  itemdata,
  sellorder,
}) {
  const isMobile = useSelector((state) => state.common.isMobile);

  let [priceklay, setpriceklay] = useState();

  useEffect(() => {
    setTimeout(() => {
      //      off(2);
    }, 3000);
  }, []);

  useEffect((_) => {
    axios.get(`${API.API_TICKERS}/USDT`).then((resp) => {
      LOGGER("", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setpriceklay(list[PAYMEANS_DEF]); // 'KLAY'
      }
    });
  }, []);

  if (isMobile)
    return (
      <McertificationContractPopupBox>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Complete your listing</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={icon_close} alt="" />
          </button>
        </article>

        <article className="contBox">
          <div className="itemBox cont">
            <img src={itemdata?.item?.url} alt="" />

            <div className="textBox">
              <p className="creator">{itemdata?.author?.nickname}</p>
              <p className="title">{itemdata?.item?.titlename}</p>
            </div>
          </div>

          <ul className="infoBox cont">
            <li>
              <div className="contLine">
                <p className="key">Price</p>
                <div className="value priceContainer">
                  <img src={I_klaytn} alt="" />
                  <span className="priceBox">
                    <p className="price">{sellorder?.price}</p>
                    <p className="unit">KLAY</p>
                  </span>
                </div>
              </div>

              <div className="explainLine">
                <p className="explain">
                  ≈ $
                  {priceklay && sellorder?.price
                    ? (+priceklay * +sellorder?.price).toFixed(4)
                    : ""}{" "}
                </p>
              </div>
            </li>

            <li>
              <div className="contLine">
                <p className="key">Quantity</p>
                <p className="value "> {sellorder?.amount} </p>
              </div>
            </li>

            <li>
              <div className="contLine">
                <p className="key">
                  {sellorder?.typestr == "COMMON" ? "Sales" : "Auction"} Period{" "}
                </p>
                <p className="value ">
                  {sellorder?.expiry
                    ? moment.unix(sellorder?.expiry).fromNow()
                    : ""}
                </p>
              </div>

              <div className="explainLine">
                <p className="explain">
                  ({moment().format(TIMEFORMATSTR)} –{" "}
                  {sellorder?.expiry
                    ? moment.unix(sellorder?.expiry).format(TIMEFORMATSTR)
                    : ""}
                  )
                </p>
              </div>
            </li>
          </ul>

          <div className="processBox cont">
            <img className="loader" src={loader} alt="" />
            <p className="explain">
              Accept the signature request in your wallet and wait for your
              listing to process.
            </p>
          </div>
        </article>
      </McertificationContractPopupBox>
    );
  else
    return (
      <PcertificationContractPopupBox>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Complete your listing</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={icon_close} alt="" />
          </button>
        </article>

        <article className="contBox">
          <div className="itemBox cont">
            <img src={itemdata?.item?.url} alt="" />

            <div className="textBox">
              <p className="creator">{itemdata?.author?.nickname}</p>
              <p className="title">{itemdata?.item?.titlename}</p>
            </div>
          </div>

          <ul className="infoBox cont">
            <li>
              <div className="contLine">
                <p className="key">Price</p>
                <div className="value priceContainer">
                  <img src={I_klaytn} alt="" />
                  <span className="priceBox">
                    <p className="price">{sellorder?.price}</p>
                    <p className="unit">KLAY</p>
                  </span>
                </div>
              </div>

              <div className="explainLine">
                <p className="explain">
                  ≈ $
                  {priceklay && sellorder?.price
                    ? (+priceklay * +sellorder?.price).toFixed(4)
                    : ""}{" "}
                </p>
              </div>
            </li>

            <li>
              <div className="contLine">
                <p className="key">Quantity</p>
                <p className="value "> {sellorder?.amount} </p>
              </div>
            </li>

            <li>
              <div className="contLine">
                <p className="key">
                  {sellorder?.typestr == "COMMON" ? "Sales" : "Auction"} Period{" "}
                </p>
                <p className="value ">
                  {sellorder?.expiry
                    ? moment.unix(sellorder?.expiry).fromNow()
                    : ""}
                </p>
              </div>

              <div className="explainLine">
                <p className="explain">
                  ({moment().format(TIMEFORMATSTR)} –{" "}
                  {sellorder?.expiry
                    ? moment.unix(sellorder?.expiry).format(TIMEFORMATSTR)
                    : ""}
                  )
                </p>
              </div>
            </li>
          </ul>

          <div className="processBox cont">
            <img className="loader" src={loader} alt="" />
            <p className="explain">
              Accept the signature request in your wallet and wait for your
              listing to process.
            </p>
          </div>
        </article>
      </PcertificationContractPopupBox>
    );
}

const McertificationContractPopupBox = styled.section`
  width: 88.88vw;
  max-height: 90vh;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2.5vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;
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
    padding: 4vw 4.75vw;
    border-top: 1px solid #e8e8e8;

    .cont {
      display: flex;

      &:nth-child(n + 2) {
        border-top: 1px solid #e8e8e8;
      }

      &.itemBox {
        gap: 1.75vw;
        padding: 0 0 4.5vw 0;

        img {
          width: 25vw;
          height: 25vw;
          border-radius: 1vw;
          object-fit: cover;
        }

        .textBox {
          display: flex;
          flex-direction: column;
          gap: 1vw;

          .creator {
            font-size: 4.44vw;
            color: #1c7eff;
          }

          .title {
            font-size: 5.55vw;
            font-weight: 600;
            color: #222;
          }
        }
      }

      &.infoBox {
        flex-direction: column;
        gap: 3.75vw;
        padding: 3.75vw 3.5vw;

        li {
          .contLine {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 4.44vw;
            font-weight: 500;
            line-height: 4.44vw;

            .value {
              &.priceContainer {
                display: flex;
                align-items: center;
                gap: 4.44vw;

                img {
                  width: 5.55vw;
                  height: 5.55vw;
                  object-fit: contain;
                }

                .priceBox {
                  display: flex;
                  align-items: flex-end;
                  gap: 1vw;

                  .price {
                    line-height: 5.55vw;
                  }

                  .unit {
                    font-size: 4.44vw;
                    line-height: 4.44vw;
                  }
                }
              }
            }
          }

          .explainLine {
            font-size: 3.88vw;
            text-align: end;
            color: #b2b2b2;
          }
        }
      }

      &.processBox {
        flex-direction: column;
        align-items: center;
        gap: 6vw;
        padding: 10.25vw 0 0.475vw 0;

        .loader {
          width: 14.5vw;
          height: 14.5vw;
        }

        .explain {
          font-size: 4.44vw;
          line-height: 5.55vw;
          text-align: center;
          font-weight: 500;
        }
      }
    }
  }
`;

const PcertificationContractPopupBox = styled.section`
  width: 600px;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 20px;

    .title {
      font-size: 22px;
      font-weight: 700;
      font-family: Poppins;
    }

    .blank,
    .exitBtn img {
      width: 30px;
    }
  }

  .contBox {
    padding: 32px 38px;
    border-top: 1px solid #e8e8e8;

    .cont {
      display: flex;

      &:nth-child(n + 2) {
        border-top: 1px solid #e8e8e8;
      }

      &.itemBox {
        gap: 14px;
        padding: 0 0 36px 0;

        img {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          object-fit: cover;
        }

        .textBox {
          display: flex;
          flex-direction: column;
          gap: 7px;

          .creator {
            font-size: 16px;
            color: #1c7eff;
          }

          .title {
            font-size: 22px;
            font-weight: 600;
            color: #222;
          }
        }
      }

      &.infoBox {
        flex-direction: column;
        gap: 30px;
        padding: 30px 0 28px 0;

        li {
          .contLine {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 22px;
            font-weight: 500;
            line-height: 22px;

            .value {
              &.priceContainer {
                display: flex;
                align-items: center;
                gap: 18px;

                img {
                  width: 24px;
                  height: 24px;
                  object-fit: contain;
                }

                .priceBox {
                  display: flex;
                  align-items: flex-end;
                  gap: 8px;

                  .price {
                    line-height: 20px;
                  }

                  .unit {
                    font-size: 16px;
                    line-height: 16px;
                  }
                }
              }
            }
          }

          .explainLine {
            font-size: 14px;
            text-align: end;
            color: #b2b2b2;
          }
        }
      }

      &.processBox {
        flex-direction: column;
        align-items: center;
        gap: 48px;
        padding: 82px 0 38px 0;

        .loader {
          width: 116px;
          height: 116px;
        }

        .explain {
          width: 324px;
          font-size: 16px;
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }
`;

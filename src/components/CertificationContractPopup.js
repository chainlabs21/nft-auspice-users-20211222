import styled from "styled-components";
import icon_close from "../img/sub/icon_close.png";
// import item1 from "../img/popup/item1.png";
import I_klaytn from "../img/sub/I_klaytn.svg";
import loader from "../img/sub/loader.png";
import { useEffect } from "react";
import moment from 'moment'
import { TIMEFORMATSTR } from '../config/configs'
import axios from 'axios'
import { API } from '../config/api'
import {PAYMEANS_DEF} from '../config/configs'
import { useState} from 'react'
import { LOGGER} from '../util/common'

export default function CertificationContractPopup({ off , itemdata , sellorder }) {
	let [ priceklay , setpriceklay ]=useState()
  useEffect(() => {
    setTimeout(() => {
//      off(2);
    }, 3000);
  }, []);
	useEffect(_=>{
    axios.get(`${API.API_TICKERS}/USDT`).then((resp) => {      LOGGER("", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setpriceklay(list[PAYMEANS_DEF]); // 'KLAY'
      }
    });

	} , [] )
  return (
    <CertificationContractPopupBox>
      <article className="topBar">
        <span className="blank" />
        <strong className="title">Complete your listing</strong>
        <button className="exitBtn" onClick={() => off()}>
          <img src={icon_close} alt="" />
        </button>
      </article>

      <article className="contBox">
        <div className="itemBox cont">
          <img src={ itemdata?.item?.url } alt="" />

          <div className="textBox">
            <p className="creator">{ itemdata?.author?.nickname }</p>
            <p className="title">{ itemdata?.item?.titlename }</p>
          </div>
        </div>

        <ul className="infoBox cont">
          <li>
            <div className="contLine">
              <p className="key">Price</p>
              <div className="value priceContainer">
                <img src={I_klaytn} alt="" />
                <span className="priceBox">
                  <p className="price">{ sellorder?.price }</p>
                  <p className="unit">KLAY</p>
                </span>
              </div>
            </div>

            <div className="explainLine">
              <p className="explain">≈ ${ priceklay && sellorder?.price ? (+priceklay * +sellorder?.price ).toFixed(4) : '' } </p>
            </div>
          </li>

          <li>
            <div className="contLine">
              <p className="key">Quantity</p>
              <p className="value "> {sellorder?.amount } </p>
            </div>
          </li>

          <li>
            <div className="contLine">
              <p className="key">Sales Period </p>
              <p className="value ">{ sellorder?.expiry? moment.unix( sellorder?.expiry ).fromNow() : ''}</p>
            </div>

            <div className="explainLine">
              <p className="explain">
                ({moment().format(TIMEFORMATSTR)} – {sellorder?.expiry? moment.unix( sellorder?.expiry).format( TIMEFORMATSTR ) : '' })
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
    </CertificationContractPopupBox>
  );
}

const CertificationContractPopupBox = styled.div`
  width: 600px;
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
    padding: 32px 38px;
    border-top: 1px solid #e8e8e8;
    @media screen and (max-width: 768px) {
      padding: 4vw 4.75vw;
      border-top: 1px solid #e8e8e8;
    }

    .cont {
      display: flex;

      &:nth-child(n + 2) {
        border-top: 1px solid #e8e8e8;
      }

      &.itemBox {
        gap: 14px;
        padding: 0 0 36px 0;
        @media screen and (max-width: 768px) {
          gap: 1.75vw;
          padding: 0 0 4.5vw 0;
        }

        img {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          object-fit: cover;
          @media screen and (max-width: 768px) {
            width: 12.5vw;
            height: 12.5vw;
            border-radius: 1vw;
            object-fit: cover;
          }
        }

        .textBox {
          display: flex;
          flex-direction: column;
          gap: 7px;
          @media screen and (max-width: 768px) {
            gap: 1vw;
          }

          .creator {
            font-size: 16px;
            @media screen and (max-width: 768px) {
              font-size: 2vw;
            }
            color: #1c7eff;
          }

          .title {
            font-size: 22px;
            @media screen and (max-width: 768px) {
              font-size: 2.75vw;
            }
            font-weight: 600;
            color: #222;
          }
        }
      }

      &.infoBox {
        flex-direction: column;
        gap: 30px;
        @media screen and (max-width: 768px) {
          gap: 3.75vw;
        }
        padding: 30px 0 28px 0;
        @media screen and (max-width: 768px) {
          padding: 3.75vw 3.5vw;
        }

        li {
          .contLine {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 22px;
            font-weight: 500;
            line-height: 22px;
            @media screen and (max-width: 768px) {
              font-size: 2.75vw;
              line-height: 2.75vw;
            }

            .value {
              &.priceContainer {
                display: flex;
                align-items: center;
                gap: 18px;
                @media screen and (max-width: 768px) {
                  gap: 2.25vw;
                }

                img {
                  width: 24px;
                  height: 24px;
                  @media screen and (max-width: 768px) {
                    width: 3vw;
                    height: 3vw;
                  }
                  object-fit: contain;
                }

                .priceBox {
                  display: flex;
                  align-items: flex-end;
                  gap: 8px;
                  @media screen and (max-width: 768px) {
                    gap: 1vw;
                  }

                  .price {
                    line-height: 20px;
                    @media screen and (max-width: 768px) {
                      line-height: 2.5vw;
                    }
                  }

                  .unit {
                    font-size: 16px;
                    line-height: 16px;
                    @media screen and (max-width: 768px) {
                      font-size: 2vw;
                      line-height: 2vw;
                    }
                  }
                }
              }
            }
          }

          .explainLine {
            font-size: 14px;
            @media screen and (max-width: 768px) {
              font-size: 1.75vw;
            }
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
        @media screen and (max-width: 768px) {
          gap: 6vw;
          padding: 10.25vw 0 0.475vw 0;
        }

        .loader {
          width: 116px;
          height: 116px;

          @media screen and (max-width: 768px) {
            width: 14.5vw;
            height: 14.5vw;
          }
        }

        .explain {
          width: 324px;
          font-size: 16px;
          line-height: 20px;
          @media screen and (max-width: 768px) {
            width: 40.5vw;
            font-size: 2vw;
            line-height: 2.5vw;
          }
          text-align: center;
        }
      }
    }
  }
`;

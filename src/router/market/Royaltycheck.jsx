import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";
import s2 from "../../img/sub/s2.png";
import s6 from "../../img/sub/s6.png";
import s7 from "../../img/sub/s7.png";
import exchange from "../../img/sub/exchange.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_ltArw3 from "../../img/icons/I_ltArw3.png";

// import "./css/style01.css";
// import "./css/style02.css";

import { getmyaddress, LOGGER } from "../../util/common";
import { API } from "../../config/api";
import { useEffect, useState } from "react";
import { applytoken } from "../../util/rest";
import moment from "moment";
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../config/messages";
import DefaultHeader from "../../components/header/DefaultHeader";
import DetailHeader from "../../components/header/DetailHeader";

export default function Royaltycheck() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <>
        <DetailHeader title="Items home" />

        <MroyaltyCheck>
          <section className="innerBox">
            <article className="contArea">
              <p className="pageTitle">Royalty</p>

              <div className="titleBox">
                <strong className="title">Item 1</strong>
                <p className="explain">
                  The payment is only paid when more than 0.1 ETH has been
                  accumulated, and deposits are
                  <br />
                  made in batches every month. Deposit date and time are subject
                  to change.
                </p>
              </div>

              <div className="listContainer">
                <button className="sortBtn" onClick={() => {}}>
                  <img src={exchange} alt="" />
                  <p>Change sort order</p>
                </button>

                <div className="scrollBox">
                  <div className="flexBox">
                    <div className="listBox">
                      <ul className="listHeader">
                        <li>Item</li>
                        <li>Sale Price</li>
                        <li>Quantity</li>
                        <li>Pay royalties</li>
                        <li>Payment date</li>
                      </ul>

                      <ul className="list">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cont, index) => (
                          <li className={index}>
                            <span>
                              <span className="profImg" />
                              <p>A girl</p>
                            </span>
                            <span>
                              <img className="tokenImg" src={I_klaytn} alt="" />
                              <p>0.01</p>
                            </span>
                            <span>
                              <p>2</p>
                            </span>
                            <span>
                              <img className="tokenImg" src={I_klaytn} alt="" />
                              <p>0.01</p>
                            </span>
                            <span>
                              <p>2021.04.01</p>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </MroyaltyCheck>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <ProyaltyCheck>
          <section className="innerBox">
            <article className="topBar">
              <button className="exitBtn" onClick={() => navigate(-1)}>
                <img src={I_ltArw3} alt="" />
              </button>

              <strong className="title">Items home</strong>
            </article>

            <article className="contArea">
              <p className="pageTitle">Royalty</p>

              <div className="titleBox">
                <strong className="title">Item 1</strong>
                <p className="explain">
                  The payment is only paid when more than 0.1 ETH has been
                  accumulated, and deposits are
                  <br />
                  made in batches every month. Deposit date and time are subject
                  to change.
                </p>
              </div>

              <div className="listContainer">
                <button className="sortBtn" onClick={() => {}}>
                  <img src={exchange} alt="" />
                  <p>Change sort order</p>
                </button>

                <div className="listBox">
                  <ul className="listHeader">
                    <li>Item</li>
                    <li>Sale Price</li>
                    <li>Quantity</li>
                    <li>Pay royalties</li>
                    <li>Payment date</li>
                  </ul>

                  <ul className="list">
                    {[1, 2, 3, 4, 5, 6].map((cont, index) => (
                      <li className={index}>
                        <span>
                          <span className="profImg" />
                          <p>A girl</p>
                        </span>
                        <span>
                          <img className="tokenImg" src={I_klaytn} alt="" />
                          <p>0.01</p>
                        </span>
                        <span>
                          <p>2</p>
                        </span>
                        <span>
                          <img className="tokenImg" src={I_klaytn} alt="" />
                          <p>0.01</p>
                        </span>
                        <span>
                          <p>2021.04.01</p>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </ProyaltyCheck>
      </>
    );
}

const MroyaltyCheck = styled.div`
  padding: 72px 0 0 0;

  .innerBox {
    padding: 8.33vw 5.55vw;

    .contArea {
      .pageTitle {
        font-size: 3.88vw;
        font-weight: 500;
      }

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
        margin: 2.77vw 0 0 0;

        .title {
          font-size: 6.66vw;
        }

        .explain {
          font-size: 3.88vw;
          line-height: 6.11vw;
        }
      }

      .listContainer {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2.77vw;
        margin: 5.55vw 0 0 0;

        .sortBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.22vw;
          width: 46.66vw;
          height: 13.33vw;
          font-size: 3.88vw;
          font-weight: 500;
          border: 1px solid #d9d9d9;
          border-radius: 12.22vw;

          img {
            width: 6.66vw;
          }
        }
      }

      .scrollBox {
        width: 100%;
        padding: 2.77vw;
        border-radius: 5.55vw;
        border: 1px solid #000;

        *::-webkit-scrollbar {
          width: 4px;
          height: 4px;
          border: 5px solid #222;
        }

        *::-webkit-scrollbar-thumb {
          width: 4px;
          height: 4px;
          background: #222;
          border-radius: 4px;
        }

        *::-webkit-scrollbar-track {
          height: 4px;
          background: #fff;
          border-radius: 4px;
        }

        .flexBox {
          display: flex;
          overflow-x: scroll;

          .listBox {
            flex: 1;

            .listHeader {
              display: flex;
              align-items: center;
              height: 11.66vw;
              font-weight: 500;

              li {
                min-width: 30.55vw;
              }
            }

            .list {
              width: 100%;
              height: 100vw;
              overflow-y: scroll;

              li {
                display: flex;
                align-items: center;
                width: 100%;
                height: 13.33vw;

                & > span {
                  display: flex;
                  align-items: center;
                  gap: 1.11vw;
                  min-width: 30.55vw;
                  height: 100%;
                  border-top: 1px solid #d9d9d9;

                  .profImg {
                    width: 6.66vw;
                    height: 6.66vw;
                    background: #000;
                    border-radius: 50%;
                    object-fit: cover;
                  }

                  .tokenImg {
                    width: 6.66vw;
                    height: 6.66vw;
                    object-fit: cover;
                  }
                }
              }
            }

            .listHeader li,
            .list li > span {
              flex: 1;
            }
          }
        }
      }
    }
  }
`;

const ProyaltyCheck = styled.div`
  padding: 120px 0 0 0;

  .innerBox {
    margin: 60px auto 0 auto;
    width: 800px;
    border-radius: 20px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);

    .topBar {
      display: flex;
      align-items: center;
      gap: 30px;
      height: 82px;
      padding: 0 30px;

      .exitBtn {
        img {
          width: 18px;
        }
      }

      .title {
        font-size: 20px;
      }
    }

    .contArea {
      padding: 28px 36px 40px 36px;
      border-top: 1px solid #d9d9d9;

      .pageTitle {
        font-size: 16px;
        font-weight: 500;
      }

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin: 34px 0 0 0;

        .title {
          font-size: 30px;
        }

        .explain {
          font-size: 16px;
          line-height: 22px;
        }
      }

      .listContainer {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 18px;

        .sortBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          width: 200px;
          height: 48px;
          font-size: 16px;
          font-weight: 500;
          border: 1px solid #d9d9d9;
          border-radius: 44px;

          img {
            width: 24px;
          }
        }
      }

      .listBox {
        width: 100%;
        text-align: center;

        .listHeader {
          display: flex;
          align-items: center;
          height: 48px;
          font-weight: 500;
          border-top: 1px solid #d9d9d9;

          li {
          }
        }

        .list {
          li {
            display: flex;
            align-items: center;
            height: 64px;
            border-top: 1px solid #d9d9d9;

            & > span {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 4px;

              .profImg {
                width: 30px;
                height: 30px;
                background: #000;
                border-radius: 50%;
                object-fit: cover;
              }

              .tokenImg {
                width: 24px;
                height: 24px;
                object-fit: cover;
              }
            }
          }
        }

        .listHeader li,
        .list li > span {
          flex: 1;
        }
      }
    }
  }
`;

import { useSelector } from "react-redux";
import styled from "styled-components";
import I_x from "../../img/icons/I_x.svg";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_chkBtn from "../../img/design/I_chkBtn.png";

export default function BidSinglePopup({ off, imageurl,title, sellername, price }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MbidSinglePopup>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Purchase receipt</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="warningBox">
            Warning! Contains items
            <br />
            that have not been reviewed and approved
          </div>

          <div className="contBox">
            <div className="listHeader">Item</div>

            <ul className="itemList">
              <li>
                <img className="itemImg" src="itemurl"/>

                <div className="infoBox">
                  <div className="titleBox">
                    <p className="seller">{sellername}</p>
                    <strong className="itemTitle">Blackman with neon</strong>
                  </div>

                  <div className="priceBox">
                    <strong className="key">Subtotal</strong>

                    <div className="value">
                      <div className="token">
                        <img src={I_klaytn} alt="" />
                        <strong className="price">25</strong>
                      </div>

                      <p className="exchange">($58,282.50)</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div className="totalBox">
              <div className="keyBox">
                <strong className="key">Total</strong>
                <strong className="alarm">Insufficient ETH balance</strong>
              </div>

              <div className="valueBox">
                <div className="token">
                  <img src={I_klaytn} alt="" />
                  <strong className="price">25</strong>
                </div>
                <p className="exchange">($58,282.50)</p>
              </div>
            </div>
          </div>

          <ul className="termList">
            <li>
              <button className="chkBtn" onClick={() => {}}>
                <img src={I_chkBtn} alt="" />
              </button>

              <p className="term">
                Aware that Auspice contains one item that has not been reviewed
                and approved
              </p>
            </li>

            <li>
              <button className="chkBtn" onClick={() => {}}>
                <img src={I_chkBtn} alt="" />
              </button>

              <p className="term">
                I agree to Auspice's <u>Terms of Service</u>
              </p>
            </li>
          </ul>

          <button className="paymentBtn" onClick={() => {}}>
            make a payment
          </button>
        </article>
      </MbidSinglePopup>
    );
  else
    return (
      <PbidSinglePopup>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Purchase receipt</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="warningBox">
            Warning! Contains items that have not been reviewed and approved
          </div>

          <div className="contBox">
            <div className="listHeader">
              <p>Item</p>
              <p>Subtotal</p>
            </div>

            <ul className="itemList">
              <li>
                <img className="itemImg" src={imageurl}/>

                <div className="infoBox">
                  <div className="titleBox">
                    <p className="seller">{sellername}</p>
                    <strong className="itemTitle">{title}</strong>
                  </div>

                  <div className="priceBox">
                    <div className="token">
                      <img src={I_klaytn} alt="" />
                      <strong className="price">{price}</strong>
                    </div>

                    <p className="exchange">($58,282.50)</p>
                  </div>
                </div>
              </li>
            </ul>

            <div className="totalBox">
              <div className="keyBox">
                <strong className="key">Total</strong>
                <strong className="alarm">Insufficient ETH balance</strong>
              </div>

              <div className="valueBox">
                <div className="token">
                  <img src={I_klaytn} alt="" />
                  <strong className="price">{price}</strong>
                </div>
                <p className="exchange">($58,282.50)</p>
              </div>
            </div>
          </div>

          <ul className="termList">
            <li>
              <button className="chkBtn" onClick={() => {}}>
                <img src={I_chkBtn} alt="" />
              </button>

              <p className="term">
                Aware that Auspice contains one item that has not been reviewed
                and approved
              </p>
            </li>

            <li>
              <button className="chkBtn" onClick={() => {}}>
                <img src={I_chkBtn} alt="" />
              </button>

              <p className="term">
                I agree to Auspice's <u>Terms of Service</u>
              </p>
            </li>
          </ul>

          <button className="paymentBtn" onClick={() => {}}>
            make a payment
          </button>
        </article>
      </PbidSinglePopup>
    );
}

const MbidSinglePopup = styled.section`
  width: 88.88vw;
  max-height: 90vh;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2.77vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;
  overflow-y: scroll;

  & > .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3.33vw;
    height: 14.44vw;

    .title {
      font-size: 4.44vw;
      line-height: 4.44vw;
    }

    .blank,
    img {
      width: 5.55vw;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    padding: 3.33vw 2.77vw;
    border-top: 1px solid #e8e8e8;

    .warningBox {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 17.22vw;
      border-radius: 2.22vw;
      font-size: 3.33vw;
      font-weight: 700;
      text-align: center;
      color: #ff1c1c;
      border: solid 1px #ff1c1c;
    }

    .contBox {
      padding: 0 1.11vw;
      margin: 2.77vw 0 0 0;

      .listHeader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 8.88vw;
        font-size: 5vw;
        font-weight: 700;
      }

      .itemList {
        display: flex;
        flex-direction: column;
        gap: 5.55vw;
        padding: 4.44vw 0;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4.44vw;

          .itemImg {
            display: inline-block;
            width: 27.77vw;
            height: 27.77vw;
            border-radius: 2.22vw;
            object-fit: contain;
            background: #000;
          }

          .infoBox {
            display: flex;
            flex-direction: column;
            gap: 5.55vw;
            width: 100%;

            .titleBox {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.11vw;

              .seller {
                font-size: 3.33vw;
                font-weight: 500;
                color: #1c7eff;
              }

              .itemTitle {
                font-size: 4.44vw;
              }
            }

            .priceBox {
              display: flex;
              justify-content: space-between;

              .key {
                font-size: 4.44vw;
                font-weight: 900;
              }

              .value {
                display: flex;
                flex-direction: column;
                gap: 0.55vw;

                .token {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  gap: 1.11vw;

                  img {
                    width: 6.66vw;
                    height: 6.66vw;
                    object-fit: contain;
                  }

                  .price {
                    font-size: 5vw;
                  }
                }

                .exchange {
                  font-size: 3.88vw;
                  font-weight: 500;
                  color: #b2b2b2;
                }
              }
            }
          }
        }
      }

      .totalBox {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 4.44vw 0;
        border-bottom: 1px solid #e8e8e8;

        .keyBox {
          display: flex;
          flex-direction: column;
          gap: 1.11vw;

          .key {
            font-size: 4.44vw;
            font-weight: 900;
          }
          .alarm {
            font-size: 3.33vw;
            color: #ff1c1c;
          }
        }

        .valueBox {
          .token {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 1.11vw;

            img {
              width: 6.66vw;
              height: 6.66vw;
              object-fit: contain;
            }

            .price {
              font-size: 5vw;
              color: #1c7eff;
            }
          }

          .exchange {
            font-size: 3.88vw;
            font-weight: 500;
            color: #b2b2b2;
          }
        }
      }
    }

    .termList {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;
      padding: 6.66vw 0 0 0;

      li {
        display: flex;
        gap: 3.33vw;

        .chkBtn {
          width: 5.55vw;
          height: 5.55vw;
          border-radius: 1.11vw;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .term {
          flex: 1;
          font-size: 3.88vw;
          font-weight: 500;
          line-height: 5vw;
        }
      }
    }
  }

  .paymentBtn {
    width: 100%;
    height: 15.55vw;
    margin: 11.11vw 0 0 0;
    font-size: 4.44vw;
    font-weight: 700;
    color: #fff;
    background: #222;
    border-radius: 7.77vw;
  }
`;

const PbidSinglePopup = styled.section`
  width: 600px;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;

  & > .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 72px;

    .title {
      font-size: 22px;
    }

    .blank,
    img {
      width: 20px;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    border-top: 1px solid #e8e8e8;

    .warningBox {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 62px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #ff1c1c;
      border: solid 1px #ff1c1c;
    }

    .contBox {
      .listHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        padding: 0 8px;
        font-size: 22px;
        font-weight: 500;
      }

      .itemList {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 8px;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;

        li {
          display: flex;
          gap: 14px;

          .itemImg {
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 8px;
            object-fit: contain;
            background: #000;
          }

          .infoBox {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > div {
              display: flex;
              flex-direction: column;

              &.titleBox {
                .seller {
                  height: 20px;
                  font-size: 16px;
                  font-weight: 500;
                  color: #1c7eff;
                }

                .itemTitle {
                  font-size: 22px;
                  color: #222;
                }
              }

              &.priceBox {
                gap: 4px;

                .token {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  gap: 4px;

                  img {
                    width: 24px;
                    height: 24px;
                    object-fit: contain;
                  }

                  .price {
                    font-size: 22px;
                  }
                }

                .exchange {
                  font-size: 14px;
                  font-weight: 500;
                  color: #b2b2b2;
                }
              }
            }
          }
        }
      }

      .totalBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        padding: 10px 8px;
        border-bottom: 1px solid #e8e8e8;

        .keyBox {
          display: flex;
          flex-direction: column;

          .key {
            font-size: 22px;
          }

          .alarm {
            font-size: 12px;
            color: #ff1c1c;
          }
        }

        .valueBox {
          align-self: flex-end;

          .token {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 4px;

            img {
              width: 24px;
              height: 24px;
              object-fit: contain;
            }

            .price {
              font-size: 22px;
              color: #1c7eff;
            }
          }

          .exchange {
            font-size: 14px;
            font-weight: 500;
            color: #b2b2b2;
          }
        }
      }
    }

    .termList {
      display: flex;
      flex-direction: column;
      gap: 20px;

      li {
        display: flex;
        gap: 14px;

        .chkBtn {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .term {
          flex: 1;
          font-size: 16px;
          font-weight: 500;
          line-height: 20px;
        }
      }
    }
  }

  .paymentBtn {
    width: 350px;
    height: 56px;
    margin: 30px auto 0 auto;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    background: #222;
    border-radius: 28px;
  }
`;

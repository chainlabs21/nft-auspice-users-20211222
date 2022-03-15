import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import styled from "styled-components";
import I_klaytn from "../../../img/sub/I_klaytn.svg";
import I_dnArrow from "../../../img/icons/I_dnArrow.svg";
import auction_icon from "../../../img/sub/auction_icon.png";
import {
  D_dateList,
  D_instructionList,
  D_timeList,
} from "../../../data/D_saleItem";
import PopupBg from "../../../components/PopupBg";
import SelectPopup from "../../../components/SelectPopup";

export default function AuctionBid(props) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [minimum, setMinimum] = useState(0);
  const [amount, setAmount] = useState(1);
  const [datePopup, setDatePopup] = useState(false);
  const [timePopup, setTimePopup] = useState(false);
  const [minimumPopup, setMinimumPopup] = useState(false);
  const [targetPopup, setTargetPopup] = useState(false);
  const [itemData, setItemData] = useState(props.itemdata)
  const [dayPicker, setDayPicker] = useState(0);
  const [timePicker, setTimePicker] = useState(0);
  useEffect(()=>{
    setItemData(props.itemdata)
    console.log(itemData)
  },[props])
  useEffect(()=>{
    props.saleInfo([minimum, amount, dayPicker, timePicker])
    console.log(dayPicker)
  },[minimum, amount, dayPicker, timePicker])

  useEffect(()=>{
    if((itemData.itembalance?.avail)<=amount){
      setAmount(itemData.itembalance.avail)
    }
  },[amount])

  if (isMobile)
    return (
      <MauctionBid>
        <li className="minimumContainer">
          <div className="leftBox">
            <div className="infoBox posBox">
              <strong className="title">Minimum bid</strong>
              <div className="hoverBox">
                <button
                  className="hoverBtn"
                  onClick={() => setMinimumPopup(true)}
                >
                  <img src={auction_icon} alt="" />
                </button>

                {minimumPopup && (
                  <>
                    <div className="hoverPopup">
                      You can always accept a sale even if you are offered a
                      price that is higher than your minimum bid and lower than
                      your target bid.
                    </div>
                    <PopupBg bg off={setMinimumPopup} />
                  </>
                )}
              </div>
            </div>
            <p className="explain">Enter your starting bid.</p>
          </div>

          <div className="priceBox">
            <div className="tokenBox posBox">
              <button className="tokenBtn" onClick={() => {}}>
                <div className="value">
                  <img className="tokenImg" src={I_klaytn} alt="" />
                  <strong>KLAY</strong>
                </div>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </button>
            </div>

            <input
              value={minimum}
              onChange={(e) => setMinimum(e.target.value)}
              placeholder=""
            />
          </div>
        </li>

        <li className="tragetContainer">
          <div className="leftBox">
            <div className="infoBox posBox">
              <strong className="title">Target bid</strong>
              <div className="hoverBox">
                <button
                  className="hoverBtn"
                  onClick={() => setTargetPopup(true)}
                >
                  <img src={auction_icon} alt="" />
                </button>

                {targetPopup && (
                  <>
                    <div className="hoverPopup">
                      You can always accept a sale even if you are offered a
                      price that is higher than your minimum bid and lower than
                      your target bid.
                    </div>
                    <PopupBg bg off={setTargetPopup} />
                  </>
                )}
              </div>
            </div>
            <p className="explain">
              Enter your target price. If you do not receive a bid above this
              price, it will close without sale.
            </p>
          </div>

          <div className="priceBox">
            <div className="tokenBox posBox">
              <button className="tokenBtn" onClick={() => {}}>
                <div className="value">
                  <img className="tokenImg" src={I_klaytn} alt="" />
                  <strong>KLAY</strong>
                </div>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </button>
            </div>

            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=""
            />
          </div>
        </li>

        <li className="expiryContainer">
          <div className="leftBox">
            <strong className="title">Expiry date</strong>

            <p className="explain">
              When the expiration time is reached, the sale price is
              automatically It ends.
            </p>
          </div>

          <div className="btnContainer">
            <div className="dateBox posBox timeBtnBox">
              <button
                className="dateBtn selectBtn"
                onClick={() => setDatePopup(true)}
              >
                <p>5 days later</p>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </button>

              {datePopup && (
                <>
                  <SelectPopup off={setDatePopup} contList={D_dateList} />
                  <PopupBg off={setDatePopup} />
                </>
              )}
            </div>
            <div className="timeBox posBox timeBtnBox">
              <button
                className="timeBtn selectBtn"
                onClick={() => setTimePopup(true)}
              >
                <p>Pm 02 : 00</p>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </button>

              {timePopup && (
                <>
                  <SelectPopup off={setTimePopup} contList={D_timeList} />
                  <PopupBg off={setTimePopup} />
                </>
              )}
            </div>
          </div>
        </li>

        <li className="instructionBox">
          <details className="instructionDetail">
            <summary className="instructionSummary">
              <div className="titleBox">
                <strong className="title">Instruction</strong>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </div>

              <p className="explain">
                We need a process for listing without gas fees
              </p>
            </summary>

            <ul className="instructionList">
              {D_instructionList.map((cont, index) => (
                <li key={index}>{cont}</li>
              ))}
            </ul>
          </details>
        </li>
      </MauctionBid>
    );
  else
    return (
      <PauctionBid>

        <li className="tragetContainer">
          <div className="leftBox">
            <div className="infoBox">
              <strong className="title">Amount to auction</strong>
              <div className="hoverBox posBox">
                <button className="hoverBtn" onClick={() => {}}>
                  <img src={auction_icon} alt="" />
                </button>

                <div className="hoverPopup">
                  You can decide the amount of items to list an auction.
                </div>
              </div>
            </div>
            <p className="explain">
              The amount of items you desire to list.
            </p>
          </div>

          <div className="priceBox">
            <input
            type="number"
              value={amount}
              disabled
              onChange={(e) => {}}
              placeholder=""
            />
                        <div className="tokenBox posBox">
              <button className="tokenBtn" onClick={() => {}}>
                <div className="value">
                  <strong>out of {itemData?.itembalance?.avail}</strong>
                </div>
                
              </button>
            </div>
          </div>
        </li>





        <li className="minimumContainer">
          <div className="leftBox">
            <div className="infoBox">
              <strong className="title">Starting bid</strong>
              <div className="hoverBox posBox">
                <button className="hoverBtn" onClick={() => {}}>
                  <img src={auction_icon} alt="" />
                </button>

                <div className="hoverPopup">
                  You can always accept a sale even if you are offered a price
                  that is higher than your minimum bid and lower than your
                  target bid.
                </div>
              </div>
            </div>
            <p className="explain">Enter your starting bid.</p>
          </div>

          <div className="priceBox">
            <div className="tokenBox posBox">
              <button className="tokenBtn" onClick={() => {}}>
                <div className="value">
                  <img className="tokenImg" src={I_klaytn} alt="" />
                  <strong>KLAY</strong>
                </div>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </button>
            </div>

            <input
              type="number"
              value={parseFloat(minimum)}
              onChange={(e) => setMinimum(e.target.value)}
              placeholder=""
            />
          </div>
        </li>

        

        <li className="expiryContainer">
          <div className="leftBox">
            <strong className="title">Expiry date</strong>

            <p className="explain">
              When the expiration time is reached, the sale price is
              automatically It ends.
            </p>
          </div>

          <div className="btnContainer">
            <div className="dateBox posBox timeBtnBox">
              <button
                className="dateBtn selectBtn"
                onClick={() => setDatePopup(true)}
              >
                <p>{D_dateList[dayPicker]}</p>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </button>

              {datePopup && (
                <>
                  <SelectPopup off={setDatePopup} contList={D_dateList} selectCont={setDayPicker}/>
                  <PopupBg off={setDatePopup} />
                </>
              )}
            </div>
            <div className="timeBox posBox timeBtnBox">
              <button
                className="timeBtn selectBtn"
                onClick={() => setTimePopup(true)}
              >
                <p>{D_timeList[timePicker]}</p>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </button>

              {timePopup && (
                <>
                  <SelectPopup off={setTimePopup} contList={D_timeList} selectCont={setTimePicker}/>
                  <PopupBg off={setTimePopup} />
                </>
              )}
            </div>
          </div>
        </li>

        <li className="instructionBox">
          <details className="instructionDetail">
            <summary className="instructionSummary">
              <div className="textBox">
                <strong className="title">Instruction</strong>
                <p className="explain">
                  We need a process for listing without gas fees
                </p>
              </div>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <ul className="instructionList">
              {D_instructionList.map((cont, index) => (
                <li key={index}>{cont}</li>
              ))}
            </ul>
          </details>
        </li>
      </PauctionBid>
    );
}

const MauctionBid = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 13.88vw;

  & > li {
    display: flex;
    flex-direction: column;
    padding: 0 5.55vw;

    .explain {
      font-size: 3.88vw;
      line-height: 5.55vw;
    }

    .titleBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .infoBox {
      display: flex;
      gap: 0.55vw;
      align-items: center;

      .hoverBox {
        .hoverBtn {
          img {
            width: 6.11vw;
          }
        }

        .hoverPopup {
          display: block;
          width: 80vw;
          padding: 3.88vw 3.33vw;
          font-size: 3.88vw;
          font-weight: 500;
          color: #25426a;
          background: #fff;
          border-radius: 2.22vw;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
          z-index: 6;
          top: 7vw;
          left: 50%;
          transform: translate(-50%, 0);
          position: absolute;
        }
      }
    }

    .priceBox {
      display: flex;
      height: 13.33vw;
      border: solid 1px #d9d9d9;
      border-radius: 2.22vw;
      overflow: hidden;

      .tokenBox {
        display: flex;
        align-items: center;
        width: 31.11vw;
        background: #fbfbfb;

        .tokenBtn {
          display: flex;
          align-items: center;
          gap: 1.11vw;
          padding: 0 1.66vw 0 3.33vw;
          font-size: 4.44vw;
          font-weight: 4.44vw;

          .value {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 1.11vw;

            .tokenImg {
              width: 5.55vw;
              height: 5.55vw;
              object-fit: contain;
            }
          }

          .arwImg {
            width: 3.33vw;
          }
        }
      }

      input {
        flex: 1;
        padding: 0 2.77vw;
        font-size: 4.44vw;
        text-align: end;
        background: #fff;
        border-left: 1px solid #d9d9d9;
      }
    }

    &.minimumContainer {
      gap: 5.55vw;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
      }
    }

    &.tragetContainer {
      gap: 5.55vw;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;

        .explain {
        }
      }
    }

    &.expiryContainer {
      gap: 5.55vw;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;

        .explain {
        }
      }

      .btnContainer {
        display: flex;
        gap: 2.22vw;
        width: 100%;

        .timeBtnBox {
          flex: 1;
          &.dateBox {
          }

          &.timeBox {
          }

          .selectBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 13.33vw;
            padding: 0 4.44vw;
            font-size: 4.44vw;
            font-weight: 500;
            background: #fff;
            border: solid 1px #d9d9d9;
            border-radius: 2.22vw;
          }

          .selectPopup {
            top: 14.44vw;
            border-radius: 2.22vw;

            li {
              font-size: 4.44vw;

              &:hover {
                background: #4d4d4d;
              }
            }
          }
        }
      }
    }

    &.instructionBox {
      .instructionDetail {
        border: solid 1px #d9d9d9;
        border-radius: 2.22vw;

        &[open] {
          summary {
            .arwImg {
              transform: rotate(180deg);
            }
          }
        }

        .instructionSummary {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3.88vw;
          height: 26.66vw;
          padding: 0 2.77vw;

          .titleBox {
            .arwImg {
              width: 5.55vw;
            }
          }

          .explain {
            font-size: 3.88vw;
            line-height: 5.55vw;
          }
        }

        .instructionList {
          display: flex;
          flex-direction: column;
          gap: 2.22vw;
          padding: 6.11vw 2.77vw;
          font-size: 3.88vw;
          font-weight: 500;
          border-top: 1px solid #d9d9d9;
        }
      }
    }
  }
`;

const PauctionBid = styled.ul`
  & > li {
    padding-bottom: 20px;

    &:nth-of-type(n + 2) {
      padding-top: 34px;
      border-top: 1px solid #d9d9d9;
    }

    .explain {
      font-size: 16px;
      line-height: 25px;
    }

    .titleBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .infoBox {
      display: flex;
      gap: 2px;
      align-items: center;

      .hoverBox {
        &:hover {
          .hoverPopup {
            display: block;
          }
        }

        .hoverBtn {
          img {
            width: 22px;
          }
        }

        .hoverPopup {
          display: none;
          width: 340px;
          padding: 14px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #25426a;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
          top: 24px;
          left: -20px;
          position: absolute;
        }
      }
    }

    .priceBox {
      display: flex;
      width: 236px;
      height: 50px;
      border: solid 1px #d9d9d9;
      border-radius: 8px;
      overflow: hidden;

      .tokenBox {
        display: flex;
        align-items: center;
        width: 112px;
        background: #fbfbfb;

        .tokenBtn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 6px 0 12px;
          font-size: 16px;
          font-weight: 16px;

          .value {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 5px;

            .tokenImg {
              width: 20px;
              height: 20px;
              object-fit: contain;
            }
          }

          .arwImg {
            width: 12px;
          }
        }
      }

      input {
        flex: 1;
        padding: 0 12px;
        font-size: 16px;
        text-align: end;
        background: #fff;
        border-left: 1px solid #d9d9d9;
      }
    }

    &.minimumContainer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
    }

    &.tragetContainer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 14px;

        .explain {
          width: 316px;
        }
      }
    }

    &.expiryContainer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 14px;

        .explain {
          width: 316px;
        }
      }

      .btnContainer {
        display: flex;
        gap: 10px;

        .timeBtnBox {
          &.dateBox {
          }

          &.timeBox {
          }

          .selectBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 160px;
            height: 50px;
            padding: 0 16px;
            font-size: 16px;
            font-weight: 500;
            background: #fff;
            border: solid 1px #d9d9d9;
            border-radius: 8px;
          }

          .selectPopup {
            top: 54px;
            border-radius: 8px;

            li {
              font-size: 16px;

              &:hover {
                background: #4d4d4d;
              }
            }
          }
        }
      }
    }

    &.instructionBox {
      .instructionDetail {
        border: solid 1px #d9d9d9;
        border-radius: 8px;

        &[open] {
          summary {
            .arwImg {
              transform: rotate(180deg);
            }
          }
        }

        .instructionSummary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 76px;
          padding: 0 20px;

          .textBox {
            .explain {
              font-size: 14px;
              line-height: 16px;
            }
          }

          .arwImg {
            width: 24px;
          }
        }

        .instructionList {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 20px;
          font-size: 14px;
          font-weight: 500;
          border-top: 1px solid #d9d9d9;
        }
      }
    }
  }
`;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import I_klaytn from "../../../img/sub/I_klaytn.svg";
import I_dnArrow from "../../../img/icons/I_dnArrow.svg";
import {
  D_dateList,
  D_instructionList,
  D_timeList,
} from "../../../data/D_saleItem";
import PopupBg from "../../../components/PopupBg";
import SelectPopup from "../../../components/SelectPopup";
import { useEffect } from "react";
import { SET_SALE_INFO } from "../../../reducers/saleReducer";

export default function FixedPrice(props) {
  const dispatch = useDispatch();

  const isMobile = useSelector((state) => state.common.isMobile);
  const {saleInfo} = useSelector((state)=>state.sale)
  const [itemdata, setItemData]=useState(props.itemdata)
  const [price, setPrice] = useState(0);
  const [toggleEndPrice, setToggleEndPrice] = useState(false);
  const [togglePrivate, setTogglePrivate] = useState(false);
  const [privateOpt, setPrivateOpt] = useState("");
  const [datePopup, setDatePopup] = useState(false);
  const [timePopup, setTimePopup] = useState(false);
  const [expiry, setExpiry] = useState(1)
  const [amountof, setAmountof]=useState(itemdata?.itembalance?.avail)
  const [amount, setAmount]=useState(1)
  

  useEffect(()=>{
    setItemData(props.itemdata)
  },[props])

  useEffect(()=>{
    if(amount>amountof)setAmount(amountof)
    
    //dispatch({type: SET_SALE_INFO, payload:{key: 'price', value: price}})
  },[amount])

  useEffect(()=>{
    if(price==null){
      setPrice(0)
    }
    if(amount == null){
      setAmount(0)
    }
    //var a = Math.round(price * amount)
    props.saleInfo([price, amount, expiry])
    console.log(amountof)
  }, [price, amount, expiry])

  useEffect(()=>{
    setAmountof(itemdata?.itembalance?.avail)
    console.log(itemdata)
  }, [itemdata])

  if (isMobile)
    return (
      <MfixedPriceBox>
        <li className="priceContainer">
          <div className="topBox">
            <strong className="title">Price</strong>
            <p className="explain">Items sold until canceled</p>
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder=""
            />
          </div>
        </li>

        <li className="endPriceBox">
          <div className="topBox">
            <div className="titleBox">
              <strong className="title">End price option</strong>

              <button
                className={toggleEndPrice ? "toggleBtn on" : "toggleBtn"}
                onClick={() => setToggleEndPrice(!toggleEndPrice)}
              >
                <span />
              </button>
            </div>

            <p className="explain">
              If you add the closing price, the sale or duration
              <br />
              The price will gradually decrease until it expires.
            </p>
          </div>

          {toggleEndPrice && (
            <div className="toggleBox">
              <div className="toggleBox_endPriceBox toggleBox_contBox">
                <div className="topBox">
                  <strong className="title">End price</strong>
                  <p className="explain">
                    The closing price is equal to the starting price or It
                    should be lower. prices are sequential lowers.
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="toggleBox_priceBox toggleBox_contBox">
                <div className="topBox">
                  <strong className="title">Price</strong>
                  <p className="explain">Items sold until canceled</p>
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
              </div>
            </div>
          )}
        </li>

        <li className="privateBox" style={{display: 'none'}}>
          <div className="topBox">
            <div className="titleBox">
              <strong className="title">Private option</strong>

              <button
                className={togglePrivate ? "toggleBtn on" : "toggleBtn"}
                onClick={() => setTogglePrivate(!togglePrivate)}
              >
                <span />
              </button>
            </div>

            <p className="explain">
              If set to private, other than the address entered below Products
              are not visible to users
            </p>
          </div>

          {togglePrivate && (
            <div className="toggleBox">
              <input
                value={privateOpt}
                onChange={(e) => setPrivateOpt(e.target.value)}
                placeholder="Buyer wallet address / example) 0x8df35..."
              />
            </div>
          )}
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
      </MfixedPriceBox>
    );
  else
    return (
      <PfixedPriceBox>
        <li className="priceContainer">
          <div className="leftBox">
            <strong className="title">Amount to sell</strong>
            <p className="explain">This allows sellers to choose amount of items to sell</p>
          </div>

          <div className="priceBox">
            <div className="tokenBox posBox">
              <button className="tokenBtn" onClick={() => {}}>
                <div className="value">
                  <strong>Out of {amountof}</strong>
                </div>
              </button>
            </div>

            <input
            type="number"
            disabled
              value={amount}
              onChange={(e) => {}}
              placeholder=""
            />
          </div>
        </li>

        <li className="priceContainer">
          <div className="leftBox">
            <strong className="title">Price</strong>
            <p className="explain">Items sold until canceled</p>
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
              value={(price)}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder=""
            />
          </div>
        </li>

        <li className="priceContainer">
          <div className="leftBox">
            <strong className="title">Expiry</strong>
            <p className="explain">This allows sellers to choose an expiry date</p>
          </div>

          <div className="priceBox">
          <input
            type="number"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder=""
            />
            <div className="tokenBox posBox">
              <button className="tokenBtn" onClick={() => {}}>
                <div className="value">
                  <strong>Days later</strong>
                </div>
              </button>
            </div>

            
          </div>
        </li>

        <li className="endPriceBox" style={{display:'none'}}>
          <div className="titleBox">
            <strong className="title">End price option</strong>

            <button
              className={toggleEndPrice ? "toggleBtn on" : "toggleBtn"}
              onClick={() => setToggleEndPrice(!toggleEndPrice)}
            >
              <span />
            </button>
          </div>

          <p className="explain">
            If you add the closing price, the sale or duration
            <br />
            The price will gradually decrease until it expires.
          </p>

          {toggleEndPrice && (
            <div className="toggleBox">
              <div className="toggleBox_endPriceBox toggleBox_contBox">
                <div className="leftBox">
                  <strong className="title">End price</strong>
                  <p className="explain">
                    The closing price is equal to the starting price or It
                    should be lower. prices are sequential lowers.
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
                  type="number"
                    value={parseInt(price)}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="toggleBox_priceBox toggleBox_contBox">
                <div className="leftBox">
                  <strong className="title">Price</strong>
                  <p className="explain">Items sold until canceled</p>
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
              </div>
            </div>
          )}
        </li>

        <li className="privateBox" style={{display: 'none'}}>
          <div className="titleBox">
            <strong className="title">Private option</strong>

            <button
              className={togglePrivate ? "toggleBtn on" : "toggleBtn"}
              onClick={() => setTogglePrivate(!togglePrivate)}
            >
              <span />
            </button>
          </div>

          <p className="explain">
            If set to private, other than the address entered below Products are
            not visible to users
          </p>

          {togglePrivate && (
            <div className="toggleBox">
              <input
                value={privateOpt}
                onChange={(e) => setPrivateOpt(e.target.value)}
                placeholder="Buyer wallet address / example) 0x8df35..."
              />
            </div>
          )}
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
      </PfixedPriceBox>
    );
}

const MfixedPriceBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 13.88vw;

  & > li {
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

    .toggleBtn {
      display: flex;
      align-items: center;
      padding: 0.55vw;
      width: 11.11vw;
      height: 6.11vw;
      border-radius: 5.55vw;
      background: #d9d9d9;
      transition: all 0.2s;

      span {
        display: inline-block;
        width: 5vw;
        height: 5vw;
        background: #fff;
        border-radius: 50%;
        transition: all 0.2s;
      }

      &.on {
        background: #4d4d4d;

        span {
          margin: 0 0 0 4.72vw;
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

    &.priceContainer {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;

      .topBox {
        display: flex;
        flex-direction: column;
        gap: 3.33vw;
      }
    }

    &.endPriceBox {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;
      padding: 0;

      & > .topBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
        padding: 0 5.55vw;
      }

      .toggleBox {
        background: #f6f6f6;

        .toggleBox_contBox {
          display: flex;
          flex-direction: column;
          gap: 5.55vw;
          padding: 5.55vw;

          &:nth-of-type(n + 2) {
            border-top: 1px solid #e8e8e8;
          }

          .topBox {
            display: flex;
            flex-direction: column;
            gap: 3.88vw;

            .explain {
              font-size: 3.88vw;
              line-height: 5.55vw;
            }
          }

          &.toggleBox_endPriceBox {
            padding-bottom: 6.66vw;
          }

          &.toggleBox_priceBox {
            padding-top: 6.66vw;

            .btnContainer {
              display: flex;
              gap: 2.22vw;

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
        }
      }
    }

    &.privateBox {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;

      & > .topBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
      }

      .toggleBox {
        display: flex;
        align-items: center;
        height: 13.33vw;
        border-radius: 2.22vw;
        background: #f6f6f6;

        input {
          flex: 1;
          height: 100%;
          padding: 0 2.77vw;
          font-size: 3.88vw;
          font-weight: 500;
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

const PfixedPriceBox = styled.ul`
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

    .toggleBtn {
      display: flex;
      padding: 3px;
      width: 50px;
      height: 26px;
      border-radius: 24px;
      background: #d9d9d9;
      transition: all 0.2s;

      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 50%;
        transition: all 0.2s;
      }

      &.on {
        background: #4d4d4d;

        span {
          margin: 0 0 0 24px;
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

    &.priceContainer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
    }

    &.endPriceBox {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .toggleBox {
        padding: 22px 30px;
        border-radius: 8px;
        background: #f6f6f6;

        .toggleBox_contBox {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          &:nth-of-type(n + 2) {
            border-top: 1px solid #e8e8e8;
          }

          .leftBox {
            display: flex;
            flex-direction: column;
            gap: 14px;
            width: 336px;

            .explain {
              font-size: 16px;
            }
          }

          &.toggleBox_endPriceBox {
            padding: 0 0 24px 0;
          }

          &.toggleBox_priceBox {
            padding: 16px 0 0 0;

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
        }
      }
    }

    &.privateBox {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .toggleBox {
        display: flex;
        align-items: center;
        height: 50px;
        border-radius: 8px;
        background: #f6f6f6;

        input {
          flex: 1;
          height: 100%;
          padding: 0 20px;
          font-size: 16px;
          font-weight: 500;
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

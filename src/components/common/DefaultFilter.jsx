import styled from "styled-components";
import {
  D_chainList,
  D_coinList,
  D_filterList,
  D_statusList,
} from "../../data/D_filter";

import {SET_PRICE_FILTER, SET_STATUS_FILTER} from "../../reducers/filterReducer"

import filter_icon from "../../img/sub/filter_icon.png";
import filter_close from "../../img/sub/filter_close.png";
import I_dnArrow from "../../img/icons/I_dnArrow.svg";
import loupe from "../../img/sub/loupe.png";
import { useState } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function DefaultFilter({ store, setStatusFilter, setPriceFilter, off, setFilterME, editFilterList }) {
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [priceVal, setPriceVal] = useState(false);
  const [itemFilter, setItemFilter] = useState("");
  const [coinFilter, setCoinFilter] = useState("");
  const {marketFilter} = useSelector((state) => state.filter);
  //setFilterME('asdadsad')

  useEffect(()=>{
  },[marketFilter])
  
  function handleStatus(key, val){
    dispatch({type: SET_STATUS_FILTER, payload: {key: key}});
  }
  function handlePriceChange(){
    dispatch({type: SET_PRICE_FILTER, payload: {min: min, max:max}});
  }
  useEffect(()=>{
    //var reg = /^-?\d+\.?\d*$/
    if (min>max || min==''||max==''){
      setPriceVal(false)
      return;
    }
    setPriceVal(true)

  },[min, max])
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MdefaultfilterBox>
        <article className="topBar">
          <strong className="title">Filter</strong>

          <button className="closeBtn" onClick={() => off()}>
            <img src={filter_close} alt="" />
          </button>
        </article>

        <article className="statusArticle">
          <details className="statusDetail">
            <summary className="filterSummary">
              <strong className="title">Status</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <ul className="contBox statusList">
              {D_statusList.map((cont, index) => (
                <li
                 key={index}
                // style={{ cursor: "pointer" }}
                // className={
                //   filterObj[`status${cont.value}`] === cont.key && "on"
                // }
                 onClick={() => handleStatus(cont.key)}
                >
                  {cont.key}
                </li>
              ))}
            </ul>
          </details>
        </article>

        <article className="priceArticle">
          <details className="priceDetail">
            <summary className="filterSummary">
              <strong className="title">Price</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <div className="contBox priceBox">
              <div className="selectBox">
                <p>United States Dollars (USD)</p>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </div>

              <div className="minMaxBox">
                <div className="minBox inputBox">
                  <input
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    placeholder="0.00"
                  />
                  <p className="unit">USD</p>
                </div>

                <p className="tilde">~</p>

                <div className="maxBox inputBox">
                  <input
                  type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    placeholder="0.00"
                  />
                  <p className="unit">USD</p>
                </div>
              </div>

              <button className="applyBtn" onClick={() => {}}>
                Apply
              </button>
            </div>
          </details>
        </article>

        <article className="itemsArticle">
          <details className="itemsDetail">
            <summary className="filterSummary">
              <strong className="title">Items</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <div className="contBox itemBox">
              <div className="filterBox">
                <img src={loupe} alt="" />
                <input
                  value={itemFilter}
                  onChange={(e) => setItemFilter(e.target.value)}
                  placeholder="Filter"
                />
              </div>

              <ul className="itemList">
                {D_filterList.map((cont, index) => (
                  <li key={index}>
                    <img src={cont.img} alt="" />
                    <p>{cont.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </article>

        <article className="chainsArticle">
          <details className="chainsDetail">
            <summary className="filterSummary">
              <strong className="title">Chains</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <ul className="contBox chainBox">
              {D_chainList.map((chain, index) => (
                <li key={index}>
                  <button className="chkBtn">
                    <span />
                  </button>

                  <span className="infoBox">
                    <img src={chain.img} alt="" />
                    <p>{chain.name}</p>
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </article>

        <article className="coinsArticle">
          <details className="coinsDetail">
            <summary className="filterSummary">
              <strong className="title">Sales Coin</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <ul className="contBox coinBox">
              <div className="filterBox">
                <img src={loupe} alt="" />
                <input
                  value={coinFilter}
                  onChange={(e) => setCoinFilter(e.target.value)}
                  placeholder="Filter"
                />
              </div>

              {D_coinList.map((coin, index) => (
                <li key={index}>
                  <button className="chkBtn">
                    <span />
                  </button>

                  <span className="infoBox">
                    <p>{coin}</p>
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </article>
      </MdefaultfilterBox>
    );
  else
    return (
      <PdefaultfilterBox>
        <article className="topBar">
          <div className="titleBox">
            <img src={filter_icon} alt="" />
            <strong className="title">Filter</strong>
          </div>

          <button className="closeBtn" onClick={() => off()}>
            <img src={filter_close} alt="" />
          </button>
        </article>

        <article className="statusArticle">
          <details className="statusDetail">
            <summary className="filterSummary">
              <strong className="title">Status</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <ul className="contBox statusList">
              {D_statusList.map((cont, index) => (
                <li
                className={marketFilter.status[cont.key]?"on":""}
                key={index}
                // style={{ cursor: "pointer" }}
                // className={
                //   filterObj[`status${cont.value}`] === cont.key && "on"
                // }
                onClick={() => handleStatus(cont.key)}
                >
                  {cont.key}
                </li>
              ))}
            </ul>
          </details>
        </article>

        <article className="priceArticle">
          <details className="priceDetail">
            <summary className="filterSummary">
              <strong className="title">Price</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <div className="contBox priceBox">
              <div className="selectBox">
                <p>KLAYTN (KLAY)</p>
                <img className="arwImg" src={I_dnArrow} alt="" />
              </div>

              <div className="minMaxBox">
                <div className="minBox inputBox">
                  <input
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    placeholder="0.00"
                  />
                  <p className="unit">KLAY</p>
                </div>

                <p className="tilde">~</p>

                <div className="maxBox inputBox">
                  <input
                    type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    placeholder="0.00"
                  />
                  <p className="unit">KLAY</p>
                </div>
              </div>
              <p className="disable" style={{display: priceVal?'none':''}}>Invalid price range</p>
              {priceVal?(<button className='applyBtn' onClick={() => {handlePriceChange()}}>Apply
              </button>):(<button className='disabledBtn' onClick={() => {}}>Apply</button>)}
              
                
            </div>
          </details>
        </article>

        <article className="itemsArticle" style={{display: 'none'}}>
          <details className="itemsDetail">
            <summary className="filterSummary">
              <strong className="title">Items</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <div className="contBox itemBox">
              <div className="filterBox">
                <img src={loupe} alt="" />
                <input
                  value={itemFilter}
                  onChange={(e) => setItemFilter(e.target.value)}
                  placeholder="Filter"
                />
              </div>

              <ul className="itemList" >
                {D_filterList.map((cont, index) => (
                  <li key={index}>
                    <img src={cont.img} alt="" />
                    <p>{cont.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </article>

        <article className="chainsArticle">
          <details className="chainsDetail">
            <summary className="filterSummary">
              <strong className="title">Chains</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <ul className="contBox chainBox">
              {D_chainList.map((chain, index) => (
                <li key={index}>
                  <button className="chkBtn">
                    <span />
                  </button>

                  <span className="infoBox">
                    <img src={chain.img} alt="" />
                    <p>{chain.name}</p>
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </article>

        <article className="coinsArticle">
          <details className="coinsDetail">
            <summary className="filterSummary">
              <strong className="title">Sales Coin</strong>

              <img className="arwImg" src={I_dnArrow} alt="" />
            </summary>

            <ul className="contBox coinBox">
              <div className="filterBox">
                <img src={loupe} alt="" />
                <input
                  value={coinFilter}
                  onChange={(e) => setCoinFilter(e.target.value)}
                  placeholder="Filter"
                />
              </div>

              {D_coinList.map((coin, index) => (
                <li key={index}>
                  <button className="chkBtn">
                    <span />
                  </button>

                  <span className="infoBox">
                    <p>{coin}</p>
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </article>
      </PdefaultfilterBox>
    );
}

const MdefaultfilterBox = styled.section`
  width: 100vw;
  box-sizing: content-box;
  background: #fff;
  top: 72px;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 15;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  article {
    padding: 0 5.55vw;

    &.topBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 15.55vw;

      .closeBtn {
        img {
          width: 5.55vw;
        }
      }
    }

    &:nth-of-type(n + 2) {
      border-top: 1px solid #d9d9d9;
    }
  }

  .title {
    font-size: 5vw;
    line-height: 5vw;
  }

  details {
    &[open] {
      summary {
        .arwImg {
          transform: rotate(180deg);
        }
      }
    }

    summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 15.55vw;
      cursor: pointer;

      .arwImg {
        width: 5.55vw;
      }
    }

    .contBox {
      padding: 5.55vw 0 8.33vw 0;
    }

    &.statusDetail {
      .contBox {
        display: flex;
        flex-wrap: wrap;
        gap: 2.77vw;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 43.05vw;
          height: 13.33vw;
          font-size: 4.44vw;
          font-weight: 500;
          border: solid 1px #e9e9e9;
          border-radius: 11.94vw;
          cursor: pointer;

          &.on {
            color: #fff;
            background: #000;
          }
        }
      }
    }

    &.priceDetail {
      .priceBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;

        .selectBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 13.33vw;
          padding: 0 4.44vw 0 3.88vw;
          border: 1px solid #e9e9e9;
          border-radius: 44px;

          p {
            font-size: 4.44vw;
            font-weight: 500;
          }

          .arwImg {
            width: 5.55vw;
          }
        }

        .minMaxBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.83vw;

          .tilde {
            font-size: 5.55vw;
          }

          .inputBox {
            display: flex;
            align-items: center;
            width: 41.66vw;
            height: 13.33vw;
            padding: 0 2.77vw 0 2.22vw;
            border: solid 1px #e9e9e9;
            border-radius: 12.22vw;

            input {
              font-size: 4.44vw;
              font-weight: 500;
              height: 100%;
            }

            .unit {
              font-size: 4.44vw;
              font-weight: 500;
            }
          }
        }

        .applyBtn {
          width: 100%;
          height: 13.33vw;
          margin: 3.88vw 0 0 0;
          font-size: 4.44vw;
          font-weight: 500;
          color: #fff;
          background: #000;
          border-radius: 12.22vw;
        }
        .disabledBtn {
          width: 100%;
          height: 13.33vw;
          margin: 3.88vw 0 0 0;
          font-size: 4.44vw;
          font-weight: 500;
          color: #fff;
          background: #D3D3D3;
          border-radius: 12.22vw;
        }
      }
    }

    &.itemsDetail {
      .itemBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;

        .filterBox {
          display: flex;
          align-items: center;
          gap: 3.33vw;
          height: 13.33vw;
          padding: 0 2.77vw;
          border-radius: 7.77vw;
          border: solid 1px #d9d9d9;

          img {
            width: 5.55vw;
          }

          input {
            flex: 1;
            height: 100%;
            font-size: 4.44vw;
          }
        }

        .itemList {
          height: 240px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 1.66vw;
            border: 0.55vw solid #f6f6f6;
          }

          &::-webkit-scrollbar-thumb {
            width: 1.66vw;
            background: #b7b7b7;
            border-radius: 1.66vw;
          }

          &::-webkit-scrollbar-track {
            background: #f4f2f2;
            border-radius: 1.66vw;
          }

          li {
            display: flex;
            align-items: center;
            gap: 2.77vw;
            height: 13.33vw;

            img {
              width: 8.33vw;
              height: 8.33vw;
              border-radius: 50%;
              object-fit: cover;
            }

            p {
              font-size: 4.44vw;
              font-weight: 500;
            }
          }
        }
      }
    }

    &.chainsDetail {
      .chainBox {
        padding: 0 0 2.77vw 0;

        li {
          display: flex;
          align-items: center;
          gap: 4.44vw;
          height: 13.33vw;

          .chkBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5vw;
            height: 5vw;
            border-radius: 50%;
            background: #000;

            span {
              width: 1.66vw;
              height: 1.66vw;
              border-radius: 50%;
              background: #fff;
            }
          }

          .infoBox {
            display: flex;
            align-items: center;
            gap: 3.33vw;

            img {
              width: 6.66vw;
            }
          }
        }
      }
    }

    &.coinsDetail {
      .coinBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
        padding: 5.55vw 0 0 0;

        .filterBox {
          display: flex;
          align-items: center;
          gap: 3.33vw;
          height: 13.33vw;
          padding: 0 2.77vw;
          border-radius: 7.77vw;
          border: solid 1px #d9d9d9;

          img {
            width: 5.55vw;
          }

          input {
            flex: 1;
            height: 100%;
            font-size: 4.44vw;
          }
        }

        li {
          display: flex;
          align-items: center;
          gap: 4.44vw;
          height: 13.33vw;

          .chkBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5vw;
            height: 5vw;
            border-radius: 50%;
            background: #000;

            span {
              width: 1.66vw;
              height: 1.66vw;
              border-radius: 50%;
              background: #fff;
            }
          }

          .infoBox {
            display: flex;
            align-items: center;
            font-size: 4.44vw;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

const PdefaultfilterBox = styled.section`
  width: 350px;
  box-sizing: content-box;
  background: #fff;
  border-right: 1px solid #d9d9d9;
  top: 163px;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 3;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .disable {
    color: #ff1c1c;
  }

  article {
    padding: 0 30px;

    &.topBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;

      .titleBox {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }

    &:nth-of-type(n + 2) {
      border-top: 1px solid #d9d9d9;
    }
  }

  .title {
    font-size: 22px;
    line-height: 22px;
  }

  details {
    &[open] {
      summary {
        .arwImg {
          transform: rotate(180deg);
        }
      }
    }

    summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      cursor: pointer;

      .arwImg {
        width: 20px;
      }
    }

    .contBox {
      padding: 20px 0 40px 0;
    }

    &.statusDetail {
      .contBox {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 140px;
          min-width: 140px;
          height: 48px;
          font-size: 18px;
          font-weight: 500;
          border: solid 1px #e9e9e9;
          border-radius: 43px;
          cursor: pointer;

          &.on {
            color: #fff;
            background: #000;
          }
        }
      }
    }

    &.priceDetail {
      .priceBox {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .selectBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 48px;
          padding: 0 14px 0 10px;
          border: 1px solid #e9e9e9;
          border-radius: 44px;

          p {
            font-size: 18px;
            font-weight: 500;
          }

          .arwImg {
            width: 20px;
          }
        }

        .minMaxBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;

          .tilde {
            font-size: 20px;
          }

          .inputBox {
            display: flex;
            align-items: center;
            width: 130px;
            height: 48px;
            padding: 0 8px 0 10px;
            border: solid 1px #e9e9e9;
            border-radius: 44px;

            input {
              font-size: 18px;
              font-weight: 500;
              height: 100%;
            }

            .unit {
              font-size: 16px;
              font-weight: 500;
            }
          }
        }

        .applyBtn {
          width: 100%;
          height: 48px;
          margin: 10px 0 0 0;
          font-size: 18px;
          font-weight: 500;
          color: #fff;
          background: #000;
          border-radius: 44px;
        }
        .disabledBtn {
          width: 100%;
          height: 48px;
          margin: 10px 0 0 0;
          font-size: 18px;
          font-weight: 500;
          color: #fff;
          border-radius: 44px;
          background: #D3D3D3;
          cursor: not-allowed;
        }
      }
    }

    &.itemsDetail {
      .itemBox {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .filterBox {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 48px;
          padding: 0 14px;
          border-radius: 28px;
          border: solid 1px #d9d9d9;

          img {
            width: 20px;
          }

          input {
            flex: 1;
            height: 100%;
            font-size: 18px;
          }
        }

        .itemList {
          height: 240px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 4px;
            border: 5px solid #f6f6f6;
          }

          &::-webkit-scrollbar-thumb {
            width: 4px;
            background: #b7b7b7;
            border-radius: 4px;
          }

          &::-webkit-scrollbar-track {
            background: #f4f2f2;
            border-radius: 4px;
          }

          li {
            display: flex;
            align-items: center;
            gap: 16px;
            height: 60px;

            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
            }

            p {
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
      }
    }

    &.chainsDetail {
      .chainBox {
        padding: 0 0 40px 0;

        li {
          display: flex;
          align-items: center;
          gap: 20px;
          height: 60px;

          .chkBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #000;

            span {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #fff;
            }
          }

          .infoBox {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: 500;

            img {
              width: 24px;
            }
          }
        }
      }
    }

    &.coinsDetail {
      .coinBox {
        padding: 20px 0 40px 0;

        .filterBox {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 48px;
          padding: 0 14px;
          border-radius: 28px;
          border: solid 1px #d9d9d9;

          img {
            width: 20px;
          }

          input {
            flex: 1;
            height: 100%;
            font-size: 18px;
          }
        }

        li {
          display: flex;
          align-items: center;
          gap: 20px;
          height: 60px;

          .chkBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #000;

            span {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #fff;
            }
          }

          .infoBox {
            display: flex;
            align-items: center;
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
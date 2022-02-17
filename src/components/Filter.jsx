import styled from "styled-components";
import {
  D_chainList,
  D_coinList,
  D_filterList,
  D_statusList,
} from "../data/D_filter";

import filter_icon from "../img/sub/filter_icon.png";
import filter_close from "../img/sub/filter_close.png";
import I_dnArrow from "../img/icons/I_dnArrow.svg";
import loupe from "../img/sub/loupe.png";
import { useState } from "react";

export default function Filter({off, filterObj, editFilterList}) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [itemFilter, setItemFilter] = useState("");
  const [coinFilter, setCoinFilter] = useState("");

  return (
    <FilterBox>
      <article className="topBar">
        <div className="titleBox">
          <img src={filter_icon} alt="" />
          <strong className="title">Filter</strong>
        </div>

        <button className="closeBtn" onClick={()=>off()}>
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
                // key={index}
                // style={{ cursor: "pointer" }}
                // className={
                //   filterObj[`status${cont.value}`] === cont.key && "on"
                // }
                // onClick={() => editFilterList(`status${cont.value}`, cont.key)}
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
              <li key={index}>{coin}</li>
            ))}
          </ul>
        </details>
      </article>
    </FilterBox>
  );
}

const FilterBox = styled.section`
  width: 350px;
  box-sizing: content-box;
  background: #fff;
  border-right: 1px solid #d9d9d9;
  top: 120px;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 3;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
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
            color: #bbb;
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
            color: #bbb;
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
            gap: 10px;

            img {
              width: 24px;
            }
          }
        }
      }
    }
  }
`;
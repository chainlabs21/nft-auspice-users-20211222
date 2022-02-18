import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../../../util/store";
import styled from "styled-components";

import I_x from "../../../img/icons/I_x.svg";
import I_dnArrow from "../../../img/icons/I_dnArrow.svg";
import img_process from "../../../img/sub/img_process.png";

import { LOGGER, getmyaddress } from "../../../util/common";
import {
  requesttransaction,
  getabistr_forfunction,
} from "../../../util/contract-calls";
import { ADDRESSES } from "../../../config/addresses";
import { useState } from "react";
import SetErrorBar from "../../../util/SetErrorBar";
import { messages } from "../../../config/messages";
import {
  TIME_PAGE_TRANSITION_DEF,
  NETTYPE,
  PAYMEANS_DEF,
} from "../../../config/configs";
import { applytoken } from "../../../util/rest";
import { API } from "../../../config/api";
import { D_instructionList } from "../../../data/D_saleItem";

export default function VerifyAccountPopup({ off, mindeposit }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  let [myaddress, setmyaddress] = useState(getmyaddress());

  let axios = applytoken();
  const onclick_register_proxy = (_) => {
    LOGGER("abc");
    let abistr = getabistr_forfunction({
      contractaddress: ADDRESSES.registerproxy,
      abikind: "REGISTER_PROXY",
      methodname: "register",
      aargs: [myaddress, mindeposit],
    });
    LOGGER("", abistr);
    requesttransaction({
      from: myaddress,
      to: ADDRESSES.registerproxy, // erc1155
      data: abistr,
      value: mindeposit,
    })
      .then((resp) => {
        LOGGER("", resp);
        let { transactionHash: txhash, status } = resp;
        if (status) {
          let reqbody = {
            username: myaddress,
            address: myaddress,
            feeamount: mindeposit,
            priceunit: PAYMEANS_DEF,
            nettype: NETTYPE,
          };
          axios
            .post(API.API_REPORT_TX_REGISTER_PROXY + `/${txhash}`, reqbody)
            .then((resp) => {
              LOGGER("", resp.data);
              let { status } = resp.data;
              if (status == "OK") {
                SetErrorBar(messages.MSG_DONE_REGISTERING);
              }
            });
        } else {
          SetErrorBar(messages.MSG_USER_DENIED_TX);
          setTimeout((_) => {
            navigate(-1);
          }, TIME_PAGE_TRANSITION_DEF);
          return;
        }
        SetErrorBar(messages.MSG_TX_REQUEST_SENT);
        off();
      })
      .catch((err) => {
        LOGGER(err);
        SetErrorBar(messages.MSG_USER_DENIED_TX);
        navigate(-1);
      });
  };

  if (isMobile)
    return (
      <MverifyAccountPopup>
        <article className="topBar">
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
          <strong className="title">
            Guidance on how to verify your account
          </strong>
        </article>

        <article className="contArea">
          <p className="explain">
            Please check the connected external wallet and complete the
            transaction. The contract approval process is performed only once
            per account for the first time.
          </p>

          <img className="processImg" src={img_process} alt="" />

          <details className="instructionDetail">
            <summary className="instructionSummary">
              <div className="summary_topBar">
                <strong className="title">Instruction</strong>

                <img className="arwImg" src={I_dnArrow} alt="" />
              </div>
              <p className="explain">
                When you sell items for the first time in your account, you need
                to go through the contract approval process.
              </p>
            </summary>

            <ul className="instructionList">
              {D_instructionList.map((cont, index) => (
                <li key={index}>{cont}</li>
              ))}
            </ul>
          </details>

          <p className="explain">
            Please wait until this process is complete. Depending on the
            Ethereum mainnet and gas price quotes, it can take from a few
            minutes to several hours.
          </p>
        </article>
      </MverifyAccountPopup>
    );
  else
    return (
      <PverifyAccountPopup>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">
            Guidance on how to verify your account
          </strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <p className="explain">
            Please check the connected external wallet and complete the
            transaction. The contract approval process is performed only once
            per account for the first time.
          </p>

          <details className="instructionDetail">
            <summary className="instructionSummary">
              <div className="textBox">
                <strong className="title">Instruction</strong>
                <p className="explain">
                  When you sell items for the first time in your account, you
                  need to go through the contract approval process.
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

          <img className="processImg" src={img_process} alt="" />

          <p className="explain">
            Please wait until this process is complete. Depending on the
            Ethereum mainnet and gas price quotes, it can take from a few
            minutes to several hours.
          </p>
        </article>
      </PverifyAccountPopup>
    );
}

const MverifyAccountPopup = styled.section`
  display: flex;
  flex-direction: column;
  width: 88.88vw;
  max-height: 90vh;
  border-radius: 2.77vw;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 6;
  transform: translate(-50%, -50%);
  overflow-y: scroll;

  .topBar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3.33vw;
    height: 25vw;
    min-height: 25vw;
    padding: 0 5vw;
    font-size: 4.44vw;

    .exitBtn {
      align-self: flex-end;
      img {
        width: 5.55vw;
      }
    }
  }

  .contArea {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5.55vw;
    padding: 5.55vw 2.77vw;
    border-top: 1px solid #e1e1e1;

    & > .explain {
      font-size: 3.88vw;
      font-weight: 500;
    }

    .processImg {
      width: 33.33vw;
      margin: 0 auto;
    }

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
        gap: 4.44vw;
        height: 38.88vw;
        padding: 5.55vw 2.77vw;

        .summary_topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title {
            font-size: 5vw;
          }

          .arwImg {
            width: 5vw;
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
        padding: 4.44vw 2.77vw;
        font-size: 3.88vw;
        font-weight: 500;
        border-top: 1px solid #d9d9d9;
      }
    }
  }
`;

const PverifyAccountPopup = styled.section`
  display: flex;
  flex-direction: column;
  width: 600px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 6;
  transform: translate(-50%, -50%);
  overflow: hidden;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    min-height: 72px;
    padding: 0 20px;
    font-size: 22px;

    .blank,
    img {
      width: 20px;
    }
  }

  .contArea {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 32px 30px;
    border-top: 1px solid #e1e1e1;

    & > .explain {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: -0.32px;
    }

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
          display: flex;
          flex-direction: column;
          gap: 4px;

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

    .processImg {
      width: 120px;
      margin: 40px auto;
    }
  }
`;

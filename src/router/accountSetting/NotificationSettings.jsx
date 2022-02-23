import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";
import collect_img from "../../img/sub/collect_img.png";
import collect_img2 from "../../img/sub/collect_img2.png";
import collect_img3 from "../../img/sub/collect_img3.png";
import collect_img4 from "../../img/sub/collect_img4.png";
import s2 from "../../img/sub/s2.png";
import s3 from "../../img/sub/s3.png";
import s4 from "../../img/sub/s4.png";
import s5 from "../../img/sub/s5.png";
import s9 from "../../img/sub/s9.png";
import s8 from "../../img/sub/s8.png";
import sample from "../../img/sub/sample.png";
import dollar from "../../img/sub/dollar.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";

import { API } from "../../config/api";
import { useState, useEffect } from "react";
import { LOGGER, STRINGER } from "../../util/common";
import { applytoken } from "../../util/rest";
import { getmyaddress, getrandomwords } from "../../util/common";
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../config/messages";
import { generateSlug } from "random-word-slugs";
import { strDot } from "../../util/Util";
import Settingssidepanel from "../../components/Settingssidepanel";
import DetailHeader from "../../components/header/DetailHeader";
import AccountLeftBar from "../../components/accountSetting/AccountLeftBar";
import DefaultHeader from "../../components/header/DefaultHeader";
import { D_toggleList } from "../../data/D_account";

export default function NotificationSettings({ store, setConnect }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [toggleLeftBar, setToggleLeftBar] = useState(!state?.toggle);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [toggleList, setToggleList] = useState(D_toggleList);
  const [tokenPrice, setTokenPrice] = useState("");
  const [exchangePrice, setExchangePrice] = useState("");

  function onClickToggleBtn(index) {
    let dataList = toggleList;

    dataList[index].toggle = !dataList[index].toggle;
    setToggleList([...dataList]);
  }

  if (isMobile)
    return (
      <>
        {toggleLeftBar ? (
          <AccountLeftBar off={setToggleLeftBar} />
        ) : (
          <DetailHeader
            title="Notification settings"
            off={() => setToggleLeftBar(true)}
          />
        )}

        <MnotificationSettings>
          <section className="innerBox">
            <p className="explain">
              Please select the type of notifications you want to receive from
              this account
            </p>

            <article className="contArea">
              <ul className="setList">
                {toggleList.map((cont, index) => (
                  <li className="toggleBox">
                    <div className="leftBox">
                      <strong className="optTitle">{cont.title}</strong>
                      <p className="explain">{cont.explain}</p>
                    </div>

                    <button
                      className={
                        toggleList[index].toggle ? "toggleBtn on" : "toggleBtn"
                      }
                      onClick={() => onClickToggleBtn(index)}
                    >
                      <span />
                    </button>
                  </li>
                ))}

                <li className="priceContainer">
                  <div className="leftBox">
                    <strong className="optTitle">Minimum bid criteria</strong>
                    <p className="explain">
                      You will only be notified when you receive an offer above
                      this ETH amount
                    </p>
                  </div>

                  <ul className="priceList">
                    <li>
                      <div className="key">
                        <img src={I_klaytn} alt="" />
                        <strong>KLAY</strong>
                      </div>

                      <input
                        className="value"
                        value={tokenPrice}
                        onChange={(e) => setTokenPrice(e.target.value)}
                        placeholder="0"
                      />
                    </li>
                    <span className="line" />
                    <li>
                      <div className="key">
                        <img src={dollar} alt="" />
                        <p>USD</p>
                      </div>

                      <input
                        className="value"
                        value={exchangePrice}
                        onChange={(e) => setExchangePrice(e.target.value)}
                        placeholder="0"
                      />
                    </li>
                  </ul>
                </li>
              </ul>

              <button className="saveBtn" onClick={() => {}}>
                Save
              </button>
            </article>
          </section>
        </MnotificationSettings>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <AccountLeftBar />

        <PnotificationSettings>
          <section className="innerBox">
            <div className="titleBox">
              <strong className="pageTitle">Notification settings</strong>
              <p className="explain">
                Please select the type of notifications you want to receive from
                this account
              </p>
            </div>

            <article className="contArea">
              <ul className="setList">
                {toggleList.map((cont, index) => (
                  <li className="toggleBox">
                    <div className="leftBox">
                      <strong className="optTitle">{cont.title}</strong>
                      <p className="explain">{cont.explain}</p>
                    </div>

                    <button
                      className={
                        toggleList[index].toggle ? "toggleBtn on" : "toggleBtn"
                      }
                      onClick={() => onClickToggleBtn(index)}
                    >
                      <span />
                    </button>
                  </li>
                ))}

                <li className="priceContainer">
                  <div className="leftBox">
                    <strong className="optTitle">Minimum bid criteria</strong>
                    <p className="explain">
                      You will only be notified when you receive an offer above
                      this ETH amount
                    </p>
                  </div>

                  <ul className="priceList">
                    <li>
                      <div className="key">
                        <img src={I_klaytn} alt="" />
                        <strong>KLAY</strong>
                      </div>

                      <input
                        className="value"
                        value={tokenPrice}
                        onChange={(e) => setTokenPrice(e.target.value)}
                        placeholder="0"
                      />
                    </li>
                    <span className="line" />
                    <li>
                      <div className="key">
                        <img src={dollar} alt="" />
                        <p>USD</p>
                      </div>

                      <input
                        className="value"
                        value={exchangePrice}
                        onChange={(e) => setExchangePrice(e.target.value)}
                        placeholder="0"
                      />
                    </li>
                  </ul>
                </li>
              </ul>

              <button className="saveBtn" onClick={() => {}}>
                Save
              </button>
            </article>
          </section>
        </PnotificationSettings>
      </>
    );
}

const MnotificationSettings = styled.div`
  padding: 72px 0 0 0;
  height: 100vh;
  overflow-y: scroll;

  .innerBox {
    display: flex;
    flex-direction: column;
    padding: 5.55vw;

    .explain {
      display: flex;
      align-items: center;
      height: 14.44vw;
    }

    .contArea {
      display: flex;
      flex-direction: column;

      .setList {
        display: flex;
        flex-direction: column;

        & > li {
          display: flex;
          padding: 8.33vw 0;
          border-top: 1px solid #d9d9d9;

          .leftBox {
            display: flex;
            flex-direction: column;
            gap: 2.22vw;

            .optTitle {
              font-size: 4.44vw;
            }

            .explain {
              font-size: 3.88vw;
            }
          }

          .toggleBtn {
            display: flex;
            align-items: center;
            padding: 0.55vw;
            width: 11.11vw;
            height: 6.11vw;
            border-radius: 4.44vw;
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
                margin: 0 0 0 5vw;
              }
            }
          }

          &.toggleBox {
            justify-content: space-between;
            gap: 10vw;

            .leftBox {
              flex: 1;
            }
          }

          &.priceContainer {
            flex-direction: column;
            justify-content: center;
            gap: 5.55vw;

            .priceList {
              display: flex;
              align-items: center;
              gap: 5.55vw;
              height: 13.33vw;
              padding: 0 3.88vw;
              border: 1px solid #d9d9d9;

              .line {
                width: 1px;
                height: 3.88vw;
                background: #d9d9d9;
              }

              li {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 3.88vw;
                overflow: hidden;

                .key {
                  display: flex;
                  align-items: center;
                  gap: 0.55vw;

                  img {
                    width: 7.22vw;
                    height: 7.22vw;
                    object-fit: contain;
                  }
                }

                .value {
                  flex: 1;
                  font-size: inherit;
                  text-align: end;
                }
              }
            }
          }
        }
      }

      .saveBtn {
        height: 15.55vw;
        margin: 5.55vw 0;
        border-radius: 7.77vw;
        font-size: 4.44vw;
        font-weight: 700;
        color: #fff;
        background: #222;
      }
    }
  }
`;

const PnotificationSettings = styled.div`
  padding: 120px 0 0 350px;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 50px;

    .titleBox {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .pageTitle {
        font-size: 30px;
      }

      .explain {
        font-size: 20px;
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 38px;
      max-width: 1200px;
      padding: 52px 40px;
      border-radius: 20px;
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);

      .setList {
        display: flex;
        flex-direction: column;

        & > li {
          display: flex;
          border-bottom: 1px solid #d9d9d9;

          .leftBox {
            display: flex;
            flex-direction: column;
            gap: 6px;

            .optTitle {
              font-size: 22px;
            }

            .explain {
              font-size: 16px;
            }
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

          &.toggleBox {
            justify-content: space-between;
            align-items: center;
            height: 128px;
          }

          &.priceContainer {
            flex-direction: column;
            justify-content: center;
            gap: 16px;
            height: 200px;

            .priceList {
              display: flex;
              align-items: center;
              gap: 18px;
              width: 350px;
              height: 50px;
              padding: 0 12px;
              border: 1px solid #d9d9d9;

              .line {
                width: 1px;
                height: 14px;
                background: #d9d9d9;
              }

              li {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16px;
                overflow: hidden;

                .key {
                  display: flex;
                  align-items: center;
                  gap: 2px;

                  img {
                    width: 26px;
                    height: 26px;
                    object-fit: contain;
                  }
                }

                .value {
                  flex: 1;
                  font-size: inherit;
                  text-align: end;
                }
              }
            }
          }
        }
      }

      .saveBtn {
        width: 176px;
        height: 56px;
        border-radius: 43px;
        font-size: 22px;
        font-weight: 500;
        color: #fff;
        background: #222;
      }
    }
  }
`;

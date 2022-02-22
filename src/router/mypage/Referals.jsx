import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
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
import click1 from "../../img/sub/click1.png";
import home_bg from "../../img/sub/home_bg.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_copyWhite from "../../img/icons/I_copyWhite.png";

import Myprofcommonheader from "../../components/Myprofcommonheader";
import { useEffect, useState } from "react";
import { applytoken } from "../../util/rest";
import { getmyaddress, LOGGER } from "../../util/common";
import { API } from "../../config/api";
import moment from "moment";
import { PAYMEANS_DEF } from "../../config/configs";
import DefaultHeader from "../../components/header/DefaultHeader";
import re from "../../img/sub/re.png";
import share from "../../img/sub/share.png";
import { D_categoryList } from "../../data/D_mypage";

export default function Referals() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  let [myaddress, setmyaddress] = useState(getmyaddress());
  let [list, setlist] = useState([]);
  let [priceklay, setpriceklay] = useState();
  /** 	useEffect(_=>{
		let {priceklay}=store
		if ( priceklay){}
		else {return }
		setpriceklay( priceklay )
	} , [ store.priceklay ])*/
  let axios = applytoken();

  useEffect((_) => {
    axios.get(`${API.API_TICKERS}/USDT`).then((resp) => {
      LOGGER("", resp.data);
      let { status, list } = resp.data;
      if (status == "OK") {
        setpriceklay(list[PAYMEANS_DEF]); // 'KLAY'
      }
    });
  }, []);

  useEffect(
    (_) => {
      if (myaddress) {
      } else {
        return;
      }
      axios
        .get(API.API_LOGFEEPAYS + `/receiver/${myaddress}/0/10/id/DESC`, {
          params: {
            itemdetail: 1,
            filterkey: "receiverrolestr",
            filterval: "REFERER",
          },
        })
        .then((resp) => {
          LOGGER("", resp.data);
          let { status, list } = resp.data;
          if (status == "OK") {
            setlist(list);
          }
        });
    },
    [myaddress]
  );

  if (isMobile)
    return (
      <>
        <Mreferals>
          <header className="myProfHeader">
            <div
              className="bg"
              style={{
                backgroundImage: `url(${home_bg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />

            <div className="contBox">
              <span className="profImg" />
              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={re} alt="" />
                </button>
                <button className="" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>

              <div className="infoBox">
                <strong className="title">Henry juniors' Items</strong>
                <p className="address">0x97bc...8cad2</p>
                <p className="introduce">
                  Henry is a mixed-media artist living in the Bay Area and users
                  a stream of consciousness approach to his work
                </p>
              </div>
            </div>
          </header>

          <section className="innerBox">
            <nav className="navBar">
              {D_categoryList.map((nav, index) => (
                <button
                  key={index}
                  className={nav.url === pathname && "on"}
                  onClick={() => navigate(nav.url)}
                >
                  {nav.text}
                </button>
              ))}
            </nav>

            <article className="contArea">
              <div className="explainContainer contContainer">
                <p className="pageTitle">Referals</p>

                <strong className="title">Auspice Friend Recommendation</strong>

                <p className="explain">
                  Share your referral link! When a new user who accesses this
                  link purchases a product,
                  <br />
                  an additional 1% of the sales amount is paid. Referral rewards
                  are paid in lump sum every month.
                  <br />
                  However, due to gas cost, only referrals exceeding 0.005 ETH
                  will be processed.
                </p>
              </div>

              <div className="linkContainer contContainer">
                <strong className="title">My Link</strong>

                <div className="linkBox">
                  <p className="address">
                    https://ausp.io/market/?ref=0x97b155a698d4bdec4c4bf3a92e9071190093cafb
                  </p>

                  <button className="copyBtn" onClick={() => {}}>
                    <p>Copy</p>
                    <img src={I_copyWhite} alt="" />
                  </button>
                </div>
              </div>

              <div className="listContainer contContainer">
                <strong className="title">Referral Sales History</strong>
                <div className="listBox">
                  <ul className="listHeader">
                    <li>Item</li>
                    <li>Price</li>
                    <li>Quantify</li>
                    <li>Seller</li>
                    <li>Time Sold</li>
                    <li>Payment Date</li>
                    <li>Payment</li>
                  </ul>

                  <ul className="list">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cont, index) => {
                      return (
                        <li>
                          <span>
                            <img className="profImg" />
                            <p>Summer Pool</p>
                          </span>

                          <span>
                            <img className="tokenImg" src={I_klaytn} />
                            <p className="price">0.010 KLAY ($30.11)</p>
                          </span>

                          <span>
                            <p>3</p>
                          </span>

                          <span>
                            <img className="profImg" />
                            <p>TIDREDQ349999999</p>
                          </span>

                          <span>
                            <p>2021.01.01</p>
                          </span>

                          <span>
                            <p>2021.06</p>
                          </span>
                          <span>
                            <p>0.0001 KLAY</p>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </Mreferals>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

        <Preferals>
          <header className="myProfHeader">
            <div
              className="bg"
              style={{
                backgroundImage: `url(${home_bg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />

            <div className="contBox">
              <span className="profImg" />
              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={re} alt="" />
                </button>
                <button className="" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>

              <div className="infoBox">
                <strong className="title">Henry juniors' Items</strong>
                <p className="address">0x97bc...8cad2</p>
                <p className="introduce">
                  Henry is a mixed-media artist living in the Bay Area and users
                  a stream of consciousness approach to his work
                </p>
              </div>
            </div>
          </header>

          <section className="innerBox">
            <nav className="navBar">
              {D_categoryList.map((nav, index) => (
                <button
                  key={index}
                  className={nav.url === pathname && "on"}
                  onClick={() => navigate(nav.url)}
                >
                  {nav.text}
                </button>
              ))}
            </nav>

            <article className="contArea">
              <div className="explainContainer contContainer">
                <p className="pageTitle">Referals</p>

                <strong className="title">Auspice Friend Recommendation</strong>

                <p className="explain">
                  Share your referral link! When a new user who accesses this
                  link purchases a product,
                  <br />
                  an additional 1% of the sales amount is paid. Referral rewards
                  are paid in lump sum every month.
                  <br />
                  However, due to gas cost, only referrals exceeding 0.005 ETH
                  will be processed.
                </p>
              </div>

              <div className="linkContainer contContainer">
                <strong className="title">My Link</strong>

                <div className="linkBox">
                  <p className="address">
                    https://ausp.io/market/?ref=0x97b155a698d4bdec4c4bf3a92e9071190093cafb
                  </p>

                  <button className="copyBtn" onClick={() => {}}>
                    <p>Copy</p>
                    <img src={I_copyWhite} alt="" />
                  </button>
                </div>
              </div>

              <div className="listContainer contContainer">
                <strong className="title">Referral Sales History</strong>
                <div className="listBox">
                  <ul className="listHeader">
                    <li>Item</li>
                    <li>Price</li>
                    <li>Quantify</li>
                    <li>Seller</li>
                    <li>Time Sold</li>
                    <li>Payment Date</li>
                    <li>Payment</li>
                  </ul>

                  <ul className="list">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cont, index) => {
                      return (
                        <li>
                          <span>
                            <img className="profImg" />
                            <p>Summer Pool</p>
                          </span>

                          <span>
                            <img className="tokenImg" src={I_klaytn} />
                            <p className="price">0.010 KLAY ($30.11)</p>
                          </span>

                          <span>
                            <p>3</p>
                          </span>

                          <span>
                            <img className="profImg" />
                            <p>TIDREDQ349999999</p>
                          </span>

                          <span>
                            <p>2021.01.01</p>
                          </span>

                          <span>
                            <p>2021.06</p>
                          </span>
                          <span>
                            <p>0.0001 KLAY</p>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </Preferals>
      </>
    );
}

const Mreferals = styled.div`
  padding: 72px 0 0 0;
  position: relative;

  .myProfHeader {
    .bg {
      height: 38.88vw;
    }

    .contBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0 5.55vw;

      .profImg {
        width: 27.77vw;
        height: 27.77vw;
        border-radius: 50%;
        background: #000;
        top: -13.88vw;
        position: absolute;
      }

      .btnBox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 16.11vw;
        gap: 1.11vw;

        button {
          img {
            width: 5.5vw;
          }
        }
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.77vw;
        padding: 3.33vw 0 0 0;

        .title {
          font-size: 6.11vw;
        }

        .address {
          font-size: 3.88vw;
          color: #1c7eff;
          font-weight: 500;
        }

        .introduce {
          font-size: 3.88vw;
          line-height: 5.55vw;
          letter-spacing: -0.32px;
          text-align: center;
        }
      }
    }
  }

  .innerBox {
    margin: 0 auto;

    .navBar {
      display: flex;
      flex-wrap: wrap;
      margin: 5.55vw;
      border: 2px solid #000;

      button {
        flex: 1;
        min-width: 50%;
        height: 13.33vw;
        font-size: 4.44vw;
        font-weight: 700;

        &.on {
          color: #fff;
          background: #000;
        }

        &:nth-of-type(n + 3) {
          border-top: 2px solid #000;
        }
        &:nth-of-type(2n) {
          border-left: 2px solid #000;
        }
      }
    }

    .contArea {
      padding: 16.66vw 5.55vw;
      border-top: 1px solid #e1e1e1;

      .contContainer {
        display: flex;
        flex-direction: column;

        .title {
          font-size: 5.55vw;
        }

        &.explainContainer {
          .pageTitle {
            font-size: 3.33vw;
            font-weight: 500;
            color: #899a9b;
          }

          .title {
            margin: 2.77vw 0 0 0;
          }

          .explain {
            margin: 5.55vw 0 0 0;
            font-size: 3.88vw;
            font-weight: 500;
            line-height: 5.55vw;
          }
        }

        &.linkContainer {
          gap: 5.55vw;

          .linkBox {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 2.77vw;


            .address {
              flex: 1;
              padding: 4.44vw 2.77vw;
              font-size: 3.88vw;
              font-weight: 500;
              background: #f6f6f6;
              border-radius: 2.22vw;
              word-break: break-all;
            }

            .copyBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 4.44vw;
              width: 31.11vw;
              height: 11.66vw;
              font-size: 4.88vw;
              color: #fff;
              background: #7a7a7a;
              border-radius: 5.55vw;

              img {
                width: 5.55vw;
              }
            }
          }
        }

        &.listContainer {
          gap: 5.55vw;

          .listBox {
            display: flex;
            flex-direction: column;
            font-weight: 500;
            border: 1px solid #000;
            border-radius: 5.55vw;
            overflow: scroll;

            .listHeader {
              display: flex;
              align-items: center;
              height: 10vw;
              padding: 0 1.11vw;
              font-size: 3.88vw;
              font-weight: 500;

              li {
              }
            }

            .list {
              padding: 0 1.11vw;
              font-size: 3.88vw;

              li {
                display: flex;
                align-items: center;
                height: 72px;
                border-top: 1px solid #d9d9d9;

                .profImg {
                  width: 6.66vw;
                  height: 6.66vw;
                  object-fit: cover;
                  background: #000;
                  border-radius: 50%;
                }

                .tokenImg {
                  width: 6.66vw;
                  height: 6.66vw;
                  object-fit: contain;
                }

                p {
                  flex: 1;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }

            .listHeader li,
            .list li span {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1.11vw;

              &:nth-of-type(1) {
                width: 30.55vw;
                min-width: 30.55vw;
                padding: 0 1.11vw;
              }

              &:nth-of-type(2) {
                width: 30.55vw;
                min-width: 30.55vw;
              }

              &:nth-of-type(3) {
                justify-content: center;
                width: 30.55vw;
                min-width: 30.55vw;
                text-align: center;
              }

              &:nth-of-type(4) {
                width: 30.55vw;
                min-width: 30.55vw;
                padding: 0 1.11vw;
              }

              &:nth-of-type(5) {
                justify-content: center;
                width: 30.55vw;
                min-width: 30.55vw;
                padding: 0 1.11vw;
                text-align: center;
              }

              &:nth-of-type(6) {
                justify-content: center;
                width: 30.55vw;
                min-width: 30.55vw;
                padding: 0 1.11vw;
                text-align: center;
              }

              &:nth-of-type(7) {
                justify-content: center;
                width: 30.55vw;
                min-width: 30.55vw;
                padding: 0 1.11vw;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
`;

const Preferals = styled.div`
  padding: 120px 0 0 0;
  position: relative;

  .myProfHeader {
    .bg {
      height: 320px;
    }

    .contBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      max-width: 1280px;
      margin: 0 auto;

      .profImg {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: #000;
        top: -70px;
        position: absolute;
      }

      .tokenImg {
        width: 26px;
        height: 26px;
        object-fit: contain;
      }

      .btnBox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 84px;
        gap: 20px;

        button {
          img {
            width: 24px;
          }
        }
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 36px 0 0 0;

        .title {
          font-size: 32px;
        }

        .address {
          font-size: 18px;
          color: #1c7eff;
          font-weight: 500;
        }

        .introduce {
          width: 460px;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.32px;
          text-align: center;
        }
      }
    }
  }

  .innerBox {
    max-width: 1280px;
    padding: 100px 0;
    margin: 0 auto;

    .navBar {
      display: flex;
      border: 2px solid #000;

      button {
        flex: 1;
        height: 56px;
        font-size: 18px;
        font-weight: 700;

        &.on {
          color: #fff;
          background: #000;
        }

        &:nth-of-type(n + 2) {
          border-left: 2px solid #000;
        }
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 50px;
      margin: 50px 0 0 0;

      .contContainer {
        display: flex;
        flex-direction: column;

        .title {
          font-size: 20px;
        }

        &.explainContainer {
          .pageTitle {
            font-size: 16px;
            color: #899a9b;
          }

          .title {
            margin: 16px 0 0 0;
          }

          .explain {
            margin: 20px 0 0 0;
            font-size: 16px;
            line-height: 30px;
          }
        }

        &.linkContainer {
          gap: 20px;

          .linkBox {
            display: flex;
            align-items: center;
            height: 72px;
            padding: 0 30px 0 20px;
            background: #f6f6f6;
            border-radius: 8px;

            .address {
              flex: 1;
              font-size: 18px;
              font-weight: 500;
            }

            .copyBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 16px;
              width: 110px;
              height: 42px;
              font-size: 16px;
              color: #fff;
              background: #7a7a7a;
              border-radius: 20px;

              img {
                width: 20px;
              }
            }
          }
        }

        &.listContainer {
          gap: 30px;

          .listBox {
            display: flex;
            flex-direction: column;
            font-weight: 500;
            border-radius: 20px;
            box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);

            .listHeader {
              display: flex;
              align-items: center;
              height: 56px;
              font-size: 18px;
              font-weight: 500;

              li {
              }
            }

            .list {
              font-size: 20px;

              li {
                display: flex;
                align-items: center;
                height: 72px;
                border-top: 1px solid #d9d9d9;

                .profImg {
                  width: 38px;
                  height: 38px;
                  object-fit: cover;
                  background: #000;
                  border-radius: 50%;
                }

                .tokenImg {
                  width: 26px;
                  height: 26px;
                  object-fit: contain;
                }

                p {
                  flex: 1;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }

            .listHeader li,
            .list li span {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 6px;

              &:nth-of-type(1) {
                width: 190px;
                padding: 0 16px;
              }

              &:nth-of-type(2) {
                width: 248px;
              }

              &:nth-of-type(3) {
                width: 116px;
                padding: 0 16px;
                text-align: center;
              }

              &:nth-of-type(4) {
                width: 182px;
                padding: 0 16px;
              }

              &:nth-of-type(5) {
                width: 182px;
                padding: 0 16px;
                text-align: center;
              }

              &:nth-of-type(6) {
                width: 182px;
                padding: 0 16px;
                text-align: center;
              }

              &:nth-of-type(7) {
                flex: 1;
                padding: 0 16px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
`;

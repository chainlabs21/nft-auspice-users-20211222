import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

import sample from "../../img/sub/sample.png";
import I_3dot from "../../img/icons/I_3dot.png";
import I_dnArrow from "../../img/icons/I_dnArrow.svg";
import I_x from "../../img/icons/I_x.svg";
import heart_off from "../../img/sub/heart_off.png";
import re from "../../img/sub/re.png";
import share from "../../img/sub/share.png";
import loupe_black from "../../img/sub/loupe_black.png";
import home_bg from "../../img/sub/home_bg.png";
import side_close from "../../img/sub/side_close.png";
import filter_icon2 from "../../img/sub/filter_icon2.png";
import I_klaytn from "../../img/sub/I_klaytn.svg";

import { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/header/DefaultHeader";
import PopupBg from "../../components/PopupBg";
import { D_categoryList } from "../../data/D_mypage";
import SelectPopup from "../../components/SelectPopup";
import { D_itemFilter, D_sortFilter } from "../../data/D_marketPlace";
import { Icons } from "react-toastify";
import MypageFilter from "../../components/mypage/mypageFilter";
import {strDot} from "../../util/Util"

export default function Offers() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {userData, walletAddress} = useSelector((state)=> state.user)

  const isMobile = useSelector((state) => state.common.isMobile);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [detailCategory, setDetailCategory] = useState(0);

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        {toggleFilter ? (
          <MypageFilter off={setToggleFilter} />
        ) : (
          <button
            className="filterBtn mo withBg"
            onClick={() => setToggleFilter(true)}
          >
            <p>Filter</p>
            <img src={filter_icon2} alt="" />
          </button>
        )}

        <Moffers>
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
            <img className="profImg" src={userData?.myinfo_maria?.profileimageurl}/>
              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={re} alt="" />
                </button>
                <button className="" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>

              <div className="infoBox">
                <strong className="title">{userData?.myinfo_maria?.nickname}'s Items</strong>
                <p className="address">{strDot(walletAddress, 5, 5)}</p>
                <p className="introduce">
                {userData?.myinfo_maria?.description}
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

            <article className="detailCategoryArea">
              <ul className="detailCategoryList">
                <li
                  className={detailCategory === 0 && "on"}
                  onClick={() => setDetailCategory(0)}
                >
                  Participation in auction
                </li>
                <li
                  className={detailCategory === 1 && "on"}
                  onClick={() => setDetailCategory(1)}
                >
                  Bid proposal
                </li>
              </ul>
            </article>

            <article className="selectedBox">
              <ul className="selectedList">
                <li className="resetBtn" onClick={() => {}}>
                  Filter reset
                </li>

                <li>
                  Klaytn
                  <img src={I_x} alt="" />
                </li>

                <li>
                  <span className="blank" />
                  KLAY
                  <img src={I_x} alt="" />
                </li>
                {/* {filterList.map((cont, index) => (
                  <li key={index} onClick={() => onclickFilterCancel(cont)}>
                    <span className="blank" />
                    {cont}
                    <img src={I_x} alt="" />
                  </li>
                ))} */}
              </ul>
            </article>

            <article className="listBox">
              <ul className="listHeader">
                <li>Item</li>
                <li>Price</li>
                <li>Quantify</li>
                <li>Seller</li>
                <li>Expiration</li>
                <li>State</li>
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
                        <p className="price">0.010</p>
                      </span>

                      <span>
                        <p>3</p>
                      </span>

                      <span>
                        <img className="profImg" />
                        <p>TIDREDQ349999999</p>
                      </span>

                      <span>
                        <p>3 days later</p>
                      </span>

                      <span>
                        <p>-</p>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          </section>
        </Moffers>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

        {toggleFilter ? (
          <MypageFilter off={setToggleFilter} />
        ) : (
          <button
            className="filterBtn pc withBg"
            onClick={() => setToggleFilter(true)}
          >
            <img src={side_close} alt="" />
          </button>
        )}

        <Poffers>
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
            <img className="profImg" src={userData?.myinfo_maria?.profileimageurl}/>
              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={re} alt="" />
                </button>
                <button className="" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>

              <div className="infoBox">
                <strong className="title">{userData?.myinfo_maria?.nickname}'s Items</strong>
                <p className="address">{strDot(walletAddress, 5, 5)}</p>
                <p className="introduce">
                {userData?.myinfo_maria?.description}
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

            <ul className="detailCategoryList">
              <li
                className={detailCategory === 0 && "on"}
                onClick={() => setDetailCategory(0)}
              >
                Participation in auction
              </li>
              <li
                className={detailCategory === 1 && "on"}
                onClick={() => setDetailCategory(1)}
              >
                Bid proposal
              </li>
            </ul>

            <article className="selectedBox">
              <ul className="selectedList">
                <li className="resetBtn" onClick={() => {}}>
                  Filter reset
                </li>

                <li>
                  Klaytn
                  <img src={I_x} alt="" />
                </li>

                <li>
                  <span className="blank" />
                  KLAY
                  <img src={I_x} alt="" />
                </li>
                {/* {filterList.map((cont, index) => (
                  <li key={index} onClick={() => onclickFilterCancel(cont)}>
                    <span className="blank" />
                    {cont}
                    <img src={I_x} alt="" />
                  </li>
                ))} */}
              </ul>
            </article>

            <article className="listBox">
              <ul className="listHeader">
                <li>Item</li>
                <li>Price</li>
                <li>Quantify</li>
                <li>Seller</li>
                <li>Expiration</li>
                <li>State</li>
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
                        <p>3 days later</p>
                      </span>

                      <span>
                        <p>-</p>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          </section>
        </Poffers>
      </>
    );
}

const Moffers = styled.div`
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

    .detailCategoryArea {
      padding: 8.33vw 5.55vw 0 5.55vw;
      border-top: 1px solid #e1e1e1;

      .detailCategoryList {
        display: flex;
        height: 13.33vw;
        font-size: 3.88vw;
        font-weight: 700;
        background: #f6f6f6;
        border-radius: 7.77vw;

        li {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          border-radius: 7.77vw;
          cursor: pointer;

          &.on {
            color: #fff;
            background: #000;
          }
        }
      }
    }

    .selectedBox {
      padding: 0 5.55vw;
      margin: 2.77vw 0 0 0;

      .selectedList {
        display: flex;
        flex-wrap: wrap;
        gap: 3.88vw 2.22vw;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.77vw;
          height: 11.66vw;
          padding: 0 5vw;
          font-size: 4.44vw;
          font-weight: 500;
          white-space: nowrap;
          border: solid 1px #d9d9d9;
          border-radius: 12.22vw;
          cursor: pointer;

          &.resetBtn {
            justify-content: center;
            color: #fff;
            background: #000;
            border: none;
          }

          .blank,
          img {
            width: 3.88vw;
          }
        }
      }
    }

    .listBox {
      display: flex;
      flex-direction: column;
      margin: 5.55vw;
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
          height: 13.33vw;
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
          width: 30.55vw;
          min-width: 30.55vw;
          padding: 0 1.11vw;
        }

        &:nth-of-type(6) {
          justify-content: center;
          width: 22.22vw;
          min-width: 22.22vw;
          text-align: center;
        }
      }
    }
  }
`;

const Poffers = styled.div`
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

    .selectedList {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 20px 0 0 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 168px;
        height: 56px;
        padding: 0 22px;
        font-size: 18px;
        font-weight: 500;
        border: solid 1px #d9d9d9;
        border-radius: 44px;
        cursor: pointer;

        &.resetBtn {
          justify-content: center;
          color: #fff;
          background: #000;
          border: none;
        }

        .blank,
        img {
          width: 14px;
        }
      }
    }

    .detailCategoryList {
      display: inline-flex;
      height: 56px;
      margin: 50px 0 0 0;
      border-radius: 28px;
      font-size: 18px;
      font-weight: 700;
      background: #f6f6f6;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 100%;
        border-radius: 28px;
        cursor: pointer;

        &.on {
          color: #fff;
          background: #000;
        }
      }
    }

    .listBox {
      display: flex;
      flex-direction: column;
      margin: 30px 0 0 0;
      font-weight: 500;
      border-radius: 20px;
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);

      .listHeader {
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 10px;
        font-size: 18px;
        font-weight: 500;

        li {
        }
      }

      .list {
        padding: 0 10px;
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
          width: 224px;
          padding: 0 16px;
        }

        &:nth-of-type(2) {
          width: 224px;
          padding: 0 10px 0 18px;
        }

        &:nth-of-type(3) {
          width: 224px;
          text-align: center;
        }

        &:nth-of-type(4) {
          width: 224px;
          padding: 0 16px;
        }

        &:nth-of-type(5) {
          justify-content: flex-start;
          width: 224px;
          padding: 0 42px;
        }

        &:nth-of-type(6) {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
`;

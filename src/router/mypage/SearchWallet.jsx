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

import { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/header/DefaultHeader";
import PopupBg from "../../components/PopupBg";
import { D_categoryList } from "../../data/D_mypage";
import SelectPopup from "../../components/SelectPopup";
import { D_itemFilter, D_sortFilter } from "../../data/D_marketPlace";
import Filter from "../../components/common/DefaultFilter";
import { strDot } from "../../util/Util";

export default function SearchWallet() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [popupIndex, setPopupIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const [sortPopup, setSortPopup] = useState(false);
  const [itemFilterPopup, setItemFilterPopup] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);

  const {userData, isloggedin, walletAddress} = useSelector((state) => state.user);

  function onClickMoreBtn(e, index) {
    e.stopPropagation();
    setPopupIndex(index);
  }
  useEffect(()=>{
    console.log(userData)
  },[])

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        <MsearchWallet>
          {toggleFilter ? (
            <Filter off={setToggleFilter} />
          ) : (
            <button
              className="filterBtn mo withBg"
              onClick={() => setToggleFilter(true)}
            >
              <p>Filter</p>
              <img src={filter_icon2} alt="" />
            </button>
          )}

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
                <p className="address">{{walletAddress}}</p>
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

            <article className="topBar">
              <div className="sortBox">
                <div className="posBox">
                  <button
                    className="selectBtn"
                    onClick={() => setItemFilterPopup(true)}
                  >
                    <p>Single Item</p>
                    <img src={I_dnArrow} alt="" />
                  </button>

                  {itemFilterPopup && (
                    <>
                      <SelectPopup
                        off={setItemFilterPopup}
                        contList={D_itemFilter}
                      />
                      <PopupBg off={setItemFilterPopup} />
                    </>
                  )}
                </div>

                <div className="posBox">
                  <button
                    className="selectBtn"
                    onClick={() => setSortPopup(true)}
                  >
                    <p>Latest</p>
                    <img src={I_dnArrow} alt="" />
                  </button>
                  {sortPopup && (
                    <>
                      <SelectPopup off={setSortPopup} contList={D_sortFilter} />
                      <PopupBg off={setSortPopup} />
                    </>
                  )}
                </div>
              </div>

              <div className="searchBox">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search items, collections, creators"
                />

                <img src={loupe_black} alt="" />
              </div>
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

            <article className="itemListBox">
              <ul className="itemsList">
                {[1, 2, 3, 4, 5].map((cont, index) => (
                  <li
                    key={index}
                    class="itemBox"
                    onClick={() => {}}
                    style={{
                      backgroundImage: `url(${sample})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="infoBox">
                      {popupIndex === index && (
                        <>
                          <ul className="morePopup">
                            <li>Sale</li>
                            <li>Hand Over</li>
                            <li>Edit</li>
                            <li>Collection Change</li>
                            <li>Unhide</li>
                          </ul>
                          <PopupBg off={setPopupIndex} />
                        </>
                      )}

                      <div className="topBar">
                        <button
                          className="likeBtn"
                          // onClick={(e) => onClickFavorBtn(e, cont.itemid)}
                        >
                          <img src={heart_off} alt="" />

                          <p>1,389</p>
                        </button>

                        <button
                          className="moreBtn"
                          onClick={(e) => onClickMoreBtn(e, index)}
                        >
                          <img src={I_3dot} alt="" />
                        </button>
                      </div>

                      <p className="nickname">Renoir</p>
                      <p className="title">Verger de pommiers</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </MsearchWallet>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

        <PsearchWallet style={{ padding: toggleFilter && "120px 0 0 350px" }}>
          {toggleFilter ? (
            <Filter off={setToggleFilter} />
          ) : (
            <button
              className="filterBtn pc withBg"
              onClick={() => setToggleFilter(true)}
            >
              <img src={side_close} alt="" />
            </button>
          )}

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
                <strong className="title">{userData.myinfo_maria.nickname}'s Items</strong>
                <p className="address">{strDot(walletAddress, 5, 5)}</p>
                <p className="introduce">
                  {userData.myinfo_maria.description}
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

            <article className="topBar">
              <div className="searchBox">
                <img src={loupe_black} alt="" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search items, collections, creators"
                />
              </div>

              <div className="sortBox">
                <div className="posBox">
                  <button
                    className="selectBtn"
                    onClick={() => setItemFilterPopup(true)}
                  >
                    <p>Single Item</p>
                    <img src={I_dnArrow} alt="" />
                  </button>

                  {itemFilterPopup && (
                    <>
                      <SelectPopup
                        off={setItemFilterPopup}
                        contList={D_itemFilter}
                      />
                      <PopupBg off={setItemFilterPopup} />
                    </>
                  )}
                </div>

                <div className="posBox">
                  <button
                    className="selectBtn"
                    onClick={() => setSortPopup(true)}
                  >
                    <p>Latest</p>
                    <img src={I_dnArrow} alt="" />
                  </button>
                  {sortPopup && (
                    <>
                      <SelectPopup off={setSortPopup} contList={D_sortFilter} />
                      <PopupBg off={setSortPopup} />
                    </>
                  )}
                </div>
              </div>
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

            <article className="itemListBox">
              <ul className="itemsList">
                {[1, 2, 3, 4, 5].map((cont, index) => (
                  <li
                    key={index}
                    class="itemBox"
                    onClick={() => {}}
                    style={{
                      backgroundImage: `url(${sample})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="infoBox">
                      {popupIndex === index && (
                        <>
                          <ul className="morePopup">
                            <li>Sale</li>
                            <li>Hand Over</li>
                            <li>Edit</li>
                            <li>Collection Change</li>
                            <li>Unhide</li>
                          </ul>
                          <PopupBg off={setPopupIndex} />
                        </>
                      )}

                      <div className="topBar">
                        <button
                          className="likeBtn"
                          // onClick={(e) => onClickFavorBtn(e, cont.itemid)}
                        >
                          <img src={heart_off} alt="" />

                          <p>1,389</p>
                        </button>

                        <button
                          className="moreBtn"
                          onClick={(e) => onClickMoreBtn(e, index)}
                        >
                          <img src={I_3dot} alt="" />
                        </button>
                      </div>

                      <p className="nickname">Renoir</p>
                      <p className="title">Verger de pommiers</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </PsearchWallet>
      </>
    );
}

const MsearchWallet = styled.div`
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

    & > .topBar {
      display: flex;
      flex-direction: column;
      gap: 2.77vw;
      padding: 5.55vw 5.55vw 0 5.55vw;
      border-top: 1px solid #e1e1e1;

      .searchBox {
        display: flex;
        align-items: center;
        gap: 2.22vw;
        height: 13.33vw;
        border: solid 1px #d9d9d9;
        border-radius: 7.77vw;
        padding: 0 4.44vw;

        img {
          width: 5.55vw;
        }

        input {
          flex: 1;
          font-size: 4.44vw;
        }
      }

      .sortBox {
        display: flex;
        gap: 2.22vw;

        .posBox {
          flex: 1;

          button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 13.33vw;
            padding: 0 5.55vw;
            font-size: 3.88vw;
            font-weight: 500;
            border: solid 1px #d9d9d9;
            border-radius: 6.66vw;

            img {
              width: 4.44vw;
            }
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

    .itemListBox {
      display: flex;
      flex-direction: column;
      margin: 8.33vw 0 0 0;

      .itemsList {
        display: flex;
        flex-direction: column;
        gap: 5.55vw;
        padding: 0 5.55vw;

        .itemBox {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          height: 126.11vw;
          color: #fff;
          border-radius: 5.55vw;
          overflow: hidden;
          cursor: pointer;
          position: relative;

          .infoBox {
            width: 100%;
            padding: 5.55vw;
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.3),
              rgba(84, 84, 84, 0.3)
            );

            .morePopup {
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.3),
                rgba(84, 84, 84, 0.3)
              );
              border-radius: 2.77vw;
              overflow: hidden;
              right: 2.77vw;
              bottom: 41.66vw;
              position: absolute;
              z-index: 6;

              li {
                display: flex;
                align-items: center;
                height: 8.88vw;
                padding: 0 5vw;
                font-size: 3.88vw;
                font-weight: 500;

                &:nth-of-type(n + 2) {
                  border-top: 1px solid rgba(255, 255, 255, 0.3);
                }

                &:hover {
                  color: #000;
                  background: #fff;
                }
              }
            }

            .topBar {
              display: flex;
              justify-content: space-between;
              align-items: center;

              img {
                width: 5.55vw;
              }

              .likeBtn {
                display: flex;
                align-items: center;
                gap: 3.33vw;
                font-size: 3.88vw;
                font-weight: 500;
                line-height: 3.88vw;
                color: #fff;
              }

              .bookmarkBtn {
              }
            }

            .title {
              margin: 0.55vw 0 0 0;
              font-size: 7.22vw;
              font-weight: 500;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .nickname {
              margin: 5vw 0 0 0;
              font-size: 5vw;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
`;

const PsearchWallet = styled.div`
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

    & > .topBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 50px 0 0 0;

      .searchBox {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 480px;
        height: 48px;
        border: solid 1px #d9d9d9;
        border-radius: 28px;
        padding: 0 25px;

        img {
          width: 20px;
        }

        input {
          flex: 1;
          font-size: 16px;
        }
      }

      .sortBox {
        display: flex;
        gap: 16px;

        button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 208px;
          height: 48px;
          padding: 0 20px;
          font-size: 18px;
          font-weight: 500;
          border: solid 1px #d9d9d9;
          border-radius: 24px;

          img {
            width: 20px;
          }
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
  }

  .itemListBox {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 30px 0 0 0;

    .itemsList {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      .itemBox {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        width: 308px;
        min-width: 308px;
        height: 404px;
        color: #fff;
        border-radius: 20px;
        overflow: hidden;
        cursor: pointer;
        position: relative;

        .infoBox {
          width: 100%;
          padding: 16px;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3),
            rgba(84, 84, 84, 0.3)
          );

          .morePopup {
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.3),
              rgba(84, 84, 84, 0.3)
            );
            border-radius: 10px;
            overflow: hidden;
            right: 10px;
            bottom: 126px;
            position: absolute;
            z-index: 6;

            li {
              display: flex;
              align-items: center;
              height: 32px;
              padding: 0 18px;
              font-size: 14px;
              font-weight: 500;

              &:nth-of-type(n + 2) {
                border-top: 1px solid rgba(255, 255, 255, 0.3);
              }

              &:hover {
                color: #000;
                background: #fff;
              }
            }
          }

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
              width: 20px;
            }

            .likeBtn {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 14px;
              font-weight: 500;
              line-height: 14px;
              color: #fff;
            }

            .bookmarkBtn {
            }
          }

          .title {
            margin: 10px 0 0 0;
            font-size: 22px;
            font-weight: 500;
            line-height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .nickname {
            margin: 4px 0 0 0;
            font-size: 14px;
            font-weight: 500;
          }

          .etcBox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 22px;
            margin: 12px 0 0 0;

            .time {
              font-size: 14px;
              font-weight: 500;
              color: #e5e5e5;
            }

            .priceBox {
              font-size: 18px;
            }
          }
        }
      }
    }
  }
`;

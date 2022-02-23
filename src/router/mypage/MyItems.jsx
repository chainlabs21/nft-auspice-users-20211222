import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

import sample from "../../img/sub/sample.png";
import I_3dot from "../../img/icons/I_3dot.png";

import { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/header/DefaultHeader";
import PopupBg from "../../components/PopupBg";
import { D_categoryList } from "../../data/D_item";

export default function MyItems() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [popupIndex, setPopupIndex] = useState(-1);

  function onClickMoreBtn(e, index) {
    e.stopPropagation();
    setPopupIndex(index);
  }

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        <MmyItemsBox>
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
              <div className="titleBox">
                <strong className="title">Add Collection</strong>
                <p className="explain">
                  After creating a collection, register a new NFT.
                  <br />
                  Organize your own gallery with different concepts for each
                  collection.
                </p>
              </div>

              <div className="btnBox">
                <button
                  className="createBtn"
                  onClick={() => navigate("/createitem")}
                >
                  Create a new items
                </button>
                <button
                  className="loadBtn"
                  onClick={() => navigate("/importcontract")}
                >
                  Load From Contract
                </button>
              </div>
            </article>

            <article className="itemListBox">
              <strong className="title">My Items</strong>

              <ul className="itemsList">
                {[1, 2, 3, 4, 5].map((cont, index) => (
                  <li key={index} class="swiperContBox" onClick={() => {}}>
                    <div
                      className="itemBox"
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
                              <li>Changing Information</li>
                              <li>Royalty</li>
                            </ul>
                            <PopupBg off={setPopupIndex} />
                          </>
                        )}

                        <div className="topBar">
                          <button
                            className="moreBtn"
                            onClick={(e) => onClickMoreBtn(e, index)}
                          >
                            <img src={I_3dot} alt="" />
                          </button>
                        </div>

                        <p className="title">Summer Pool</p>
                        <p className="nickname">David</p>

                        <div className="etcBox">
                          <p className="description">
                            This collection is a collection of 80
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bottomBar" onClick={() => {}}>
                      NFT {index + 1}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </MmyItemsBox>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <PmyItemsBox>
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
              <div className="titleBox">
                <strong className="title">Add Collection</strong>
                <p className="explain">
                  After creating a collection, register a new NFT.
                  <br />
                  Organize your own gallery with different concepts for each
                  collection.
                </p>
              </div>

              <div className="btnBox">
                <button
                  className="createBtn"
                  onClick={() => navigate("/createitem")}
                >
                  Create a new items
                </button>
                <button
                  className="loadBtn"
                  onClick={() => navigate("/importcontract")}
                >
                  Load From Contract
                </button>
              </div>
            </article>

            <article className="itemListBox">
              <strong className="title">My Items</strong>

              <ul className="itemsList">
                {[1, 2, 3, 4, 5].map((cont, index) => (
                  <li key={index} class="swiperContBox" onClick={() => {}}>
                    <div
                      className="itemBox"
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
                              <li>Changing Information</li>
                              <li>Royalty</li>
                            </ul>
                            <PopupBg off={setPopupIndex} />
                          </>
                        )}

                        <div className="topBar">
                          <button
                            className="moreBtn"
                            onClick={(e) => onClickMoreBtn(e, index)}
                          >
                            <img src={I_3dot} alt="" />
                          </button>
                        </div>

                        <p className="title">Summer Pool</p>
                        <p className="nickname">David</p>

                        <div className="etcBox">
                          <p className="description">
                            This collection is a collection of 80
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bottomBar" onClick={() => {}}>
                      NFT {index + 1}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </PmyItemsBox>
      </>
    );
}

const MmyItemsBox = styled.div`
  padding: 72px 0 0 0;

  .innerBox {
    padding: 7.77vw 0;
    margin: 0 auto;

    .navBar {
      display: flex;
      flex-wrap: wrap;
      border: 2px solid #000;
      margin: 0 5.55vw 8.33vw 5.55vw;

      button {
        width: 50%;
        height: 13.33vw;
        font-size: 3.88vw;
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
      gap: 8.33vw;
      padding: 8.33vw 5.55vw 0 5.55vw;
      border-top: 1px solid #e1e1e1;

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
        text-align: center;

        .title {
          font-size: 6.11vw;
          font-family: "Poppins", sans-serif;
        }

        .explain {
          font-size: 3.88vw;
          font-weight: 500;
          line-height: 5.55vw;
          color: #333;
        }
      }

      .btnBox {
        display: flex;
        flex-direction: column;
        gap: 2.77vw;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 13.33vw;
          border-radius: 12.22vw;
          font-size: 4.44vw;
          font-weight: 500;

          &.createBtn {
            color: #fff;
            background: #000;
          }

          &.loadBtn {
            border: solid 2px #000;
          }
        }
      }
    }

    .itemListBox {
      display: flex;
      flex-direction: column;
      gap: 8.33vw;
      margin: 13.88vw 5.55vw 0 5.55vw;

      .title {
        font-size: 6.66vw;
      }

      .itemsList {
        display: flex;
        flex-direction: column;
        gap: 5.55vw;

        & > li {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 144.44vw;
          color: #fff;
          border-radius: 5.55vw;
          box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
          overflow: hidden;
          cursor: pointer;

          .itemBox {
            flex: 1;
            display: flex;
            align-items: flex-end;

            .infoBox {
              width: 100%;
              padding: 4.44vw 5.55vw;
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.3),
                rgba(84, 84, 84, 0.3)
              );
              position: relative;

              .morePopup {
                background: linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 0.3),
                  rgba(84, 84, 84, 0.3)
                );
                border-radius: 2.77vw;
                overflow: hidden;
                right: 0;
                bottom: 43.33vw;
                position: absolute;
                z-index: 6;

                li {
                  display: flex;
                  align-items: center;
                  height: 8.88vw;
                  padding: 0 4.44vw;
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
                justify-content: flex-end;

                img {
                  width: 9.44vw;
                  height: 5.55vw;
                  object-fit: cover;
                }
              }

              .title {
                font-size: 7.22vw;
                font-weight: 500;
                line-height: 10vw;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              .nickname {
                margin: 1.11vw 0 0 0;
                font-size: 5vw;
                font-weight: 500;
              }

              .etcBox {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 4.44vw;
                margin: 3.33vw 0 0 0;

                .description {
                  font-size: 3.88vw;
                  font-weight: 500;
                  color: #e5e5e5;
                }
              }
            }
          }

          .bottomBar {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 17.77vw;
            font-size: 5vw;
            font-weight: 500;
            color: #fff;
            background: #222;
          }
        }
      }
    }
  }
`;

const PmyItemsBox = styled.div`
  padding: 120px 0 0 0;

  .innerBox {
    max-width: 1280px;
    padding: 90px 0;
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
      flex-direction: column;
      gap: 50px;
      margin: 90px 0 0 0;

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 30px;
        text-align: center;

        .title {
          font-size: 32px;
        }

        .explain {
          height: 48px;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
        }
      }

      .btnBox {
        display: flex;
        justify-content: center;
        gap: 20px;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 300px;
          height: 56px;
          border-radius: 60px;
          font-size: 22px;
          font-weight: 700;

          &.createBtn {
            color: #fff;
            background: #000;
          }

          &.loadBtn {
            border: solid 2px #000;
          }
        }
      }
    }

    .itemListBox {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin: 90px 0 0 0;

      .title {
        font-size: 22px;
      }

      .itemsList {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;

        & > li {
          display: flex;
          flex-direction: column;
          width: 308px;
          min-width: 308px;
          height: 500px;
          color: #fff;
          border-radius: 20px;
          box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
          overflow: hidden;
          cursor: pointer;

          .itemBox {
            flex: 1;
            display: flex;
            align-items: flex-end;

            .infoBox {
              width: 100%;
              padding: 16px 20px;
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.3),
                rgba(84, 84, 84, 0.3)
              );
              position: relative;

              .morePopup {
                background: linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 0.3),
                  rgba(84, 84, 84, 0.3)
                );
                border-radius: 10px;
                overflow: hidden;
                right: 0;
                bottom: 156px;
                position: absolute;
                z-index: 6;

                li {
                  display: flex;
                  align-items: center;
                  height: 32px;
                  padding: 0 16px;
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
                justify-content: flex-end;

                img {
                  width: 34px;
                  height: 20px;
                  object-fit: cover;
                }
              }

              .title {
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

                .description {
                  font-size: 14px;
                  font-weight: 500;
                  color: #e5e5e5;
                }
              }
            }
          }

          .bottomBar {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 64px;
            font-size: 22px;
            font-weight: 500;
            color: #fff;
            background: #222;
          }
        }
      }
    }
  }
`;

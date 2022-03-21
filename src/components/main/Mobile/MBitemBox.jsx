import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import home_bg from "../../../img/sub/home_bg.png";
import MBitemItems from "./MBitemItems";
import title from "../../../img/main/title.png";
import { useNavigate } from "react-router-dom";
import { getStyle, strDot } from "../../../util/Util";

import I_ltArw3BlackBtn from "../../../img/design/I_ltArw3BlackBtn.png";
import I_rtArw3BlackBtn from "../../../img/design/I_rtArw3BlackBtn.png";
//import UsersItems from "./UsersItems";
import SetErrorBar from "../../../util/SetErrorBar";

export default function BitemBox({ category }) {
  const {isloggedin} = useSelector((state)=>state.user)
  const navigate=useNavigate();
  const visualSwiperRef = useRef();
  const [items, setItems] = useState([]);
  const [visualSwiperIndex, setVisualSwiperIndex] = useState(0);
  useEffect(() => {
    console.log(category)
    setItems(category.itemsss);
  }, [category]);

  function onClickVisualSwiperBtn() {
    if (visualSwiperRef.current?.scrollTo) {
      if (visualSwiperIndex < visualSwiperRef.current.children.length - 1) {
        visualSwiperRef.current.style.transform = `translate3d(
          -${
            (visualSwiperRef.current.children[0].offsetWidth +
              getStyle(visualSwiperRef, "gap")) *
            (visualSwiperIndex + 1)
          }px,0,0
        )`;

        setVisualSwiperIndex(visualSwiperIndex + 1);
      } else {
        setVisualSwiperIndex(0);
        visualSwiperRef.current.style.transform = `translate3d(
          0,0,0
        )`;
      }
    }
  }
  return (
    <MBitemBox>
      <article className="bvisual">
      <div className="titleContainer">
                <div className="titleBox">
                  <img className="titleImg" src={title} />
                  <p className="explain">
                    Make money with NFTs that are easily issued and managed.
                    <br /> Only in your own NFT gallery
                  </p>
                </div>

                <div className="btnBox">
                  <button
                    className="navBtn"
                    onClick={() => navigate("/marketplace")}
                  >
                    NFT Navigation
                  </button>
                  <button
                    className="pubBtn"
                    onClick={() => navigate("/createitem")}
                  >
                    NFT Publication
                  </button>
                </div>
              </div>

        <div className="swiperContainer">
          <div className="swiperBox">
          
            <ul className="swiperList" ref={visualSwiperRef}>
              {items
                //.sort((a, b) => (a.createdat < b.createdat ? +1 : -1))
                .map((cont, index) => {
                  return (
                  <MBitemItems val={cont} key={index}/>
                )})}
            </ul>
          </div>

          <button className="nextBtn" onClick={onClickVisualSwiperBtn}>
            <img src={I_rtArw3BlackBtn} alt="" />
          </button>
        </div>
      </article>
    </MBitemBox>
  );
}
const MBitemBox = styled.div`

.bvisual {
  overflow:hidden;
      display: flex;
      flex-direction: column;
      gap: 7.22vw;

      .titleContainer {
        display: flex;
        flex-direction: column;
        gap: 7.22vw;

        .titleBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3.88vw;

          .titleImg {
            width: 72.77vw;
          }

          .explain {
            font-size: 3.33vw;
            font-weight: 500;
            line-height: 4.44vw;
            text-align: center;
          }
        }

        .btnBox {
          display: flex;
          justify-content: center;
          gap: 2.77vw;

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 41.66vw;
            height: 11.66vw;
            font-size: 4.44vw;
            font-weight: 700;
            border: solid 1px #000;
            border-radius: 16.66vw;

            &.navBtn {
            }

            &.pubBtn {
              color: #fff;
              background: #000;
            }
          }
        }
      }

      .swiperContainer {
        display: flex;
        align-items: center;
        position: relative;

        .swiperBox {
          display: flex;
          position: relative;

          .swiperList {
            display: flex;
            gap: 5.55vw;
            padding: 5.55vw;
            transition: all 0.8s;

            .swiperContBox {
              display: flex;
              flex-direction: column;
              width: 88.88vw;
              height: 158.33vw;
              border-radius: 5.55vw;
              overflow: hidden;
              box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);

              .itemImg {
                flex: 1;
              }

              .infoContainer {
                display: flex;
                flex-direction: column;
                gap: 10vw;
                height: 69.44vw;
                padding: 4.16vw;

                .titleBox {
                  display: flex;
                  flex-direction: column;
                  gap: 1.66vw;

                  * {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .title {
                    font-size: 6.66vw;
                    line-height: 9.16vw;
                  }

                  .creator {
                    font-size: 3.88vw;
                    line-height: 4.44vw;
                  }
                }

                .infoBox {
                  display: flex;
                  flex-direction: column;
                  gap: 7.22vw;

                  .infoList {
                    display: flex;
                    justify-content: space-between;

                    li {
                      display: flex;
                      flex-direction: column;
                      gap: 2.77vw;

                      .key {
                        font-size: 3.88vw;
                        line-height: 3.88vw;
                      }

                      .value {
                        display: flex;
                        align-items: flex-end;
                        gap: 2px;
                        font-size: 22px;
                        line-height: 7.77vw;
                        font-weight: 900;
                      }
                    }
                  }

                  .btnBox {
                    display: flex;
                    gap: 2.22vw;

                    button {
                      flex: 1;
                      height: 11.66vw;
                      font-size: 3.88vw;
                      font-weight: 500;
                      border-radius: 5.55vw;
                      border: solid 1px #000;

                      &.viewBtn {
                        color: #fff;
                        background: #000;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .nextBtn {
          position: absolute;
          right: 1.94vw;

          img {
            width: 10vw;
            height: 10vw;
            border-radius: 50%;
          }
        }
      }
    }

`;

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import home_bg from "../../img/sub/home_bg.png";
import BitemItems from "./BitemItems";
import title from "../../img/main/title.png";
import { useNavigate } from "react-router-dom";
import { getStyle, strDot } from "../../util/Util";

import I_ltArw3BlackBtn from "../../img/design/I_ltArw3BlackBtn.png";
import I_rtArw3BlackBtn from "../../img/design/I_rtArw3BlackBtn.png";
import UsersItems from "./UsersItems";
import SetErrorBar from "../../util/SetErrorBar";

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
  useEffect(() => {
    console.log("hi");
  }, []);

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
    <PBitemBox>
      <article className="vvisual">
        <div className="titleContainer">
          <div className="titleInnerBox">
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
                onClick={() => {
                  if (isloggedin) {
                    navigate("/createitem");
                  } else {
                    SetErrorBar("PLEASE LOG IN");
                  }
                }}
              >
                NFT Publication
              </button>
            </div>
          </div>
        </div>

        <div className="swiperContainer">
        <div className="gradientBox">
          <div className="activeGradient"></div>
        </div>
          <div className="swiperBox">
          
            <ul className="swiperList" ref={visualSwiperRef}>
              {items
                .sort((a, b) => (a.createdat < b.createdat ? +1 : -1))
                .map((cont, index) => {
                  return (
                  <BitemItems val={cont} key={index}/>
                )})}
            </ul>
          </div>

          <button className="nextBtn" onClick={onClickVisualSwiperBtn}>
            <img src={I_ltArw3BlackBtn} alt="" />
          </button>
        </div>
      </article>
    </PBitemBox>
  );
}
const PBitemBox = styled.div`
.vvisual {
      display: flex;
      align-items: flex-start;
      height: 606px;
      justify-content: space-between;
      

      .titleContainer {
        position: relative;
        
        flex:1;
        display: flex;
        justify-content: flex-end;
        max-width: 50%;
        height: inherit;
        padding: 100px 138px 0 0;
        background: #fff;
        
        //z-index: 2;

        .titleInnerBox {
          
          display: flex;
          flex-direction: column;
          gap: 70px;
          max-width: 486px;

          .titleBox {
            display: flex;
            flex-direction: column;
            gap: 32px;

            .titleImg {
              width: 100%;
            }

            .explain {
              font-size: 16px;
              font-weight: 500;
              line-height: 24px;
            }
          }

          .btnBox {
            display: flex;
            gap: 20px;

            button {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 66px;
              font-size: 22px;
              font-weight: 700;
              border: solid 2px #000;
              border-radius: 60px;

              &.navBtn {
              }

              &.pubBtn {
                color: #fff;
                background: #000;
              }
            }
          }
        }
      }
      .swiperContainer {
        //left: -670px;
        background-color: #fff;
        z-index:2;
        flex:1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        max-width: 50%;
        padding: 42px 0 42px 10px;

        .gradientBox{
          pointer-events: none;
            
          height: 600px;
          width: 800px;
          position: absolute;
          z-index: 3;

          .activeGradient{
            height: 600px;
          width: 100px;
          position: absolute;
          right: 0;
          background: linear-gradient(to left, rgba(255, 255,255, 1), rgba(0, 0, 0, 0));

          }
        }

        

        .swiperBox {
          width: 800px;
          //width:1200px;
          overflow: hidden;
          height: 600px;
          padding-left: 20px;
          padding-top: 20px;
          display: flex;
          position: relative;



          .swiperList {
            display: flex;
            gap: 20px;
            transition: all 0.8s;

            .swiperContBox {
              display: flex;
              width: 630px;
              min-width: 630px;
              height: 544px;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
              cursor: pointer;

              .itemImg {
                flex: 1;
              }

              .infoContainer {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 268px;
                padding: 30px 16px 20px 16px;

                .titleBox {
                  display: flex;
                  flex-direction: column;
                  gap: 12px;

                  * {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  .title {
                    font-size: 28px;
                    line-height: 35px;
                  }

                  .creator {
                    font-size: 16px;
                    line-height: 20px;
                  }
                }

                .infoBox {
                  display: flex;
                  flex-direction: column;
                  gap: 26px;

                  .infoList {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;

                    li {
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;

                      .key {
                        font-size: 14px;
                        line-height: 18px;
                        font-weight: 500;
                      }

                      .value {
                        display: flex;
                        align-items: flex-end;
                        gap: 2px;
                        font-size: 22px;
                        line-height: 22px;
                        font-weight: 900;

                        .unit {
                          font-size: 12px;
                          line-height: 16px;
                        }
                      }
                    }
                  }

                  .bottomBox {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;

                    .historyBox {
                      display: flex;
                      flex-direction: column;
                      gap: 8px;

                      .title {
                        font-size: 14px;
                      }

                      .scrollBox {
                        background: #f4f2f2;
                        border-radius: 8px;
                        padding: 10px 6px 10px 8px;

                        .historyList {
                          display: flex;
                          flex-direction: column;
                          gap: 12px;
                          height: 168px;
                          padding: 0 8px 0 0;
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
                            justify-content: space-between;
                            align-items: center;

                            .profBox {
                              display: flex;
                              align-items: center;
                              gap: 6px;

                              img {
                                width: 28px;
                                height: 28px;
                                object-fit: cover;
                                border-radius: 50%;
                                box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
                              }

                              strong {
                                font-size: 16px;
                              }
                            }
                          }
                        }
                      }
                    }

                    .btnBox {
                      display: flex;
                      gap: 10px;

                      button {
                        flex: 1;
                        height: 34px;
                        font-size: 14px;
                        font-weight: 700;
                        border: solid 1px #000;
                        border-radius: 8px;

                        &.bidBtn {
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
        }

        .nextBtn {
          position: absolute;
          left: -14px;
          z-index: 3;

          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
        }
      }
    }
`;

{
  /* <li key={index} className="swiperContBox">
<div
  className="bg"
  src={home_bg}
  style={{
    backgroundImage: `url(${home_bg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    background: "#ccc",
  }}
/>

<div className="infoContainer">
  <img
    className="profImg"
    src={cont.user.profileimageurl}
    style={{
      backgroundImage: `url(${cont.user.profileimageurl})`,

      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      background: "#f00",
    }}
  />

  <div className="infoBox">
    <strong className="store">{cont.user.nickname}</strong>
    <strong className="nickname">
      {strDot(5, 5, cont?.username)}
    </strong>
    <p className="description">
      {cont.user.description}
    </p>
  </div>
</div>
</li> */
}

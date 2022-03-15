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
      <article className="visual">
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
.visual {
      display: flex;
      align-items: flex-start;
      height: 606px;

      .titleContainer {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        max-width: 50%;
        height: inherit;
        padding: 100px 138px 0 0;
        background: #fff;
        z-index: 2;

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
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        max-width: 50%;
        padding: 42px 0 42px 10px;

        .nextBtn {
          position: absolute;
          left: -24px;
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

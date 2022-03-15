import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import home_bg from "../../img/sub/home_bg.png";
import SitemItems from "./SitemItems";

import I_ltArw3BlackBtn from "../../img/design/I_ltArw3BlackBtn.png";
import I_rtArw3BlackBtn from "../../img/design/I_rtArw3BlackBtn.png";
import UsersItems from "./UsersItems";

export default function SitemBox({ category }) {
  const itemSwiperRef = useRef();
  const [items, setItems] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  useEffect(() => {
    setItems(category.itemsss);
  }, [category]);
  useEffect(() => {
    console.log("hi");
  }, []);

  function onClickSwiperPreBtn(swiperRef, items, index, setIndex) {
    const wrapWidth = swiperRef.current.offsetWidth;
    const contWidth = swiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(items.length / itemNumByPage);
    console.log(index);

    if (index > 0) setIndex(index - 1);
    else setIndex(pageNum - 1);
  }

  function onClickSwiperNextBtn(swiperRef, items, index, setIndex) {
    const wrapWidth = swiperRef.current.offsetWidth;
    const contWidth = swiperRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(items.length / itemNumByPage);

    if (index < pageNum - 1) setIndex(index + 1);
    else setIndex(0);
  }

  return (
    <PSitemBox>
      <article className="newArticle swiperArticle contArticle">
        <strong className="title">NEW NFT Item</strong>

        <div className="swiperContainer">
          <div className="swiperBox">
            <ul className="swiperList" ref={itemSwiperRef}>
              {items
                //.filter((elem) => elem.url)
                .sort((a, b) => b.countfavors - a.countfavors)
                .map((cont, index) => {
                  return (
                  <SitemItems val={cont} key={index} />
                )})}
            </ul>
          </div>
        </div>
        <button
          className="preBtn pageBtn"
          onClick={() =>
            onClickSwiperPreBtn(
              itemSwiperRef,
              items,
              itemIndex,
              setItemIndex
            )
          }
        >
          <img src={I_ltArw3BlackBtn} alt="" />
        </button>
        <button
          className="nextBtn pageBtn"
          onClick={() =>
            onClickSwiperNextBtn(
              itemSwiperRef,
              items,
              itemIndex,
              setItemIndex
            )
          }
        >
          <img src={I_rtArw3BlackBtn} alt="" />
        </button>
      </article>
    </PSitemBox>
  );
}
const PSitemBox = styled.div`
  .collectionArticle {
    .swiperContainer {
      .swiperBox {
        .swiperList {
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

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import home_bg from "../../img/sub/home_bg.png";

import I_ltArw3BlackBtn from "../../img/design/I_ltArw3BlackBtn.png";
import I_rtArw3BlackBtn from "../../img/design/I_rtArw3BlackBtn.png";
import UsersItems from "./UsersItems";
import LinkItems from "./LinkItems"

export default function LinkBox({ category }) {
  const tipWrapRef = useRef();
  const [links, setLinks] = useState([]);
  const [collectionIndex, setCollectionIndex] = useState(0);
  useEffect(() => {
    setLinks(category.itemsss);
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
    <PLinkBox>
      <article className="tipArticle swiperArticle contArticle">
        <strong className="title">{category.name}</strong>

        <div className="swiperContainer">
          <div className="swiperBox">
            <ul className="swiperList" ref={tipWrapRef}>
              {links.map((cont, index) => (
                <LinkItems val={cont} key={index}/>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </PLinkBox>
  );
}
const PLinkBox = styled.div`
.tipArticle {
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

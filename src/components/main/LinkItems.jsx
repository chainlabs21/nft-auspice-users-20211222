import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { strDot } from "../../util/Util";
import users_list01 from "../../img/main/users_list01.png";
// import users_list02 from "../img/main/users_list02.png";
// import users_list03 from "../img/main/users_list03.png";
// import users_list04 from "../img/main/users_list04.png";

export default function UsersItems({ val, index }) {
  useEffect(()=>{console.log(val)},[val])
  const navigate = useNavigate();
  return (
    <PLinkItems>
      <li className="swiperContBox">
        <img src={users_list01} alt="" />
        <div className="infoBox">
          <p className="title">{val.title}</p>
          <p className="explain">{val.description}</p>
        </div>
      </li>
    </PLinkItems>
  );
}
const PLinkItems = styled.div`
  .swiperContBox {
    display: flex;
    flex-direction: column;
    height: 95vw;

    .infoBox {
      display: flex;
      flex-direction: column;
      gap: 2.22vw;
      width: 100%;
      height: 26.66vw;
      padding: 4.44vw;

      .title {
        font-size: 5.55vw;
        line-height: 6.66vw;
      }

      .explain {
        font-size: 3.88vw;
        line-height: 4.44vw;
        color: #555;
      }
    }
  }
`;

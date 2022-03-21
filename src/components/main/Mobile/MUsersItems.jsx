import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { strDot } from "../../../util/Util";

export default function UsersItems({ val, index }) {
  const navigate = useNavigate();
  return (
    <MUsersItems>
      <li
        className="swiperContBox"
        onClick={() => {
          navigate("/mypage/searchwallet/" + val.username);
        }}
      >
        <div
          className="bg"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            background: "#ccc",
          }}
        />

        <div className="infoContainer">
          <img
            className="profImg"
            src={val.user?.profileimageurl}
            style={{
              backgroundImage: `url(${val.user?.profileimageurl})`,

              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              //background: "#f00",
            }}
          />

          <div className="infoBox">
            <strong className="store">{val.user?.nickname}</strong>
            <strong className="nickname">{strDot(5, 5, val.username)}</strong>
            <p className="description">{val.user?.description}</p>
          </div>
        </div>
      </li>
    </MUsersItems>
  );
}
const MUsersItems = styled.div`
  .swiperContBox {
    height: 138.33vw;

    .bg {
      height: 83.33vw;
    }

    .infoContainer {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10.55vw 4.44vw 6.94vw 4.44vw;
      position: relative;

      .profImg {
        width: 12.22vw;
        height: 12.22vw;
        border-radius: 50%;
        top: -6.11vw;
        position: absolute;
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        text-align: center;

        .store {
          font-size: 4.44vw;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .nickname {
          margin: 2.22vw 0 0 0;
          font-size: 3.88vw;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .description {
          flex: 1;
          word-break: break-all;
          margin: 6.11vw 0 0 0;
          font-size: 3.33vw;
        }
      }
    }
  }
`;

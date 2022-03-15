import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { strDot } from '../../util/Util';

export default function UsersItems({val, index}) {
    const navigate = useNavigate();
  return (
    <PUsersItems>
      <li className="swiperContBox" onClick={()=>{navigate("/mypage/searchwallet/"+val.username)}}>
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
            src={val.user.profileimageurl}
            style={{
              backgroundImage: `url(${val.user.profileimageurl})`,

              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              //background: "#f00",
            }}
          />

          <div className="infoBox">
            <strong className="store">{val.user.nickname}</strong>
            <strong className="nickname">{strDot(5, 5, val.username)}</strong>
            <p className="description">{val.user.description}</p>
          </div>
        </div>
      </li>
    </PUsersItems>
  );
}
const PUsersItems = styled.div`
  .swiperContBox {
    height: 480px;

    .bg {
      height: 290px;
    }

    .infoContainer {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 15px 18px 15px;
      position: relative;

      .profImg {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        top: -33px;
        position: absolute;
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        text-align: center;

        .store {
          font-size: 22px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .nickname {
          margin: 4px 0 0 0;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .description {
          flex: 1;
          word-break: break-all;
          margin: 16px 0 0 0;
          font-size: 14px;
        }
      }
    }
  }
`;

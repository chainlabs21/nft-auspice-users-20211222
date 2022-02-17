import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../config/api";
import I_x from "../../img/icons/I_x.svg";

export default function ItemOwnerPopup({ off, itemid }) {
  const limit = 10000;

  //  const { itemId } = useParams();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [data, setData] = useState([]);

  const convertLongString = (startLength, endLength, str) => {
    if (!str) return;
    const head = str.substring(0, startLength);
    const spread = "......";
    const tail = str.substring(str.length - endLength, str.length);
    return head + spread + tail;
  };

  useEffect(() => {
    if (itemid) {
    } else {
      return;
    }
    axios
      .get(`${API.API_GET_OWNER_LIST}/${itemid}/0/${limit}/id/DESC`, {
        params: { userdetail: 1 },
      })
      .then((res) => {
        console.log("uZbHfdImsi", res.data);
        let { status, list } = res.data;
        if (status == "OK") {
          setData(list);
        }
      });
  }, [itemid]);

  if (isMobile)
    return (
      <MitemOwnerPopup>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Owner List</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <div className="contArea">
          <ul className="contList">
            {data.map((v, i) => (
              <li key={i}>
                <span className="profBox">
                  <span className="profImg" />

                  <div className="nameBox">
                    <strong className="nickname">{v.nickname}</strong>
                    <p className="address">
                      {convertLongString(5, 4, v.username)}
                    </p>
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </MitemOwnerPopup>
    );
  else
    return (
      <PitemOwnerPopup>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Owner List</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <div className="contArea">
          <ul className="contList">
            {data.map((v, i) => (
              <li key={i}>
                <span className="profBox">
                  <span className="profImg" />

                  <div className="nameBox">
                    <strong className="nickname">{v.nickname}</strong>
                    <p className="address">
                      {convertLongString(5, 4, v.username)}
                    </p>
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PitemOwnerPopup>
    );
}

const MitemOwnerPopup = styled.section`
  display: flex;
  flex-direction: column;
  width: 88.88vw;
  height: 127.77vw;
  padding: 0 1.11vw;
  border-radius: 5.55vw;
  background: #fff;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 6;
  transform: translate(-50%, -50%);
  overflow: hidden;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20vw;
    min-height: 20vw;
    padding: 0 6.66vw;
    font-size: 5.55vw;

    .blank,
    img {
      width: 6.66vw;
    }
  }

  .contArea {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 5.55vw 2.22vw 8.88vw 2.75vw;
    border-top: 1px solid #e1e1e1;

    .contList {
      flex: 1;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #222;
        border-radius: 4px;
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background-color: #d8d8d8;
        border-radius: 4px;
        border: 1px solid #fff;
      }

      li {
        display: flex;
        align-items: center;
        gap: 2.22vw;
        height: 15.55vw;
        padding: 0 4.44vw 0 0;

        .profBox {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 2.22vw;

          .profImg {
            width: 8.33vw;
            height: 8.33vw;
            border-radius: 50%;
            background: #000;
          }

          .nameBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .nickname {
              font-size: 4.44vw;
            }

            .address {
              font-size: 3.33vw;
              color: #b2b2b2;
            }
          }
        }

        .itemBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 22.22vw;
          height: 9.44vw;
          font-size: 3.88vw;
          font-weight: 500;
          color: #fff;
          background: #222;
          border-radius: 4.72vw;
        }
      }
    }
  }
`;

const PitemOwnerPopup = styled.section`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  border-radius: 20px;
  background: #fff;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 6;
  transform: translate(-50%, -50%);
  overflow: hidden;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    min-height: 72px;
    padding: 0 20px;
    font-size: 22px;

    .blank,
    img {
      width: 20px;
    }
  }

  .contArea {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 20px 20px 24px 20px;
    border-top: 1px solid #e1e1e1;

    .contList {
      flex: 1;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #222;
        border-radius: 4px;
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background-color: #d8d8d8;
        border-radius: 4px;
        border: 1px solid #fff;
      }

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 64px;
        padding: 0 20px 0 0;

        .profBox {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 14px;

          .profImg {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #000;
          }

          .nameBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .nickname {
              font-size: 18px;
            }

            .address {
              font-size: 14px;
              color: #b2b2b2;
            }
          }
        }

        .itemBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 34px;
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          background: #222;
          border-radius: 17px;
        }
      }
    }
  }
`;

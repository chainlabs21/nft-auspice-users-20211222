import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { strDot } from "../../../util/Util";
import moment from "moment";
import axios from "axios";
import { API } from "../../../config/api";
import { LOGGER, gettimestr, get_deltatime_str } from "../../../util/common";
import SetErrorBar from "../../../util/SetErrorBar";
import heart_off from "../../../img/sub/heart_off.png";
import heart_on from "../../../img/sub/heart_on.png";
import star_off from "../../../img/sub/star_off.png";
import star_on from "../../../img/sub/star_on.png";
import { useSelector } from "react-redux";

export default function SitemItems({ val, index }) {
  const navigate = useNavigate();
  const [ilikethisitem, setIlikethisitem] = useState(false);
  const { isloggedin } = useSelector((state) => state.user);
  useEffect(() => {
    if (isloggedin) {
      axios.get(`${API.API_GET_I_LIKE}/${val.itemid}`).then((resp) => {
        let { status } = resp.data;
        if (status === 1) {
          setIlikethisitem(true);
        } else {
          setIlikethisitem(false);
        }
      });
    }
  }, []);

  function onClickFavorBtn(e, itemid) {
    e.stopPropagation();
    LOGGER("CodOU75E5r");
    axios.post(`${API.API_TOGGLE_FAVOR}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, respdata, message } = resp.data;

      if (status === "OK") {
        axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
          LOGGER("JN8wsASyiL", resp.data);
          let { status, list } = resp.data;
          if (status === "OK") {
            //setlist_trenditems(list);
          }
        });

        axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
          LOGGER("JBwpoHdvFv", resp.data);
          let { status, list } = resp.data;
          if (status === "OK") {
            //setlist_newitems(list);
          }
        });
      } else if (message === "PLEASE-LOGIN") {
        SetErrorBar("로그인을 해주세요");
      }
    });
  }

  function onClickBookMarkBtn(e, itemid) {
    e.preventDefault();

    axios.post(`${API.API_TOGGLE_BOOKMARK}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, message } = resp.data;
      if (status === "OK") {
        if (status === "OK") {
          axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
            LOGGER("JN8wsASyiL", resp.data);
            let { status, list } = resp.data;
            if (status === "OK") {
              //setlist_trenditems(list);
            }
          });

          axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
            LOGGER("JBwpoHdvFv", resp.data);
            let { status, list } = resp.data;
            if (status === "OK") {
              //setlist_newitems(list);
            }
          });
        } else if (message === "PLEASE-LOGIN") {
          SetErrorBar("로그인을 해주세요");
        }
      }
    });
  }

  return (
    <MSitemItems>
      <li
        key={index}
        className="swiperContBox"
        onClick={() => navigate(`/singleitem?itemid=${val.itemid}`)}
      >
        {val.item.typestr == "image" && (
          <img className="imageBox" src={val.item.url} />
        )}
        {val.item.typestr == "video" && (
          <video className="imageBox">
            <source src={val.item.url} />
          </video>
        )}
        <div className="infoBox">
          <div className="topBar">
            <button
              className="likeBtn"
              onClick={(e) => onClickFavorBtn(e, val.itemid)}
            >
              <img src={ilikethisitem ? heart_on : heart_off} alt="" />

              <p>{val.item.countfavors}</p>
            </button>

            <button
              className="bookmarkBtn"
              onClick={(e) => onClickBookMarkBtn(e, val.itemid)}
            >
              <img src={val.ididbookmark ? star_on : star_off} alt="" />
            </button>
          </div>

          <p className="title">{val.item.titlename}</p>
          <p className="nickname">
            {val.item.author_info ? val.item.author_info.nickname : "-"}
          </p>

          <div className="etcBox">
            <p className="time">
              {moment.unix(val.minpriceorder?.expiry).fromNow() ||
                get_deltatime_str(val.minpriceorder?.expiry)}
            </p>

            <strong className="priceBox">{val.askpricestats?.min} KLAY</strong>
          </div>
        </div>
      </li>
    </MSitemItems>
  );
}
const MSitemItems = styled.div`
  .swiperContBox {
   display: flex;
    
    flex-direction: row;
    align-items: flex-end;
    height: 125.55vw;
    color: #fff;
    position: relative;
    //overflow: hidden;

    .imageBox {
                  position: absolute;
                  top: 0;
                  left: 0;
                  object-fit: cover;
                  height: 100%;
                  width: 100%;
                }
    

    .infoBox {
      z-index: 5;
      width: 100%;
      padding: 4.44vw 5.55vw;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(84, 84, 84, 0.3)
      );

      .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 5.55vw;
        }

        .likeBtn {
          display: flex;
          align-items: center;
          gap: 3.33vw;
          font-size: 3.88vw;
          font-weight: 500;
          line-height: 3.88vw;
          color: #fff;
        }

        .bookmarkBtn {
        }
      }

      .title {
        margin: 4.44vw 0 0 0;
        font-size: 22px;
        font-weight: 7.22vw;
        line-height: 10vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .nickname {
        margin: 0.83vw 0 0 0;
        font-size: 5vw;
        font-weight: 500;
      }

      .etcBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 22px;
        margin: 12px 0 0 0;

        .time {
          font-size: 3.88vw;
          font-weight: 500;
          color: #e5e5e5;
        }

        .priceBox {
          font-size: 5vw;
          font-weight: 700;
        }
      }
    }
  }
`;

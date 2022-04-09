import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

import heart_off from "../../img/sub/heart_off.png";
import heart_on from "../../img/sub/heart_on.png";

import moment from 'moment';
import { useEffect, useRef, useState } from "react";


import { strDot } from "../../util/Util";
import { putCommaAtPrice } from "../../util/Util";
import axios from "axios";
import { LOGGER, get_deltatime_str } from "../../util/common";
import { API } from "../../config/api";
import SetErrorBar from "../../util/SetErrorBar";

export default function Marketitembox({ address, cont, index }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [popupIndex, setPopupIndex] = useState(-1);
  const [isOwner, setIsOwner] = useState(false);
  const [ilikethisitem, setIlikethisitem] = useState(false);
  const [totalFavors, setTotalFavors] = useState(cont.item?.countfavors)

  const { userData, isloggedin, walletAddress } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    countfavors();
    if(isloggedin){doilike();}
  }, []);

  useEffect(() => {
    countfavors();
    if(isloggedin){doilike();}
  }, [cont]);

  function countfavors(itemid){
    axios.get(`${API.API_COUNT_FAVOR}/${cont.item.itemid}`)
    .then((resp)=>{
      console.log(resp.data.respdata)
      setTotalFavors(resp.data.respdata)
    })
  }

  function doilike(itemid) {
    if (isloggedin) {
      axios.get(`${API.API_GET_I_LIKE}/${cont.item.itemid}`).then((resp) => {
        let { status, respdata } = resp.data;
        //console.log(resp.data)
        if (status === 1) {
          setIlikethisitem(true);
        } else {
          setIlikethisitem(false);
        }
      });
    }
  }

  function onClickMoreBtn(e, index) {
    e.stopPropagation();
    setPopupIndex(index);
  }

  function onClickFavorBtn(e, itemid) {
    if(!isloggedin){SetErrorBar("로그인을 해주세요"); return;}

    e.stopPropagation();
    LOGGER("CodOU75E5r");
    axios.post(`${API.API_TOGGLE_FAVOR}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, respdata, message } = resp.data;

      if (status === "OK") {
        countfavors();
        if (respdata === 1) {
          setIlikethisitem(true);
        } else {
          setIlikethisitem(false);
        }
      
        
      } else if (message === "PLEASE-LOGIN") {
        //SetErrorBar("로그인을 해주세요");
      }
    });
  }

  if (isMobile)
    return (
      <MMarketitem>
        <li
          key={index}
          className="itemBox"
          onClick={() => navigate(`/singleitem?itemid=${cont.item.itemid}`)}
        >
          {cont.item.typestr == "image" && (
            <img className="imageBox" src={cont.item?.url} />
          )}
          {cont.item.typestr == "video" && (
            <video className="imageBox">
              <source src={cont.item?.url} />
            </video>
          )}
          <div className="infoBox">
            <div className="topBar">
              <button
                className="likeBtn"
                // onClick={(e) => onClickFavorBtn(e, cont.itemid)}
              >
                <img src={ilikethisitem ? heart_on : heart_off} alt="" />

                <p>{totalFavors}</p>
              </button>

              {/* <button
                        className="bookmarkBtn"
                        // onClick={(e) => onClickBookMarkBtn(e, cont.itemid)}
                      >
                        <img src={cont.ididbookmark ? star_on : star_off} alt="" />
                      </button> */}
            </div>

            <p className="title">{cont.item?.titlename}</p>
            <p className="nickname">{cont.author?.nickname}</p>

            <div className="etcBox">
              <p className="time">
                {moment.unix(cont.minpriceorder?.expiry).fromNow() ||
                  get_deltatime_str(cont.minpriceorder?.expiry)}
              </p>

              <strong className="priceBox">
                {putCommaAtPrice(cont.askpricestats?.min)} KLAY
              </strong>
            </div>
          </div>
        </li>
      </MMarketitem>
    );
  else
    return (
      <PMarketitem>
        <li
          key={index}
          className="itemBox"
          onClick={() => navigate(`/singleitem?itemid=${cont.item.itemid}`)}
        >
          {cont.item.typestr == "image" && (
            <img className="imageBox" src={cont.item?.url} />
          )}
          {cont.item.typestr == "video" && (
            <video className="imageBox">
              <source src={cont.item?.url} />
            </video>
          )}
          <div className="infoBox">
            <div className="topBar">
              <button
                className="likeBtn"
                onClick={(e) => onClickFavorBtn(e, cont.item.itemid)}
              >
                <img src={ilikethisitem ? heart_on : heart_off} alt="" />

                <p>{totalFavors}</p>
              </button>

              {/* <button
                        className="bookmarkBtn"
                         onClick={(e) => onClickBookMarkBtn(e, cont.item.itemid)}
                      >
                        <img src={cont.ididbookmark ? star_on : star_off} alt="" />
                      </button> */}
            </div>
            <p className="title">{cont.item?.titlename}</p>
            <p className="nickname">{cont.author?.nickname}</p>

            <div className="etcBox">
              <p className="time">
                {cont.minpriceorder?(moment.unix(cont.minpriceorder?.expiry).fromNow() ||
                  get_deltatime_str(cont.minpriceorder?.expiry)):'Not on sale'}
              </p>

              <strong className="priceBox">
                {cont.minpriceorder?(putCommaAtPrice(cont.askpricestats?.min)):'-'} KLAY
              </strong>
            </div>
          </div>
        </li>
      </PMarketitem>
    );
}

const MMarketitem = styled.div`
  .itemBox {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 126.11vw;
    color: #fff;
    border-radius: 5.55vw;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    .imageBox {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    .infoBox {
      z-index: 9;
      width: 100%;
      padding: 5.55vw;
      -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(84, 84, 84, 0.3)
      );

      .morePopup {
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.3),
          rgba(84, 84, 84, 0.3)
        );
        border-radius: 2.77vw;
        overflow: hidden;
        right: 2.77vw;
        bottom: 41.66vw;
        position: absolute;
        z-index: 6;

        li {
          display: flex;
          align-items: center;
          height: 8.88vw;
          padding: 0 5vw;
          font-size: 3.88vw;
          font-weight: 500;

          &:nth-of-type(n + 2) {
            border-top: 1px solid rgba(255, 255, 255, 0.3);
          }

          &:hover {
            color: #000;
            background: #fff;
          }
        }
      }

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
        margin: 0.55vw 0 0 0;
        font-size: 7.22vw;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .nickname {
        margin: 5vw 0 0 0;
        font-size: 5vw;
        font-weight: 500;
      }
    }
  }
`;

const PMarketitem = styled.div`
  position: relative;
  .itemBox {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 308px;
    min-width: 308px;
    height: 404px;
    color: #fff;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    .imageBox {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    .infoBox {
      z-index: 9;
      width: 100%;
      padding: 16px;
      -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(84, 84, 84, 0.3)
      );

      .morePopup {
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.3),
          rgba(84, 84, 84, 0.3)
        );
        border-radius: 10px;
        overflow: hidden;
        right: 10px;
        bottom: 126px;
        position: absolute;
        z-index: 6;

        li {
          display: flex;
          align-items: center;
          height: 32px;
          padding: 0 18px;
          font-size: 14px;
          font-weight: 500;

          &:nth-of-type(n + 2) {
            border-top: 1px solid rgba(255, 255, 255, 0.3);
          }

          &:hover {
            color: #000;
            background: #fff;
          }
        }
      }

      .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 20px;
        }

        .likeBtn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          line-height: 14px;
          color: #fff;
        }

        .bookmarkBtn {
        }
      }

      .title {
        margin: 10px 0 0 0;
        font-size: 22px;
        font-weight: 500;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .nickname {
        margin: 4px 0 0 0;
        font-size: 14px;
        font-weight: 500;
      }

      .etcBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 22px;
        margin: 12px 0 0 0;

        .time {
          font-size: 14px;
          font-weight: 500;
          color: #e5e5e5;
        }

        .priceBox {
          font-size: 18px;
        }
      }
    }
  }
`;

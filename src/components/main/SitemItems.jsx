import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { strDot } from "../../util/Util";
import moment from "moment";
import axios from "axios";
import {API} from "../../config/api"
import { LOGGER, gettimestr, get_deltatime_str } from "../../util/common";
import SetErrorBar from "../../util/SetErrorBar";
import heart_off from "../../img/sub/heart_off.png";
import heart_on from "../../img/sub/heart_on.png";
import star_off from "../../img/sub/star_off.png";
import star_on from "../../img/sub/star_on.png";
import { useSelector } from "react-redux";

export default function SitemItems({ val, index }) {
  const navigate = useNavigate();
  const [ilikethisitem, setIlikethisitem] = useState(false)
  const {isloggedin}=useSelector((state)=>state.user)
  const [totalFavors, setTotalFavors]=useState(val.item.countfavors)
  useEffect(()=>{
    if (isloggedin){
    axios.get(`${API.API_GET_I_LIKE}/${val.itemid}`).then((resp)=>{
      let {status} = resp.data
      if (status===1){
        setIlikethisitem(true)
      }else{
        setIlikethisitem(false)
      }
    })
  }
  }, [])

  function countfavors(){
    axios.get(`${API.API_COUNT_FAVOR}/${val.itemid}`)
    .then((resp)=>{
      setTotalFavors(resp.data.respdata)
    })
  }


  function onClickFavorBtn(e, itemid) {
    if(!isloggedin){SetErrorBar("로그인을 해주세요"); return;}
    e.stopPropagation();
    LOGGER("CodOU75E5r");
    axios.post(`${API.API_TOGGLE_FAVOR}/${itemid}`).then((resp) => {
      LOGGER("", resp.data);
      let { status, respdata, message } = resp.data;

      if (status === "OK") {
        countfavors()
        if (respdata===1){
          setIlikethisitem(true)
        }else{
          setIlikethisitem(false)
        }
        console.log(resp.data)
      } else if (message === "PLEASE-LOGIN") {
        SetErrorBar("로그인을 해주세요");
      }
    });
  }


  // function onClickBookMarkBtn(e, itemid) {
  //   e.preventDefault();

  //   axios.post(`${API.API_TOGGLE_BOOKMARK}/${itemid}`).then((resp) => {
  //     LOGGER("", resp.data);
  //     let { status, message } = resp.data;
  //     if (status === "OK") {
  //       if (status === "OK") {
  //         axios.get(`${API.API_MAIN_TREND_ITEMS}`).then((resp) => {
  //           LOGGER("JN8wsASyiL", resp.data);
  //           let { status, list } = resp.data;
  //           if (status === "OK") {
  //             //setlist_trenditems(list);
  //           }
  //         });

  //         axios.get(`${API.API_MAIN_NEW_ITEMS}`).then((resp) => {
  //           LOGGER("JBwpoHdvFv", resp.data);
  //           let { status, list } = resp.data;
  //           if (status === "OK") {
  //             //setlist_newitems(list);
  //           }
  //         });
  //       } else if (message === "PLEASE-LOGIN") {
  //         SetErrorBar("로그인을 해주세요");
  //       }
  //     }
  //   });
  // }

  return (
    <PSitemItems>
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

              <p>{totalFavors}</p>
            </button>

            {/* <button
              className="bookmarkBtn"
              onClick={(e) => onClickBookMarkBtn(e, val.itemid)}
            >
              <img src={val.ididbookmark ? star_on : star_off} alt="" />
            </button> */}
          </div>

          <p className="title">{val.item.titlename}</p>
          <p className="nickname">{val.item.author_info?val.item.author_info.nickname:"-"}</p>

          <div className="etcBox">
            <p className="time">
              {moment.unix(val.minpriceorder?.expiry).fromNow() ||
                get_deltatime_str(val.minpriceorder?.expiry)}
            </p>

            <strong className="priceBox">{val.askpricestats?.min} KLAY</strong>
          </div>
        </div>
      </li>
    </PSitemItems>
  );
}
const PSitemItems = styled.div`
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

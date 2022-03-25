import { useNavigate, useParams } from "react-router";
import { useLocation, useHistory, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useState, useEffect, useLayoutEffect } from "react";
import I_lArrow from "../../img/icons/I_lArrow.svg";
import I_leArrow from "../../img/icons/I_leArrow.svg";
import I_klaytn from "../../img/sub/I_klaytn.svg";
import I_dnArrow from "../../img/icons/I_dnArrow.svg";
import moment from "moment";
import { API } from "../../config/api";
import { putCommaAtPrice } from "../../util/Util";
import { applytoken } from "../../util/rest";
import { get_deltatime_str, LOGGER } from "../../util/common";
import { PAYMEANS_DEF } from "../../config/configs";
import { useSelector, useDispatch } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import Filter from "../../components/common/DefaultFilter";
import Pagination from "../../components/support/Pagination";
import {
  RESET_FILTER,
  SET_CATEGORY,
  SET_STATUS_FILTER,
  SET_SEARCH,
} from "../../reducers/filterReducer";
import {
  D_categoryList,
  D_itemFilter,
  D_sortFilter,
} from "../../data/D_marketPlace";
import { D_SStatusList } from "../../data/D_filter";
import SelectPopup from "../../components/SelectPopup";
import PopupBg from "../../components/PopupBg";
import Marketitembox from "../../components/market/Marketitembox";

import axios from "axios";
const D_Category = ["제목", "본문"];
export default function Notice(props) {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [totalNotice, setTotalNotice] = useState(100);
  
  const [totalPage, setTotalPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(5);
  const [searchKey, setSearchKey] = useState("");
  const [announces, setAnnounces] = useState([]);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [selected, setSelected] = useState(0);



  useEffect(() => {
    axios.get(`${API.API_GET_ANNOUNCES}`).then((resp) => {
      console.log(resp);
      let { rows, count } = resp.data.list;
      setTotalPage(Math.ceil(count/10))
      setTotalNotice(count)
      if (rows) {
        setAnnounces(rows);
      }
    });
  }, []);

  if (isMobile)
    return (
      <>
        <DefaultHeader />
        <Mannouncements></Mannouncements>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <Pannouncements>
          <section className="popupBox">
            <strong className="title">공지사항</strong>
            <p className="subtitle">
              아이템버스에서 전하는 새로운 소식을 확인하세요.
            </p>
            <div className="midHeader">
              <p className="description">
                전체 <span className="highlighted"> {totalNotice}</span>건의
                게시물이 있습니다. (
                <span className="highlighted">{currentPage}</span>/{totalPage})
              </p>

              <div className="posBox">
                <button
                  className="selectBtn"
                  onClick={() => setCategoryPopup(true)}
                >
                  <p>{D_Category[selected]}</p>
                  <img src={I_dnArrow} alt="" />
                </button>
                {categoryPopup && (
                  <>
                    <SelectPopup
                      off={setCategoryPopup}
                      contList={D_Category}
                      selectCont={setSelected}
                    />
                    <PopupBg off={setCategoryPopup} />
                  </>
                )}
              </div>

              <div className="searchBox">
                <input
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="contentBody">
              <ul className="listHeader">
                <li>No</li>
                <li>제목</li>
                <li>등록일</li>
              </ul>
              <ul className="list">
                {announces.map((v, i) => {
                  if(currentPage*10>i && i>=(currentPage-1)*10)
                  return (
                    <li key={i}>
                      <span>{v.category == "COMMON" ? "공지" : i+1}</span>
                      <span
                        onClick={() => {
                          navigate(`/Notice/${v.id}`);
                        }}
                      >
                        {v.title}
                      </span>
                      <span>{moment(v.createdat).format("YYYY-MM-DD")}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Pagination totalPage={totalPage} currentPage={setCurrentPage}/>
            {/* <ul className="Pagination">
              <li className="img leArrw">
                <img src={I_leArrow} />
              </li>
              <li className="img lArrw">
                <img src={I_lArrow} />
              </li>
              {[1, 2, 3, 4, 5].map((v, i) => {
                return <li className={currentPage == v ? "on" : ""}>{v}</li>;
              })}
              <li className="img rArrw">
                <img className="flip" src={I_lArrow} />
              </li>
              <li className="img reArrw">
                <img className="flip" src={I_leArrow} />
              </li>
            </ul> */}
          </section>
        </Pannouncements>
      </>
    );
}

const Mannouncements = styled.div``;

const Pannouncements = styled.div`
  padding-top: 150px;
  display: flex;
  justify-content: center;
  //align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  //background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  .popupBox {
    //margin-top: 120px;
    display: flex;
    flex-direction: column;
    width: 1024px;
    //min-height: 80vh;
    height: 1000px;
    //max-height: 1000px;
    padding: 60px 35px 64px 35px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    .title {
      font-size: 22px;
      color: #000000;
      font-weight: bold;
    }
    .subtitle {
      font-size: 18px;
      color: #000000;
      margin-top: 10px;
      font-weight: 500;
    }
    .midHeader {
      display: flex;
      justify-content: flex-start;
      margin-top: 25px;
      height: 48px;
      vertical-align: middle;
      .description {
        display: flex;
        flex: 1;
        line-height: 48px;
        vertical-align: middle;
        font-size: 16px;
        font-weight: 500;
      }
      p {
        .highlighted {
          color: #1c7eff;
        }
      }
      .posBox {
        display: flex;
        //gap: 16px;
        flex: 0;
        justify-content: flex-end;

        button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 146px;
          height: 48px;
          padding: 0 20px;
          font-size: 18px;
          font-weight: 500;
          border: solid 1px #d9d9d9;
          border-radius: 8px;

          img {
            width: 20px;
          }
        }
      }

      .searchBox {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        max-width: 283px;

        //border: solid 1px #d9d9d9;
        
        //overflow: auto;
        

        input {
          //overflow: auto;
          width: 273px;
          height: 50px;
          padding: 0 12px;
          font-size: 16px;
          //text-align: end;
          background: #fff;
          border: 1px solid #d9d9d9;
          border-radius: 8px;
        }
      }
    }
    .contentBody {
      padding-top: 32px;
      
      height: 100%;

      .listHeader {
        display: flex;
        align-items: center;
        height: 54px;
        padding: 0 6px 0 6px;

        li {
          font-size: 16px;
          font-weight: bold;
        }
      }

      .list {
        border-bottom: 1px solid #000;

        //height: 100%;

        overflow: hidden;
        padding: 0 6px 0 6px;
        font-size: 16px;
        font-weight: 500;
        //overflow-y: scroll;
        

        li {
          display: flex;
          align-items: center;
          height: 56px;
          border-top: 1px solid #000;
          overflow: hidden;
        }
        li + li {
          border-top: 1px solid #e5e5e5;
        }
      }

      .listHeader li,
      .list li span {
        &:nth-of-type(1) {
          display: flex;
          //flex: 1;
          justify-content: center;
          width: 50px;
          margin: 18px 18px 18px 0px;
        }

        &:nth-of-type(2) {
          padding: 18px 18px 18px 18px;
          display: flex;
          flex: 1;
          cursor: pointer;
        }

        &:nth-of-type(3) {
          display: flex;
          width: 140px;
          justify-content: center;
        }
      }
    }
    .Pagination {
      text-align: center;
      margin-top: 55px;
      .on {
        color: #000;
      }
      li:hover {
        color: #2A2727;
      }
      li {
        cursor: pointer;
        line-height: 32px;
        vertical-align: middle;
        flex-direction: row;
        align-items: center;
        color: #cecdcd;
        display: inline;
        font-size: 16px;
        font-weight: normal;
        .flip{
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        }
        img{
          line-height: 32px;
        vertical-align: middle;
        }
      }
      li + li {
        margin-left: 22px;
      }
      .img + .img {
        margin-left: 8px;
      }

    }
  }
`;

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
export default function SupportTicket(props) {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [tickets, setTickets] = useState([1]);
  const [countTickets, setCountTickets] = useState(1)
  
  const [totalPage, setTotalPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(5);
  const [searchKey, setSearchKey] = useState("");
  const [announces, setAnnounces] = useState([]);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [selected, setSelected] = useState(0);
  const filter={lang:0, }



  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/queries/findcount/supporttickets`).then((resp) => {
      if(resp.data.message=='PLEASE-LOGIN'){navigate('/'); return}
      console.log(resp);
      let { rows, count } = resp.data.list;
      setTotalPage(Math.ceil(count/10))
      setCountTickets(count)
      if (rows) {
        setTickets(rows);
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
            <strong className="title" style={{fontSize:'24px', fontWeight: 'bold'}}>1:1 문의하기</strong>
            <p className="subtitle">
            사용하시면서 불편한 사항이나 개선 의견이 있다면 문의해주세요.
            </p>
            <p className="description">*음란, 불법 게시물 또는 권리 침해 신고는 아이템 구매화면 상단에 <img/>신고하기 버튼을 이용해주세요.</p>

            <div className="contentBody">
              <ul className="listHeader">
                <li>제목</li>
                <li>처리상태</li>
              </ul>
              <ul className="list">
                {countTickets==0&&<div className="empty">문의 내역이 없습니다.</div>}
                {tickets.map((v, i)=>(<><li>
                  <details className="ticketDetail">
                    <summary className="ticketSummary">
                      <div className="textBox">
                      Q. {v.title}
                      </div>
                      
                      {v.status==1&&<span className='status'>답변 대기중</span>}
                      {v.status==2&&<span className="status done">답변 완료</span>}
                      <img className="arwImg" src={I_dnArrow} alt="" />
                      
                    </summary>

                    <div className="content">
                      <span className="quest">
                      {v.description}
                      </span>
                    {v.answer &&<span className="answer">
                    {"A. "+v.answer}

                    </span>}
                    </div>
                  </details>
                </li></>))}
                {/* {announces.map((v, i) => {
                  if(currentPage*10>i && i>=(currentPage-1)*10)
                  return (
                    <li key={i}>
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
                })} */}
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
          <article className="btnArea">
            <button className="ListBtn" onClick={()=>{navigate('/Notice')}}>
              문의하기
            </button>
          </article>
        </Pannouncements>
      </>
    );
}

const Mannouncements = styled.div``;

const Pannouncements = styled.div`
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
flex-direction: column;
  padding-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  //height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  //background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  .popupBox {
    //margin-top: 120px;
    display: flex;
    flex-direction: column;
    width: 1024px;
    //min-height: 80vh;
    height: 100%;
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
      font-weight: 500;
      color: #000000;
      margin-top: 10px;
    }

    
    .description{
      padding-top: 10px;
      font-family: "Noto Sans KR", sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #7a7a7a;
    }
  
    .contentBody {
      padding-top: 32px;
      //height: 100%;
      border-bottom: 1px solid #000;
      min-height: 657px;
        //height: 100%;

      .listHeader {
        border-bottom: 1px solid #000;
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
        

        overflow: hidden;
        padding: 0 6px 0 6px;
        font-size: 16px;
        font-weight: 500;
        //overflow-y: scroll;
        
        .empty{
          width: 100%;
          height: 657px;
          text-align: center;
          vertical-align: middle;
          font-size: 18px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 657px;
          letter-spacing: normal;
          text-align: center;
          color: #727272;
        }

        li {
          display: flex;
          align-items: center;
          //height: 56px;
          
          //overflow: hidden;

          .ticketDetail {
            width: 100%;
          //border: solid 1px #d9d9d9;
          //border-radius: 8px;
  
          &[open] {
            //border-radius: 8px;
            //border: solid 2px #1c7eff;
            //background-color: #fbfbfb;
            summary {
              .arwImg {
                transform: rotate(180deg);
              }
            }
          }
  
          .ticketSummary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 56px;
            padding: 0 20px;
  
            .textBox {
              display: flex;
              justify-content: flex-start;
              //width: 100%;
              font-size: 16px;
              font-weight: bold;
            }
            .status{
              font-family: "Noto Sans KR", sans-serif;
              justify-content: flex-end;
              font-size: 16px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: normal;
              text-align: center;
              color: #1c7eff;
            }
            .done{
              color: #7a7a7a;
            }
  
            .arwImg {
              justify-content: flex-end;
              width: 24px;
            }
          }
  
          .content{
            font-family: "Noto Sans KR", sans-serif;
            display: flex;
            flex-direction: column;
            gap: 8px;
            //padding: 16px 20px;
            padding-top: 12px;
            padding-bottom: 20px;
            padding-left: 20px;
            //padding-right: 50px;
            font-size: 16px;
            font-weight: bold;
            width: 750px;
            .quest{
              padding: 0;
              width: 100%;
            }
            .answer{
              justify-content: flex-start;
              padding-top: 28px;
              width: 100%;
              color: #1c7eff;
            }
          }
        }
        }
        li + li {
          border-top: 1px solid #e5e5e5;
        }
        
      }

      .listHeader li,
      .list li span {

        &:nth-of-type(1) {
          padding: 18px 18px 18px 18px;
          display: flex;
          flex: 1;
          cursor: pointer;
        }

        &:nth-of-type(2) {
          display: flex;
          width: 200px;
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
  .btnArea {
      display: flex;
      width: 1024px;
      justify-content: flex-end;
      align-items: center;
      height: 134px;
      //padding: 0 36px;
      //border-top: 1px solid #d9d9d9;

      .ListBtn {
        width: 176px;
        height: 56px;
        font-size: 22px;
        font-weight: 500;
        color: #000;
        background: #fff;
        border-radius: 44px;
        text-align: center;
        padding-top: auto;
        border-radius: 28px;
        border: solid 2px #222;
        
      }
      .ListBtn:hover{
        background: #000;
        color: #fff;
      }
      .dcreateBtn {
        width: 176px;
        height: 56px;
        font-size: 22px;
        font-weight: 500;
        color: #fff;
        background: #ccc;
        border-radius: 44px;
        text-align: center;
        padding-top: auto;
        
      }
    }
  
`;

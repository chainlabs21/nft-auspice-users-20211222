import { useNavigate, useParams } from "react-router";
import { useLocation, useHistory, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import I_ltArw3 from "../../img/icons/I_ltArw3.png"

import { useState, useEffect, useLayoutEffect } from "react";
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

import { useTranslation } from "react-i18next";

import axios from "axios";
const D_Category = ["제목", "본문"];
export default function NoticeDetail(props) {
  const { t }  = useTranslation(['locale'])
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  //const location = useLocation();
  const { pathname } = useLocation();
  const isMobile = useSelector((state) => state.common.isMobile);
  let [searchParams, setSearchParams] = useSearchParams();
  const [noticeid, setNoticeid] = useState(searchParams.get("id"));

  const [totalNotice, setTotalNotice] = useState(100);
  const [totalPage, setTotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(5);
  const [searchKey, setSearchKey] = useState("");
  const [announces, setAnnounces] = useState([]);
  const [id, setId] = useState(-1)
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [title, setTitle] = useState("NFT 이용 약관 일부 개정 안내");
  const [type, setType] = useState("공지");
  
  const [date, setDate] = useState("2021.12.07");

  const [content, setContent] = useState();

  useEffect(()=>{
    setId(pathname.split('/')[2])

    axios.get(`${API.API_GET_NOTICE_CONTENT}`, {params:{
      id: pathname.split('/')[2]
    }}).then((resp)=>{
      console.log(resp.data.list[0])
      let {contentbody, createdat, title} = resp.data.list[0]
      console.log(contentbody)
      setContent(contentbody)
      setTitle(title)
      setDate(createdat)
    })
  }, [pathname])

  useEffect(()=>{
console.log(content)

  },[content])

  if (isMobile)
    return (
      <>
        {/* <DefaultHeader /> */}
        <Mannouncements>
          <strong className="title" style={{fontSize:'3vh', fontWeight: 'bold'}}>
            <img style={{height: '2vh'}} src={I_ltArw3} onClick={()=>{navigate('/'); console.log('help')}}/>  {t('notice:NOTICE')}
            </strong>
            <div className="contentBody">
              <div className="header">
              <p className="title">{title}</p>
              <p className="desc">
                <span className="type">{type}</span>
                <span className="date">{moment(date).format('YYYY-MM-DD')}</span>
              </p>
              <div className="ck-content" dangerouslySetInnerHTML={{__html: content}} />
              </div>

            </div>
            
            <article className="btnArea">
            <button className="ListBtn" onClick={()=>{navigate('/Notice')}}>
              목록 보기
            </button>
          </article>


        </Mannouncements>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <Pannouncements>
          <section className="spopupBox">
            <strong className="title">{t('locale:NOTICE')}</strong>
            <div className="header">
              <p className="title">{title}</p>
              <p className="desc">
                <span className="type">{type}</span>
                <span className="date">{moment(date).format('YYYY-MM-DD')}</span>
              </p>
            </div>
            <div className="ck-content" dangerouslySetInnerHTML={{__html: content}} />
          </section>
          <article className="btnArea">
            <button className="ListBtn" onClick={()=>{navigate('/Notice')}}>
              목록 보기
            </button>
          </article>
        </Pannouncements>
      </>
    );
}

const Mannouncements = styled.div`

padding: 5vw;
.subtitle{
  margin-top: 4vh;
  font-size: 4vw;
  font-weight: 500;
}
    .description {
        display: flex;
        margin-top: 3vh;
        flex: 1;
        line-height: 5vh;
        vertical-align: middle;
        font-size: 4vw;
        font-weight: 500;
      }
      p {
        .highlighted {
          color: #1c7eff;
        }
      }
      .contentBody {
      padding-top:1vh;
      margin-top: 2vh;
      border-top: solid 1px #000;
      height: 100%;
      .header{
        font-size: 2vh;
        
        .title{
          font-weight: bold;
        }
        .desc{
          margin-top: 1.5vh;
          font-weight: normal;
          line-height: 3vh;
          .type + .date{
            margin-left: 3vw;
          }
          .date{
            color: #7a7a7a;
            font-size: 1.5vh;
            //line-height: 2vh;
          }
        }
      }
      .ck-content{
        margin-top: 4vh;
        font-weight: normal;
      font-stretch: normal;
      img{
        max-width: 90vw;
      }
    }

    }
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
        align-self: right;

        &:hover{
          background: #222;
        color: #fff;
        }
        
      }
     .btnArea {
      display: flex;
      width: 90vw;
      justify-content: flex-end;
      align-items: center;
      height: 20vh;
      //padding: 0 36px;
      //border-top: 1px solid #d9d9d9;

      .ListBtn {
        width: 30vw;
        height: 10vw;
        font-size: 4vw;
        font-weight: 500;
        color: #000;
        background: #fff;
        border-radius: 3.5vw;
        text-align: center;
        padding-top: auto;
        border-radius: 5vw;
        border: solid 1px #222;
        
      }
      .ListBtn:hover{
        background: #000;
        color: #fff;
      }
    } 

`;

const Pannouncements = styled.div`
flex-direction: column;
padding-top: 180px;
margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  //height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  //background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  .spopupBox {
    display: flex;
    flex-direction: column;
    width: 1024px;

    //min-height: 80vh;
    height: 100%;

    padding: 60px 35px 64px 35px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
    .title {
      font-size: 22px;
      color: #000000;
      font-weight: bold;
    }
    .header {
      margin-top: 15px;
      padding-bottom: 21px;
      border-top: solid 1px #000000;
      border-bottom: solid 1px #e5e5e5;
      .title {
        padding-top: 21px;
        font-size: 18px;
        font-weight: bold;
      }
      .desc {
        margin-top: 9px;
        font-size: 16px;
        font-weight: normal;
        .type {
          color: #1c7eff;
        }
        .date {
          margin-left: 13px;
          color: #7a7a7a;
        }
      }
    }
    .ck-content{
      margin-top: 31.5px;
      font-weight: normal;
      font-stretch: normal;
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

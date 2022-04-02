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
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import axios from "axios";
const D_Category = ["제목", "본문"];
export default function SupportTicket(props) {
  const { t }  = useTranslation(['locale'])
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
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState('');
  const [announces, setAnnounces] = useState([]);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [selected, setSelected] = useState(0);
  const [lang, setLang] = useState(0);
  const [username, setUsername] = useState('')
  const filter={lang:0, }

  function handleSubmit(){
    window.klaytn.enable().then((account)=>{
      axios.post(`${process.env.REACT_APP_API_SERVER}/support/sendticket`,{
        title: title, description: desc, lang: lang, username: account[0]
      })
    })
  }
  function handleCancel(){
    navigate('/support')
  }

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
            <strong className="title" style={{fontSize:'24px', fontWeight: 'bold'}}>{t('sendticket:TITLE')}</strong>

            <div className="contentBody">
              <ul className="list">
                <li className="group">
                  <div className="Title">{t('sendticket:TYPE')+" : "}</div>
                  <div className="TitleBox">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('sendticket:TYPE_HOLDER')}
                />
              </div>
                </li>
                <li className="group">
                  <div className="Title">{t('sendticket:CONTENT')+" : "}</div>
                  <div className="ContentBox">
                <textarea
                  rows="24"
                  maxLength={300}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder={t('sendticket:CONTENT_HOLDER')}
                />
              </div>
                </li>
              </ul>
            </div>
          </section>
          <article className="btnArea">
          <button className="ListBtn" onClick={()=>{handleCancel()}}>
            {t('sendticket:CANCEL')}
            </button>
            <button className="ListBtn" onClick={()=>{handleSubmit()}}>
            {t('sendticket:SEND')}
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
      //border-bottom: 1px solid #000;
      min-height: 657px;
        //height: 100%;
        .list{
          border-top: solid 1px #000;
          padding-top: 36.5px;
          .group + .group{
            margin-top: 20px;
          }
          .group{
            display:flex;
            width: 100%;
            justify-content: space-between;
            .Title{
              display:flex;
              justify-content: flex-start;
              font-size: 18px;
              font-weight: normal;
              line-height: 48px;
            }
            .TitleBox{
              display:flex;
              justify-content: flex-end;
              border-radius: 4px;
              border: solid 1px #e5e5e5;
              height: 48px;
              padding: 12px 16px 12px 16px;
              
              input{
                display: flex;
                width: 800px;
                font-size: 16px;
                font-weight: normal;
              }
            }
            .ContentBox{
              display:flex;
              justify-content: flex-end;
              border-radius: 4px;
              border: solid 1px #e5e5e5;
              padding: 12px 16px 12px 16px;
              height: 100%;
              textarea{
                display: flex;
                width: 800px;
                font-size: 16px;
                font-weight: normal;
              }
            }

          }
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
      .ListBtn + .ListBtn{
        margin-left: 15px;
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

import { useNavigate, useParams } from "react-router";
import { useLocation, useHistory, useSearchParams } from "react-router-dom";
import styled from "styled-components";

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
import Filter from "../../components/common/DefaultFilter";
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

import "./style2.css";

import axios from "axios";
export default function Notice(props) {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [totalNotice, setTotalNotice] = useState(100);
  const [totalPage, setTotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(5);
  const [searchKey, setSearchKey] = useState("");

  if (isMobile)
    return (
      <>
        <DefaultHeader />
        <Mfaq>
        <div className="notice">
          <div className="container" style={{height:'100%'}}>
            <div className="notice_box">
              <div className="title" style={{marginBottom: '25px'}}>
                <h1>자주하는 질문</h1>
                <h2>문의하기가 늦어질 수 있으니 먼저 FAQ를 확인해주세요!</h2>
              </div>
              <div className="notice-middle">
                <div className="dropdown notice-middle-drop">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>제목</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        제목1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        제목2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        제목3
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="middle-search">
                  <form>
                    <input type="text" name="text" placeholder="" />
                    <button type="button">
                      <img src="./img/header/search_form.png" />
                    </button>
                  </form>
                </div>
              </div>
              <div>
                <ul className="support-category">
                  <li className="on">
                    <a href="#">전체</a>{" "}
                  </li>
                  <li>
                    <a href="#">일반</a>{" "}
                  </li>
                  <li>
                    <a href="#">지갑/계정</a>{" "}
                  </li>
                  <li>
                    <a href="#">이용관련</a>{" "}
                  </li>
                  <li>
                    <a href="#">구매</a>{" "}
                  </li>
                  <li>
                    <a href="#">판매</a>{" "}
                  </li>
                  <li className="on">
                    <a href="#">기타문의</a>{" "}
                  </li>
                </ul>
              </div>
              <div className="accordion faq-list" id="accordionExample">
                <div className=" accodion-item-border">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className=" accordion-button support-title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      style={{backgroundColor: 'none'}}
                    >
                      <strong>일반</strong>
                      <h3>NFT가 무엇인가요?</h3>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body faq-accordion-body">
                      <p className="faq-question">
                        NFT는 대체 불가능한 토큰(Non-Fungible Token)을 이용해
                        작품과 창작 및 소유에 대한 기록을
                        <br /> 블록체인상에 남기는 새로운 작품 거래 방식이에요.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item accodion-item-border">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button support-title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <strong>일반</strong>
                      <h3>NFT가 무엇인가요?</h3>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body faq-accordion-body">
                      <p className="faq-question">
                        NFT는 대체 불가능한 토큰(Non-Fungible Token)을 이용해
                        작품과 창작 및 소유에 대한 기록을
                        <br /> 블록체인상에 남기는 새로운 작품 거래 방식이에요.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item accodion-item-border">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button support-title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      <strong>지갑/계정</strong>
                      <h3>카이카스 지갑이 무엇인가요?</h3>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body faq-accordion-body">
                      <p className="faq-question">
                        NFT는 대체 불가능한 토큰(Non-Fungible Token)을 이용해
                        작품과 창작 및 소유에 대한 기록을
                        <br /> 블록체인상에 남기는 새로운 작품 거래 방식이에요.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item accodion-item-border">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button support-title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      <strong>이용관련</strong>
                      <h3>회원탈퇴에 불이익이 있나요?</h3>
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body faq-accordion-body">
                      <p className="faq-question">
                        NFT는 대체 불가능한 토큰(Non-Fungible Token)을 이용해
                        작품과 창작 및 소유에 대한 기록을
                        <br /> 블록체인상에 남기는 새로운 작품 거래 방식이에요.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item accodion-item-border">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button support-title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="true"
                      aria-controls="collapseFive"
                    >
                      <strong>구매</strong>
                      <h3>작품을 구매하고 싶어요.</h3>
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body faq-accordion-body">
                      <p className="faq-question">
                        NFT는 대체 불가능한 토큰(Non-Fungible Token)을 이용해
                        작품과 창작 및 소유에 대한 기록을
                        <br /> 블록체인상에 남기는 새로운 작품 거래 방식이에요.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item accodion-item-border"
                  style={{borderColor: '#d9d9d9'}}
                >
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button support-title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="true"
                      aria-controls="collapseSix"
                    >
                      <strong>판매</strong>
                      <h3>작품을 판매하고 싶어요.</h3>
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body faq-accordion-body">
                      <p className="faq-question">
                        NFT는 대체 불가능한 토큰(Non-Fungible Token)을 이용해
                        작품과 창작 및 소유에 대한 기록을
                        <br /> 블록체인상에 남기는 새로운 작품 거래 방식이에요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Mfaq>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

      </>
    );
}
const Mfaq = styled.div`
width: 100%`;

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../config/api";
import I_x from "../../img/icons/I_x.svg";
import I_dnArw from "../../img/header/I_dnArw.svg";
import SelectPopup from "../SelectPopup";
import PopupBg from "../PopupBg";

export default function ReportPopup({ off, itemid, username }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [category, setCategory] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [selectCategoryPopup, setSelectCategoryPopup] = useState(false);

  const [description, setDescription] = useState();
  const [categorylist, setCategorylist] = useState([])
  const [submitReady, setSubmitReady] = useState(false)

  useEffect(()=>{
    setCategorylist([])
    axios.get(`${API.API_GET_REPORT_CATEGORIES}`).then((resp)=>{
      setCategoryData(resp.data.list)
      resp.data.list.map((v, i)=>{
        setCategorylist(pre=>[...pre, v.name])
      })
    })
    //setCategorylist(['못생김', '잘생김', '진짜 잘생김'])
    //setCategoryData([{name: '못생김'}, {name: '잘생김'}, {name: '진짜 잘생김'}])
  },[])

  function onSubmitReport(){
    axios.post('url', null, {params:{category, description, itemid, username}})
    .then((resp)=>{
      //deal with response
      off()
    })
  }

  useEffect(()=>{
    // if (category!="" && description!=""){
    //   console.log('asd')
    //   setSubmitReady(true);
    // }else{
    //   setSubmitReady(false)
    //   console.log(category, description)
    // }

    if(category&&description){
      setSubmitReady(true)
    }else{
      setSubmitReady(false)
    }
  },[category, description])

  if (isMobile)
    return (
      <MreportPopup>
        <article className="topBar">
          <strong className="title">Report inappropriate items</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="categoryBox contBox">
            <strong className="contTitle">Category</strong>

            <div className="posBox">
              <button
                className={category ? "selectBtn on" : "selectBtn"}
                onClick={() => setSelectCategoryPopup(!selectCategoryPopup)}
              >
                              {selectCategoryPopup && (
                <>
                  <SelectPopup off={selectCategoryPopup} contList={categorylist} selectCont={setCategory}/>
                  <PopupBg off={selectCategoryPopup} />
                </>
              )}
                <p>Please select a reason for reporting</p>

                <img src={I_dnArw} alt="" />
              </button>
            </div>
          </div>

          <div className="descriptionBox contBox">
            <strong className="contTitle">Detailed description</strong>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe in detail why you would like to report the item."
            />
          </div>

          <button
            className="reportBtn"
            onClick={() => off()}
            disabled={!(category && description)}
          >
            Report it
          </button>
        </article>
      </MreportPopup>
    );
  else
    return (
      <PreportPopup>
        <article className="topBar">
          <span className="blank" />
          <strong className="title">Report inappropriate items</strong>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="categoryBox contBox">
            <strong className="contTitle">Category</strong>

            <div className="posBox">
              <button
                className={category ? "selectBtn on" : "selectBtn"}
                onClick={() => setSelectCategoryPopup(!selectCategoryPopup)}
              >
                              {selectCategoryPopup && (
                <>
                  <SelectPopup off={setSelectCategoryPopup} contList={categorylist} selectCont={e=>{setCategory(e)}}/>
                  <PopupBg off={setSelectCategoryPopup} />
                </>
              )}
                <p>{categoryData[category]?.name}</p>

                <img src={I_dnArw} alt="" />
              </button>
            </div>
          </div>

          <div className="descriptionBox contBox">
            <strong className="contTitle">Detailed description</strong>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe in detail why you would like to report the item."
            />
          </div>

          <button
            className="reportBtn"
            onClick={() => onSubmitReport()}
            disabled={!submitReady}
          >
            Report it
          </button>
        </article>
      </PreportPopup>
    );
}

const MreportPopup = styled.section`
  display: flex;
  flex-direction: column;
  width: 88.88vw;
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
      width: 5.55vw;
    }
  }

  .contArea {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 8.88vw 3.88vw 5.55vw 3.88vw;
    border-top: 1px solid #e1e1e1;
    overflow: hidden;

    .contBox {
      display: flex;
      flex-direction: column;
      gap: 3.33vw;

      .contTitle {
        font-size: 4.44vw;
      }

      &.categoryBox {
        .posBox {
          .selectBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 13.33vw;
            padding: 0 3.88vw;
            font-size: 3.88vw;
            font-weight: 500;
            color: #b2b2b2;
            background: #f3f3f3;
            border-radius: 8px;

            &.on {
              color: #000;
            }

            img {
              width: 5.55vw;
            }
          }
        }
      }

      &.descriptionBox {
        margin: 5.55vw 0 0 0;

        textarea {
          height: 68.88vw;
          padding: 4.44vw 3.88vw;
          background: #f3f3f3;
          border-radius: 2.22vw;
        }
      }
    }

    .reportBtn {
      margin: 5.55vw 0 0 0;
      align-self: center;
      width: 100%;
      height: 15.55vw;
      font-size: 4.44vw;
      font-weight: 700;
      color: #fff;
      background: #222;
      border-radius: 7.77vw;

      &:disabled {
        background: #b2b2b2;
      }
    }
  }
`;

const PreportPopup = styled.section`
  display: flex;
  flex-direction: column;
  width: 600px;
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
    padding: 30px;
    border-top: 1px solid #e1e1e1;
    overflow: hidden;

    .contBox {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .contTitle {
        font-size: 22px;
      }

      &.categoryBox {
        .posBox {
          .selectBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 62px;
            padding: 0 20px;
            font-size: 16px;
            font-weight: 500;
            color: #b2b2b2;
            background: #f3f3f3;
            border-radius: 8px;

            &.on {
              color: #000;
            }

            img {
              width: 24px;
            }
          }
        }
      }

      &.descriptionBox {
        margin: 34px 0 0 0;
        textarea {
          height: 266px;
          padding: 22px 20px;
          background: #f3f3f3;
          border-radius: 8px;
        }
      }
    }
    .reportBtn {
      margin: 30px 0 0 0;
      align-self: center;
      width: 350px;
      height: 56px;
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      background: #222;
      border-radius: 28px;

      &:disabled {
        background: #b2b2b2;
      }
    }
  }
`;

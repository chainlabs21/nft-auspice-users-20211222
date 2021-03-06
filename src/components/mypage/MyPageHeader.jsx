import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import re from "../../img/sub/re.png";
import I_edit from"../../img/icons/I_edit.png"
import share from "../../img/sub/share.png";
import loupe_black from "../../img/sub/loupe_black.png";
import home_bg from "../../img/sub/home_bg.png";

import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { strDot } from "../../util/Util";
import axios from "axios";
import { LOGGER } from "../../util/common";
import { API } from "../../config/api";
import userEvent from "@testing-library/user-event";
import { useTranslation } from "react-i18next";
import { writeSig } from "../../util/verifySig";

export default function MyPageHeader({ address, targetData }) {

  const profImgRef = useRef();
  const bannerImgRef = useRef(); 
  const {t} = useTranslation(['locale']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);
  const [toggleFilter, setToggleFilter] = useState(false);
  let [listitems, setlistitems] = useState([]);
  const [nickname, setNickname] = useState("Username");
  const [desc, setDesc] = useState("Description");
  const [imageUrl, setImageUrl] = useState("");
  const [coverimageUrl, setcoverImageUrl] = useState("");
  const [orderkey, setOrderkey] = useState(0);
  const [targettData, setTargettData] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [myAddress, setMyAddress] = useState();
  const [fileChk, setFileChk] = useState();
  const [profbannerUrl, setProfbannerUrl] = useState();
  const [profUrl, setProfUrl]= useState()

  const kiloBytes = 1024;
const megaBytes = 1024 * kiloBytes;
const MAP_fileextension_contentype = {
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  svg: "image",
  mp4: "video",
  webm: "video",
  mp3: "audio",
  wav: "audio",
  ogg: "audio",
};

  const { userData, isloggedin, walletAddress } = useSelector(
    (state) => state.user
  );



  useEffect(() => {
    console.log(targetData)
    if (targetData) {
      setTargettData(targetData);
      if (walletAddress == address) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } else {
      console.log("no target");
      if (
        userData instanceof Object &&
        userData["myinfo_maria"] !== undefined
      ) {
        setTargettData(userData.myinfo_maria);
      }
    }
  },[address, targetData, pathname]);
  useEffect(() => {
    if (targettData) {
      setNickname(targettData.nickname);
      setDesc(targettData.description);
      setImageUrl(targettData.profileimageurl);
      setcoverImageUrl(targettData.coverimageurl)
      setMyAddress(targettData.username);
    }
  }, [targettData]);

 function handleSetting(){
   navigate('/generalsettings')
    // console.log('henlo')
    // window.ethereum.enable().then(async (accounts)=>{
    //   console.log(accounts[0])
    //   const result = await writeSig(accounts[0], '1', 'hello')
    //   console.log(result)
    // })
  }

  const fileUpload = async (file, type) => {
    if (!file) {
      return;
    }
    const fileLength = file.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();

    if (MAP_fileextension_contentype[fileType] != "image") {
      //SetErrorBar("This is not an image file");
      return;
    }
    let filesize = file.size;
    if (file && filesize > 0) {
      setFileChk(true);
      try {
        if (filesize <= 40 * megaBytes) {
          let formData = new FormData();
          formData.append("file", file);
          formData.append("filename", file.name);
          formData.append("username", walletAddress);
          const resp = await axios.post(
            `${API.API_USER_PROF_UPLOAD}/${type}`,
            formData
          );
          console.log("eERWguRnGR", resp.data);
          let { status, payload, respdata } = resp.data;
          if (status == "OK") {
            if (type == "bg") {
              axios.put(`${API.API_UPDATE_IMG}`, {target: 'coverimageurl', val: payload.url}).then((res)=>{window.location.reload()})
              setProfbannerUrl(payload.url);
            } else {
              axios.put(`${API.API_UPDATE_IMG}`, {target: 'profileimageurl', val: payload.url}).then((res)=>{window.location.reload()})
              setProfUrl(payload.url);
            }
          }
        } else {
          //SetErrorBar(ERR_MSG.ERR_FILE_SIZE_EXCEEDED);
          return;
        }
      } catch (error) {
        //SetErrorBar(ERR_MSG.ERR_FILE_UPLOAD_FAILED);
        console.log(error);
      }
    }
  };

  if (isMobile)
    return (
      <MMyPageHeader>
        <header className="myProfHeader">
          <div
            className={isOwner?"bg":"viewerbg"}//"bg"
            style={{
              backgroundImage: `url(${coverimageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>

          <div className="contBox">
            <div className="profImg" style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}/>
            <div className="btnBox">
              <button className="" onClick={() => {handleSetting()}}>
                <img src={re} alt="" />
              </button>
              <button className="" onClick={() => {}}>
                <img src={share} alt="" />
              </button>
            </div>

            <div className="infoBox">
              <strong className="title">{nickname} {t('mypage:sItems')}</strong>
              <p className="address">{strDot(myAddress, 5, 5)}</p>
              <p className="introduce">
                {desc}
              </p>
            </div>
          </div>
        </header>
      </MMyPageHeader>
    );
  else
    return (
      <>
        <PMyPageHeader style={{ padding: toggleFilter && "120px 0 0 350px" }}>
          <header className="myProfHeader">
            <div
            onClick={()=>{
              if (!isOwner)return;
              bannerImgRef.current.click()
            }}
              className={isOwner?"bg":"viewerbg"}
              style={{
                backgroundImage: `url(${coverimageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                
              }}
            >{isOwner?<img src={I_edit}/>:undefined}
            <input
                    className="nospace"
                    type="file"
                    accept="image/*"
                    ref={bannerImgRef}
                    onChange={(e) => {
                      fileUpload(e.target.files[0], "bg");
                      //onChangeImg(e.target.files[0], "bg");
                    }}
                  />
            </div>

            <div className="contBox">
            <div
            onClick={()=>{
              if (!isOwner)return;
              profImgRef.current.click()
            }} 
            className={isOwner?"profImg":"viwerprofImg"} style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}>{isOwner?<img src={I_edit}/>:undefined}
            <input
                    className="nospace"
                    type="file"
                    accept="image/*"
                    ref={profImgRef}
                    onChange={(e) => {
                      fileUpload(e.target.files[0], "bg");
                      //onChangeImg(e.target.files[0], "bg");
                    }}
                  />
            </div>
              {/* <div className="change"><img src={I_edit}/></div> */}
              <div className="btnBox">
                <button className="" onClick={() => {handleSetting()}}>
                  <img src={re} alt="" />
                </button>
                <button className="" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>

              <div className="infoBox">
                <strong className="title">{nickname}{t('mypage:sItems')}</strong>
                <p className="address">{strDot(myAddress, 5, 5)}</p>
                <p className="introduce" style={{whiteSpace:'pre'}}>{desc}</p>
              </div>
            </div>
          </header>
        </PMyPageHeader>
      </>
    );
}

const MMyPageHeader = styled.div`
  padding: 72px 0 0 0;
  position: relative;

  .myProfHeader {
    .bg {
      height: 38.88vw;
    }

    .contBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0 5.55vw;

      .profImg {
        width: 27.77vw;
        height: 27.77vw;
        border-radius: 50%;
        background: #000;
        top: -13.88vw;
        position: absolute;
      }

      .btnBox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 16.11vw;
        gap: 1.11vw;

        button {
          img {
            width: 5.5vw;
          }
        }
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.77vw;
        padding: 3.33vw 0 0 0;

        .title {
          font-size: 6.11vw;
        }

        .address {
          font-size: 3.88vw;
          color: #1c7eff;
          font-weight: 500;
        }

        .introduce {
          font-size: 3.88vw;
          line-height: 5.55vw;
          letter-spacing: -0.32px;
          text-align: center;
        }
      }
    }
  }
`;

const PMyPageHeader = styled.div`
  padding: 120px 0 0 0;
  position: relative;

  .myProfHeader {
    .viewerbg {
        height: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
        //opacity: 0;
    }
    .bg {
      cursor: pointer;
        height: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
        //opacity: 0;
        img{
          position: absolute;
          filter: invert(100%) opacity(100%);
          opacity: 0;
        }

      
      &:hover{
        background-color: rgba(0, 0, 0, 0.3);
        background-blend-mode : darken;
        img{
          position: absolute;
          filter: invert(100%) opacity(100%);
          opacity: 1;
        }
        /* .change{
          background-color: #000;
          opacity:0.3;
          img{
            
            opacity: 1;
            z-index: 10;
          }
        } */
      }
      
    }

    .contBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      max-width: 1280px;
      margin: 0 auto;

      .viwerprofImg {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        top: -70px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .profImg {
        cursor: pointer;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        top: -70px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            opacity: 0;
          }
        &:hover{
          background-color: #0005;//rgba(0, 0, 0);
          background-blend-mode : darken;
          img{
            opacity: 1;
            filter: invert(100%) opacity(100%);
          }
        }
      }

      .btnBox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 84px;
        gap: 20px;

        button {
          img {
            width: 24px;
          }
        }
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 36px 0 0 0;

        .title {
          font-size: 32px;
        }

        .address {
          font-size: 18px;
          color: #1c7eff;
          font-weight: 500;
        }

        .introduce {
          width: 460px;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.32px;
          text-align: center;
        }
      }
    }
  }
`;

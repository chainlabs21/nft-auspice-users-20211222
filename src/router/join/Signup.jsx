import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";
import SetErrorBar from "../../util/SetErrorBar";
import SentEmailDetail from "./SentEmailDetail";

import I_camera from "../../img/icons/I_camera.png";
import I_upload from "../img/icon/upload-button.svg";
import I_x from "../../img/icons/I_x.svg";
import I_ltArw3 from "../../img/icons/I_ltArw3.svg";
import I_chkBtn from "../../img/design/I_chkBtn.png";
import I_img from "../../img/icons/I_img.svg";

import { useEffect, useRef, useState } from "react";
import { encodeBase64ImageFile, getuseraddress } from "../../util/common";
import { ERR_MSG } from "../../config/messages";
import axios from "axios";
import { API } from "../../config/api";
import DefaultHeader from "../../components/header/DefaultHeader";

import { useTranslation } from "react-i18next";
import i18n from "i18next";

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

export default function Signup({ store, setConnect }) {
  const navigate = useNavigate();
  const boxRef = useRef();
  const profImgRef = useRef();
  const bannerImgRef = useRef();

  const isMobile = useSelector((state) => state.common.isMobile);
  const { walletAddress } = useSelector((state) => state.user);

  const [profImg, setProfImg] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameChk, setUsernameChk] = useState(false);
  const [usernameAlarm, setUsernameAlarm] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailChk, setEmailChk] = useState(false);
  const [emailAlarm, setEmailAlarm] = useState("");
  const [ageCheck, setAgeCheck] = useState(false);
  const [subCheck, setSubCheck] = useState(false);
  const [infoCheck, setInfoCheck] = useState(false);
  const [fileChk, setFileChk] = useState(true);
  const [profUrl, setProfUrl] = useState();
  const [profbannerUrl, setProfbannerUrl] = useState();
  const [signupsuccess, setSignupsuccess] = useState(false);

  const { t } = useTranslation(["locale"]);

  // const onChangeLang = () => {
  //     i18n.changeLanguage('ko')
  // }
  // useEffect(()=>{
  //   i18n.changeLanguage('ko')
  // },[])

  function onChangeImg(file, type) {
    if (!file) return;
    const fileLength = file.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();
    if (MAP_fileextension_contentype[fileType] == "image") {
      setPhotoName(file.name);
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        if (type == "bg") {
          setBannerImg(reader.result);
        } else {
          setProfImg(reader.result);
        }
      };
    }
  }

  const fileUpload = async (file, type) => {
    if (!file) {
      return;
    }
    const fileLength = file.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();

    if (MAP_fileextension_contentype[fileType] != "image") {
      SetErrorBar("This is not an image file");
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
              setProfbannerUrl(payload.url);
            } else {
              setProfUrl(payload.url);
            }
          }
        } else {
          SetErrorBar(ERR_MSG.ERR_FILE_SIZE_EXCEEDED);
          return;
        }
      } catch (error) {
        SetErrorBar(ERR_MSG.ERR_FILE_UPLOAD_FAILED);
        console.log(error);
      }
    }
  };

  const handleSignup = () => {
    console.log("finally");
    const asyncSignup = async () => {
      const regData = {
        username: address,
        address: address,
        email: email,
        nickname: username,
        imagebase64: "",
        imagefilename: "",
        verified: false,
      };
      try {
        //console.log({...regData, imagefilename: respdata});
        if (!profUrl) setProfUrl("http://itemverse1.net/assets/demoprof.png");
        if (!profbannerUrl)
          setProfUrl("http://itemverse1.net/assets/demoprof.png");
        let addressChk = await window.klaytn.enable();
        if (addressChk[0] != address) {
          SetErrorBar("DIFFERENT WALLET ADDRESS");
          return;
        }
        const resp = await axios.post(API.API_USER_JOIN, {
          ...regData,
          profileimageurl: profUrl,
          coverimageurl: profbannerUrl,
        });
        console.log(resp);
        if (resp.data.status === "OK") {
          setSignupsuccess(true);
        } else {
          // ?????? ???????????? ????????????
          if (resp.data.message === "DATA-DUPLICATE") {
            switch (resp.data.reason) {
              case "address":
                alert(ERR_MSG.ERR_DUPLICATE_ADDRESS);
                break;
              case "email":
                alert(ERR_MSG.ERR_DUPLICATE_EMAIL);
                break;
              case "nickname":
                alert("????????? ??????");
              default:
                alert(ERR_MSG.ERR_SERVER_STATUS);
            }
          } else {
            alert(ERR_MSG.ERR_SERVER_STATUS);
          }
          return;
        }
      } catch (error) {
        console.log(error);
        alert(ERR_MSG.ERR_AXIOS_REQUEST);
      }
    };
    if (!usernameChk) {
      alert(ERR_MSG.ERR_REG_USERNAME);
      return;
    }
    if (!emailChk) {
      alert(ERR_MSG.ERR_REG_EMAIL);
      return;
    }
    if (!infoCheck || !ageCheck || !subCheck) {
      alert(ERR_MSG.ERR_REG_AGREE);
      return;
    }
    asyncSignup();
  };

  useEffect(() => {
    const regUsername = /^[???-???a-zA-z\-\_\,]+$/;
    console.log(regUsername.test(username));
    if (username.length < 5 || username.length > 20) {
      setUsernameChk(false);
      setUsernameAlarm("Invalid nickname. It must be less than 20 characters.");
      return;
    }
    if (!regUsername.test(username)) {
      setUsernameChk(false);
      setUsernameAlarm(
        "Invalid nickname. Only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
      );
      return;
    }

    setUsernameChk(true);
    /*
    const regUsername = /^[???~???a~zA~z\-\_\,]+$/;

    Invalid nickname. It must be less than 20 characters.

    if (!regUsername.test(username)) {
      setUsernameChk(false);
      setUsernameAlarm(
        "Invalid nickname. Only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
      );
      return;
    }
	*/
  }, [username]);
  useEffect(() => {
    let regEmail =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    if (!regEmail.test(email)) {
      setEmailChk(false);
      setEmailAlarm("This is an invalid email address.");
      return;
    }
    setEmailChk(true);
  }, [email]);

  useEffect(() => {
    // address ????????????
    if (walletAddress === null) {
      alert(ERR_MSG.ERR_NO_ADDRESS);
      //	navigate ( "/connectwallet" )
      return;
    } else {
      setAddress(walletAddress);
    }
  }, [walletAddress]);

  if (isMobile)
    return (
      <MsignPopupBox>
        <header>
          <button className="exitBtn" onClick={() => navigate(-1)}>
            <img src={I_ltArw3} alt="" />
          </button>

          <strong className="title">{t("signup:TITLE")}</strong>
        </header>

        <section className="innerBox">
          <article className="topArea">
            <strong className="title">{t("signup:TITLE")}</strong>
          </article>

          <article className="inputArea">
            <div className="inputContainer name">
              <strong className="inputTitle">{t("signup:USERNAME")}</strong>

              <div className="ableBox">
                <div className="inputBox">
                  <textarea
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("signup:USERNAME_PLACEHOLDER")}
                  />
                </div>

                {usernameChk && (
                  <p className="able">{t("signup:USERNAME_CANBE")}</p>
                )}
                {username && !usernameChk && (
                  <p className="disable">{usernameAlarm}</p>
                )}
              </div>
            </div>

            <div className="inputContainer photo">
              <strong className="inputTitle">{t("signup:IMG_UPLOAD")}</strong>

              <div className="inputCont">
                <button
                  className="profImgBtn"
                  onClick={() => profImgRef.current.click()}
                >
                  <div className="innerBox">
                    {profImg ? (
                      <img src={profImg} alt="" />
                    ) : (
                      <p>
                        350x350
                        <br />
                        {t("signup:PROF_IMG")}
                      </p>
                    )}
                  </div>

                  <img className="imgAbs" src={I_img} alt="" />

                  <input
                    className="nospace"
                    type="file"
                    accept="image/*"
                    ref={profImgRef}
                    onChange={(e) => {
                      fileUpload(e.target.files[0], "prof");
                      onChangeImg(e.target.files[0], "prof");
                    }}
                  />
                </button>

                <button
                  className="bannerBtn"
                  onClick={() => bannerImgRef.current.click()}
                >
                  <div className="innerBox">
                    {bannerImg ? (
                      <img src={bannerImg} alt="" />
                    ) : (
                      <p>
                        350x350
                        <br />
                        {t("signup:PROF_BANNER")}
                      </p>
                    )}
                  </div>

                  <img className="imgAbs" src={I_img} alt="" />

                  <input
                    className="nospace"
                    type="file"
                    accept="image/*"
                    ref={bannerImgRef}
                    onChange={(e) => {
                      fileUpload(e.target.files[0], "bg");
                      onChangeImg(e.target.files[0], "bg");
                    }}
                  />
                </button>

                <p className="explain">
                  {t("signup:IMG_EXP1")}
                  <br />
                  {t("signup:IMG_EXP2")}
                </p>
              </div>
            </div>

            <div className="inputContainer address">
              <strong className="inputTitle">{t("signup:WALLET_ADD")}</strong>

              <div className="inputBox">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0xc1a8cf204708498de3aa891ad18979881???"
                />
              </div>
            </div>

            <div className="inputContainer email">
              <strong className="inputTitle">{t("signup:EMAIL")}</strong>

              <div className="ableBox">
                <div className="inputBox">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("signup:EMAIL_PLACEHOLDER")}
                  />
                </div>
                {emailChk && <p className="able">A valid email address.</p>}
                {email && !emailChk && (
                  <p className="disable">This is an invalid email address.</p>
                )}

                <p className="explain">{t("signup:EMAIL_EXPLORE")}</p>
              </div>
            </div>
          </article>

          <ul className="chkList">
            <li>
              <button
                className="chkBtn"
                onClick={(e) => {
                  setAgeCheck(!ageCheck);
                }}
              >
                {ageCheck && <img src={I_chkBtn} alt="" />}
              </button>

              <p>
                {t("signup:CHKLIST1")} {t("signup:REQUIRE")}
              </p>
            </li>

            <li>
              <button
                className="chkBtn"
                onClick={(e) => {
                  setSubCheck(!subCheck);
                }}
              >
                {subCheck && <img src={I_chkBtn} alt="" />}
              </button>

              <p>
                {t("signup:CHKLIST2")} <u>{t("signup:CHKLIST2_U")}</u>{" "}
                {t("signup:REQUIRE")}
              </p>
            </li>

            <li>
              <button
                className="chkBtn"
                onClick={(e) => {
                  setInfoCheck(!infoCheck);
                }}
              >
                {infoCheck && <img src={I_chkBtn} alt="" />}
              </button>

              <p>
                <u>{t("signup:CHKLIST3_U")}</u>
                &nbsp;{t("signup:CHKLIST3")} {t("signup:REQUIRE")}
              </p>
            </li>
          </ul>

          <article className="btnBox">
            <button className="cancelBtn" onClick={() => navigate("/")}>
            {t("signup:CANCEL")}
            </button>
            <button className="signBtn" onClick={handleSignup}>
            {t("signup:SIGNUP")}
            </button>
          </article>
        </section>
      </MsignPopupBox>
    );
  else
    return (
      <>
        <DefaultHeader />
        {signupsuccess && <SentEmailDetail email={email} />}
        <PsignPopupBox>
          <section className="popupBox">
            <strong className="title">{t("locale:SIGNUP")}</strong>

            <article className="inputArea">
              <div className="inputContainer name">
                <strong className="inputTitle">{t("locale:NICKNAME")}</strong>

                <div className="ableBox">
                  <div className="inputBox">
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t("locale:NICKNAME_PLACEHOLDER")}
                    />
                  </div>
                  {usernameChk && (
                    <p className="able">Usernames that can be used</p>
                  )}
                  {!usernameChk && <p className="disable">{usernameAlarm}</p>}
                </div>
              </div>

              <div className="inputContainer photo">
                <strong className="inputTitle">
                  {t("locale:IMAGE_UPLOAD")}
                </strong>
                <div className="imageuploadbox">
                  <div
                    className="profileimage"
                    onClick={() => profImgRef.current.click()}
                  >
                    <div className="outercircle">
                      <div className="innercircle">
                        {profImg ? (
                          <img src={profImg} />
                        ) : (
                          <>
                            <span>
                              350x350
                              <br />
                            </span>
                            <span>{t("locale:PROFILE_PICTURE")}</span>{" "}
                          </>
                        )}
                      </div>
                    </div>
                    <img className="upload-btn" src={I_upload} alt="" />
                  </div>

                  <div
                    className="profilebanner"
                    onClick={() => bannerImgRef.current.click()}
                  >
                    <div className="outercircle">
                      <div className="innercircle">
                        {profImg ? (
                          <img src={bannerImg} />
                        ) : (
                          <>
                            <span>
                              1920x330
                              <br />
                            </span>
                            <span>{t("locale:PROFILE_BANNER")}</span>{" "}
                          </>
                        )}
                      </div>
                    </div>
                    <img className="upload-btn" src={I_upload} alt="" />
                  </div>
                </div>
                <p>{t("locale:UPLOAD_DESCRIPTION_1")}</p>
                <p>{t("locale:UPLOAD_DESCRIPTION_2")}</p>

                <div className="inputBar">
                  <input
                    className="nospace"
                    type="file"
                    accept="image/*"
                    ref={profImgRef}
                    onChange={(e) => {
                      fileUpload(e.target.files[0], "prof");
                      onChangeImg(e.target.files[0], "prof");
                    }}
                  />
                  <input
                    className="nospace"
                    type="file"
                    accept="image/*"
                    ref={bannerImgRef}
                    onChange={(e) => {
                      fileUpload(e.target.files[0], "bg");
                      onChangeImg(e.target.files[0], "bg");
                    }}
                  />
                </div>
              </div>

              <div className="inputContainer address">
                <strong className="inputTitle">
                  {t("locale:WALLET_ADDRESS")}
                </strong>

                <div className="inputBox">
                  <input
                    value={walletAddress}
                    readOnly
                    placeholder="Please enter your wallet address"
                  />
                </div>
              </div>

              <div className="inputContainer email">
                <strong className="inputTitle">
                  {t("locale:EMAIL_ADDRESS")}
                </strong>

                <div className="ableBox">
                  <div className="inputBox">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Please enter your email address"
                    />
                  </div>
                  {emailChk && (
                    <p className="able">{t("locale:MAIL_ADDRESS_VALID")}</p>
                  )}
                  {!emailChk && (
                    <p className="disable">
                      {t("locale:MAIL_ADDRESS_INVALID")}
                    </p>
                  )}
                  <p>{t("locale:EMAIL_DESCRIPTION")}</p>
                </div>
              </div>
            </article>

            <ul className="chkList">
              <li>
                <button
                  className="chkBtn"
                  onClick={(e) => {
                    setAgeCheck(!ageCheck);
                  }}
                >
                  {ageCheck && <img src={I_chkBtn} alt="" />}
                </button>

                <p>{t("locale:AGE_CHECK")}</p>
              </li>

              <li>
                <button
                  className="chkBtn"
                  onClick={(e) => {
                    setSubCheck(!subCheck);
                  }}
                >
                  {subCheck && <img src={I_chkBtn} alt="" />}
                </button>

                <p>{t("locale:TOS_CHECK")}</p>
              </li>

              <li>
                <button
                  className="chkBtn"
                  onClick={(e) => {
                    setInfoCheck(!infoCheck);
                  }}
                >
                  {infoCheck && <img src={I_chkBtn} alt="" />}
                </button>

                <p>{t("locale:INFORMATION_CHECK")}</p>
              </li>
            </ul>

            <article className="btnBox">
              <button className="cancelBtn" onClick={() => navigate("/")}>
                Cancel
              </button>
              <button
                className="signBtn"
                onClick={() => {
                  handleSignup();
                }}
              >
                Sign Up
              </button>
            </article>
          </section>
        </PsignPopupBox>
      </>
    );
}

const MsignPopupBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.66vw;
  padding: 6.94vw 6.94vw 20.83vw 6.94vw;

  header {
    display: flex;
    align-items: center;
    gap: 2.22vw;
    font-size: 5vw;

    .exitBtn {
      display: flex;
      align-items: center;

      img {
        width: 5vw;
      }
    }

    .title {
      color: #011218;
    }
  }

  .innerBox {
    .topArea {
      font-size: 3.88vw;
      font-weight: 500;
      padding: 0 0 3.33vw 0;
      border-bottom: 1px solid #000;
    }

    .inputArea {
      display: flex;
      flex-direction: column;
      gap: 8.33vw;
      padding: 6.11vw 0 0 0;

      .inputContainer {
        display: flex;
        flex-direction: column;
        gap: 3.33vw;

        .inputTitle {
          font-size: 4.44vw;
        }

        .ableBox {
          display: flex;
          flex-direction: column;
          gap: 1.66vw;
          font-size: 3.33vw;
          font-weight: 500;

          .able {
            color: #1c7eff;
          }

          .disable {
            color: #ff1c1c;
          }
        }

        .inputBox {
          flex: 1;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 4.44vw;
          min-height: 13.33vw;
          background: #f3f3f3;
          border-radius: 2.22vw;

          input {
            flex: 1;
            height: 13.33vw;
            font-size: 3.88vw;
          }

          textarea {
            flex: 1;
            height: 25vw;
            padding: 4.44vw 0;
            font-size: 3.88vw;
            background: none;

            &::-webkit-scrollbar {
              display: none;
            }
          }
        }

        &.name {
        }

        &.photo {
          .inputCont {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10vw;

            .profImgBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 33.33vw;
              height: 33.33vw;
              border: 1px dashed #d9d9d9;
              border-radius: 50%;
              position: relative;

              .innerBox {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 27.22vw;
                height: 27.22vw;
                font-size: 3.33vw;
                color: #7a7a7a;
                background: #f3f3f3;
                border-radius: inherit;

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: inherit;
                }
              }

              .imgAbs {
                width: 10vw;
                right: 0;
                bottom: 0;
                position: absolute;
              }
            }

            .bannerBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 86.11vw;
              height: 33.33vw;
              border: 1px dashed #d9d9d9;
              border-radius: 2.22vw;
              position: relative;

              .innerBox {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80.55vw;
                height: 27.22vw;
                font-size: 3.33vw;
                color: #7a7a7a;
                background: #f3f3f3;
                border-radius: inherit;

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: inherit;
                }
              }

              .imgAbs {
                width: 10vw;
                right: 0;
                bottom: -5vw;
                position: absolute;
              }
            }

            .explain {
              font-size: 2.77vw;
              line-height: 5vw;
              color: #7a7a7a;
            }
          }
        }

        &.address {
        }

        &.email {
          .explain {
            font-size: 2.77vw;
            line-height: 5vw;
            color: #7a7a7a;
          }
        }
      }
    }

    .chkList {
      display: flex;
      flex-direction: column;
      gap: 4.44vw;
      margin: 6.66vw 0 0 0;

      li {
        display: flex;
        gap: 4.44vw;
        font-size: 3.33vw;
        font-weight: 500;
        line-height: 5.55vw;

        .chkBtn {
          width: 5.55vw;
          min-width: 5.55vw;
          height: 5.55vw;
          border-radius: 0.55vw;
          border: 1px solid #000;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        u {
          color: #1c7eff;
        }
      }
    }

    .btnBox {
      display: flex;
      justify-content: center;
      gap: 2.77vw;
      margin: 16.66vw 0 0 0;

      button {
        flex: 1;
        height: 10.55vw;
        font-size: 3.88vw;
        font-weight: 700;
        border-radius: 7.77vw;

        &.cancelBtn {
          border: solid 1px #000;
        }

        &.signBtn {
          color: #fff;
          background: #000;
        }
      }
    }
  }
`;

const PsignPopupBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: relative;
  padding-bottom: 150px;
  padding-top: 190px;

  .popupBox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 900px;
    min-height: 90vh;
    padding: 56px 50px 40px 50px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .title {
      font-size: 22px;
      color: #011218;
    }

    .inputArea {
      border-top: solid 1px #000;
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin: 20px 0 0 0;
      padding-top: 30px;

      .inputContainer {
        display: flex;
        flex-direction: column;
        gap: 14px;

        .inputTitle {
          font-size: 18px;
        }

        .ableBox {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 12px;
          font-weight: 500;

          .able {
            color: #1c7eff;
          }

          .disable {
            color: #ff1c1c;
          }
        }

        .inputBox {
          flex: 1;
          display: flex;
          align-items: center;
          height: 56px;
          min-height: 56px;
          padding: 0 14px;
          background: #f3f3f3;
          border-radius: 8px;

          input {
            flex: 1;
            height: 100%;
            font-size: 14px;
          }
        }

        &.photo {
          .imageuploadbox {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            position: relative;
            .profileimage {
              cursor: pointer;
              display: flex;
              //width: 134px;
              //height: 120px;
              //padding:0;
              .outercircle {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 120px;

                border-radius: 60px;
                border: 2px dashed #e8e8e8;

                .innercircle {
                  flex-direction: column;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100px;
                  height: 100px;
                  background-color: #e8e8e8;
                  border-radius: 50px;
                  position: relative;
                  overflow: hidden;
                  span {
                    font-size: 12px;
                  }
                  img {
                    //pointer-events: none;
                    position: relative;
                    top: 0;
                    left: 0;
                    width: 100px;
                    height: 100px;
                    //z-index: -1;
                  }
                }
              }
              img {
                width: 38px;
                height: 38px;
                position: absolute;
                left: 82px;
                top: 82px;
              }
            }

            .profilebanner {
              cursor: pointer;
              display: flex;
              position: relative;
              .outercircle {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 640px;
                height: 120px;

                border-radius: 8px;
                border: 2px dashed #e8e8e8;

                .innercircle {
                  flex-direction: column;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 620px;
                  height: 100px;
                  background-color: #e8e8e8;
                  border-radius: 6px;
                  position: relative;
                  overflow: hidden;
                  span {
                    font-size: 12px;
                  }
                  img {
                    //pointer-events: none;
                    position: relative;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: inherit;
                    //z-index: -1;
                  }
                }
              }
              img {
                width: 38px;
                height: 38px;
                position: absolute;
                left: 621px;
                top: 82px;
              }
            }
          }

          .sign-imgbox {
            position: relative;
            background-size: contain;
            width: 120px;
            height: 120px;
          }
          .inputBar {
            display: flex;
            align-items: center;
            gap: 15px;

            .photoBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100px;
              height: 100px;
              border-radius: 20px;
              background: #f3f3f3;

              .camera {
                width: 30px;
              }
            }

            .nameBox {
              flex: 1;
              display: flex;
              align-items: center;
              gap: 20px;

              .registrationBtn {
                width: 160px;
                height: 56px;
                font-size: 16px;
                font-weight: 700;
                color: #fff;
                background: #222;
                border-radius: 8px;
              }
            }
          }
          p {
            font-size: 12px;
            font-weight: 500;
          }
        }
      }
    }

    .chkList {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 50px 0 0 0;

      li {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 16px;
        font-weight: 500;

        .chkBtn {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid #000;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .btnBox {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 80px 0 0 0;

      button {
        width: 240px;
        height: 56px;
        font-size: 22px;
        font-weight: 700;
        border-radius: 60px;

        &.cancelBtn {
          border: solid 2px #000;
        }

        &.signBtn {
          color: #fff;
          background: #000;
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: () => dispatch(setConnect()),
  };
}

//export default connect(mapStateToProps, mapDispatchToProps)(Signup);

//  return (
//    <MsignPopupBox style={{ height: boxRef.current?.offsetHeight * 1.2 }}>
//      <div className="popup info" id="info_popup">
//        <div className="box_wrap joinwidth" ref={boxRef}>
//          <div className="box m1">
//            <div className="top0 p0">
//              <h2>Sign up</h2>
//            </div>
//            <form>
//              <div className="form">
//                <div className="join j_file">
//                  <h3>Photo registration</h3>
//                  <ul>
//                    <li>
//                      <div className="photo">
//                        <input
//                          ref={photoRef}
//                          type="file"
//                          name
//                          id="file"
//                          onChange={(e) => onchangePhoto(e.target.files[0])}
//                        />
//                        {photo ? (
//                          <button
//                            className="photoBtn"
//                            onClick={() => photoRef.current.click()}
//                          >
//                            <img src={photo} alt="" />
//                          </button>
//                        ) : (
//                          <label htmlFor="file"></label>
//                        )}
//                      </div>
//                      <div className="filename">
//                        <input
//                          value={photoName}
//                          onChange={(e) => setPhotoName(e.target.value)}
//                          placeholder="You can register photos up to 200MB or less."
//                        />
//                        <p></p>
//                      </div>
//                    </li>

//                    <li>
//                      <a>Registration</a>
//                    </li>
//                  </ul>
//                </div>
//                <div className="user join">
//                  <h3>User name</h3>
//                  <textarea
//                    type="text"
//                    value={username}
//                    style={
//                      !usernameChk
//                        ? { border: "1px solid red", overflow: "hidden" }
//                        : {}
//                    }
//                    onChange={(e) => setUsername(e.target.value)}
//                    placeholder="Less than 5-20 characters, only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
//                  ></textarea>
//                  <span style={!usernameChk ? { display: "none" } : {}}>
//                    Usernames that can be used
//                  </span>
//                  <span
//                    className="red"
//                    style={usernameChk ? { display: "none" } : {}}
//                  >
//                    Invalid nickname. It must be less than 20 characters.
//                  </span>
//                </div>
//                <div className="w_adress join">
//                  <h3>Wallet adress</h3>
//                  <input
//                    type="text"
//                    value={address}
//                    onChange={(e) => {
//                      setAddress(e.target.value);
//                    }}
//                    placeholder="Please enter your wallet address"
//                    disabled
//                  />
//                </div>
//                <div className="email join">
//                  <h3>Email</h3>
//                  <input
//                    type="email"
//                    value={email}
//                    onChange={(e) => setEmail(e.target.value)}
//                    placeholder="Please enter your email address"
//                    style={!emailChk ? { border: "1px solid red" } : {}}
//                  />
//                  <span style={!emailChk ? { display: "none" } : {}}>
//                    A valid email address.
//                  </span>
//                  <span
//                    className="red"
//                    style={emailChk ? { display: "none" } : {}}
//                  >
//                    This is an invalid email address.
//                  </span>
//                </div>
//                <div className="check">
//                  <ul>
//                    <li>
//                      <input
//                        type="checkbox"
//                        id="agree"
//                        checked={ageCheck}
//                        onChange={(e) => {
//                          setAgeCheck(e.target.checked);
//                        }}
//                      />
//                      <label htmlFor="agree">
//                        <h4>19 years of age or older (required)</h4>
//                      </label>
//                    </li>
//                    <li>
//                      <input
//                        type="checkbox"
//                        id="agree2"
//                        checked={subCheck}
//                        onChange={(e) => {
//                          setSubCheck(e.target.checked);
//                        }}
//                      />
//                      <label htmlFor="agree2">
//                        <h4>
//                          Subscribe <a>Terms of Service</a> (required)
//                        </h4>
//                      </label>
//                    </li>
//                    <li>
//                      <input
//                        type="checkbox"
//                        id="agree3"
//                        checked={infoCheck}
//                        onChange={(e) => {
//                          setInfoCheck(e.target.checked);
//                        }}
//                      />
//                      <label htmlFor="agree3">
//                        <h4>
//                          <a>
//                            Personal Information Collection
//                            <br /> and Usage
//                          </a>{" "}
//                          Agreement (required)
//                        </h4>
//                      </label>
//                    </li>
//                  </ul>
//                </div>
//              </div>
//              <div className="btn sign4">
//                <ul>
//                  <li>
//                    <a onClick={() => navigate("/")}>Cancel</a>
//                  </li>
//                  <li>
//                    <a onClick={handleSignup}>Sign Up</a>
//                  </li>
//                </ul>
//              </div>
//            </form>
//          </div>
//        </div>
//      </div>

//      <section id="sub">
//        <article className="popup_box"></article>
//      </section>
//    </MsignPopupBox>
//  )

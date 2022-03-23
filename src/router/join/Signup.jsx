import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";
import SetErrorBar from "../../util/SetErrorBar";
import SentEmailDetail from "./SentEmailDetail";

import I_camera from "../../img/icons/I_camera.png";
import I_x from "../../img/icons/I_x.svg";
import I_chkBtn from "../../img/design/I_chkBtn.png";

import { useEffect, useRef, useState } from "react";
import { encodeBase64ImageFile, getuseraddress } from "../../util/common";
import { ERR_MSG } from "../../config/messages";
import axios from "axios";
import { API } from "../../config/api";

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
  const photoRef = useRef();

  const isMobile = useSelector((state) => state.common.isMobile);
  const {walletAddress} = useSelector((state) => state.user);

  const [photo, setPhoto] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameChk, setUsernameChk] = useState(false);
  const [usernameAlarm, setUsernameAlarm] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailChk, setEmailChk] = useState(false);
  const [emailAlarm, setEmailAlarm] = useState("");
  const [imgFile, setImgFile] = useState();
  const [ageCheck, setAgeCheck] = useState(false);
  const [subCheck, setSubCheck] = useState(false);
  const [infoCheck, setInfoCheck] = useState(false);
  const [fileChk, setFileChk] = useState(true);
  const [profId, setProfId] = useState()
  const [profResp, setProfResp] = useState()
  const [profUrl, setProfUrl] = useState()
  const [signupsuccess, setSignupsuccess] = useState(false);


  function onchangePhoto(file) {
    if (!file) return;
    const fileLength = file.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();
    if(MAP_fileextension_contentype[fileType]=='image'){
    setPhotoName(file.name);
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      setPhoto(reader.result);
    };
  }
  }

  const fileUpload = async (file) => {
    if (!file) {
      return;
    }
    
    const fileLength = file.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();

    if(MAP_fileextension_contentype[fileType]!='image'){SetErrorBar('This is not an image file');return;}
    let filesize = file.size;
    if (file && filesize > 0) {
      setFileChk(true);
      try {
        if (filesize <= 40 * megaBytes) {
          let formData = new FormData();
          formData.append("file", file);
          formData.append("filename", file.name);
          formData.append("username", walletAddress);
          const resp = await axios.post(API.API_USER_PROF_UPLOAD, formData);
          console.log("eERWguRnGR", resp.data);
          let { status, payload, respdata } = resp.data;
          if (status == "OK") {
            setProfId(respdata);
            setProfResp(resp.data);
            setProfUrl(payload.url);
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
    console.log('finally')
    const asyncSignup = async () => {
      const regData = {
        username: address,
        address: address,
        email: email,
        nickname: username,
        imagebase64: "",
        imagefilename: "",
        verified: false
      };
      try {
              //console.log({...regData, imagefilename: respdata});
              if(!profUrl)setProfUrl("https://i.imgur.com/UPgG53R.jpeg")
              let addressChk = await window.klaytn.enable()
              if (addressChk[0]!=address){SetErrorBar('DIFFERENT WALLET ADDRESS'); return;}
              const resp = await axios.post(API.API_USER_JOIN, {...regData, profileimageurl: profUrl});
              console.log(resp);
              if (resp.data.status === "OK") {
                setSignupsuccess(true)
              } else {
          // 서버 전송실패 예외처리
                if (resp.data.message === "DATA-DUPLICATE") {
                  switch (resp.data.reason) {
                    case "address":
                      alert(ERR_MSG.ERR_DUPLICATE_ADDRESS);
                      break;
                    case "email":
                      alert(ERR_MSG.ERR_DUPLICATE_EMAIL);
                      break;
                    case "nickname":
                      alert('닉네임 중복')
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
    const regUsername = /^[가-힣a-zA-z\-\_\,]+$/;
    console.log(regUsername.test(username))
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
    const regUsername = /^[가~힣a~zA~z\-\_\,]+$/;

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
  }, [ email ] )

  useEffect(() => {		// address 없을경우
    if ( walletAddress === null ) {
      alert ( ERR_MSG.ERR_NO_ADDRESS )
			navigate ( "/connectwallet" )
//			navigate ( "/connectwallet" )
      return
    } else {
      setAddress ( walletAddress )
    }
  }, [ walletAddress ] )

  if (isMobile)
    return (
      <MsignPopupBox style={{ height: boxRef.current?.offsetHeight * 1.2 }}>
        <section className="popupBox">
          <button className="exitBtn" onClick={() => navigate("/")}>
            <img src={I_x} alt="" />
          </button>

          <strong className="title">Sign up</strong>

          <article className="inputArea">
            <div className="inputContainer photo">
              <strong className="inputTitle">Photo registration</strong>

              <div className="inputBar">
                {!photo?(
                <button
                  className="photoBtn"
                  onClick={() => photoRef.current.click()}
                >
                  <img className="camera" src={I_camera} alt="" />
                  <input
                    className="nospace"
                    type="file"
                    accept="image/*"
                    ref={photoRef}
                    value={photo}
                    onChange={(e) => onchangePhoto(e.target.files[0])}
                  />
                </button>):(
                  <a></a>
                )
}
                <div className="nameBox">
                  <div className="inputBox">
                    <input
                      value={photoName}
                      onChange={(e) => setPhotoName(e.target.value)}
                      placeholder="You can register photos up to 200MB or less."
                    />
                  </div>

                  <button className="registrationBtn" onClick={() => {}}>
                    Registration
                  </button>
                </div>
              </div>
            </div>

            <div className="inputContainer name">
              <strong className="inputTitle">User name</strong>

              <div className="ableBox">
                <div className="inputBox">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Less than 5-20 characters, only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
                  />
                </div>
                {usernameChk && <p className="able">Usernames that can be used</p>}
                {username && !usernameChk && (
                  <p className="disable">
                    {usernameAlarm}
                  </p>
                )}
              </div>
            </div>

            <div className="inputContainer address">
              <strong className="inputTitle">Wallet adress</strong>

              <div className="inputBox">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Please enter your wallet address"
                />
              </div>
            </div>

            <div className="inputContainer email">
              <strong className="inputTitle">Email</strong>

              <div className="ableBox">
                <div className="inputBox">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email address"
                  />
                </div>
                {emailChk && <p className="able">A valid email address.</p>}
                {email && !emailChk && (
                  <p className="disable">This is an invalid email address.</p>
                )}
              </div>
            </div>
          </article>

          <ul className="chkList">
            <li>
              <button className="chkBtn" onClick={(e)=>{setAgeCheck(!ageCheck)}}>
                {ageCheck && <img src={I_chkBtn} alt="" />}
              </button>

              <p>19 years of age or older (required)</p>
            </li>

            <li>
              <button className="chkBtn" onClick={(e)=>{setSubCheck(!subCheck)}}>
                {subCheck && <img src={I_chkBtn} alt="" />}
              </button>

              <p>
                Subscribe <u>Terms of Service</u> (required)
              </p>
            </li>

            <li>
              <button className="chkBtn" onClick={(e)=>{setInfoCheck(!infoCheck)}}>
                {infoCheck && <img src={I_chkBtn} alt="" />}
              </button>

              <p>
                <u>
                  Personal Information Collection
                  <br />
                  and Usage
                </u>{" "}
                Agreement (required)
              </p>
            </li>
          </ul>

          <article className="btnBox">
            <button className="cancelBtn" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button className="signBtn" onClick={handleSignup}>
              Sign Up
            </button>
          </article>
        </section>
      </MsignPopupBox>
    );
  else
    return (
      <>
      {signupsuccess && <SentEmailDetail email={email}/>}
      <PsignPopupBox>
        
        <section className="popupBox">
          <strong className="title">Sign up</strong>

          <article className="inputArea">
            <div className="inputContainer photo">
              <strong className="inputTitle">Photo registration</strong>
              {photo? (<><img src={photo} /></>):<></>}
              <div className="inputBar">
                
                <button
                  className="photoBtn"
                  onClick={() => photoRef.current.click()}
                >
                  <img className="camera" src={I_camera} alt="" />
                  <input
                    className="nospace"
                    type="file"
                    accept="image/*"
                    ref={photoRef}
                    onChange={(e) => {fileUpload(e.target.files[0]);
                      onchangePhoto(e.target.files[0])}}
                  />
                </button>

                <div className="nameBox">
                  <div className="inputBox">
                    <input
                      value={photoName}
                      onChange={(e) => setPhotoName(e.target.value)}
                      placeholder="You can register photos up to 200MB or less."
                    />
                  </div>

                  <button className="registrationBtn" onClick={() => {}}>
                    Registration
                  </button>
                </div>
              </div>
            </div>

            <div className="inputContainer name">
              <strong className="inputTitle">User name</strong>

              <div className="ableBox">
                <div className="inputBox">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Less than 5-20 characters, only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
                  />
                </div>
                {usernameChk && <p className="able">Usernames that can be used</p>}
                {!usernameChk && (
                  <p className="disable">
                    {usernameAlarm}
                  </p>
                )}
              </div>
            </div>

            <div className="inputContainer address">
              <strong className="inputTitle">Wallet adress</strong>

              <div className="inputBox">
                <input
                  value={walletAddress}
                  readOnly
                  placeholder="Please enter your wallet address"
                />
              </div>
            </div>

            <div className="inputContainer email">
              <strong className="inputTitle">Email</strong>

              <div className="ableBox">
                <div className="inputBox">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email address"
                  />
                </div>
                {emailChk && <p className="able">A valid email address.</p>}
                {!emailChk && (
                  <p className="disable">This is an invalid email address.</p>
                )}
              </div>
            </div>
          </article>

          <ul className="chkList">
            <li>
              <button className="chkBtn" onClick={(e)=>{setAgeCheck(!ageCheck)}}>
                {ageCheck && <img src={I_chkBtn} alt="" />}
              </button>

              <p>19 years of age or older (required)</p>
            </li>

            <li>
              <button className="chkBtn" onClick={(e)=>{setSubCheck(!subCheck)}}>
                {subCheck && <img src={I_chkBtn} alt="" />}
              </button>

              <p>
                Subscribe <u>Terms of Service</u> (required)
              </p>
            </li>

            <li>
              <button className="chkBtn" onClick={(e)=>{setInfoCheck(!infoCheck)}}>
                {infoCheck && <img src={I_chkBtn} alt="" />}
              </button>
              

              <p>
                <u>Personal Information Collection and Usage</u> Agreement
                (required)
              </p>
            </li>
          </ul>

          <article className="btnBox">
            <button className="cancelBtn" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button className="signBtn" onClick={()=>{handleSignup()}}>
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
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  .popupBox {
    display: flex;
    flex-direction: column;
    width: 88.88vw;
    max-height: 90vh;
    padding: 6.66vw 4.44vw 11.11vw 4.44vw;
    background: #fff;
    border-radius: 5.55vw;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .exitBtn {
      width: 5vw;
      align-self: flex-end;
    }

    .title {
      margin: 3.88vw 0 0 0;
      font-size: 6.11vw;
      color: #011218;
    }

    .inputArea {
      display: flex;
      flex-direction: column;
      gap: 5.55vw;
      margin: 11.11vw 0 0 0;

      .inputContainer {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;

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
          height: 13.33vw;
          min-height: 13.33vw;
          padding: 0 2.77vw;
          background: #f3f3f3;
          border-radius: 2.22vw;

          input {
            flex: 1;
            height: 100%;
            font-size: 3.88vw;
          }
        }

        &.photo {
          .inputBar {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5.55vw;

            .photoBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 22.22vw;
              height: 22.22vw;
              border-radius: 2.22vw;
              background: #f3f3f3;

              .camera {
                width: 8.33vw;
              }
            }

            .nameBox {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.66vw;
              width: 100%;

              .registrationBtn {
                width: 34.44vw;
                height: 10.55vw;
                font-size: 3.88vw;
                font-weight: 500;
                color: #fff;
                background: #222;
                border-radius: 2.22vw;
              }
            }
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
        font-size: 3.88vw;
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  .popupBox {
    display: flex;
    flex-direction: column;
    width: 900px;
    max-height: 90vh;
    padding: 56px 50px 40px 50px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .title {
      font-size: 22px;
      color: #011218;
    }

    .inputArea {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin: 50px 0 0 0;

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
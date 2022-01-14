import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import I_camera from "../img/main/I_camera.svg";

import "../css/common.css";
import "../css/font.css";
import "../css/layout.css";
import "../css/style.css";

// import "./css/style01.css";
// import "./css/style02.css";

import "../css/header.css";
import "../css/footer.css";
import "../css/swiper.min.css";

import { useEffect, useRef, useState } from "react";
import { encodeBase64ImageFile, getuseraddress } from "../util/common";
import { ERR_MSG } from "../config/messages";
import axios from "axios";
import { API } from "../config/api";

function Signup({ store, setConnect }) {
  const navigate = useNavigate();
  const boxRef = useRef();
  const photoRef = useRef();

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
  const userAddress = useSelector((state) => state.wallet.address);
  function onchangePhoto(file) {
    let reader = new FileReader();
    setImgFile(file);
    reader.readAsDataURL(file);
    setPhotoName(file.name);

    reader.onload = function () {
      setPhoto(reader.result);
    };
  }

  const handleSignup = () => {
    const asyncSignup = async () => {
      const regData = {
        username: username,
        address: address,
        email: email,
        imagebase64: "",
        imagefilename: "",
      };
      if (imgFile) {
        const imagebase64 = await encodeBase64ImageFile(imgFile);
        regData.imagebase64 = imagebase64;
        regData.imagefilename = imgFile.name;
      }
      try {
        console.log(regData);
        const resp = await axios.post(API.API_USER_JOIN, regData);
        console.log(resp);
        if (resp.data.status === "OK") {
          navigate("/sentemaildetail");
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
    if (username.length < 5 || username.length > 20) {
      setUsernameChk(false);
      setUsernameAlarm("Invalid nickname. It must be less than 20 characters.");
      return;
    }

    /*
    const regUsername = /^[가~힣a~zA~z\-\_\,]+$/;

    if (!regUsername.test(username)) {
      setUsernameChk(false);
      setUsernameAlarm(
        "Invalid nickname. Only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
      );
      return;
    }
	*/

    setUsernameChk(true);
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
    // address 없을경우
    if (userAddress === null) {
      alert(ERR_MSG.ERR_NO_ADDRESS);
      navigate("/");
      return;
    } else {
      setAddress(userAddress);
    }
  }, [userAddress]);

  return (
    <SignPopupBox style={{ height: boxRef.current?.offsetHeight * 1.2 }}>
      <div class="popup info" id="info_popup">
        <div class="box_wrap joinwidth" ref={boxRef}>
          <div class="box m1">
            <div class="top0 p0">
              <h2>Sign up</h2>
            </div>
            <form>
              <div class="form">
                <div class="join j_file">
                  <h3>Photo registration</h3>
                  <ul>
                    <li>
                      <div class="photo">
                        <input
                          ref={photoRef}
                          type="file"
                          name
                          id="file"
                          onChange={(e) => onchangePhoto(e.target.files[0])}
                        />
                        {photo ? (
                          <button
                            className="photoBtn"
                            onClick={() => photoRef.current.click()}
                          >
                            <img src={photo} alt="" />
                          </button>
                        ) : (
                          <label for="file"></label>
                        )}
                      </div>
                      <div class="filename">
                        <input
                          value={photoName}
                          onChange={(e) => setPhotoName(e.target.value)}
                          placeholder="You can register photos up to 200MB or less."
                        />
                        <p></p>
                      </div>
                    </li>

                    <li>
                      <a>Registration</a>
                    </li>
                  </ul>
                </div>
                <div class="user join">
                  <h3>User name</h3>
                  <textarea
                    type="text"
                    value={username}
                    style={
                      !usernameChk
                        ? { border: "1px solid red", overflow: "hidden" }
                        : {}
                    }
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Less than 5-20 characters, only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
                  ></textarea>
                  <span style={!usernameChk ? { display: "none" } : {}}>
                    Usernames that can be used
                  </span>
                  <span
                    class="red"
                    style={usernameChk ? { display: "none" } : {}}
                  >
                    Invalid nickname. It must be less than 20 characters.
                  </span>
                </div>
                <div class="w_adress join">
                  <h3>Wallet adress</h3>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Please enter your wallet address"
                    disabled
                  />
                </div>
                <div class="email join">
                  <h3>Email</h3>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email address"
                    style={!emailChk ? { border: "1px solid red" } : {}}
                  />
                  <span style={!emailChk ? { display: "none" } : {}}>
                    A valid email address.
                  </span>
                  <span class="red" style={emailChk ? { display: "none" } : {}}>
                    This is an invalid email address.
                  </span>
                </div>
                <div class="check">
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        name=""
                        id="agree"
                        checked={ageCheck}
                        onChange={(e) => {
                          setAgeCheck(e.target.checked);
                        }}
                      />
                      <label for="agree">
                        <h4>19 years of age or older (required)</h4>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name=""
                        id="agree2"
                        checked={subCheck}
                        onChange={(e) => {
                          setSubCheck(e.target.checked);
                        }}
                      />
                      <label for="agree2">
                        <h4>
                          Subscribe <a>Terms of Service</a> (required)
                        </h4>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name=""
                        id="agree3"
                        checked={infoCheck}
                        onChange={(e) => {
                          setInfoCheck(e.target.checked);
                        }}
                      />
                      <label for="agree3">
                        <h4>
                          <a>
                            Personal Information Collection
                            <br /> and Usage
                          </a>{" "}
                          Agreement (required)
                        </h4>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="btn sign4">
                <ul>
                  <li>
                    <a onClick={() => navigate("/")}>Cancel</a>
                  </li>
                  <li>
                    <a onClick={handleSignup}>Sign Up</a>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>

      <section id="sub">
        <article class="popup_box"></article>
      </section>
    </SignPopupBox>
  );
}

const SignPopupBox = styled.div`
  .photoBtn {
    border-radius: 8px;
    overflow: hidden;
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

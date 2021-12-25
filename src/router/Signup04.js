import { connect } from "react-redux";
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
import WalletConnectSDK from "walletconnect";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function Signup02({ store, setConnect }) {
  const navigate = useNavigate();
  const photoRef = useRef();

  const [photo, setPhoto] = useState("");
  const [photoName, setPhotoName] = useState("");

  const [username, setUsername] = useState("");
  const [usernameChk, setUsernameChk] = useState(false);
  const [usernameAlarm, setUsernameAlarm] = useState("");

  const [email, setEmail] = useState("");
  const [emailChk, setEmailChk] = useState(false);
  const [emailAlarm, setEmailAlarm] = useState("");

  function onchangePhoto(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    setPhotoName(file.name);

    reader.onload = function () {
      setPhoto(reader.result);
    };
  }

  useEffect(() => {
    if (username.length < 5 || username.length > 20) {
      setUsernameChk(false);
      setUsernameAlarm("Invalid nickname. It must be less than 20 characters.");
      return;
    }

    const regUsername = /^[가~힣a~zA~z\-\_\,]+$/;

    if (!regUsername.test(username)) {
      setUsernameChk(false);
      setUsernameAlarm(
        "Invalid nickname. Only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
      );
      return;
    }

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

  return (
    <SignPopupBox>
      <div class="popup info" id="info_popup">
        <div class="box_wrap joinwidth">
          <div className="innerBox">
            <a onClick={() => navigate(-1)} class="close" id="info_close">
              <img src={require("../img/sub/icon_close.png").default} alt="" />
            </a>
            <div class="box m1">
              <div class="top0 p0">
                <h2>Sign up</h2>
              </div>
              <form>
                <div class="form">
                  <div class="join j_file">
                    <h3>Photo registration</h3>
                    <div className="enrollPhotoBox">
                      <span
                        className="cameraBtn"
                        style={{
                          backgroundImage: photo && `url(${photo})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                        onClick={() => photoRef.current.click()}
                      >
                        {!photo && <img src={I_camera} alt="" />}
                        <input
                          type="file"
                          ref={photoRef}
                          onChange={(e) => onchangePhoto(e.target.files[0])}
                        />
                      </span>

                      <span className="textBox">
                        <div
                          className="filename"
                          style={{ color: photoName && "#000" }}
                        >
                          {photoName
                            ? photoName
                            : "You can register photos up to 200MB or less."}
                        </div>

                        <button className="regBtn">Registration</button>
                      </span>
                    </div>
                  </div>
                  <div class="user join">
                    <h3>User name</h3>
                    <textarea
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Less than 5-20 characters, only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
                    ></textarea>
                    {usernameChk ? (
                      <span>Usernames that can be used</span>
                    ) : (
                      <span class="red">{usernameAlarm}</span>
                    )}
                  </div>
                  <div class="w_adress join">
                    <h3>Wallet adress</h3>
                    <input
                      type="text"
                      placeholder="Please enter your wallet address"
                    />
                  </div>
                  <div class="email join">
                    <h3>Email</h3>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Please enter your email address"
                    />
                    {emailChk ? (
                      <span>A valid email address.</span>
                    ) : (
                      <span class="red">{emailAlarm}</span>
                    )}
                  </div>
                  <div class="check">
                    <ul>
                      <li>
                        <input type="checkbox" name="" id="agree" />
                        <label for="agree">
                          <h4>19 years of age or older (required)</h4>
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" name="" id="agree2" />
                        <label for="agree2">
                          <h4>
                            Subscribe <a>Terms of Service</a>(required)
                          </h4>
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" name="" id="agree3" />
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
                      <a onClick={() => navigate("/signup05")}>Sign Up</a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
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
  .box_wrap.joinwidth {
    width: 1000px;

    .box {
      form {
        .form {
          .j_file {
            .enrollPhotoBox {
              display: flex;
              align-items: flex-end;
              gap: 30px;

              .cameraBtn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 120px;
                padding: 0;
                border-radius: 8px;
                background: #f3f3f3;
                position: relative;
                cursor: pointer;

                img {
                  width: 30px;
                }

                input {
                  position: absolute;
                  min-width: unset;
                  width: 0;
                  height: 0;
                  padding: 0;
                }
              }

              .textBox {
                flex: 1;
                display: flex;
                width: 100%;
                gap: 9px;
                overflow: hidden;

                .filename {
                  flex: 1;
                  width: 100%;
                  height: 62px;
                  line-height: 62px;
                  padding: 0 20px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  font-size: 18px;
                  color: #b2b2b2;
                  border-radius: 8px;
                  background-color: #f3f3f3;
                }

                .regBtn {
                  width: 160px;
                  height: 62px;
                  font-size: 18px;
                  color: #fff;
                  background-color: #222;
                  border-radius: 8px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .box_wrap {
      .innerBox {
        .box {
          form {
            .form {
              .j_file {
                .enrollPhotoBox {
                  flex-direction: column;
                  align-items: center;

                  .textBox {
                    flex-direction: column;
                    align-items: center;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 640px) {
    .box_wrap {
      .innerBox {
        .box {
          form {
            .form {
              .j_file {
                .enrollPhotoBox {
                  flex-direction: column;
                  align-items: center;
                  gap: 20px;

                  .cameraBtn {
                    width: 80px;
                    height: 80px;
                  }

                  .textBox {
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;

                    .filename {
                      height: 48px;
                      font-size: 14px;
                      line-height: 48px;
                    }

                    .regBtn {
                      width: 124px;
                      height: 38px;
                      font-size: 14px;
                    }
                  }
                }
              }
            }
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup02);

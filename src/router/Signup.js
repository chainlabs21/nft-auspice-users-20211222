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

import { useEffect, useRef, useState } from "react";

function Signup({ store, setConnect }) {
  const navigate = useNavigate();
  const boxRef = useRef();
  const photoRef = useRef();

  const [photo, setPhoto] = useState("");
  const [photoName, setPhotoName] = useState("");

  const [username, setUsername] = useState("");
  const [usernameChk, setUsernameChk] = useState(false);
  const [usernameAlarm, setUsernameAlarm] = useState("");

  const [adress, setAdress] = useState("");

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
                      <a href="">Registration</a>
                    </li>
                  </ul>
                </div>
                <div class="user join">
                  <h3>User name</h3>
                  <textarea
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Less than 5-20 characters, only Korean, English uppercase and lowercase letters, and special characters (- , _) are allowed."
                  ></textarea>
                  <span>Usernames that can be used</span>
                  <span class="red">
                    Invalid nickname. It must be less than 20 characters.
                  </span>
                </div>
                <div class="w_adress join">
                  <h3>Wallet adress</h3>
                  <input
                    type="text"
                    value={adress}
                    onChange={e=>setAdress(e.target.value)}
                    placeholder="Please enter your wallet address"
                  />
                </div>
                <div class="email join">
                  <h3>Email</h3>
                  <input
                    type="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder="Please enter your email address"
                  />
                  <span>A valid email address.</span>
                  <span class="red">This is an invalid email address.</span>
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
                          Subscribe <a href="">Terms of Service</a>(required)
                        </h4>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="agree3" />
                      <label for="agree3">
                        <h4>
                          <a href="">
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
                    <a onClick={() => navigate("/sentemail")}>Sign Up</a>
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

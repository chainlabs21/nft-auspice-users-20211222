import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
//import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { ERR_MSG } from "../../config/messages";
import axios from "axios";
import { API } from "../../config/api";
import { useTranslation } from "react-i18next";

export default function EmailChange() {
  const { t }  = useTranslation(['locale'])
  const navigate = useNavigate();
  const boxRef = useRef();
  const photoRef = useRef();

  const [address , setAddress ] = useState("")
  const [email, setEmail] = useState("");
  const [emailChk, setEmailChk] = useState(false);
  const [emailAlarm, setEmailAlarm] = useState("");

  const userAddress = useSelector((state) => state.user);
  console.log(userAddress)

  const handleSignup = () => {
    const asyncSignup = async () => {
      const regData = {
        address: address,
        email: email,
        verified: false,
      };

      try {
        console.log(regData);
        const resp = await axios.post(API.API_USER_CHANGE_MAIL, regData);
        console.log(resp);
        if (resp.data.status === "OK") {
          navigate("/sentemaildetail");
        } else {
          // 서버 전송실패 예외처리
          if ( resp.data.message === "DATA-DUPLICATE") {
            switch ( resp.data.reason ) {
              case "address" :
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
    if (!emailChk) {
      alert ( ERR_MSG.ERR_REG_EMAIL )
      return;
    }
    asyncSignup();
  };

  useEffect(() => {
    let regEmail =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    if (!regEmail.test(email)) {
      setEmailChk(false);
      setEmailAlarm("This is an invalid email address.");
      return;
    }
    async function checksame(){
      const resp = await axios.get(API.API_USER_EXISTS(email, 'email'))
      if (resp.data.payload.exists==1){
        setEmailAlarm("E-mail already exissts");
        setEmailChk(false);
      }
    }
    checksame()
    setEmailChk(true);
  }, [ email ] )

  useEffect(() => {		// address 없을경우
    if ( userAddress === null ) {
      alert ( ERR_MSG.ERR_NO_ADDRESS )
			navigate ( "/connectwallet" )
//			navigate ( "/connectwallet" )
      return
    } else {
      setAddress ( userAddress )
    }
  }, [ userAddress ] )
  return (
    <SignPopupBox style={{ height: boxRef.current?.offsetHeight * 1.2 }}>
      <div className="popup info" id="info_popup">
        <div className="box_wrap joinwidth" ref={boxRef}>
          <div className="box m1">
            <div className="top0 p0">
              <h2>Mail Change</h2>
            </div>
            <form>
              <div className="form">
                <div className="email join">
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
                  <span className="red" style={emailChk ? { display: "none" } : {}}>
                    {emailAlarm}
                  </span>
                </div>
              </div>
              <div className="btn sign4">
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
        <article className="popup_box"></article>
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

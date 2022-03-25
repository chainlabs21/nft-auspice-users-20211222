import { connect, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import re from "../../img/sub/re.png";
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

export default function MyPageHeader({ address, targetData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isMobile = useSelector((state) => state.common.isMobile);
  const [toggleFilter, setToggleFilter] = useState(false);
  let [listitems, setlistitems] = useState([]);
  const [nickname, setNickname] = useState("Username");
  const [desc, setDesc] = useState("Description");
  const [imageUrl, setImageUrl] = useState("");
  const [orderkey, setOrderkey] = useState(0);
  const [targettData, setTargettData] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [myAddress, setMyAddress] = useState();

  const { userData, isloggedin, walletAddress } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
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
  });
  useEffect(() => {
    if (targettData) {
      setNickname(targettData.nickname);
      setDesc(targettData.description);
      setImageUrl(targettData.profileimageurl);
      setMyAddress(targettData.username);
    }
  }, [targettData]);

  // useEffect(()=>{
  //   if (userData instanceof Object && userData['myinfo_maria'] !== undefined){
  //     setNickname(userData.myinfo_maria.nickname)
  //     setDesc(userData.myinfo_maria.description)
  //     setImageUrl(userData.myinfo_maria.profileimageurl)
  //   }
  // }, [userData])

  if (isMobile)
    return (
      <MMyPageHeader>
        <header className="myProfHeader">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${home_bg})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          <div className="contBox">
            <img className="profImg" src={imageUrl}/>
            <div className="btnBox">
              <button className="" onClick={() => {}}>
                <img src={re} alt="" />
              </button>
              <button className="" onClick={() => {}}>
                <img src={share} alt="" />
              </button>
            </div>

            <div className="infoBox">
              <strong className="title">{nickname}' Items</strong>
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
              className="bg"
              style={{
                backgroundImage: `url(${home_bg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />

            <div className="contBox">
              <img className="profImg" src={imageUrl}></img>
              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={re} alt="" />
                </button>
                <button className="" onClick={() => {}}>
                  <img src={share} alt="" />
                </button>
              </div>

              <div className="infoBox">
                <strong className="title">{nickname}'s Items</strong>
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
    .bg {
      height: 320px;
    }

    .contBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      max-width: 1280px;
      margin: 0 auto;

      .profImg {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: #000;
        top: -70px;
        position: absolute;
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

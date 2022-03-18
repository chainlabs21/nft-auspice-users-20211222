import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setConnect } from "../../util/store";
import styled from "styled-components";
import collect_img from "../../img/sub/collect_img.png";
import collect_img2 from "../../img/sub/collect_img2.png";
import collect_img3 from "../../img/sub/collect_img3.png";
import collect_img4 from "../../img/sub/collect_img4.png";
import s2 from "../../img/sub/s2.png";
import s3 from "../../img/sub/s3.png";
import s4 from "../../img/sub/s4.png";
import s5 from "../../img/sub/s5.png";
import s9 from "../../img/sub/s9.png";
import s8 from "../../img/sub/s8.png";
import sample from "../../img/sub/sample.png";
import click1 from "../../img/sub/click1.png";

import { API } from "../../config/api";
import { useState, useEffect } from "react";
import { LOGGER, STRINGER } from "../../util/common";
import { applytoken } from "../../util/rest";
import { getmyaddress, getrandomwords } from "../../util/common";
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../config/messages";
import { generateSlug } from "random-word-slugs";
import { strDot } from "../../util/Util";
import Settingssidepanel from "../../components/Settingssidepanel";
import DetailHeader from "../../components/header/DetailHeader";
import AccountLeftBar from "../../components/accountSetting/AccountLeftBar";
import DefaultHeader from "../../components/header/DefaultHeader";
import axios from 'axios';

export default function GeneralSettings({ store, setConnect }) {
  const navigate = useNavigate();
  const {isloggedin, userData, walletAddress} = useSelector((state)=>state.user)
  const { state } = useLocation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [toggleLeftBar, setToggleLeftBar] = useState(!state?.toggle);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  useEffect(()=>{
    setNickname(userData.myinfo_maria?.nickname)
    setDescription(userData.myinfo_maria?.description)
    setEmail(userData.myinfo_maria?.email)

  },[])
  const onClickSave=()=>{
    let reqbody = {
      description,
      nickname,
    };
    axios.put(`${API.API_MYINFO}`, reqbody).then((resp) => {
      LOGGER("", resp.data); // }/users/user/myinfo`
      let { status } = resp.data;
      if (status == "OK") {
        SetErrorBar(messages.MSG_DONE_REGISTERING);
        return;
      }
    });
  }

  if (isMobile)
    return (
      <>
        {toggleLeftBar ? (
          <AccountLeftBar off={setToggleLeftBar} />
        ) : (
          <DetailHeader
            title="General settings"
            off={() => setToggleLeftBar(true)}
          />
        )}

        <MgeneralSettingsBox>
          <section className="innerBox">
            <article className="contArea">
              <div className="inputList">
                <li className="nickname">
                  <strong className="title">User name</strong>

                  <div className="inputBox">
                    <input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Please enter your username"
                    />
                  </div>
                </li>

                <li className="description">
                  <strong className="title">User name</strong>

                  <div className="inputBox">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please enter your introduction"
                    />
                  </div>
                </li>

                <li className="email">
                  <strong className="title">Email Address</strong>

                  <div className="inputBox">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Please enter your email address"
                    />
                  </div>
                </li>
              </div>

              <button className="logoutBtn" onClick={() => {}}>
                Save
              </button>
            </article>
          </section>
        </MgeneralSettingsBox>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <AccountLeftBar />

        <PgeneralSettingsBox>
          <section className="innerBox">
            <strong className="pageTitle">General Settings</strong>

            <article className="contArea">
              <div className="inputList">
                <li className="nickname">
                  <strong className="title">User name</strong>

                  <div className="inputBox">
                    <input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Please enter your username"
                    />
                  </div>
                </li>

                <li className="description">
                  <strong className="title">Description</strong>

                  <div className="inputBox">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please enter your introduction"
                    />
                  </div>
                </li>

                <li className="email">
                  <strong className="title">Email Address</strong>

                  <div className="inputBox">
                    <input
                      value={email}
                      
                      placeholder="Please enter your email address"
                    />
                  </div>
                </li>
              </div>

              <button className="logoutBtn" onClick={() => {onClickSave()}}>
                Save
              </button>
            </article>
          </section>
        </PgeneralSettingsBox>
      </>
    );
}

const MgeneralSettingsBox = styled.div`
  padding: 72px 0 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 5.55vw;

    .pageTitle {
      font-size: 30px;
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 13.88vw;
      padding: 8.33vw 0;

      .inputList {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;

        li {
          display: flex;
          flex-direction: column;
          gap: 3.33vw;

          .title {
            font-size: 4.44vw;
          }

          .inputBox {
            display: flex;
            align-items: center;
            padding: 4.44vw 2.77vw;
            border-radius: 1.11vw;
            background: #f6f6f6;

            input,
            textarea {
              flex: 1;
              height: 100%;
              background: unset;
              font-size: 3.88vw;
            }
          }

          &.description {
            .inputBox {
              height: 38.88vw;

              textarea {
                &::-webkit-scrollbar {
                  width: 4px;
                  border: 5px solid #f6f6f6;
                }

                &::-webkit-scrollbar-thumb {
                  width: 4px;
                  background: #b7b7b7;
                  border-radius: 4px;
                }

                &::-webkit-scrollbar-track {
                  background: #f4f2f2;
                  border-radius: 4px;
                }
              }
            }
          }
        }
      }

      .logoutBtn {
        height: 15.55vw;
        border-radius: 7.77vw;
        font-size: 4.44vw;
        font-weight: 500;
        color: #fff;
        background: #222;
      }
    }
  }
`;

const PgeneralSettingsBox = styled.div`
  padding: 120px 0 0 350px;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 50px;

    .pageTitle {
      font-size: 30px;
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 38px;
      max-width: 1200px;
      padding: 52px 40px;
      border-radius: 20px;
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);

      .inputList {
        display: flex;
        flex-direction: column;
        gap: 40px;

        li {
          display: flex;
          flex-direction: column;
          gap: 22px;

          .title {
            font-size: 20px;
          }

          .inputBox {
            display: flex;
            align-items: center;
            padding: 16px 30px;
            border-radius: 8px;
            background: #f6f6f6;

            input,
            textarea {
              flex: 1;
              height: 100%;
              background: unset;
              font-size: 16px;
            }
          }

          &.description {
            .inputBox {
              height: 170px;

              textarea {
                &::-webkit-scrollbar {
                  width: 4px;
                  border: 5px solid #f6f6f6;
                }

                &::-webkit-scrollbar-thumb {
                  width: 4px;
                  background: #b7b7b7;
                  border-radius: 4px;
                }

                &::-webkit-scrollbar-track {
                  background: #f4f2f2;
                  border-radius: 4px;
                }
              }
            }
          }
        }
      }

      .logoutBtn {
        width: 176px;
        height: 56px;
        border-radius: 43px;
        font-size: 22px;
        font-weight: 500;
        color: #fff;
        background: #222;
      }
    }
  }
`;
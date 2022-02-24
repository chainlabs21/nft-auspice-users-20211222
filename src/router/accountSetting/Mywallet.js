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

import { useState, useEffect } from "react";
import { getmyaddress, onClickCopy, LOGGER } from "../../util/common";
import { strDot } from "../../util/Util";
import DefaultHeader from "../../components/header/DefaultHeader";
import AccountLeftBar from "../../components/accountSetting/AccountLeftBar";
import DetailHeader from "../../components/header/DetailHeader";
export default function Mywallet() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {isloggedin, userData, walletAddress} = useSelector((state)=>state.user)

  const isMobile = useSelector((state) => state.common.isMobile);
  const [toggleLeftBar, setToggleLeftBar] = useState(!state?.toggle);

  let [myaddress, setmyaddress] = useState(getmyaddress());

  if (isMobile)
    return (
      <>
        {toggleLeftBar ? (
          <AccountLeftBar off={setToggleLeftBar} />
        ) : (
          <DetailHeader title="My Wallet" off={() => setToggleLeftBar(true)} />
        )}

        <MmyWallet>
          <section className="innerBox">
            <article className="contArea">
              <div className="addressContainer">
                <strong className="title">Wallet address</strong>

                <div className="addressBox">
                  <div className="address">
                    <strong>{myaddress}</strong>
                  </div>

                  <button className="copyBtn" onClick={() => {}}>
                    Copy
                  </button>
                </div>
              </div>

              <button className="logoutBtn" onClick={() => navigate("/logout")}>
                Logout
              </button>
            </article>
          </section>
        </MmyWallet>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <AccountLeftBar />

        <PmyWallet>
          <section className="innerBox">
            <strong className="pageTitle">My wallet</strong>

            <article className="contArea">
              <div className="addressContainer">
                <strong className="title">Wallet address</strong>

                <div className="addressBox">
                  <strong className="address">{walletAddress}</strong>

                  <button className="copyBtn" onClick={() => {}}>
                    Copy
                  </button>
                </div>
              </div>

              <button className="logoutBtn" onClick={() => navigate("/logout")}>
                Logout
              </button>
            </article>
          </section>
        </PmyWallet>
      </>
    );
}

const MmyWallet = styled.div`
  padding: 72px 0 0 0;

  .innerBox {
    padding: 5.55vw;

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 8.33vw;
      padding: 11.11vw 3.88vw 8.33vw 3.88vw;
      border-radius: 5.55vw;
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);

      .addressContainer {
        display: flex;
        flex-direction: column;
        gap: 3.33vw;

        .title {
          font-size: 4.44vw;
        }

        .addressBox {
          display: flex;
          align-items: center;
          gap: 1.11vw;
          height: 9.44vw;

          .address {
            flex: 1;
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 2.22vw;
            font-size: 3.33vw;
            background: #f6f6f6;
            overflow: hidden;

            strong {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

          .copyBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 19.44vw;
            height: 100%;
            font-size: 3.33vw;
            font-weight: 500;
            border: 1px solid #b2b2b2;
            border-radius: 1.11vw;
          }
        }
      }

      .logoutBtn {
        height: 13.33vw;
        font-size: 3.88vw;
        font-weight: 500;
        color: #fff;
        background: #222;
        border-radius: 7.77vw;
      }
    }
  }
`;

const PmyWallet = styled.div`
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

      .addressContainer {
        display: flex;
        flex-direction: column;
        gap: 22px;

        .title {
          font-size: 20px;
        }

        .addressBox {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 56px;

          .address {
            flex: 1;
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 30px;
            font-size: 16px;
            background: #f6f6f6;
          }

          .copyBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 128px;
            height: 100%;
            font-size: 22px;
            font-weight: 500;
            border: 1px solid #b2b2b2;
            border-radius: 8px;
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
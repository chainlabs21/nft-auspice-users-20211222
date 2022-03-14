import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setConnect } from "../util/store";
import styled from "styled-components";

import collect_img from "../img/sub/collect_img.png";
import collect_img2 from "../img/sub/collect_img2.png";
import collect_img3 from "../img/sub/collect_img3.png";
import collect_img4 from "../img/sub/collect_img4.png";
import s2 from "../img/sub/s2.png";
import s3 from "../img/sub/s3.png";
import s4 from "../img/sub/s4.png";
import s5 from "../img/sub/s5.png";
import s9 from "../img/sub/s9.png";
import s8 from "../img/sub/s8.png";
import sample from "../img/sub/sample.png";
import click1 from "../img/sub/click1.png";

import I_klaytn from "../img/sub/I_klaytn.svg";
import DefaultHeader from "../components/header/DefaultHeader";
import DetailHeader from "../components/header/DetailHeader";

function LogOut({ store, setConnect }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <>
        <DetailHeader title="My Wallet" />
        <MlogOut>
          <section className="innerBox">
            <p className="title">Log in with your wallet</p>

            <article className="contArea">
              <span className="walletBox">
                <img src={I_klaytn} alt="" />
              </span>

              <button
                className="loginBtn"
                onClick={() => navigate("/connectwallet")}
              >
                Login
              </button>
            </article>
          </section>
        </MlogOut>
      </>
    );
  return (
    <>
      <DefaultHeader />

      <PlogOut>
        <section className="innerBox">
          <p className="title">Log in with your wallet</p>

          <article className="contArea">
            <span className="walletBox">
              <img src={I_klaytn} alt="" />
            </span>

            <button
              className="loginBtn"
              onClick={() => navigate("/connectwallet")}
            >
              Login
            </button>
          </article>
        </section>
      </PlogOut>
    </>
  );
}

const MlogOut = styled.div`
  .innerBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4.44vw;
    height: 100vh;

    .title {
      font-size: 4.44vw;
      font-weight: 500;
    }

    .contArea {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3.33vw;

      .walletBox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26.66vw;
        height: 26.66vw;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .loginBtn {
        width: 43.33vw;
        height: 10.55vw;
        font-size: 3.88vw;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 7.77vw;
      }
    }
  }
`;

const PlogOut = styled.div`
  padding: 120px 0 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 62px;
    padding: 100px 0;

    .title {
      font-size: 22px;
      font-weight: 500;
    }

    .contArea {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;

      .walletBox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 168px;
        height: 168px;
        border-radius: 20px;
        box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);

        img {
          width: 96px;
          height: 96px;
          object-fit: contain;
        }
      }

      .loginBtn {
        width: 176px;
        height: 56px;
        font-size: 22px;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 43px;
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

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);

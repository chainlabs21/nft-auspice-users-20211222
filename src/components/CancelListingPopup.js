import styled from "styled-components";
import icon_close from "../img/sub/icon_close.png";

export default function CancelListingPopup({ off }) {
  return (
    <CancelListingPopupBox>
      <article className="topBar">
        <span className="blank" />
        <strong className="title"> Cancle Listings</strong>
        <button className="exitBtn" onClick={() => off()}>
          <img src={icon_close} alt="" />
        </button>
      </article>

      <article className="contBox">
        <p>Are you sure you want to cancel your listing?</p>
      </article>

      <article className="btnBox">
        <button className="denyBtn" onClick={() => off()}>
          Never Mind
        </button>

        <button className="confirmBtn" onClick={() => off()}>
          Cancle Listings
        </button>
      </article>
    </CancelListingPopupBox>
  );
}

const CancelListingPopupBox = styled.div`
  width: 600px;
  padding: 0 0 42px 0;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 1002;
  @media screen and (max-width: 768px) {
    width: 75vw;
    padding: 0 0 5.25vw 0;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2.5vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    z-index: 1002;
  }

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 20px;
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 9vw;
      padding: 0 2.5vw;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      font-family: Poppins;
      @media screen and (max-width: 768px) {
        font-size: 3vw;
        font-weight: 700;
      }
    }

    .blank,
    .exitBtn img {
      width: 30px;
      @media screen and (max-width: 768px) {
        width: 3.75vw;
      }
    }
  }

  .contBox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 210px;
    font-size: 16px;
    font-weight: 500;
    border-top: 1px solid #e8e8e8;

    @media screen and (max-width: 768px) {
      height: 26.25vw;
      font-size: 2vw;
    }
  }

  .btnBox {
    display: flex;
    justify-content: center;
    gap: 26px;
    @media screen and (max-width: 768px) {
      gap: 3.25vw;
    }

    button {
      width: 224px;
      height: 56px;
      font-size: 22px;
      font-weight: 700;
      border-radius: 28px;

      @media screen and (max-width: 768px) {
        width: 28vw;
        height: 7vw;
        font-size: 2.75vw;
        border-radius: 3.5vw;
      }

      &.denyBtn {
        border: solid 1px #011218;
      }

      &.confirmBtn {
        color: #fff;
        background: #000;
      }
    }
  }
`;

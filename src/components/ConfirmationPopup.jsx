import styled from "styled-components";
import icon_close from "../img/sub/icon_close.png";

export default function ConfirmationPopup({ off, content }) {
  return (
    <Bg>
    <ConfirmationPopupBox>

      <article className="contBox">
        <p className="content">{content}</p>
      </article>

      <article className="btnBox">
        <button className="confirmBtn" onClick={() => off()}>
          확인
        </button>
      </article>
    </ConfirmationPopupBox>
    </Bg>
  );
}
const Bg = styled.div`
width: 100vw;
height: 100vh;
z-index: 1001;
background-color: rgba(0,0,0,0.2);
position: fixed;
top:0;
left:0;
`;

const ConfirmationPopupBox = styled.div`
  width: 438px;
  //height: 322px;
  padding: 0 0 22px 0;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 1002;
  justify-content: space-between;
  flex-direction: column;
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
    .content{
        display:flex;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
    }
  }

  .btnBox {
    display: flex;
    
    gap: 26px;
    padding: 0 24px 0 24px;
    @media screen and (max-width: 768px) {
      gap: 3.25vw;
    }

    button {
      width: 100%;
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

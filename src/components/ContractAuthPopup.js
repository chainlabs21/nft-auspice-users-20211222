import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useLayoutEffect } from "react";

const Popup = () => {
  const [ownerPopup, setLikePopup] = useState(true);
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.outerWidth]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [inWidth, outWidth] = useWindowSize();

  return (
    ownerPopup && (
      <div class="popup info" id="info_popup" style={{ display: "block" }}>
        <div
          class="box_wrap wrap2"
          style={{
            width: "600px",
            height: "auto",
            paddingBottom: "50px",
          }}
        >
          <TopBar>
            <div className="blank-box"></div>
            <div className="text">Your item is now listed for sale</div>
            <div
              className="img"
              onClick={() => {
                setLikePopup(false);
              }}
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </div>
          </TopBar>

          <BodyImage>
            <img
              src={require("../img/popup/contractauth.png").default}
              alt="contractauth"
            />
          </BodyImage>

          <BodyText>
            <div>Share your listing</div>
          </BodyText>

          <BodyIcons>
            <div className="img">
              <img
                src={require("../img/popup/twitter.png").default}
                alt="contractauth"
              />
            </div>
            <div className="img">
              <img
                src={require("../img/popup/send.png").default}
                alt="contractauth"
              />
            </div>
            <div className="img">
              <img
                src={require("../img/popup/facebook.png").default}
                alt="contractauth"
              />
            </div>
            <div className="img">
              <img
                src={require("../img/popup/clip.png").default}
                alt="contractauth"
              />
            </div>
          </BodyIcons>

          <BodyButton>
            <button className="button">View Item</button>
          </BodyButton>
        </div>
      </div>
    )
  );
};

export default Popup;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 22px 20px 18.5px 20px;
  height: 30px;
  border-bottom: 1px solid #e8e8e8;

  .blank-box {
    width: 30px;
    height: 30px;
  }
  .text {
    font-family: Poppins;
    font-size: 22px;
    font-weight: 600;
  }

  .img {
  }
`;

const BodyImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 191px;
  padding: 68.5px 0 66.5px 0;
`;

const BodyText = styled.div`
  margin: auto;
  padding: 31.5px 0px 38px 0px;
  width: 540px;
  border-top: 1px solid #e8e8e8;

  font-family: Poppins;
  font-size: 22px;
  line-height: 31px;
  font-weight: 500;
`;

const BodyIcons = styled.div`
  width: 402px;
  display: flex;
  justify-content: space-between;
  padding: 0 100px 82px 100px;
  .img {
    width: 81px;
  }
`;

const BodyButton = styled.div`
  display: flex;
  justify-content: center;
  .button {
    width: 350px;
    height: 56px;
    border-radius: 28px;
    background-color: #222;
    color: white;
    font-size: 22px;
  }
`;

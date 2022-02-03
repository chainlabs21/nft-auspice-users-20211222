import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useLayoutEffect } from "react";

const CancelPopup = () => {
  const navigate = useNavigate();

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
  console.log({ inWidth, outWidth });

  return (
    ownerPopup && (
      <div class="popup info" id="info_popup" style={{ display: "block" }}>
        <div
          class="box_wrap wrap2"
          style={{
            width: inWidth < 640 ? "80%" : "600px",
            height: inWidth < 640 ? "280px" : "381px",
          }}
        >
          <div style={{ marginTop: "21px", display: "flex" }}>
            <h2
              style={{
                fontSize: inWidth < 640 ? "20px" : "24px",
                fontWeight: "600",
                margin: "auto",
              }}
            >
              Cancle Listings
            </h2>
            <a
              style={{
                width: inWidth < 640 ? "20px" : "30px",
                position: "absolute",
                right: "0",
                marginRight: "20px",
              }}
              onClick={() => setLikePopup(false)}
            >
              <img
                src={require("../img/sub/icon_close.png").default}
                alt="close"
              />
            </a>
          </div>
          <Hr />

          <div
            style={{
              height: inWidth < 640 ? "165px" : "210px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4 style={{ fontSize: inWidth < 640 ? "12px" : "16px" }}>
              Are you sure you want to cancel your listing?
            </h4>
          </div>
          <ButtonContainer>
            <Button1>Never Mind</Button1>
            <Button2>Cancle Listings</Button2>
          </ButtonContainer>
        </div>
      </div>
    )
  );
};

export default CancelPopup;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Button1 = styled.button`
  width: 224px;
  height: 56px;
  border-radius: 28px;
  border: solid 1px #011218;
  background-color: #fbfbfb;
  font-size: 22px;
  margin-right: 13px;
  @media screen and (max-width: 640px) {
    font-size: 14px;
    margin-left: 20px;
    width: 130px;
    height: 38px;
    border-radius: 28px;
  }
`;
const Button2 = styled.button`
  width: 224px;
  height: 56px;
  border-radius: 28px;
  background-color: #222;
  color: white;
  font-size: 22px;
  margin-left: 13px;
  @media screen and (max-width: 640px) {
    font-size: 14px;
    margin-right: 20px;
    width: 130px;
    height: 38px;
    border-radius: 28px;
    background-color: #222;
  }
`;

const Hr = styled.hr`
  margin-top: 17.5px;
  height: "1px";
  color: "#e8e8e8";
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

import { useState } from "react";
import { singleItem } from "../mokups/items";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useLayoutEffect } from "react";

const AuthFailedPopup = () => {
  const [ownerPopup, setLikePopup] = useState(true);
  const navigate = useNavigate();
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
      <div className="popup info" id="info_popup" style={{ display: "block" }}>
        <div
          className="box_wrap wrap2"
          style={{
            width: inWidth < 641 ? "310px" : "600px",
            height: inWidth < 641 ? "auto" : "auto",
            paddingBottom: inWidth < 641 ? "30px" : "42px",
          }}
        >
          <div style={{ display: "flex" }}>
            <h2
              style={{
                fontFamily: "Poppins",
                fontSize: inWidth < 641 ? "16px" : "24px",
                fontWeight: "600",
                margin: "auto",
                paddingTop: inWidth < 641 ? "50px" : "21px",
                paddingBottom: inWidth < 641 ? "8px" : "auto",
              }}
            >
              Cancle Listings
            </h2>
            <a
              style={{
                width: inWidth < 641 ? "0px" : "30px",
                position: "absolute",
                right: "0",
                marginRight: "20px",
                paddingTop: "20px",
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4
              style={{
                fontFamily: "Roboto",
                fontSize: inWidth < 641 ? "12px" : "16px",
                paddingBottom: inWidth < 641 ? "30px" : "97px",
              }}
            >
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

export default AuthFailedPopup;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: "30px";
`;
const Button1 = styled.button`
  width: 224px;
  height: 56px;
  border-radius: 28px;
  font-weight: bold;
  border: solid 1px #011218;
  background-color: #fbfbfb;
  font-size: 22px;
  margin-right: 13px;
  @media screen and (max-width: 640px) {
    font-size: 14px;
    margin-right: 5px;

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
  font-weight: bold;
  margin-left: 13px;
  @media screen and (max-width: 640px) {
    font-size: 14px;
    margin-left: 5px;
    width: 130px;
    height: 38px;
    border-radius: 28px;
    background-color: #222;
  }
`;

const Hr = styled.hr`
  margin-top: 17.5px;
  margin-bottom: 94.5px;
  height: 0.1px;
  border-color: #e8e8e8;
  background-color: #e8e8e8;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

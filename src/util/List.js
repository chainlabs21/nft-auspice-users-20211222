import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

function Main({ store }) {
  const navigate = useNavigate();

  return (
    <HeaderBox>
      <p onClick={() => navigate("/")}>메인</p>

      <p onClick={() => navigate("/signup")}>회원가입</p>
      <p onClick={() => navigate("/signup01")}>회원가입</p>
      <p onClick={() => navigate("/signup02")}>회원가입</p>
      <p onClick={() => navigate("/signup03")}>회원가입</p>
      <p onClick={() => navigate("/signup04")}>회원가입</p>
      <p onClick={() => navigate("/signup05")}>회원가입</p>
      <p onClick={() => navigate("/signup06")}>회원가입</p>
      <p onClick={() => navigate("/signup07")}>회원가입</p>

      <p onClick={() => navigate("/marketplace")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace04")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace05")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace06")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace07")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace08")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace09")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace10")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace11")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace12")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace13")}>마켓플레이스</p>
      <p onClick={() => navigate("/marketplace14")}>마켓플레이스</p>

      <p onClick={() => navigate("/iteminfo01")}>아이템인포</p>
      <p onClick={() => navigate("/iteminfo02")}>아이템인포</p>
      <p onClick={() => navigate("/iteminfo03")}>아이템인포</p>
      <p onClick={() => navigate("/iteminfo04")}>아이템인포</p>

      <p onClick={() => navigate("/nftsell")}>nftsell</p>
      <p onClick={() => navigate("/nftsell02")}>nftsell</p>
      <p onClick={() => navigate("/nftsell03")}>nftsell</p>
      <p onClick={() => navigate("/nftsell04")}>nftsell</p>
      <p onClick={() => navigate("/nftsell04off")}>nftsell</p>
      <p onClick={() => navigate("/nftsell05")}>nftsell</p>
      <p onClick={() => navigate("/nftsell05off")}>nftsell</p>

      <p onClick={() => navigate("/buynft01")}>buynft</p>
      <p onClick={() => navigate("/buynft02")}>buynft</p>
      <p onClick={() => navigate("/buynft03")}>buynft</p>
      <p onClick={() => navigate("/buynft04")}>buynft</p>

      <p onClick={() => navigate("/profile01")}>profile</p>
      <p onClick={() => navigate("/profile02")}>profile</p>
      <p onClick={() => navigate("/profile03")}>profile</p>
      <p onClick={() => navigate("/profile04")}>profile</p>
      <p onClick={() => navigate("/profile05")}>profile</p>
      <p onClick={() => navigate("/profile06")}>profile</p>
      <p onClick={() => navigate("/profile07")}>profile</p>
      <p onClick={() => navigate("/profile07off")}>profile</p>
      <p onClick={() => navigate("/profile09")}>profile</p>
      <p onClick={() => navigate("/profile12")}>profile</p>
      <p onClick={() => navigate("/profile13")}>profile</p>
      <p onClick={() => navigate("/profile14")}>profile</p>
      <p onClick={() => navigate("/profile15")}>profile</p>
      <p onClick={() => navigate("/profile16")}>profile</p>
      <p onClick={() => navigate("/profile17")}>profile</p>
      <p onClick={() => navigate("/profile18")}>profile</p>
      <p onClick={() => navigate("/profile19")}>profile</p>
      <p onClick={() => navigate("/profile21")}>profile</p>
      <p onClick={() => navigate("/mprofilemenu")}>모바일 프로필 메뉴</p>

      <p onClick={() => navigate("/exploredeal")}>exploredeal</p>
      <p onClick={() => navigate("/explore")}>explore</p>
    </HeaderBox>
  );
}

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 10%;
  font-size: 16px;

  p {
    cursor: pointer;
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

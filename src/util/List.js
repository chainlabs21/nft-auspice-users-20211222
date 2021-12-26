import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

function Main({ store }) {
  const navigate = useNavigate();

  return (
    <HeaderBox>
      <p onClick={() => navigate("/")}>메인</p>

      <p />
      <p onClick={() => navigate("/connectwallet")}>지갑연동</p>
      <p onClick={() => navigate("/joinmembership")}>join the membership</p>
      <p onClick={() => navigate("/signup")}>sign up</p>
      <p onClick={() => navigate("/sentemail")}>sent email</p>
      <p onClick={() => navigate("/signupcomplete")}>sign up complete</p>
      <p onClick={() => navigate("/emailfailed")}>email failed</p>
      <p onClick={() => navigate("/emailrequired")}>email required</p>
      <p onClick={() => navigate("/recentemail")}>email recent</p>

      <p />
      <p onClick={() => navigate("/marketplace")}>마켓플레이스</p>
      <p onClick={() => navigate("/singleitem")}>단일 상품</p>
      <p onClick={() => navigate("/bundleitem")}>번들 상품</p>

      <p />
      <p onClick={() => navigate("/mycollection")}>My Collection</p>
      <p onClick={() => navigate("/createcollection")}>
        create a new collection
      </p>
      <p onClick={() => navigate("/editcollection")}>edit collection</p>
      <p onClick={() => navigate("/importcontract")}>import contract</p>
      <p onClick={() => navigate("/myfavorite")}>my favorite</p>
      <p onClick={() => navigate("/mycollectionselect")}>
        my collection select
      </p>
      <p onClick={() => navigate("/loyaltycheck")}>loyalty check</p>

      <p />
      <p onClick={() => navigate("/nftsell")}>nftsell</p>
      <p onClick={() => navigate("/salefixed")}>sale fixed</p>
      <p onClick={() => navigate("/auctionbid")}>auction bid</p>
      <p onClick={() => navigate("/salebundle")}>sale bundle</p>

      <p />
      <p onClick={() => navigate("/myprof")}>myprof</p>
      <p onClick={() => navigate("/liked")}>liked</p>
      <p onClick={() => navigate("/mywallet")}>my wallet</p>

      <p onClick={() => navigate("/profile02")}>profile2</p>
      <p onClick={() => navigate("/profile03")}>profile3</p>
      <p onClick={() => navigate("/profile04")}>profile4</p>
      <p onClick={() => navigate("/profile05")}>profile5</p>
      <p onClick={() => navigate("/profile06")}>profile6</p>
      <p onClick={() => navigate("/profile07")}>profile7</p>
      <p onClick={() => navigate("/profile07off")}>profile7off</p>
      <p onClick={() => navigate("/profile09")}>profile9</p>
      <p onClick={() => navigate("/profile13")}>profile13</p>
      <p onClick={() => navigate("/profile14")}>profile14</p>
      <p onClick={() => navigate("/profile15")}>profile15</p>
      <p onClick={() => navigate("/profile17")}>profile17</p>
      <p onClick={() => navigate("/profile18")}>profile18</p>
      <p onClick={() => navigate("/profile19")}>profile19</p>
      <p onClick={() => navigate("/profile21")}>profile21</p>
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

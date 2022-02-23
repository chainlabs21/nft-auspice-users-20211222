import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

function Main({ store }) {
  const navigate = useNavigate();

  return (
    <HeaderBox>
      <p onClick={() => navigate("/")}>메인화면</p>
      <p />
      <p onClick={() => navigate("/connectwallet")}>
        02_회원가입_1_지갑연동#1_사용가능지갑
      </p>
      <p onClick={() => navigate("/emailrequired")}>
        02_회원가입_2_지갑연동#1_이메일인증_팝업
      </p>
      <p onClick={() => navigate("/sentemail")}>
        02_회원가입_3_지갑연동#1_이메일발송확인_팝업
      </p>
      <p onClick={() => navigate("/joinmembership")}>
        02_회원가입_4_지갑연동#2_회원가입_팝업
      </p>
      <p onClick={() => navigate("/signup")}>
        02_회원가입_5_지갑연동#3_1_회원가입
      </p>
      <p onClick={() => navigate("/emailfailed")}>
        02_회원가입_12_지갑연동#4_인증실패
      </p>
      <p onClick={() => navigate("/signupcomplete")}>
        02_회원가입_14_가입인증이메일양식_회원가입완료팝업
      </p>
      <p onClick={() => navigate("/sentemaildetail")}>
        02_회원가입_11_지갑연동#4_인증메일발송
      </p>
      <p />
      <p onClick={() => navigate("/marketplace")}>03_마켓플레이스_1_Layout</p>
      <p onClick={() => navigate("/singleitem")}>
        03_마켓플레이스_4_아이템상세_단일상품
      </p>
      <p onClick={() => navigate("/myitems")}>
        03_마켓플레이스_6_발행홈화면_컬렉션
      </p>
      <p onClick={() => navigate("/royaltycheck")}>
        03_마켓플레이스_13_로열티지급내역
      </p>

      <p />

      <p onClick={() => navigate("/createitem")}>
        05_NFT 발행하기/판매하기_1_아이템생성하기_기본
      </p>
      <p onClick={() => navigate("/saleitem")}>
        05_NFT 발행하기/판매하기_3_아이템판매_고정가_기본 / 경매입찰_기본
      </p>

      <p />
      <p onClick={() => navigate("/searchwallet")}>
        07_프로필홈관리_1_묶음판매_기본
      </p>
      <p onClick={() => navigate("/transactionhistory")}>
        07_프로필홈관리_7_거래내역_기본 history
      </p>
      <p onClick={() => navigate("/offers")}>
        07_프로필홈관리_9_offer_참여내역_기본
      </p>
      <p onClick={() => navigate("/liked")}>07_프로필홈관리_12_좋아요내역</p>
      <p onClick={() => navigate("/hiddenitem")}>
        07_프로필홈관리_14_숨긴아이템_기본
      </p>
      <p onClick={() => navigate("/referals")}>07_프로필홈관리_15_레퍼럴</p>
      <p />

      <p onClick={() => navigate("/exploredealhistory")}>
        08_익스플로러_3_Explorer_#랭킹_기본
      </p>
      <p onClick={() => navigate("/ranking")}>
        08_익스플로러_3_Explorer_#랭킹_기본
      </p>

      <p />
      <p onClick={() => navigate("/mywallet")}>
        07_프로필홈관리_16_계정설정_내지갑_기본
      </p>
      <p onClick={() => navigate("/logout")}>
        07_프로필홈관리_18_내지갑_로그아웃화면_닫기
      </p>
      <p onClick={() => navigate("/generalsettings")}>
        07_프로필홈관리_19_계정설정_일반설정_기본
      </p>
      <p onClick={() => navigate("/notificationsettings")}>
        07__프로필홈관리_21_계정설정_알림설정_기본
      </p>

      {/*
      <p onClick={() => navigate("/handover")}>handover</p>
      <p onClick={() => navigate("/movecollection")}>move item</p>
      <p onClick={() => navigate("/editcollection")}>edit item</p>
      <p onClick={() => navigate("/importcontract")}>import contract</p>
      <p onClick={() => navigate("/mycollectionselect")}>my item select</p>
      <p onClick={() => navigate("/createcollection")}>create a new item</p>
      */}
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

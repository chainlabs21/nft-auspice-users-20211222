import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import I_ltArw3 from "../../img/icons/I_ltArw3.png";

export default function DetailHeader({ title, off }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickExitBtn() {
    if (off) off();
    else navigate(-1);
  }

  if (isMobile) {
    return (
      <MdetailHeader>
        <button className="exitBtn" onClick={onClickExitBtn}>
          <img src={I_ltArw3} alt="" />
        </button>

        <strong className="title">{title}</strong>
      </MdetailHeader>
    );
  } else return <></>;
}

const MdetailHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 72px;
  padding: 0 5.55vw;
  background: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;

  .exitBtn {
    img {
      width: 18px;
    }
  }

  .title {
    font-size: 18px;
  }
`;

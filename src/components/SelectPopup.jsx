import { connect } from "react-redux";
import styled from "styled-components";

export default function SelectPopup({ off, contList, selectCont, setCont }) {
  function onClickSetSort(data) {
    // setCont(data);
    off(false);
  }

  return (
    <SelectPopupBox className="selectPopup">
      {contList.map((cont, index) => (
        <li key={index} onClick={() => onClickSetSort(cont)}>
          {cont}
        </li>
      ))}
    </SelectPopupBox>
  );
}

const SelectPopupBox = styled.ul`
  width: 100%;
  background: #fff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #d9d9d9;
  border-radius: 24px;
  overflow: hidden;
  top: 0;
  position: absolute;
  z-index: 6;

  li {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

    &:hover{
      color: #fff;
      background: #333;
    }
  }
`;

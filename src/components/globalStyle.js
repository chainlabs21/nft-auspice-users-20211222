import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.filterBox{
  .topBar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 20px;
    
    font-size: 22px;
    @media screen and (max-width: 1024px) {
      font-size: 18px;
    }
    font-weight: 700;

    .leftBox{
      display: flex;
      align-items: center;
      gap: 14px;
      height: 18px;
    }
  }
  
  .filterDetails{
    display: flex;
    flex-direction: column;
    padding: 0 20px; 
    border-top: 1px solid #d9d9d9;

    &[open] summary {
      img{
        transform: rotate(180deg);
      }
    }

    .filterSummary{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 56px;
      cursor: pointer;

      .filterTitle{
        font-size: 22px;
        @media screen and (max-width: 1024px) {
          font-size: 18px;
        }

        font-weight: 700;
        line-height: 22px;
      }

      img{
        width: 22px;
      }
    }

    .filterContList{
      display: flex;
      padding: 40px 0 0 0 ;

      &.typeList{
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px 2%;
        padding: 40px 0 20px 0;
  
        li{
          width: 49%;
          box-sizing: border-box;
          border-radius: 43px;
          border: 1px solid #e9e9e9;
          font-size: 16px;
          font-weight: 500;
          line-height: 48px;
          text-align: center;
        }
      }

      &.searchListBox{
        flex-direction: column;
        gap: 20px;
        padding: 40px 0 30px 0;

        .inputBox{
          display: flex;
          align-items: center;
          gap: 16px;
          height: 48px;
          padding: 0 0 0 14px;
          box-sizing: border-box;
          border: 1px solid #e9e9e9;
          border-radius: 44px;

          input{
            flex:1;
            border: none;

            &::placeholder{
              font-size: 18px;
              color: #bbb;
            }
            
          }
        }
        .searchList{
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 160px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 6px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #bcbcbc;
            border-radius: 4px;
            width: 6px;
          }
          &::-webkit-scrollbar-track {
            background-color: #d9d9d9;
            border-radius: 4px;
            width: 2px;
            border: 2px solid #fff;
          }
          
          li{
            display: flex;
            align-items: center;
            gap: 16px;
          }
        }
      }

      &.chainList{
        li {
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;

          .chkBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            border: solid 2px #d9d9d9;
            border-radius: 50%;

            span {
              width: 8px;
              height: 8px;
              background: #fff;
              border-radius: 50%;
            }
          }

          .name{
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
          }
        }
        }
      }
    }
  }
`;

export default GlobalStyle;

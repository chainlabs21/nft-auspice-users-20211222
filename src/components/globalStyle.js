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
      padding: 40px 0 20px 0;

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

      &.typeList{
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px 2%;
        
  
        li{
          width: 49%;
          box-sizing: border-box;
          border-radius: 43px;
          border: 1px solid #e9e9e9;
          font-size: 16px;
          font-weight: 500;
          line-height: 48px;
          text-align: center;

          &.on{
            color: #fff;
            background: #000;
          }
        }
      }

      &.priceBox{
        display: flex;
        flex-direction: column;
        gap: 14px;

        .settingBox{
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: hidden;

          .selectPosBox{
            position: relative;

            .selectBox{
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: 48px;
              padding: 0 14px;
              box-sizing: border-box;
              border: 1px solid #e9e9e9;
              border-radius: 44px;
              cursor: pointer;
            }

            .optionList{
              position: absolute;
              top: 0;
              right: 0;
              left: 0;
              background: #fff;
              border: 1px solid #e9e9e9;
              border-radius: 24px;
              overflow: hidden;
              cursor: pointer;
              z-index: 101;

              li{
                display: flex;
                align-items: center;
                height: 48px;
                padding: 0 14px;

                &:hover{
                  color: #fff;
                  background: #000;
                  font-weight: 700;
                }
              }
            }
          }

          .priceAreaBox{
            display: flex;
            align-items: center;
            gap: 3px;
            
            .priceInputBox{
              flex:1;
              display: flex;
              align-items: center;
              height: 48px;
              padding: 0 12px;
              background: #fff;
              border-radius: 44px;
              border: solid 1px #e9e9e9;
              overflow: hidden;
              
              .unit{
                font-weight: 500;
                opacity: 0.6;
              }
              
              input{
                flex:1;
                min-width: 0;
                font-weight: 500;
                border: none;
              }
            }
          }
        }


        .applyBtn{
          display: block;
          width: 100%;
          height: 48px;
          box-sizing: border-box;
          font-size: 16px;
          color: #fff;
          background-color: #000;
          border-radius: 44px;
        }
      }

      &.searchListBox{
        flex-direction: column;
        gap: 20px;

        
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

  .right_move{
    .se_fi{
      .selectFilter{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    
        &.moScrollFilter{
          @media screen and (max-width: 1024px) {  
            flex-wrap: nowrap;
            overflow-x: scroll;
            height: 56px;

            &::-webkit-scrollbar {
              display: none;
            }

            li{
              min-width: 168px;
              float: unset;
            }
          }
        }
      }
    }
  }

`;

export default GlobalStyle;

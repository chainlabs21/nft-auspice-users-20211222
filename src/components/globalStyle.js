import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

body{
  &::-webkit-scrollbar {
    display: none;
  }
}

  *{
    padding:0;
    margin:0;
    font-family: 'Roboto', sans-serif;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
    border: none;
    user-select: none;
  }
  
  body{
    
    font-weight: 300;
  }
  
  u{
    text-decoration: underline;
  }
  
  *:link,
  *:visited{
    color:unset;
  }

  *:disabled {
    cursor: not-allowed;
  }
  
  /* *::-webkit-scrollbar {
    display: none;
  } */
  
  *:focus{
    outline:none;
  }
  
  input{
    outline: none;
    user-select: auto;
    background: unset;
    min-width: 0;

    &::placeholder{
      color: #bbb;
    }
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }


  label{
    cursor: pointer;
  }

  button{
    background: none;
    cursor: pointer;
    
    font-weight: 300;
  }

  textarea{
    resize: none;
    user-select:auto;
  }

  &#BroadBox {
    background: #373737;
  }

  .nospace{
    width: 0;
    height: 0;
  }

  .defaultPopup {
    width: 500px;
    padding: 40px;
    background: #fff;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 15px;
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 6;
  }

  .posBox{
    position: relative;
  }
`;

export default GlobalStyle;

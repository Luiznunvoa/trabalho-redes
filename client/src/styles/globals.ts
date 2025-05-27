import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: blue;
    text-decoration: none;
    cursor: pointer;
  }

  h1 {
    font-family: "Mulish", sans-serif;
    color: ${(props) => props.theme.colors.main};
    font-weight: 800;
    font-style: italic;
    margin: 0; 
  }
`;


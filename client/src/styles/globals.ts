import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.colors.background}; 
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  h1 {
    font-family: "Bricolage Grotesque", sans-serif;
    color: ${(props) => props.theme.colors.foreground};
    font-weight: 800;
    font-style: italic;
    margin: 0; 
  }

  p, label, a, button, li {
    font-family: "Jost", sans-serif;
    color: ${(props) => props.theme.colors.foreground};
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0; 
  }

  span {
    font-family: "Mulish", sans-serif;
    font-size: 1.2rem;
  }
`;


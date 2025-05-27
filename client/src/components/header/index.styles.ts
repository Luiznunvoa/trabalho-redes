import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0px 15px 9px -8px rgba(120,120,120,0.73);
  padding: 1rem 3rem 1rem 3rem;

  h1 {
    color: ${(props) => props.theme.colors.main};
  }

  p {
    font-weight: 600;
  }

  p:hover {
    color: ${(props) => props.theme.colors.main};
  }

  a, div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  a > img {
    height: 3rem;
    width: 3rem;
  } 
`;


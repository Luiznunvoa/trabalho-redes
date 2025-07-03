import styled from "styled-components";
import { slideDown } from "../../styles/container";

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
  animation: ${slideDown} 1s ease-out forwards;
  background-color: transparent;
  
`;

export const StyledLeftSide = styled.div`
  width: 30%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.alternate};
  border-right: solid 2px ${(props) => props.theme.colors.foreground};

  h1 {
    margin: 2rem;
    color: ${(props) => props.theme.colors.onPrimary};
  }
`;

export const StyledRightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  gap: 30px;
`;

import styled from "styled-components";
import { slideDown } from "../../styles/container";

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 2rem;
  animation: ${slideDown} 1s ease-out forwards;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const StyledDashBoard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;

  > div:first-child { 
    padding: 2rem;
  }
`;

export const StyledDashBoardContainer = styled.div`
  display: flex;
  flex - direction: column;
  justify - content: center;
  align - items: center;
  padding: 2rem;
  gap: 1rem;
  animation: ${ slideDown } 1s ease - out forwards;

  @media(max - width: 768px) {
    padding: 1.5rem;
  }

  @media(max - width: 480px) {
    padding: 1rem;
  }
`

export const StyledLeftSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    gap: 30px;
`;

export const StyledRightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    gap: 30px;

    div {
    }
`;

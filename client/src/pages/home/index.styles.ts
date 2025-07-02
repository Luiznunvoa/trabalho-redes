import styled from "styled-components";
import { slideDown } from "../../styles/container";

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
  padding-top: 2rem;
  animation: ${slideDown} 1s ease-out forwards;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const StyledLeftSide = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.onPrimary};
  border: 2px solid ${(props) => props.theme.colors.foreground};
  outline: 3px solid ${(props) => props.theme.colors.onPrimary};
  outline-offset: 2px; /* opcional: cria um espaço entre a borda e o outline */
`;

export const StyledRightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    gap: 30px;

    div {
    }
`;

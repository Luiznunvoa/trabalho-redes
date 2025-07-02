import styled, { keyframes } from "styled-components";

// Definindo a animação de slide-down
const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
  }
  30% {
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
  }
  99% {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
`;

export const StyledHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.background};
  padding: 1rem 3rem;
  animation: ${slideDown} 1s ease-out forwards;
  z-index: 1000;

  h1 {
    color: ${(props) => props.theme.colors.onSecondary};
  }

  p {
    font-weight: 600;
  }

  p:hover {
    color: ${(props) => props.theme.colors.main};
  }

  a,
  div {
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

export const StyledLinks = styled.header`
  @media (max-width: 600px) {
    display: none;
  }
`;

import styled, { css, keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    transform: translateY(-10%);
    opacity: 0;
    visibility: hidden;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  animation: ${slideDown} 1s ease-out forwards;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const StyledContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const StyledContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
  transition: 2s;
  width: 100%;
  max-width: 500px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: 100%;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

interface StyledInputProps {
  $hasError?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  height: 2rem;
  font-size: 1.25rem;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.foreground};
  outline: none;
  padding: 0 0.25rem;
  transition: border-color 0.2s ease;
  width: 100%;

  ${(props) =>
    props.$hasError &&
    css`
      border-bottom-color: ${props.theme.colors.alert};
    `}

  &:focus {
    border-bottom-color: ${(props) =>
      props.$hasError ? props.theme.colors.alert : props.theme.colors.success};
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;


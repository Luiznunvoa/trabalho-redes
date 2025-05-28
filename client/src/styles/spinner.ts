import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db;    /* cor do “pedaço” visível */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

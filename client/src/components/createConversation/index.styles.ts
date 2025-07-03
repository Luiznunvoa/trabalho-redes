import styled from "styled-components";

export const CreateConversationContainer = styled.div`
  padding: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;
import styled, { css } from "styled-components";

export const ChatSelectorContainer = styled.div`
  padding: 1rem;
  height: 30rem;
  overflow-y: auto;
  display: flex;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

export const ConversationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const ConversationItem = styled.li<{ isSelected: boolean }>`
  padding: 1rem;
  width: 100%;
  margin-bottom: 0.75rem;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  ${({ isSelected, theme }) =>
    isSelected
      ? css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.onPrimary};
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        `
      : css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.foreground};
          border: 1px solid ${theme.colors.border};

          &:hover {
            border-color: ${theme.colors.primary};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transform: translateY(-1px);
          }
        `}
`;

export const Loading = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 1rem;
`;

export const Error = styled.p`
  color: ${({ theme }) => theme.colors.alert};
  text-align: center;
  padding: 1rem;
`;

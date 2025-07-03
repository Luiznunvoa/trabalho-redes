import styled from "styled-components";

export const JoinConversationContainer = styled.div`
  padding: 1rem;
`;

export const ConversationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ConversationItem = styled.li`
  padding: 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
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

export const NoConversationsMessage = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 1rem;
`;
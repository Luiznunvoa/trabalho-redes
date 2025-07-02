
import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 45rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

export const Message = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

export const MessageContent = styled.p`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  max-width: 70%;
  word-wrap: break-word;
`;

export const SentMessage = styled(MessageContent)`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  align-self: flex-end;
`;

export const ReceivedMessage = styled(MessageContent)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.foreground};
  align-self: flex-start;
`;

export const MessageSender = styled.b`
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  margin-right: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

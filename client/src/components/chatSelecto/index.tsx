import { useConversations } from "../../hooks/useConversations";
import {
  ChatSelectorContainer,
  ConversationItem,
  ConversationList,
  Error,
  Loading,
  NoConversationsMessage,
} from "./index.styles";

type ChatSelectorProps = {
  setConversationId: (conversationId: string) => void;
  selectedConversation?: string | null;
};

export function ChatSelector({
  setConversationId,
  selectedConversation,
}: ChatSelectorProps) {
  const { conversations, error, isLoading } = useConversations();

  return (
    <ChatSelectorContainer>
      {isLoading && <Loading>Carregando...</Loading>}
      {error && <Error>Erro ao carregar conversas</Error>}
      {conversations && conversations.length === 0 && (
        <NoConversationsMessage>
          Você não tem conversas! 😭😭😭
        </NoConversationsMessage>
      )}
      <ConversationList>
        {conversations?.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            onClick={() => setConversationId(conversation.id)}
            isSelected={conversation.id === selectedConversation}
          >
            {conversation.name || conversation.id}
          </ConversationItem>
        ))}
      </ConversationList>
    </ChatSelectorContainer>
  );
}

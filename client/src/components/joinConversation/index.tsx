import { useConversations } from "../../hooks/useConversations";
import {
  JoinConversationContainer,
  ConversationItem,
  ConversationList,
  Error,
  Loading,
  NoConversationsMessage,
} from "./index.styles";

export function JoinConversation() {
  const { conversations, error, isLoading, enterConversation } = useConversations(true);

  const availableConversations = conversations?.filter(
    (conversation) => !conversation.isParticipant
  );

  return (
    <JoinConversationContainer>
      {isLoading && <Loading>Carregando...</Loading>}
      {error && <Error>Erro ao carregar conversas</Error>}
      {availableConversations && availableConversations.length === 0 && (
        <NoConversationsMessage>
          Você já está em todas as conversas 🔥!
        </NoConversationsMessage>
      )}
      <ConversationList>
        {availableConversations?.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            onClick={() => enterConversation(conversation.id)}
          >
            {conversation.name || conversation.id}
          </ConversationItem>
        ))}
      </ConversationList>
    </JoinConversationContainer>
  );
}

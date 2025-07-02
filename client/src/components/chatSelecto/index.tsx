import { FormEvent, useState } from "react";
import { useConversations } from "../../hooks/useConversations";

type ChatSelectorProps = {
  allConversations?: boolean;
  setConversationId: (conversationId: string) => void;
  selectedConversation?: string | null;
};

export function ChatSelector({
  allConversations = false,
  setConversationId,
  selectedConversation,
}: ChatSelectorProps) {
  const { conversations, error, isLoading, enterConversation, createConversation } = useConversations(allConversations);
  const [conversationName, setConversationName] = useState<string>();

  const handleCreateConversation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previne o recarregamento da página

    if (conversationName) {
      createConversation(conversationName);
    }
  }

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ccc", overflowY: "auto" }}>
      <h3>{allConversations ? "Outras Conversas" : "Suas Conversas"}</h3>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar conversas</p>}
      <ul>
        {conversations?.map((conversation) => {
          const shouldDisplay = allConversations ? !conversation.isParticipant : conversation.isParticipant;

          return shouldDisplay ? (
            <li
              key={conversation.id}
              onClick={() =>
                allConversations
                  ? enterConversation(conversation.id)
                  : setConversationId(conversation.id)
              }
              style={{
                cursor: "pointer",
                padding: "8px",
                backgroundColor:
                  conversation.id === selectedConversation ? "#ccc" : "transparent",
              }}
            >
              {conversation.name || conversation.id}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

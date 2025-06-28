import { useConversations } from "../../hooks/useConversations";

type ChatSelectorProps = { 
  allConversations?: boolean, 
  setConversationId: (conversationId: string) => void, 
}

export function ChatSelector({ allConversations = false, setConversationId }: ChatSelectorProps) {
  const { conversations, error, isLoading, enterConversation } = useConversations(allConversations);

  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
      <h3>{allConversations ? "Todas as Conversas" : "Suas Conversas"}</h3>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar conversas</p>}
      <ul>
        {conversations?.map((conversation) => (
          <li
            key={conversation.id}
            onClick={allConversations ? 
              () => enterConversation(conversation.id) : 
              () => setConversationId(conversation.id)
            }
            style={{
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {conversation.name || conversation.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

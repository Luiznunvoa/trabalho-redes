import { useSession } from "../../hooks/useSession";
import { Chat } from "../../components/chat";
import { useState } from "react";
import { ChatSelector } from "../../components/chatSelecto";

export function Home() {
  const { logout } = useSession();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showAllConversations, setShowAllConversations] = useState<boolean>(false);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '16px' }}>
        <h3>Filtro</h3>
        <label>
          <input
            type="checkbox"
            checked={showAllConversations}
            onChange={(e) => setShowAllConversations(e.target.checked)}
          />
          Mostrar todas as conversas
        </label>

        <ChatSelector
          allConversations={showAllConversations}
          setConversationId={setConversationId}
          selectedConversation={conversationId}
        />

        <a
          onClick={logout}
          style={{ display: 'block', marginTop: '1rem', cursor: 'pointer' }}
        >
          Sair
        </a>
      </div>

      <div style={{ flex: 1, padding: '16px' }}>
        {conversationId ? (
          <Chat conversationId={conversationId} />
        ) : (
          <p>Selecione uma conversa para começar</p>
        )}
      </div>
    </div>
  );
}


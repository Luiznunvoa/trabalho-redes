import { useSession } from "../../hooks/useSession";
import { Chat } from "../../components/chat";
import { useState } from "react";
import { ChatSelector } from "../../components/chatSelecto";
import { StyledHomeContainer, StyledLeftSide, StyledRightSide } from "./index.styles";
import { ChatContainer } from "../../components/chat/index.styles";

export function Home() {
  const { logout } = useSession();
  const [conversationId, setConversationId] = useState<string | null>(null);

  return (
    <StyledHomeContainer>
      <StyledLeftSide>
        <ChatSelector
          setConversationId={setConversationId}
          selectedConversation={conversationId}
        />
        <button onClick={logout} >
          Sair
        </button>
      </StyledLeftSide>
      <StyledRightSide>
        {conversationId ? (
          <Chat conversationId={conversationId} />
        ) : (
          <ChatContainer>
            <h1>Escolha uma conversa!</h1>

          </ChatContainer>
        )}
      </StyledRightSide>
    </StyledHomeContainer>
  );
}


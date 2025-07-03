import { useSession } from "../../hooks/useSession";
import { Chat } from "../../components/chat";
import { useState } from "react";
import { ChatSelector } from "../../components/chatSelecto";
import {
  StyledHomeContainer,
  StyledLeftSide,
  StyledMobileButtons,
  StyledRightSide,
  ModalBackdrop,
  ModalContent,
} from "./index.styles";
import { ChatContainer } from "../../components/chat/index.styles";
import { JoinConversation } from "../../components/joinConversation";
import { CreateConversation } from "../../components/createConversation";

export function Home() {
  const { logout } = useSession();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSelectConversation = (id: string) => {
    setConversationId(id);
    setIsModalOpen(false);
  };

  return (
    <StyledHomeContainer>
      <StyledLeftSide>
        <h1>Suas Conversas 💬</h1>
        <ChatSelector
          setConversationId={handleSelectConversation}
          selectedConversation={conversationId}
        />
        <button onClick={() => setIsJoinModalOpen(true)}>Entrar em uma conversa</button>
        <button onClick={() => setIsCreateModalOpen(true)}>Criar uma conversa</button>
        <button onClick={logout}>Sair</button>
      </StyledLeftSide>
      <StyledRightSide>
        {conversationId ? (
          <Chat conversationId={conversationId} />
        ) : (
          <ChatContainer>
            <h1>Escolha uma conversa!</h1>
          </ChatContainer>
        )}
        <StyledMobileButtons>
          <button onClick={logout}>Sair</button>
          <button onClick={() => setIsModalOpen(true)}>Escolher Conversa</button>
          <button onClick={() => setIsJoinModalOpen(true)}>Entrar em Conversa</button>
          <button onClick={() => setIsCreateModalOpen(true)}>Criar Conversa</button>
        </StyledMobileButtons>
      </StyledRightSide>

      {isModalOpen && (
        <ModalBackdrop onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Suas Conversas 💬</h2>
            <ChatSelector
              setConversationId={handleSelectConversation}
              selectedConversation={conversationId}
            />
          </ModalContent>
        </ModalBackdrop>
      )}

      {isJoinModalOpen && (
        <ModalBackdrop onClick={() => setIsJoinModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Entrar em uma Conversa</h2>
            <JoinConversation />
          </ModalContent>
        </ModalBackdrop>
      )}

      {isCreateModalOpen && (
        <ModalBackdrop onClick={() => setIsCreateModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Criar Nova Conversa</h2>
            <CreateConversation />
          </ModalContent>
        </ModalBackdrop>
      )}
    </StyledHomeContainer>
  );
}


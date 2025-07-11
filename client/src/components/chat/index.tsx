import { FormEvent, useState } from "react";
import { useMessages } from "../../hooks/useMessages";
import * as S from "./index.styles";
import { useUserStore } from "../../stores/useUserStore";

export function Chat({ conversationId }: { conversationId: string }) {
  const { messages, error, isLoading, sendMessage, loadMoreMessages } = useMessages(conversationId);
  const userId = useUserStore().id;
  const [newMessage, setNewMessage] = useState("");

  if (error) {
    return <>{error.message}</>;
  }

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleLoadMoreMessages = () => {
    loadMoreMessages();
  }

  return (
    <S.ChatContainer>
      <S.MessagesContainer>

        {isLoading ? (
          <>LOADING</>
        ) : (
          messages?.messages
            ?.map((message) => {
              const isSent = message.senderId === userId;
              const MessageComponent = isSent
                ? S.SentMessage
                : S.ReceivedMessage;

              return (
                <S.Message key={message.id}>
                  {!isSent && (
                    <S.MessageSender>{message.sender.name}</S.MessageSender>
                  )}
                  <MessageComponent>{message.content}</MessageComponent>
                </S.Message>
              );
            })
        )}

        {
          messages?.meta.pageSize && messages.meta.total && 
          messages?.meta.pageSize < messages?.meta.total && (
          <button onClick={handleLoadMoreMessages}>
            Carregar Mais
          </button>
        )}

      </S.MessagesContainer>

      <S.Form onSubmit={handleSendMessage}>
        <S.Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <S.Button type="submit">Enviar</S.Button>
      </S.Form>
    </S.ChatContainer>
  );
}

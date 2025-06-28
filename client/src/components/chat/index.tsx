import { FormEvent, useState } from "react";
import { useConversation } from "../../hooks/useConversation";

export function Chat({ conversationId }: { conversationId: string }) {
  const { messages, error, isLoading, sendMessage } = useConversation(conversationId);
  const [newMessage, setNewMessage] = useState("");

  if (error) {
    return <>{error.message}</>
  }

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previne o recarregamento da página

    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

return (
    <>
      {/* Estrutura do Chat */}
      <div>
        <h2>Chat</h2>
        <div>
          {isLoading ? <>LOADING</> : messages?.map((message) => (
            <div key={message.id}>
              <p>
                <b>{message.senderId}</b>: {message.content}{" "}
              </p>
            </div>
          )).reverse()}
        </div>

        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button type="submit">
            Enviar
          </button>
        </form>
      </div>
    </>
  );

}

import { useState } from "react";
import { useSession } from "../../hooks/useSession";
import { useConversation } from "../../hooks/useConversation";

export function Home() {
  const { logout } = useSession();
  const { messages } = useConversation("global_chat_id");
  const [newMessage, setNewMessage] = useState("");
 
  return (
    <>
      {/* Estrutura do Chat */}
      <div>
        <h2>Chat</h2>
        <div>
          {/* Lista de mensagens */}
          {messages?.map((message) => (
            <div key={message.id}>
              <p>
                <b>{message.senderId}</b>: {message.content}{" "}
              </p>
            </div>
          ))}
        </div>

        <div>
          {/* Input de nova mensagem */}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button
            onClick={() => {setNewMessage(newMessage)}}
          >
            Enviar
          </button>
        </div>
      </div>
      <a onClick={() => logout()}>Sair</a>
    </>
  );
}


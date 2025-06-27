import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";
import { useSessionStore } from "../../stores/useSessionStore";
import { useSession } from "../../hooks/useSession";
import { ConversationService } from "../../services/conversationService";
import { httpCLient } from "../../adapters/httpClient";
import { Message } from "../../types/conversation";

export function Home() {
  const navigate = useNavigate();
  const { user, loading, error, getProfile } = useUser();
  const { logout } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const getNewMessages = async (conversationId: string) => {
    const conversationService = new ConversationService(httpCLient);
    try {
      const response = await conversationService.getMessages({conversationId});
      setMessages(response.messages);
    } catch (error) {
      alert("Erro ao buscar as mensagens novas!");
      console.error(error);
    }
  }

  useEffect(() => {
    getNewMessages("global_chat_id");
  }, [])
  
  if (loading || !user) {
    return <>loading...</>;
  }

  if (error) {
    alert("erro inesperado");
    useSessionStore.getState().reset();
    navigate("/login");
    return null;
  }

  return (
    <>
      {/* Estrutura do Chat */}
      <div>
        <h2>Chat</h2>
        <div>
          {/* Lista de mensagens */}
          {messages.map((message) => (
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
            onClick={() => {
              // Função de envio futura
              // Ex: sendMessage(newMessage);
              setNewMessage(newMessage);
            }}
          >
            Enviar
          </button>
        </div>
      </div>
      <a onClick={() => logout()}>Sair</a>
    </>
  );
}


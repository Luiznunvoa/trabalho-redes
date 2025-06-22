import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";
import { useSessionStore } from "../../stores/useSessionStore";
import { useSession } from "../../hooks/useSession";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

export function Home() {
  const navigate = useNavigate();
  const { user, loading, error, getProfile } = useUser();
  const { logout } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getProfile();
  }, [getProfile]);

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
          <p>Mensagens vao aparecer aqui</p>
        </div>

        <div>
          {/* Lista de mensagens */}
          {messages.map((message) => (
            <div key={message.id}>
              <p>
                <b>{message.sender}</b>: {message.content}{" "}
                <small>{message.timestamp}</small>
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
              setNewMessage("");
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


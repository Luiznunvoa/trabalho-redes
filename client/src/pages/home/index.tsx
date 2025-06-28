import { useSession } from "../../hooks/useSession";
import { Chat } from "../../components/chat";

export function Home() {
  const { logout } = useSession();

  return (
    <>
      <Chat conversationId="ec430f17-0f06-467e-a3f5-f1fed4af0c0b" />
      <a onClick={() => logout()}>Sair</a>
    </>
  );
}

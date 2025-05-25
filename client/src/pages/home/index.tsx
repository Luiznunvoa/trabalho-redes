import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";
import { useSessionStore } from "../../stores/useSessionStore";
import { useSession } from "../../hooks/useSession";

export function Home() {
  const navigate = useNavigate();
  const { user, loading, error, getProfile } = useUser();
  const { logout } = useSession()

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
    return null
  }

  return (
    <>
      <p>Você logou com sucesso!</p>
      <p>seu usuário é <b>{user.name}</b>, de email <b>{user.email}</b></p>
      <p>e id <b>{user.id}</b>.</p> 
      <p>Essa página só é acessível para usuários logados.</p>
      <a onClick={() => logout()}>Sair</a>
    </>
  );
}

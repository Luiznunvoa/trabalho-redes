import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSessionStore } from "../stores/useSessionStore";
import { useUser } from "../hooks/useUsers";

export const VerifyUserAuthentication = ({ children }: { children: ReactNode }) => {
  const authenticated = useSessionStore((store) => store.authenticated);

  if (authenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export const ValidateSelectedProfile = ({ children }: { children: ReactNode }) => {
  const authenticated = useSessionStore((store) => store.authenticated);
  const { user, loading, error, getProfile } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  if (loading || !user) {
    return <>loading...</>;
  }

  if (error) {
    alert("erro inesperado");
    useSessionStore.getState().reset();
    navigate("/");
    return null;
  }

  return <>{children}</>;
};


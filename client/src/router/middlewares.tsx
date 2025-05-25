import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../stores/useSessionStore";

export const VerifyUserAuthentication = ({ children }: { children: ReactNode }) => {
  const authenticated = useSessionStore((store) => store.authenticated);

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const ValidateSelectedProfile = ({ children }: { children: ReactNode }) => {
  const authenticated = useSessionStore((store) => store.authenticated);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


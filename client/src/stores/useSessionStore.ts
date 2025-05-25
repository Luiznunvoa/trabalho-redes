import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  accessToken: string | null;
  authenticated: boolean;
  reset: () => void;
  setState: (state: { accessToken: string | null }) => void;
}

const initialState: Omit<SessionState, "reset" | "setState"> = {
  accessToken: null,
  authenticated: false,
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      ...initialState,

      reset: () => set(initialState),

      setState: ({ accessToken }) =>
        set({
          accessToken,
          authenticated: !!accessToken,
        }),
    }),
    {
      name: "auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        authenticated: state.authenticated,
      }),
    }
  )
);

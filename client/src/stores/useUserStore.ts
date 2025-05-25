import { create } from "zustand";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  setUser: (user: { id: string; name: string; email: string }) => void;
  resetUser: () => void;
}

const initialUserState: Pick<UserState, "id" | "name" | "email"> = {
  id: null,
  name: null,
  email: null,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialUserState,
  setUser: (user) => set({ ...user }),
  resetUser: () => set(initialUserState),
}));

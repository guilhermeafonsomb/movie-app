import { create } from "zustand";
import { getSession, getUser, logout, signin } from "../services/appwrite";

interface AccountStore {
  user: User | null;
  accountSession: AccountSession | null;
  accountLoading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  logout: (sessionId: string) => Promise<void>;
  getSession: () => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set) => ({
  user: null,
  accountSession: null,
  accountLoading: false,
  signin: async (email, password) => {
    set({ accountLoading: true });
    try {
      const user = await signin(email, password);
      const session = await getSession();

      set({ user, accountSession: session ? session : null });
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    } finally {
      set({ accountLoading: false });
    }
  },
  logout: async (sessionId) => {
    set({ accountLoading: true });
    try {
      await logout(sessionId);
      set({ user: null, accountSession: null });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      set({ accountLoading: false });
    }
  },
  getSession: async () => {
    set({ accountLoading: true });
    try {
      const user = await getUser();
      const session = await getSession();

      set({ accountSession: session, user: user ? user : null });
    } catch (error) {
      console.error("Get session error:", error);
      throw error;
    } finally {
      set({ accountLoading: false });
    }
  },
}));

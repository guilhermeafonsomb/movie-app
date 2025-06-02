import { create } from "zustand";
import { getSession, logout, signin } from "../services/appwrite";

interface AccountStore {
  user: User | null;
  accountSession: boolean;
  accountLoading: boolean;
  session?: AccountSession | null;
  signin: (email: string, password: string) => Promise<void>;
  logout: (sessionId: string) => Promise<void>;
  getSession: () => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set) => ({
  user: null,
  accountSession: false,
  accountLoading: false,
  signin: async (email, password) => {
    set({ accountLoading: true });
    try {
      const user = await signin(email, password);
      const session = await getSession();

      set({ user, accountSession: true, session });
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
      set({ user: null, accountSession: false, session: null });
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
      const session = await getSession();
      set({ session, accountSession: !!session });
    } catch (error) {
      console.error("Get session error:", error);
      throw error;
    } finally {
      set({ accountLoading: false });
    }
  },
}));

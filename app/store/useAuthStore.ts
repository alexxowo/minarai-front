import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: { email: string }) => Promise<void>;
  logout: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null as User | null,
      isAuthenticated: false,
      token: null,
      login: async ({ email }) => {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
        
        const role = email.includes('admin') ? 'admin' : 'learner';
        
        set({
          user: {
            id: '1',
            name: role === 'admin' ? 'Minarai Admin' : 'Minarai User',
            email,
            role,
            image: undefined,
          },
          isAuthenticated: true,
          token: 'mock-jwt-token',
        });
      },
      logout: () => set({ user: null, isAuthenticated: false, token: null }),
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: 'minarai-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

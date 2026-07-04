import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApiClient } from '../utils/api-client';

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
  login: (credentials: { email: string; password?: string }) => Promise<void>;
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
      login: async ({ email, password }) => {
        const response = await authApiClient.login(email, password);

        if (response && response.data && response.data.accessToken && response.data.user) {
          const apiUser = response.data.user;
          const mappedUser: User = {
            id: String(apiUser.id || ''),
            name: `${apiUser.firstName || ''} ${apiUser.lastName || ''}`.trim() || 'Minarai User',
            email: apiUser.email || email,
            role: String(apiUser.role || 'USER').toLowerCase(), // "admin" or "user"
            image: undefined,
          };

          set({
            user: mappedUser,
            isAuthenticated: true,
            token: response.data.accessToken,
          });
        } else {
          throw new Error("Respuesta inválida del servidor al iniciar sesión.");
        }
      },
      logout: () => {
        // Optional: Call logout endpoint asynchronously
        authApiClient.logout().catch((err: any) => console.error('Logout error on server:', err));
        set({ user: null, isAuthenticated: false, token: null });
      },
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: 'minarai-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

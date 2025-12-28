import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      username: '',
      city: '',
      user: null,
      role: null,
      setToken: (token) => set({ token }),
      setUsername: (username) => set({ username }),
      setCity: (city) => set({ city }),
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      logout: () => set({ token: null, username: '', city: '', user: null, role: null }),
    }),
    {
      name: 'gigzi-auth-storage',
    }
  )
);


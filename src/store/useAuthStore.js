import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('accessToken') || null, // إضافة default null
  SetToken: (newToken) => {
    set({ token: newToken });
    if (newToken) {
      localStorage.setItem('accessToken', newToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  },
  logout: () => {
    set({ token: null });
    localStorage.removeItem('accessToken');
  },
}));

export default useAuthStore;
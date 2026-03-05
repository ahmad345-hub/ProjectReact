import React, { use } from 'react';
import useAuthStore from './store/useAuthStore.js';
import { Navigate } from 'react-router-dom';
export default function ProtectedRouter({ children }) {
    const token=useAuthStore((state) => state.token);
    if (!token) {
  return <Navigate to="/login"  />;
}
    return children;
}

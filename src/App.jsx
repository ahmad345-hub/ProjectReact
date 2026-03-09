import React, { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ مهم
import router from './router';
import './i18next'; 
import { useTranslation } from "react-i18next";
export default function App() {


  const { i18n } = useTranslation();
  const queryClient = new QueryClient();
  useEffect(() => {
   const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir= dir;
  }, [i18n]);
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    
    </>
  );
}

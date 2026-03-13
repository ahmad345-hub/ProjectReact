import React, { use, useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ مهم
import router from './router';
import './i18next'; 
import { useTranslation } from "react-i18next";
import {  ThemeProvider } from '@mui/material';
import getTheme from './theme';
import useThemeStore from './store/useThemeStore';  
import CssBaseline  from '@mui/material/CssBaseline';
export default function App() {


  const { i18n } = useTranslation();
  const queryClient = new QueryClient();
  useEffect(() => {
   const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir= dir;
  }, [i18n]);
  const mode =useThemeStore((state) => state.theme);
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
      <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
    
    </>
  );
}

import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(detector)  // detects user language        
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Products": "Products",
          "Categories": "Categories",
            "Cart": "Cart",
            "Login": "Login",
            "Register": "Register",
            "Checkout": "Checkout",
            "Continue Shopping": "Continue Shopping",
            "Clear Cart": "Clear Cart",
            "Process to Checkout": "Process to Checkout",
          "KASHOP": "KASHOP",


        }
      },


      ar: {
        translation: {
          "Home": "الرئيسية",
          "Products": "المنتجات",
          "Categories": "الفئات",
            "Cart": "السلة",
            "Login": "تسجيل الدخول",
            "Register": "التسجيل",
            "Checkout": "الدفع",
            "Continue Shopping": "تكملة التسوق",
            "Clear Cart": "حذف كل السلة",
            "Process to Checkout": "الانتقال إلى الدفع",
            "Our Categories": "فئاتنا",
        }
      }
    },
    
    fallbackLng: "en",

  
  });
export default i18n;
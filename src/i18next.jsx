import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Shop": "Shop",
          "Profile": "Profile",
          "Contact": "Contact",
          "Cart": "Cart",
          "Logout": "Logout",
          "Login": "Login",
          "Register": "Register",
          "Checkout": "Checkout",
          "Continue Shopping": "Continue Shopping",
          "Clear Cart": "Clear Cart",
          "Process to Checkout": "Process to Checkout",
          "Our Categories": "Our Categories",
        }
      },
      ar: {
        translation: {
          "Home": "الرئيسية",
          "Shop": "المتجر",
          "Profile": "الملف الشخصي",
          "Contact": "اتصل بنا",
          "Cart": "السلة",
          "Logout": "تسجيل الخروج",
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
    interpolation: { escapeValue: false },
  });

export default i18n;
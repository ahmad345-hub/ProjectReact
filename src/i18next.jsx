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
          "Loading Categories": "Loading Categories...",
          "Server went wrong": "Server went wrong",
          "Our Products": "Our Products",
          "Error loading products": "Error loading products",
          "No Name": "No Name",
          "Show More": "Show More",
          "New Arrivals": "New Arrivals",
          "NEW": "NEW",
          "Loveseat Sofa": "Loveseat Sofa",
          "Table Lamp": "Table Lamp",
          "Beige Table Lamp": "Beige Table Lamp",
          "Bamboo Basket": "Bamboo Basket",
          "Twister": "Twister",
          "Free Shipping": "Free Shipping",
      "Order above $200": "Order above $200",
      "Money-back": "Money-back",
      "30 days guarantee": "30 days guarantee",
      "Secure Payments": "Secure Payments",
      "Secured by Stripe": "Secured by Stripe",
      "24/7 Support": "24/7 Support",
      "Phone and Email support": "Phone and Email support",
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
          "Loading Categories": "جاري تحميل الفئات...",
          "Server went wrong": "حدث خطأ في الخادم",
          "Our Products": "منتجاتنا",
          "Error loading products": "خطأ في تحميل المنتجات",
          "No Name": "بدون اسم",
          "Show More": "اظهار المزيد",
          "New Arrivals": "وصل حديثًا",
          "NEW": "جديد",
          "Loveseat Sofa": "أريكة لوف سيت",
          "Table Lamp": "مصباح طاولة",
          "Beige Table Lamp": "مصباح طاولة بيج",
          "Bamboo Basket": "سلة خيزران",
          "Twister": "تويستر",
           "Free Shipping": "شحن مجاني",
      "Order above $200": "للطلبات فوق 200 دولار",
      "Money-back": "استرجاع المال",
      "30 days guarantee": "ضمان 30 يوم",
      "Secure Payments": "دفعات آمنة",
      "Secured by Stripe": "مؤمن بواسطة Stripe",
      "24/7 Support": "دعم 24/7",
      "Phone and Email support": "الدعم عبر الهاتف والبريد الإلكتروني"
        }
      }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
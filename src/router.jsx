import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "./Layout/Mainlayout";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Login from "./pages/auth/Login/Login.jsx";
import Register from "./pages/auth/Register/Register.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import CatagoriesExtra from "./pages/CatagoriesExtra/CatagoriesExtra.jsx";  
import ProtectedRouter from "./ProtectedRouter.jsx";
import Checkout from "./pages/checkout/checkout.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ProfileInfo from "./pages/Profile/ProfileInfo.jsx";
import ProfileOrders from "./pages/Profile/ProfileOrders.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import VerifyCode from "./pages/VerifyCode/VerifyCode.jsx";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import { Navigate } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        // بدل Home مباشرة، نرسل أي دخول للـ Login
        index: true,
        element: <Navigate to="/login" replace />
      },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      },
      {
        path: "verify-code",
        element: <VerifyCode />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "/product/:id",
        element: <ProductDetails />
      },
      {
        path: "shop",
        element: <Shop />
      },
      {
        path: "CatagoriesExtra",
        element: <CatagoriesExtra />
      },
      {
        path: "Profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
        children: [
          {
            index: true,
            element: <ProfileInfo />
          },
          {
            path: "ProfileOrders",
            element: <ProfileOrders />
          }
        ]
      },
      {
        path: "/category/:categoryId",
        element: <CategoryProducts />
      },
    ]
  }
]);

export default router;


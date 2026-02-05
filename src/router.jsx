import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "./Layout/Mainlayout";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Login from "./pages/auth/Login/Login.jsx";
import Register from "./pages/auth/Register/Register.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index:true,
        element: <Home />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path:"login",
        element:<Login />
      },
       {
        path:"register",
        element:<Register />
      },
    ]
  }
]);

export default router;

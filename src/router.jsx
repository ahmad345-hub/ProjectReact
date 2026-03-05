import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "./Layout/Mainlayout";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Login from "./pages/auth/Login/Login.jsx";
import Register from "./pages/auth/Register/Register.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import CatagoriesExtra from "./pages/CatagoriesExtra/CatagoriesExtra.jsx";  
import ProtectedRouter from "./ProtectedRouter.jsx";
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
        element:
        <ProtectedRouter>
          <Cart />
        </ProtectedRouter>
       
      },
      {
        path:"login",
        element:<Login />
      },
      {
        path:"CatagoriesExtra",
        element:<CatagoriesExtra />
      },
       {
        path:"register",
        element:<Register />
      },
      {
         path:"/product/:id",
         element:<ProductDetails />
      },
    ]
  }
]);

export default router;

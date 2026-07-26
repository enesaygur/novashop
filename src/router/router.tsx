import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductsDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import OrdersPage from "../pages/OrdersPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RegisterPage from "../pages/RegisterPage";
import AdminRoute from "../components/auth/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductsDetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmationPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "orders/:orderId",
            element: <OrderDetailsPage />,
          },
          {
            path: "wishlist",
            element: <WishlistPage />,
          },
        ],
      },
      {
        element:<AdminRoute/>,
        children:[
          {
            path:"/admin",
            element: <div>Admin Page</div>
          }
        ]
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;

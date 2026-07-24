import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/cart/CartContext.tsx";
import { WishlistProvider } from "./context/wishlist/WishlistContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </WishlistProvider>
    </QueryClientProvider>
  </StrictMode>,
);

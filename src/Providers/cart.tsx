"use client";

import { ProductWithTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductsToCart: (product: CartProduct) => void;
}
export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductsToCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  function addProductsToCart(product: CartProduct) {
    const hasSameProductOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (hasSameProductOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, product]);
  }
  return (
    <CartContext.Provider
      value={{
        products,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        addProductsToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

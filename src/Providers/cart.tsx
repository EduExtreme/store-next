"use client";

import { ProductWithTotalPrice } from "@/helpers/products";

import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  total: number;
  subTotal: number;
  totalDiscount: number;
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductsToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductsToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity;
    }, 0);
  }, [products]);

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = total - subTotal;

  function addProductsToCart(product: CartProduct) {
    const hasSameProductOnCart = products.some((cartProduct) => {
      return cartProduct.id === product.id;
    });

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
    } else {
      setProducts((prev) => [...prev, product]);
    }
  }

  function decreaseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  }

  function increaseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  }

  function removeProductFromCart(productId: string) {
    console.log(productId);
    setProducts((prev) =>
      prev.filter((cartProduct) => {
        cartProduct.id === productId;
      }),
    );
  }

  return (
    <CartContext.Provider
      value={{
        products,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        addProductsToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        total,
        subTotal,
        totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

import { ShoppingCartIcon } from "lucide-react";
import React, { useContext } from "react";
import { Badge } from "./badge";
import { CartContext } from "@/Providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/products";

export function Cart() {
  const { products } = useContext(CartContext);
  return (
    <div className="flex  flex-col gap-8">
      <Badge
        className="w-max gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon /> Carrinho
      </Badge>
      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <CartItem
            product={computeProductTotalPrice(product as any) as any}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}

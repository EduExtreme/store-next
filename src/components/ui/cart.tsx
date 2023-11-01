import { ShoppingCartIcon } from "lucide-react";
import React, { useContext } from "react";
import { Badge } from "./badge";
import { CartContext } from "@/Providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/products";
import { Separator } from "./separator";

export function Cart() {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);
  return (
    <div className="flex  flex-col gap-8">
      <Badge
        className="w-max gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon /> Carrinho
      </Badge>
      <div className="flex flex-col gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem
              product={computeProductTotalPrice(product as any) as any}
              key={product.id}
            />
          ))
        ) : (
          <span>Carrinho vazio. Vamos fazer compras ?</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R${subTotal.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p>R${totalDiscount.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm font-semibold">
          <p>Total</p>
          <p>R${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

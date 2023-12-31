import { ShoppingCartIcon } from "lucide-react";
import React, { useContext } from "react";
import { Badge } from "./badge";
import { CartContext } from "@/Providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/products";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

export function Cart() {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);

  async function finishPurchase() {
    const checkout = await createCheckout(products);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  }

  return (
    <div className="flex  h-full flex-col gap-8">
      <Badge
        className="w-max gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon /> Carrinho
      </Badge>
      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-8">
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
        </ScrollArea>
      </div>
      {products.length !== 0 && (
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
          <Button className="mt-7 font-bold uppercase" onClick={finishPurchase}>
            Finalizar Compra
          </Button>
        </div>
      )}
    </div>
  );
}

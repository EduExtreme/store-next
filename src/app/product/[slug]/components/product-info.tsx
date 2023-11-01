"use client";
import { CartContext } from "@/Providers/cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiscountBadge } from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRight,
  ArrowRightIcon,
  ThumbsUpIcon,
  TruckIcon,
} from "lucide-react";
import { useContext, useState } from "react";
interface ProductInfoProps {
  product: ProductWithTotalPrice;
}
export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const { addProductsToCart } = useContext(CartContext);

  function handleDecreaseQuantity() {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  }

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function addItemsToCart() {
    addProductsToCart({ ...product, quantity });
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <div className="flex items-center gap-2">
        <h1>R${product.totalPrice.toFixed(2)}</h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>
            <ArrowDownIcon size={14} />
            {product.discountPercentage}%
          </DiscountBadge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R${Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={handleDecreaseQuantity}>
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button size="icon" variant="outline" onClick={handleIncreaseQuantity}>
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify  text-sm opacity-60">
          {product.description}
        </p>
      </div>
      <Button className="mt-8 font-bold uppercase" onClick={addItemsToCart}>
        Adcionar ao carrinho
      </Button>

      <div className="mt-8 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-3">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">XtremePacket</span>
            </p>
            <p className="text-purple-400">
              Envio para <span className="font-bold">todo o Brasil</span>
            </p>
          </div>
        </div>
        <p className="text-xs font-bold">Frete Grátis</p>
      </div>
    </div>
  );
}

import { CartProduct } from "@/Providers/cart";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
interface CartItemProps {
  product: CartProduct;
}

export default function CartItem({ product }: CartItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold">
              {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3">
            <Button size="sm" variant="outline">
              <ArrowLeftIcon size={12} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button size="sm" variant="outline">
              <ArrowRightIcon size={12} />
            </Button>
          </div>
        </div>
      </div>
      <Button size="icon" variant="outline">
        <TrashIcon size={16} />
      </Button>
    </div>
  );
}

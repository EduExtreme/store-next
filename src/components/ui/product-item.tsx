import { ProductWithTotalPrice } from "@/helpers/products";

import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex w-[170px] flex-col gap-4">
      <div className="relative flex  h-[170px] cursor-pointer items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          width={0}
          height={0}
          alt={product.name}
          sizes="100vw"
          className="h-[90px] w-auto max-w-[80%] object-contain"
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[2px]">
            <ArrowDownIcon size={14} />
            {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm">{product.name}</p>
        <div className="flex items-center gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-semibold">R${product.totalPrice.toFixed(2)}</p>
              <p className="text-xs line-through opacity-75">
                R${Number(product.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold">
              R${Number(product.basePrice).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

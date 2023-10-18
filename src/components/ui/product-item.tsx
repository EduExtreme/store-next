import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex w-[156px] flex-col gap-4">
      <div className="flex h-[170px]  items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          width={0}
          height={0}
          alt={product.name}
          sizes="100vw"
          className="h-[90px] w-auto max-w-[80%] object-contain"
          //   style={{ objectFit: "contain" }}
        />
      </div>
      <div>
        <p className="truncate text-sm">{product.name}</p>
      </div>
    </div>
  );
};

export default ProductItem;

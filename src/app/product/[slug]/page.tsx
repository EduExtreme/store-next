import { prismaClient } from "@/lib/prisma";
import React from "react";
import { ProductImages } from "./components/product-images";
import { ProductInfo } from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/products";
import { ProductList } from "@/components/ui/product-list";
interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}
export default async function ProductDetailsPage({
  params: { slug },
}: ProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }
  return (
    <figure className="flex flex-col gap-8 pb-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <div className="px-5">
        <ProductInfo product={computeProductTotalPrice(product)} />
      </div>
      <ProductList products={product.category.products} />
    </figure>
  );
}

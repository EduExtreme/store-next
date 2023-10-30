import { prismaClient } from "@/lib/prisma";
import React from "react";
import { ProductImages } from "./components/product-images";
import { ProductInfo } from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/products";
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
  });

  if (!product) {
    return null;
  }
  return (
    <figure className="flex flex-col gap-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <div className="px-5">
        <ProductInfo product={computeProductTotalPrice(product)} />
      </div>
    </figure>
  );
}

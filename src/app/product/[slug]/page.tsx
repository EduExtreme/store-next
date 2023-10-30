import { prismaClient } from "@/lib/prisma";
import React from "react";
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
  return <h1>{product.name}</h1>;
}

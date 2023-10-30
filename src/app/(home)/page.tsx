import Image from "next/image";

import { prismaClient } from "@/lib/prisma";
import { ProductList } from "./components/product-list";
import { SectionTitle } from "./components/section-title";
import { PromoBanner } from "./components/promo-banner";
import { Categories } from "./components/categories";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col space-y-8 py-8">
      <PromoBanner src="/banner-home-01.png" alt="banner home" />
      <div className="px-5">
        <Categories />
      </div>
      <div className="">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <div className="">
        <PromoBanner src="/banner-mouses.png" alt="até 55%" />
      </div>

      <div className="">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
      <div>
        <PromoBanner src="/banner-fones.png" alt="banner home" />
      </div>
      <div className="">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}

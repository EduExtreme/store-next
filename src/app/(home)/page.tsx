import Image from "next/image";
import { Categories } from "./components/Categories";
import { prismaClient } from "@/lib/prisma";
import { ProductList } from "./components/ProductList";

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
  return (
    <div className="">
      <Image
        src="/banner-home-01.png"
        alt="banner home"
        width={0}
        height={0}
        className="h-auto w-full px-5"
        sizes="100vw"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mt-8">
        <p className="mb-2 pl-5 font-semibold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>

      <div className="mt-5">
        <Image
          src="/banner-mouses.png"
          alt="banner home"
          width={0}
          height={0}
          className="h-auto w-full px-5"
          sizes="100vw"
        />
      </div>

      <div className="mt-8">
        <p className="mb-2 pl-5 font-semibold uppercase">Teclados</p>
        <ProductList products={keyboards} />
      </div>
    </div>
  );
}

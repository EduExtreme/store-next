import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <figure className="flex flex-col">
        <div className="flex h-[9.375rem] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-category-item-gradient">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={400}
            height={400}
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          />
        </div>
        <div className="rounded-bl-lg rounded-br-lg bg-accent p-2">
          <p className="text-center text-sm font-semibold">{category.name}</p>
        </div>
      </figure>
    </Link>
  );
}

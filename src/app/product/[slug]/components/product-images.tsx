"use client";
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  imageUrls: string[];
  name: string;
}

export function ProductImages({ imageUrls, name }: ProductImagesProps) {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  function handleSelectedImage(imageUrl: string) {
    setCurrentImage(imageUrl);
  }

  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          src={currentImage}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>
      <div className="grid grid-cols-4 gap-4 px-5">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`mt-8 flex h-[100px] items-center justify-center rounded-lg bg-accent px-5
            ${
              imageUrl === currentImage &&
              "border-2 border-solid border-primary"
            }
            `}
            onClick={() => handleSelectedImage(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

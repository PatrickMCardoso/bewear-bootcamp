"use client";

import Image from "next/image";

interface BannerProps {
  src: string;
  alt: string;
  scrollDirection: "down" | "up";
  scrollAmount?: number;
}

export const Banner = ({
  src,
  alt,
  scrollDirection,
  scrollAmount = 300,
}: BannerProps) => {
  const handleBannerClick = () => {
    const currentScrollY = window.scrollY;
    const newScrollY =
      scrollDirection === "down"
        ? currentScrollY + scrollAmount
        : currentScrollY - scrollAmount;

    window.scrollTo({
      top: newScrollY,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="w-full cursor-pointer border-0 bg-transparent p-0"
      onClick={handleBannerClick}
      aria-label={`${alt} - Clique para rolar ${scrollDirection === "down" ? "para baixo" : "para cima"}`}
    >
      <Image
        src={src}
        alt={alt}
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto w-full"
      />
    </button>
  );
};

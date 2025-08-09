"use client";

import Image from "next/image";

interface BrandItemProps {
  name: string;
  logo: string;
}

const BrandItem = ({ name, logo }: BrandItemProps) => {
  return (
    <div>
      <div className="flex min-w-[90px] flex-col items-center gap-2 rounded-2xl border bg-white p-4">
        <div className="bg-gray-90 flex h-12 w-12 items-center justify-center rounded-xl">
          <Image
            src={logo}
            alt={name}
            width={name === "Polo" ? 32 : 40}
            height={name === "Polo" ? 32 : 40}
            className={`object-contain ${name === "Polo" ? "scale-90" : ""}`}
          />
        </div>
      </div>
      <span className="flex items-center justify-center py-2 text-xs font-medium">
        {name}
      </span>
    </div>
  );
};

export default BrandItem;

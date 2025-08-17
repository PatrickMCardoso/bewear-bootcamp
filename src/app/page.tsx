import { desc } from "drizzle-orm";

import { Banner } from "@/components/common/banner";
import BrandList from "@/components/common/brand-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const brands = [
    { name: "Nike", logo: "/nike-logo.svg" },
    { name: "Adidas", logo: "/adidas-logo.svg" },
    { name: "Puma", logo: "/puma-logo.svg" },
    { name: "New Balance", logo: "/newbalance-logo.svg" },
    { name: "Converse", logo: "/converse-logo.svg" },
    { name: "Polo", logo: "/polo-logo.svg" },
    { name: "Zara", logo: "/zara-logo.svg" },
  ];

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Banner
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            scrollDirection="down"
          />
        </div>

        <BrandList title="Marcas parceiras" brands={brands} />

        <ProductList products={products} title="Mais vendidos" />
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>
        <div className="px-5">
          <Banner
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            scrollDirection="up"
          />
        </div>
        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;

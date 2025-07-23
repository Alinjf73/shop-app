"use client";
import Image from "next/image";
import Loading from "@/common/Loading";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProducts } from "@/hooks/useProducts";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import Link from "next/link";
import { useMemo } from "react";

export default function HomePage() {
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategories();
  const { categories = [] } = categoriesData || {};

  const { data: productsData, isLoading: isLoadingProducts } = useGetProducts();
  const { products = [] } = productsData || {};

  if (isLoadingCategories || isLoadingProducts) return <Loading />;

  return (
    <div className="px-6 py-8 space-y-12">
      <h1 className="text-3xl font-extrabold text-secondary-700">
        فروشگاه آنلاین ما
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">دسته‌بندی‌ها</h2>
        <Categories categories={categories} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">محصولات اخیر</h2>
        <Products products={products} />
      </section>
    </div>
  );
}

function Categories({ categories }) {
  if (!categories.length) return <p>هیچ دسته‌بندی‌ای موجود نیست.</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          href={`/products?category=${category.englishTitle}`}
          key={category._id}
          className="border rounded-xl p-6 flex items-center justify-center shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-center">
            {category.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}

function Products({ products }) {
  const sortedProducts = useMemo(() => {
    return [...products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [products]);

  if (!products.length) return <p>هیچ محصولی برای نمایش وجود ندارد.</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sortedProducts.slice(0, 8).map((product) => (
        <Link
          href={`/products/${product.slug}`}
          key={product._id}
          className="border rounded-xl p-4 shadow hover:shadow-lg transition"
        >
          <div className="relative w-full h-40 mb-2">
            <Image
              src={`/images/${product.imageLink || "placeholder.jpg"}`}
              alt={product.title}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     25vw"
              priority={true}
            />
          </div>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-secondary-600">
            {toPersianNumbersWithComma(product.price)} تومان
          </p>
        </Link>
      ))}
    </div>
  );
}

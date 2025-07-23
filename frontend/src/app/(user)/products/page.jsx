import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import Link from "next/link";
import AddToCart from "./[slug]/AddToCart";
import LikeProduct from "./LikeProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Products({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const { products } = await getProducts(
    queryString.stringify(searchParams),
    strCookies
  );
  const { categories } = await getCategories();

  return (
    <div className="px-4">
      <h1 className="text-2xl font-extrabold mb-8">صفحه محصولات</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div>
          <CategorySidebar categories={categories} />
        </div>

        {/* Product List */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-2xl shadow p-4 flex flex-col hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={`/images/${product.imageLink}`}
                    alt={product.title}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>

                {/* Title */}
                <h2 className="font-semibold text-lg mb-1 line-clamp-2 min-h-[48px]">
                  {product.title}
                </h2>

                {/* Date */}
                <p className="text-xs text-gray-500 mb-2">
                  ساخته‌شده در:{" "}
                  <span className="font-bold">
                    {toLocalDateStringShort(product.createdAt)}
                  </span>
                </p>

                {/* Price */}
                <div className="mb-2">
                  {product.discount ? (
                    <>
                      <p className="text-sm text-gray-500 line-through">
                        {toPersianNumbersWithComma(product.price)} تومان
                      </p>
                      <p className="text-green-600 font-bold">
                        {toPersianNumbersWithComma(product.offPrice)} تومان
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-800 font-bold">
                      {toPersianNumbersWithComma(product.price)} تومان
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-primary-700 font-bold text-sm hover:underline"
                  >
                    مشاهده محصول
                  </Link>
                  <LikeProduct product={product} />
                  <AddToCart product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;

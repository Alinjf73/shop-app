import { getOneProdcutBySlug, getProducts } from "@/services/productService";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import AddToCart from "./AddToCart";
import Image from "next/image";

export const dynamic = "force-static";
export const dynamicParams = true;

async function page({ params }) {
  const { slug } = params;
  const { product } = await getOneProdcutBySlug(slug);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="w-full h-[300px] relative hover:scale-105 transition-all duration-300">
        <Image
          src={`/images/${product.imageLink}`}
          alt={product.title}
          fill
          className="object-contain rounded-xl"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="font-bold text-2xl mb-6">{product.title}</h1>
        <p className="mb-6">{product.description}</p>

        <p className="mb-6">
          قیمت محصول:{" "}
          <span
            className={`${product.discount ? "line-through" : "font-bold"}`}
          >
            {toPersianNumbersWithComma(product.price)}
          </span>
        </p>

        {!!product.discount && (
          <div className="flex items-center gap-x-2 mb-6">
            <p className="text-xl font-bold">
              قیمت با تخفیف: {toPersianNumbersWithComma(product.offPrice)}
            </p>
            <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
              {toPersianNumbers(product.discount)}٪
            </div>
          </div>
        )}

        <AddToCart product={product} />
      </div>
    </div>
  );
}

export default page;

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

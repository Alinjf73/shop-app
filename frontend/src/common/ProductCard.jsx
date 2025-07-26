import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/pages/(user)/products/[slug]/AddToCart";

function ProductCard({ product, children }) {
  return (
    <div className="border rounded-2xl shadow p-4 flex flex-col hover:shadow-lg transition">
      {/* Image */}
      <div className="relative w-full h-40 mb-4">
        <Image
          src={`/images/${product.imageLink}`}
          alt={product.title}
          fill
          sizes="40"
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
        {children}
        <AddToCart product={product} />
      </div>
    </div>
  );
}

export default ProductCard;

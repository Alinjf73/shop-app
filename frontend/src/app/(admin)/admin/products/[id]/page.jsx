"use client";

import Loading from "@/common/Loading";
import { useGetProductById } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Image from "next/image";

function Page() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};

  if (isLoading) return <Loading />;
  if (!product) return <p>محصولی یافت نشد.</p>;

  return (
    <div className="p-6 flex justify-center">
      <div className="border rounded-2xl shadow-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* تصویر محصول */}
        <div className="relative w-full h-64 md:h-full">
          <Image
            src={`/images/${product.imageLink || "placeholder.jpg"}`}
            alt={product.title}
            fill
            className="object-contain rounded-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* اطلاعات محصول */}
        <div className="flex flex-col justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary-700 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>

          <div className="space-y-2">
            <p className="text-lg">
              قیمت:{" "}
              <span
                className={`${
                  product.discount
                    ? "line-through text-gray-500"
                    : "font-bold text-green-600"
                }`}
              >
                {toPersianNumbersWithComma(product.price)} تومان
              </span>
            </p>

            {!!product.discount && (
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-green-700">
                  قیمت با تخفیف: {toPersianNumbersWithComma(product.offPrice)}{" "}
                  تومان
                </p>
                <span className="bg-rose-500 text-white text-sm px-2 py-1 rounded-xl">
                  {toPersianNumbers(product.discount)}٪ تخفیف
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

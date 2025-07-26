"use client";

import Loading from "@/common/Loading";
import ProductCard from "@/common/ProductCard";
import { useGetUser } from "@/hooks/useAuth";
import { useGetProductsByIds } from "@/hooks/useProducts";

function Page() {
  const { data, isLoading: isUserLoading } = useGetUser();
  const user = data?.user;
  const likedProductIds = user?.likedProducts || [];

  const {
    products,
    isLoading: isProductsLoading,
    isError,
  } = useGetProductsByIds(likedProductIds);

  if (isUserLoading || isProductsLoading) return <Loading />;
  if (isError) return <div>خطا در بارگیری محصولات</div>;

  return (
    <div className="lg:col-span-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.product._id} product={product.product} />
        ))}
      </div>
    </div>
  );
}

export default Page;

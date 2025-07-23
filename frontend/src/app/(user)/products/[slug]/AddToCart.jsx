"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiOutlineShoppingCart } from "react-icons/hi";

function AddToCart({ product }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetUser();
  const { isLoading, mutateAsync } = useAddToCart();
  const { user } = data || {};

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("لطفا ابتدا لاگین کنید.");
      router.push("/auth");
      return;
    }

    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const isInCart = (user, product) => {
    if (!user) return false;
    return user.cart?.products.some((p) => p.productId === product._id);
  };

  return (
    <div className="flex justify-center mt-2">
      {isInCart(user, product) ? (
        <Link
          href="/cart"
          className=" font-bold bg-emerald-600 text-white py-3 w-full rounded-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1"
        >
          ادامه سفارش
          <HiOutlineShoppingCart className="text-xl animate-bounce" />
        </Link>
      ) : isLoading ? (
        <div className="scale-50">
          <Loading />
        </div>
      ) : (
        <button
          onClick={addToCartHandler}
          className=" font-bold bg-primary-900 text-white py-3 w-full rounded-xl hover:scale-105 transition-all duration-200"
        >
          افزودن به سبد
        </button>
      )}
    </div>
  );
}
export default AddToCart;

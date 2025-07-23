"use client";

import Loading from "@/common/Loading";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";
import { useGetCategories } from "@/hooks/useCategories";
import CategoryListTable from "./CategoryListTable";

function page() {
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold mb-5">دسته بندی ها</h1>
        <Link
          href="/admin/categories/add"
          className="font-bold text-primary-900 flex items-center gap-x-2"
        >
          <HiPlusCircle className="w-6 h-6" /> <span>اضافه کردن دسته بندی</span>
        </Link>
      </div>
      <CategoryListTable categories={categories} />
    </div>
  );
}
export default page;

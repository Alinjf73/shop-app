"use client";

import Loading from "@/common/Loading";
import { useGetAllUsers } from "@/hooks/useAuth";
import { useParams } from "next/navigation";

function Page() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllUsers();
  const { users } = data || {};

  if (isLoading) return <Loading />;
  const user = users?.find((user) => user.id === id || user._id === id);
  if (!user) return <p>کاربر مورد نظر پیدا نشد.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-secondary-700">
        اطلاعات کاربر
      </h1>

      <div className="space-y-4 text-secondary-800">
        <div>
          <span className="font-semibold">نام:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">ایمیل:</span>{" "}
          {user.email || "تعریف نشده"}
        </div>
        <div>
          <span className="font-semibold">شماره تماس:</span>{" "}
          {user.phoneNumber || "تعریف نشده"}
        </div>
        <div>
          <span className="font-semibold">نقش:</span>{" "}
          {user.role === "ADMIN" ? "ادمین" : "کاربر عادی" || "تعریف نشده"}
        </div>
      </div>
    </div>
  );
}
export default Page;

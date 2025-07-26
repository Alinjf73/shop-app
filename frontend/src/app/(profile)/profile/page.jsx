"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";
import Link from "next/link";
import PaymentTable from "./payments/PaymentTable";
import OrdersChart from "@/common/OrderChart";
import Stats from "./(dashboard)/Stats";

function Page() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl">
        سلام ! <span className="font-bold">{user.name}</span> خوش آمدی!
      </h1>
      <p>
        <span>تاریخ پیوستن:</span>
        <span> {toLocalDateString(user.createdAt)} </span>
      </p>
      <Stats payments={payments} />
      <div className="border rounded-xl  mt-8">
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-bold text-xl">آخرین سفارشات کاربر</h2>
          <Link className="text-primary-900 font-bold" href="/profile/payments">
            مشاهده همه سفارشات
          </Link>
        </div>
        <PaymentTable
          payments={payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)}
        />
      </div>
      <OrdersChart payments={payments} />
    </div>
  );
}
export default Page;

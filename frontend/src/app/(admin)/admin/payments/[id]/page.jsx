"use client";

import Loading from "@/common/Loading";
import { useGetOnePayment } from "@/hooks/usePayments";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { useParams } from "next/navigation";

function Page() {
  const { id } = useParams();
  const { data, isLoading } = useGetOnePayment(id);
  const { payment } = data || {};

  if (isLoading) return <Loading />;
  if (!payment?.length) return <p>اطلاعات پرداخت یافت نشد.</p>;

  const paymentInfo = payment[0];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-secondary-700">
        جزئیات پرداخت
      </h1>

      <div className="space-y-4 text-secondary-800">
        <div>
          <span className="font-semibold">شماره فاکتور:</span>{" "}
          {paymentInfo.invoiceNumber}
        </div>
        <div>
          <span className="font-semibold">روش پرداخت:</span>{" "}
          {paymentInfo.paymentMethod}
        </div>
        <div>
          <span className="font-semibold">مبلغ سفارش:</span>{" "}
          {toPersianNumbersWithComma(paymentInfo.amount)} تومان
        </div>
        <div>
          <span className="font-semibold">تاریخ سفارش:</span>{" "}
          {toLocalDateStringShort(paymentInfo.createdAt)}
        </div>
        <div>
          <span className="font-semibold">توضیحات:</span>{" "}
          {paymentInfo.description || "ندارد"}
        </div>
        <div>
          <span className="font-semibold">وضعیت:</span>{" "}
          {paymentInfo.status === "COMPLETED" ? (
            <span className="badge badge--success">موفق</span>
          ) : (
            <span className="badge badge--error">ناموفق</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;

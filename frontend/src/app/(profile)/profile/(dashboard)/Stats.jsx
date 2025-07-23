import { HiCalendar, HiCurrencyDollar, HiShoppingCart } from "react-icons/hi";
import Stat from "@/common/Stat";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";

function Stats({ payments = [] }) {
  const sortedPayments = [...payments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const lastPayment = sortedPayments[0] || {};

  const statsData = [
    {
      id: 1,
      title: "تعداد سفارشات",
      value: payments.length,
      icon: <HiShoppingCart className="text-3xl" />,
      color: "primary",
    },
    {
      id: 2,
      title: "تاریخ آخرین سفارش",
      value: lastPayment.createdAt
        ? toLocalDateStringShort(lastPayment.createdAt)
        : "-",
      icon: <HiCalendar className="text-3xl" />,
      color: "green",
    },
    {
      id: 3,
      title: "مبلغ آخرین سفارش",
      value: lastPayment.amount
        ? toPersianNumbersWithComma(lastPayment.amount)
        : "-",
      icon: <HiCurrencyDollar className="text-3xl" />,
      color: "yellow",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {statsData.map((item) => (
        <Stat key={item.id} {...item} />
      ))}
    </section>
  );
}

export default Stats;

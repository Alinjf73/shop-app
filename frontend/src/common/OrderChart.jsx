"use client";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toPersianNumbers } from "@/utils/toPersianNumbers";

const getMonthName = (dateStr) => {
  const monthNames = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const jDate = dayjs(dateStr).calendar("jalali");
  const monthIndex = jDate.month();
  return monthNames[monthIndex];
};

const groupPaymentsByMonth = (payments) => {
  const summary = {};

  payments.forEach((payment) => {
    const month = getMonthName(payment.createdAt);
    summary[month] = (summary[month] || 0) + 1;
  });

  return Object.entries(summary).map(([month, count]) => ({
    name: month,
    تعداد: count,
  }));
};

function OrdersChart({ payments = [] }) {
  const data = groupPaymentsByMonth(payments);

  if (!data.length) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
      <h4 className="font-bold mb-4 text-gray-700 text-lg">
        سفارش‌ها بر اساس ماه
      </h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => toPersianNumbers(value)} />
          <Tooltip
            formatter={(value) => toPersianNumbers(value)}
            labelFormatter={(label) => `ماه: ${label}`}
          />
          <Bar
            dataKey="تعداد"
            fill="#38bdf8"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersChart;

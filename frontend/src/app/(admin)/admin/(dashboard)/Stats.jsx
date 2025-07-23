import { HiUsers } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";
import { HiShoppingCart } from "react-icons/hi";
import Stat from "@/common/Stat";

function Stats({ users = [], products = [], payments = [] }) {
  const statsData = [
    {
      id: 1,
      title: "تعداد کاربران",
      value: users.length,
      icon: <HiUsers className="text-3xl" />,
      color: "primary",
    },
    {
      id: 2,
      title: "تعداد محصولات",
      value: products.length,
      icon: <AiFillProduct className="text-3xl" />,
      color: "green",
    },
    {
      id: 3,
      title: "سفارش‌های ثبت‌شده",
      value: payments.length,
      icon: <HiShoppingCart className="text-3xl" />,
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

"use client";

import { logout } from "@/services/authService";
import Link from "next/link";
import { AiFillDashboard, AiFillProduct } from "react-icons/ai";
import { HiHome, HiShoppingCart, HiUsers } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { BiSolidCoupon } from "react-icons/bi";
import { PiSignOutBold } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/common/Modal";
import Confirm from "@/common/Confirm";

const menuOptions = [
  { id: 1, title: "صفحه اصلی", href: "/", icon: <HiHome /> },
  {
    id: 2,
    title: "داشبرد",
    href: "/admin",
    icon: <AiFillDashboard />,
  },
  {
    id: 3,
    title: "کاربران",
    href: "/admin/users",
    icon: <HiUsers />,
  },
  {
    id: 4,
    title: "محصولات",
    href: "/admin/products",
    icon: <AiFillProduct />,
  },
  {
    id: 5,
    title: "دسته بندی",
    href: "/admin/categories",
    icon: <MdCategory />,
  },
  {
    id: 6,
    title: "سفارشات",
    href: "/admin/payments",
    icon: <HiShoppingCart />,
  },
  {
    id: 7,
    title: "کد تخفیف",
    href: "/admin/coupons",
    icon: <BiSolidCoupon />,
  },
];

function AdminSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const logoutHandler = async () => {
    await logout();
    setOpenModal(false);
    router.push("/");
  };

  return (
    <div>
      <ul className="flex justify-between sm:items-start sm:flex-col">
        {menuOptions.map((menuOption) => {
          const isActive =
            pathname === menuOption.href ||
            (pathname.startsWith(menuOption.href + "/") &&
              menuOption.href !== "/admin");
          return (
            <li
              className={`hover:bg-gray-200 transition-all duration-300 block w-full p-4 ${
                isActive
                  ? "bg-gray-300 sm:border-r-4 sm:border-primary-800 text-primary-900"
                  : ""
              }`}
              key={menuOption.id}
            >
              <Link
                href={menuOption.href}
                className="flex items-center justify-center sm:justify-start gap-x-2"
              >
                <span className="text-xl" title={menuOption.title}>
                  {menuOption.icon}
                </span>
                <span className="hidden sm:block lg:text-lg">
                  {menuOption.title}
                </span>
              </Link>
            </li>
          );
        })}
        <li className="hover:bg-gray-200 transition-all duration-300 block w-full p-4">
          <button
            className="flex items-center justify-center sm:justify-start gap-x-2 text-error"
            onClick={() => setOpenModal(true)}
          >
            <span className="text-xl" title="خروج">
              <PiSignOutBold />
            </span>
            <span className="hidden sm:block">خروج</span>
          </button>

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            title="خروج از حساب کاربری"
          >
            <Confirm
              resourceName="خروج"
              onClose={() => setOpenModal(false)}
              onConfirm={logoutHandler}
            />
          </Modal>
        </li>
      </ul>
    </div>
  );
}
export default AdminSideBar;

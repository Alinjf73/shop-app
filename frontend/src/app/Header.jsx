"use client";

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import { AiFillProduct } from "react-icons/ai";
import { HiHome, HiLogin, HiShoppingCart, HiUser } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { PiSignOutBold } from "react-icons/pi";
import { logout } from "@/services/authService";
import { useQueryClient } from "@tanstack/react-query";
import { RiAdminFill } from "react-icons/ri";

function Header() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};
  const pathname = usePathname();
  const isAdmin = user?.role === "ADMIN";
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutHandler = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: ["get-user"] });
    router.push("/auth");
  };

  const menuOptions = [
    { id: 1, title: "خانه", href: "/", icon: <HiHome /> },
    { id: 2, title: "محصولات", href: "/products", icon: <AiFillProduct /> },
    { id: 3, title: "پنل کاربر", href: "/profile/me", icon: <HiUser /> },
    ...(isAdmin
      ? [{ id: 4, title: "پنل ادمین", href: "/admin", icon: <RiAdminFill /> }]
      : []),
    {
      id: 5,
      title: `سبد خرید (${toPersianNumbers(
        cart?.payDetail?.productIds?.length || 0
      )})`,
      href: "/cart",
      icon: <HiShoppingCart />,
    },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href !== "/") return pathname.startsWith(href);
  };

  return (
    <header
      className={`shadow-md fixed sm:sticky sm:mb-10 bottom-0 transition-all duration-200 bg-white px-8 w-full z-50 ${
        isLoading ? "blur-sm opacity-70" : "blur-0 opacity-100"
      }`}
    >
      <nav>
        <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl">
          {menuOptions.map((menu) => (
            <li key={menu.id}>
              <Link
                href={menu.href}
                className={`flex items-center gap-1 py-2 px-2 transition-all ${
                  isActive(menu.href)
                    ? "text-primary-900 font-bold border-b-2 border-primary-900"
                    : "text-gray-700 hover:text-primary-700"
                }`}
              >
                <span className="text-xl">{menu.icon}</span>
                <span className="hidden sm:block">{menu.title}</span>
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <li>
                <span className="py-2 text-primary-900 font-bold">
                  <span className="hidden sm:block">{user.name}</span>
                </span>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 text-error font-bold"
                >
                  <span className="hidden sm:block">خروج</span>
                  <span className="text-xl">
                    <PiSignOutBold />
                  </span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                className="flex items-center gap-2 py-2 text-blue-600 font-bold"
                href="/auth"
              >
                <span className="hidden sm:block">ورود</span>
                <span className="text-xl">
                  <HiLogin />
                </span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

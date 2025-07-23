import vazirFont from "@/constants/localFonts";
import "../../globals.css";
import Providers from "@/pages/Providers";
import { Toaster } from "react-hot-toast";
import SideBar from "./SideBar";

export const metadata = {
  title: "پروفایل کاربر",
  description: "پروفایل کاربر",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans`}
      >
        <Providers>
          <Toaster />
          <div className="grid grid-cols-1 sm:grid-cols-5 bg-white h-screen">
            <div className="fixed w-full bottom-0 sm:static sm:bottom-auto col-span-1 bg-gray-100 overflow-y-auto z-50">
              <SideBar />
            </div>
            <div className="col-span-1 sm:col-span-4 overflow-y-auto p-4 pb-14 sm:pb-4">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

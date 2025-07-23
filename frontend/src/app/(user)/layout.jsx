import vazirFont from "@/constants/localFonts";
import ".././globals.css";
import Header from ".././Header";
import { Toaster } from "react-hot-toast";
import Providers from ".././Providers";

export const metadata = {
  title: "next shop panel",
  description: "next shop panel",
};

export default function rootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />
          <Header />
          <div className="container xl:max-w-screen-xl px-4 pb-14 sm:pb-4">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

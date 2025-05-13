import type { Metadata } from "next";
import SideBar from "@/components/sidebar";
import HeadBar from "@/components/HeadBar";
import "../globals.css";

export const metadata: Metadata = {
  title: "پنل مدیریت کسب و کار آرمان آپس",
  description: "راه حلی نوین با تکنولوژی های روز برنامه نویسی",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="xl:flex pb-20 xl:pb-0">
      <div className="xl:w-1/6">
        <SideBar />
      </div>
      <div className="xl:w-5/6 xl:px-5 lx:py-3 xl:space-y-4 bg-white dark:bg-black">
        <HeadBar />
        {children}
      </div>
    </div>
  );
}

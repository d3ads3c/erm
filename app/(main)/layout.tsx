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
    <div className="xl:flex">
      <div className="xl:w-1/6">
        <SideBar />
      </div>
      <div className="xl:w-5/6 px-5 py-3 space-y-4 bg-white dark:bg-black">
        <HeadBar />
        {children}
      </div>
    </div>
  );
}

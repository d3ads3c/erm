"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AfterSaleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      <div className="xl:flex items-center gap-5 mb-5 hidden">
        {/* <Link
          href={"/aftersale"}
          className={`${pathname === "/aftersale" ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
            }`}
        >
          <h2>داشبورد</h2>
        </Link> */}
        {/* <Link
          href={"/aftersale/acceptance"}
          className={`${
            pathname.includes("/aftersale/acceptance") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>پذیرش</h2>
        </Link>
        <Link
          href={"/aftersale/repair"}
          className={`${
            pathname.includes("/aftersale/repair") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>تعمیرگاه</h2>
        </Link>
        <Link
          href={"/aftersale/tickets"}
          className={`${
            pathname.includes("/aftersale/tickets") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>تیکت ها</h2>
        </Link>
        <Link
          href={"/aftersale/categories"}
          className={`${
            pathname.includes("/aftersale/categories") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>دسته بندی ها</h2>
        </Link> */}
        <Link
          href={"/aftersale/agents"}
          className={`${pathname.includes("/aftersale/agents") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
            }`}
        >
          <h2>نمایندگان</h2>
        </Link>
        <Link
          href={"/aftersale/request"}
          className={`${pathname.includes("/aftersale/request") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
            }`}
        >
          <h2>درخواست ها</h2>
        </Link>
        {/* <Link
          href={"/aftersale/settings"}
          className={`${
            pathname.includes("/aftersale/settings") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>تنظیمات</h2>
        </Link> */}
      </div>
      <div className="p-3 xl:p-0">
        {children}

      </div>
    </div>
  );
}
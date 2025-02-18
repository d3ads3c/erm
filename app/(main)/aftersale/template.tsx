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
      <div className="flex items-center gap-5 mb-5">
        <Link
          href={"/aftersale"}
          className={`${
            pathname === "/aftersale" ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>داشبورد</h2>
        </Link>
        <Link
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
            pathname === "/aftersale/repair" ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>تعمیرگاه</h2>
        </Link>
      </div>
      {children}
    </div>
  );
}
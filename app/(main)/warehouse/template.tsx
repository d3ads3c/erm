"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function warehouseTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <Link
          href={"/warehouse"}
          className={`${
            pathname === "/warehouse" ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>خلاصه</h2>
        </Link>
        <Link
          href={"/warehouse/storages"}
          className={`${
            pathname.includes("/warehouse/storages") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>انبارها</h2>
        </Link>
        <Link
          href={"/warehouse/stocks"}
          className={`${
            pathname.includes("/warehouse/stocks") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>کالاها</h2>
        </Link>
        <Link
          href={"/warehouse/categories"}
          className={`${
            pathname.includes("/warehouse/categories") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>دسته بندی ها</h2>
        </Link>
        <Link
          href={"/warehouse/settings"}
          className={`${
            pathname.includes("/warehouse/settings") ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>تنظیمات</h2>
        </Link>
      </div>
      {children}
    </div>
  );
}
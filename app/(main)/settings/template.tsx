"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function ProfileTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="p-3 xl:p-0">
      <div className="xl:flex items-center gap-5 mb-5 hidden">
        <Link
          href={"/settings"}
          className={`${
            pathname === "/settings" ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>اطاعات پایه</h2>
        </Link>
        <Link
          href={"/settings/departmans"}
          className={`${
            pathname === "/settings/departmans" ? "min-w-max shadow-lg shadow-red-200 rounded-lg py-2 px-5 bg-red-500 text-white" : "min-w-max rounded-lg py-2 px-5 bg-white border border-gray-200 text-gray-700"
          }`}
        >
          <h2>دپارتمان ها</h2>
        </Link>
      </div>
      {children}
    </div>
  );
}
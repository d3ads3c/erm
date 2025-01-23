"use client";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="h-screen w-full border-l">
      <div className="h-[10%] w-full p-3">
        <div className="flex items-center p-3 border rounded-xl">
          <div className="w-4/5 flex items-center gap-2">
            <div className="size-10 rounded-xl bg-gray-100"></div>
            <div>
              <h2 className="font-bold text-gray-700">
                آرمان همراه ارتباطات آریا
              </h2>
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
                </span>
                <p className="text-xs text-emerald-400 mt-0.5">لایسنس فعال</p>
              </div>
            </div>
          </div>
          <div className="w-1/5 flex items-center justify-end">
            <button className="text-gray-700 mt-1" type="button">
              <i className="fi fi-br-angle-small-down"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="h-[80%] w-full p-5">
        <h3 className="text-gray-500 text-sm">منو</h3>
        <div className="min-h-full overflow-auto w-full mt-3">
          <ul className="space-y-3">
            <li>
              <Link
                href={"#"}
                className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-xl text-white"
              >
                <i className="fi fi-rr-dashboard-panel mt-2"></i>
                <p>داشبورد</p>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center gap-2 text-gray-500 px-3 py-1 rounded-xl hover:bg-gray-100"
              >
                <i className="fi fi-sr-building mt-2"></i>
                <p>سازمان</p>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center gap-2 text-gray-500 px-3 py-1 rounded-xl hover:bg-gray-100"
              >
                <i className="fi fi-sr-users-alt mt-2"></i>
                <p>منابع انسانی</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

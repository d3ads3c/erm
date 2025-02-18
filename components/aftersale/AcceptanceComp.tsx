"use client"
import Link from "next/link";

export default function AcceptanceComp() {
  return (
    <div className="space-y-5 mt-5">
      <div className="flex items-center justify-between">
        <h2>پذیرش</h2>
        <Link href={"acceptance/new"} className="bg-emerald-400 text-white py-2 px-4 rounded-xl shadow-lg shadow-emerald-200">
          پذیرش جدید
        </Link>
      </div>
      <div>
        <table className="w-full table mt-3">
          <thead className="bg-gray-100 rounded-xl text-gray-500 text-right">
            <tr>
              <th className="rounded-r-xl py-3 px-5">شماره</th>
              <th>نام مشتری</th>
              <th>شماره تماس</th>
              <th>دستگاه</th>
              <th>ایراد</th>
              <th>تاریخ مراجعه</th>
              <th>تاریخ تحویل</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-right"></tbody>
        </table>
      </div>
    </div>
  );
}

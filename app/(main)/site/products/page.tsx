import Link from "next/link";

export default function SiteProducts() {
  return (
    <div>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2>محصولات سایت</h2>
          <div>
            <Link
              href={"/site/products/new"}
              className="bg-red-600 rounded-xl py-2 px-4 shadow-xl shadow-red-200 text-white"
            >
              محصول جدید
            </Link>
          </div>
        </div>
      </div>
      <div>
        <table className="w-full table mt-3">
          <thead className="rounded-xl text-gray-500 text-right text-sm border-b">
            <tr>
              <th className="rounded-r-xl py-3 px-5">شناسه</th>
              <th>محصول</th>
              <th>فروشندگان</th>
              <th>لایک</th>
              <th>بازدید ها</th>
              <th>نظرات</th>
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

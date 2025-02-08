"use client";
import { useEffect, useState } from "react";

export default function DepartmansComp() {
  const [Departmans, setDepartmans] = useState<[] | null>(null);

  useEffect(() => {
    fetch("/api/settings/departmans/list")
      .then((res) => res.json())
      .then((data) => {
        setDepartmans(data);
      });
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2>لیست دپارتمان ها</h2>
      </div>
      <div>
        <table className="w-full table mt-3">
          <thead className="bg-gray-100 rounded-xl text-gray-500 text-right">
            <tr>
              <th className="rounded-r-xl py-3 px-5">#</th>
              <th>نام بخش</th>
              <th>اعضاء</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-right">
            {Departmans?.map((dp: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="py-5 px-5">{dp.ID}</td>
                <td>{dp.Name}</td>
                <td>3 نفر</td>
                <td>{dp.Status}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

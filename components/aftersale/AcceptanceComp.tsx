"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AcceptanceComp() {
  const [Acceptances, setAcceptance] = useState<[] | null>(null);

  useEffect(() => {
    fetch("/api/aftersale/acceptance/list")
      .then((res) => res.json())
      .then((data) => {
        setAcceptance(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="space-y-5 mt-5">
      <div className="flex items-center justify-between">
        <h2>پذیرش</h2>
        <Link
          href={"acceptance/new"}
          className="bg-emerald-400 text-white py-2 px-4 rounded-xl shadow-lg shadow-emerald-200"
        >
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
          <tbody className="text-right">
            {Acceptances?.map((acceptance: any, index: number) => (
              <tr key={index} className="text-gray-700 border-b">
                <td className="p-5">{acceptance.Serial}</td>
                <td>{acceptance.Customer}</td>
                <td>{acceptance.Phone}</td>
                <td>
                  <div>
                    <p className="text-gray-400 text-xs">{acceptance.Brand}</p>
                    <p className="text-gray-700 text-sm font-bold">
                      {acceptance.Model}
                    </p>
                  </div>
                </td>
                <td>{acceptance.Problem}</td>
                <td>{acceptance.VisitDate}</td>
                <td>{acceptance.Deadline}</td>
                {acceptance.Status == "pending" ? (
                  <td>
                    <div className="w-fit px-3 py-1 rounded-full font-bold text-sm bg-sky-100 text-sky-500">
                      درحال انجام
                    </div>
                  </td>
                ) : acceptance.Status == "complete" ? (
                  <td>
                    <div className="w-fit px-3 py-1 rounded-full font-bold text-sm bg-emerald-100 text-emerald-500">
                      تکمیل شده
                    </div>
                  </td>
                ) : (
                  <td>
                    <div className="w-fit px-3 py-1 rounded-full font-bold text-sm bg-emerald-100 text-emerald-500">
                      غیرقابل تعمیر
                    </div>
                  </td>
                )}
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-gray-100 rounded-lg px-4 py-2 text-gray-500 ">
                      <p>گزینه ها</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] ml-12">
                      <DropdownMenuLabel>
                        {acceptance.Serial}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>مشاهده</DropdownMenuItem>
                      <DropdownMenuItem>تخصیص</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

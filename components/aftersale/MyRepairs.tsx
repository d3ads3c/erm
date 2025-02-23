"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MyRepairs() {
  const [Technician, setTechnician] = useState("me");

  return (
    <div className="space-y-5 mt-5">
      <div className="flex items-center justify-between">
        <h2>تعمیرگاه</h2>
        <Select dir="rtl" onValueChange={(value) => setTechnician(value)}>
          <SelectTrigger className="w-40 mt-2">
            <SelectValue placeholder="انتخاب تکنسین" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="تمامی دستگاه ">تمامی دستگاه ها</SelectItem>
            <SelectItem value="دستگاه های من">دستگاه های من</SelectItem>
            <SelectItem value="ایمان ابراهیمی">ایمان ابراهیمی</SelectItem>
            <SelectItem value="مهدی اشرفی">مهدی اشرفی</SelectItem>
            <SelectItem value="سینا شریفی">سینا شریفی</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-5">
        <div className="w-full grid grid-cols-2 gap-5">
          <Link
            href={"#"}
            className="border rounded-2xl p-5 hover:shadow-xl duration-150"
          >
            <div className="flex items-center justify-between">
              <div className="w-5/6 flex items-center gap-2 font-bold">
                <p className="text-gray-400 text-lg">#25487 -</p>
                <p>نیما نیک عمل</p>
                <div className="w-fit px-3 py-1 rounded-lg font-bold text-sm bg-sky-100 text-sky-500">
                  درحال انجام
                </div>
                <div className="w-fit px-3 py-1 rounded-lg font-bold text-sm bg-red-100 text-red-500">
                  فوری
                </div>
              </div>
              <div className="w-1/6"></div>
            </div>
            <div className="flex items-center gap-8 my-5 w-full">
              <div className="flex items-center font-bold gap-2 text-gray-400">
                <i className="fi fi-sr-devices mt-1"></i>
                <p>Apple iPhone 16 Pro Max</p>
              </div>
              <div className="flex items-center font-bold gap-2 text-gray-400">
                <i className="fi fi-sr-marker mt-1"></i>
                <p>تهران، تهران</p>
              </div>
              <div className="flex items-center font-bold gap-2 text-gray-400">
                <i className="fi fi-sr-calendar mt-1"></i>
                <p>1403/05/07</p>
              </div>
              <div className="flex items-center font-bold gap-2 text-gray-400">
                <i className="fi fi-sr-calendar-check mt-1"></i>
                <p>5 روز تا تحویل</p>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-gray-300"></div>
            <div className="flex gap-5 mt-4">
              <div className="w-1/3">
                <p className="text-xs text-gray-500">ایراد دستگاه</p>
                <p className="text-sm">دستگاه خاموش شده و دیگر روشن نمی شود</p>
              </div>
              <div className="w-1/3">
                <p className="text-xs text-gray-500">توضحیات برای تکنسین</p>
                <p className="text-sm">سریع تر انجام شود</p>
              </div>
              <div className="w-1/3"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

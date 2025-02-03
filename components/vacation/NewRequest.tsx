"use client";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JalaliDatePicker from "@/components/DatePicker";
import moment, { Moment } from "moment-jalaali";
import { useState } from "react";

export default function VacationReq() {
  const [StartDate, setStartDate] = useState(moment());
  const [EndDate, setEndDate] = useState(moment());

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2>مرخصی های من</h2>
        <Sheet>
          <SheetTrigger className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 px-7 py-3 w-fit rounded-xl">
            مرخصی جدید
          </SheetTrigger>
          <SheetContent side={"left"} className="min-w-[500px]">
            <SheetHeader>
              <SheetTitle>درخواست مرخصی جدید</SheetTitle>
              <SheetDescription>
                پس از ثبت درخواست ابتدا به سرپرست شما واگذار خواهد شد.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-5 my-5">
              <div>
                <p className="text-sm mb-2">انتخاب نوع مرخصی</p>
                <Select dir="rtl">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="نوع مرخصی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مرخصی استحقاقی روزانه">
                      مرخصی استحقاقی روزانه
                    </SelectItem>
                    <SelectItem value="مرخصی استحقاقی ساعتی">
                      مرخصی استحقاقی ساعتی
                    </SelectItem>
                    <SelectItem value="مرخصی استعلاجی ساعتی">
                      مرخصی استعلاجی ساعتی
                    </SelectItem>
                    <SelectItem value="مرخصی استعلاجی روزانه">
                      مرخصی استعلاجی روزانه
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border p-3 rounded-lg">
                <p className="text-sm mb-2">تاریخ رفت</p>
                <JalaliDatePicker
                  value={StartDate}
                  name={"startdate"}
                  onChange={setStartDate}
                />
              </div>
              <div className="border p-3 rounded-lg">
                <p className="text-sm mb-2">تاریخ برگشت</p>
                <JalaliDatePicker
                  value={EndDate}
                  name={"enddate"}
                  onChange={setEndDate}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                >
                  ثبت مرخصی
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="w-full">
          <div className="border rounded-2xl p-3 space-y-3">
            <div className="flex  items-center w-full">
              <div className="w-1/2 flex items-center gap-3">
                <div className="size-12 rounded-xl bg-gray-100 dark:bg-[#212121]">
                  <Image
                    src={"/img/default-user-icon.jpg"}
                    width={48}
                    height={48}
                    alt="User Image"
                    className="rounded-xl"
                  ></Image>
                </div>
                <div className="">
                  <h3 className="text-gray-700 dark:text-white">
                    نیما نیک عمل
                  </h3>
                  <p className="text-xs text-gray-400">مدیر ارشد فناوری</p>
                </div>
              </div>
              <div className="w-1/2 flex items-start justify-end">
                <div className="flex items-center gap-2 bg-emerald-100 rounded-full w-fit py-1 px-3">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400"></span>
                  </span>
                  <p className="text-xs text-emerald-400 mt-0.5">
                    در انتظار تایید سرپرست
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-full py-2 rounded-xl bg-emerald-100 text-emerald-500 text-center font-bold">
                <p>تایید شده</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-[#212121] text-center py-1 rounded-lg flex">
              <div className="w-1/2 text-xs">
                <p className=" text-gray-400">از تاریخ</p>
                <p>1403/10/05 | 09:00</p>
              </div>
              <div className="w-1/2 text-xs">
                <p className=" text-gray-400">تا تاریخ</p>
                <p>1403/10/05 | 09:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="border rounded-2xl p-3 space-y-3">
            <div className="flex  items-center w-full">
              <div className="w-1/2 flex items-center gap-3">
                <div className="size-12 rounded-xl bg-gray-100 dark:bg-[#212121]">
                  <Image
                    src={"/img/default-user-icon.jpg"}
                    width={48}
                    height={48}
                    alt="User Image"
                    className="rounded-xl"
                  ></Image>
                </div>
                <div className="">
                  <h3 className="text-gray-700 dark:text-white">
                    نیما نیک عمل
                  </h3>
                  <p className="text-xs text-gray-400">مدیر ارشد فناوری</p>
                </div>
              </div>
              <div className="w-1/2 flex items-start justify-end">
                <div className="flex items-center gap-2 bg-orange-100 rounded-full w-fit py-1 px-3">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex size-2.5 rounded-full bg-orange-400"></span>
                  </span>
                  <p className="text-xs text-orange-400 mt-0.5">
                    در انتظار تایید سرپرست
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3/4 py-2 rounded-xl bg-orange-100 text-orange-500 text-center font-bold">
                <p>در انتظار تایید</p>
              </div>
              <div className="w-1/4 h-full text-sm text-red-500 text-center">
                حذف درخواست
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-[#212121] text-center py-1 rounded-lg flex">
              <div className="w-1/2 text-xs">
                <p className=" text-gray-400">از تاریخ</p>
                <p>1403/10/05 | 09:00</p>
              </div>
              <div className="w-1/2 text-xs">
                <p className=" text-gray-400">تا تاریخ</p>
                <p>1403/10/05 | 09:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="border rounded-2xl p-3 space-y-3">
            <div className="flex  items-center w-full">
              <div className="w-1/2 flex items-center gap-3">
                <div className="size-12 rounded-xl bg-gray-100 dark:bg-[#212121]">
                  <Image
                    src={"/img/default-user-icon.jpg"}
                    width={48}
                    height={48}
                    alt="User Image"
                    className="rounded-xl"
                  ></Image>
                </div>
                <div className="">
                  <h3 className="text-gray-700 dark:text-white">
                    نیما نیک عمل
                  </h3>
                  <p className="text-xs text-gray-400">مدیر ارشد فناوری</p>
                </div>
              </div>
              <div className="w-1/2 flex items-start justify-end">
                <div className="flex items-center gap-2 bg-orange-100 rounded-full w-fit py-1 px-3">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex size-2.5 rounded-full bg-orange-400"></span>
                  </span>
                  <p className="text-xs text-orange-400 mt-0.5">
                    در انتظار تایید سرپرست
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3/4 py-2 rounded-xl bg-orange-100 text-orange-500 text-center font-bold">
                <p>در انتظار تایید</p>
              </div>
              <div className="w-1/4 h-full text-sm text-red-500 text-center">
                حذف درخواست
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-[#212121] text-center py-1 rounded-lg flex">
              <div className="w-1/2 text-xs">
                <p className=" text-gray-400">از تاریخ</p>
                <p>1403/10/05 | 09:00</p>
              </div>
              <div className="w-1/2 text-xs">
                <p className=" text-gray-400">تا تاریخ</p>
                <p>1403/10/05 | 09:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

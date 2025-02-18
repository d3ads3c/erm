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
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface NewVacation {
  subject: string;
  startdate: string;
  enddate: string;
}

export default function VacationReq() {
  const { toast } = useToast();
  const [StartDate, setStartDate] = useState(moment());
  const [EndDate, setEndDate] = useState(moment());
  const [Vacation, setVacation] = useState<NewVacation | null>(null);
  const [VacationType, setVacationType] = useState<string>("");
  const [myVacations, setMyVacations] = useState<[] | null>(null);

  const GetVacations = async () => {
    await fetch("/api/vacation/list")
      .then((res) => res.json())
      .then((data) => {
        setMyVacations(data);
        console.log(data);
      });
  };

  useEffect(() => {
    GetVacations();
  }, []);

  const handleSave = () => {
    if (!VacationType) {
      alert("لطفاً نوع مرخصی را انتخاب کنید.");
      return;
    }
    const newVacation: NewVacation = {
      subject: VacationType,
      startdate: StartDate.format("YYYY-MM-DD|HH:mm"),
      enddate: EndDate.format("YYYY-MM-DD|HH:mm"),
    };
    setVacation(newVacation);

    fetch("/api/vacation/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVacation), // use newVacation here
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg == "Data stored") {
          GetVacations();
          toast({
            description: "درخواست مرخصی با موفقیت ثبت شد.",
          });
        }
      });
  };

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
                <p className="text-sm">انتخاب نوع مرخصی</p>
                <Select
                  dir="rtl"
                  onValueChange={(value) => setVacationType(value)}
                >
                  <SelectTrigger className="w-full mt-2">
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
                  onClick={handleSave}
                  className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                >
                  ثبت مرخصی
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {myVacations && (
        <div className="grid grid-cols-3 gap-5">
          {myVacations.map((off: any, index: number) => (
            <div className="w-full" key={index}>
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
                        {off.FullName}
                      </h3>
                      <p className="text-xs text-gray-400">{off.Title}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex items-start justify-end">
                    {off.CEO == "pending" ? (
                      <div className="flex items-center gap-2 bg-emerald-100 rounded-full w-fit py-1 px-3">
                        <span className="relative flex size-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400"></span>
                        </span>
                        <p className="text-xs text-emerald-400 mt-0.5">
                          در انتظار تایید سرپرست
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-orange-100 rounded-full w-fit py-1 px-3">
                        <span className="relative flex size-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex size-2.5 rounded-full bg-orange-400"></span>
                        </span>
                        <p className="text-xs text-orange-400 mt-0.5">
                          در انتظار تایید سرپرست
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {off.Status == "accepted" ? (
                    <div className="w-full py-2 rounded-xl bg-emerald-100 text-emerald-500 text-center font-bold">
                      <p>تایید شده</p>
                    </div>
                  ) : off.Status == "rejected" ? (
                    <div className="w-full py-2 rounded-xl bg-red-100 text-red-500 text-center font-bold">
                      <p>رد شده</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-3/4 py-2 rounded-xl bg-orange-100 text-orange-500 text-center font-bold">
                        <p>در انتظار تایید</p>
                      </div>
                      <div className="w-1/4 h-full text-sm text-red-500 text-center">
                        حذف درخواست
                      </div>
                    </>
                  )}
                </div>
                <div className="bg-gray-100 dark:bg-[#212121] text-center py-1 rounded-lg flex">
                  <div className="w-1/2 text-xs">
                    <p className=" text-gray-400">از تاریخ</p>
                    <p>{off.Sdate.replaceAll("-", "/")}</p>
                  </div>
                  <div className="w-1/2 text-xs">
                    <p className=" text-gray-400">تا تاریخ</p>
                    <p>{off.Edate.replaceAll("-", "/")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <div className="w-full">
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
                <h3 className="text-gray-700 dark:text-white">نیما نیک عمل</h3>
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
                <h3 className="text-gray-700 dark:text-white">نیما نیک عمل</h3>
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
      </div> */}
      <Toaster />
    </div>
  );
}

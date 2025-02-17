"use client";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
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
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/hooks/use-toast";
import moment from "moment-jalaali";

interface NewImprest {
  month: string;
  cash: string;
}

interface MyImprest {
  ID: string;
  FullName: string;
  Month: string;
  Cash: string;
  CEO: string;
  Status: string;
  Date: string;
  Title: string;
}

export default function ImprestReq() {
  const { toast } = useToast();
  const [StartDate, setStartDate] = useState(moment());
  const [EndDate, setEndDate] = useState(moment());
  const [inputValue, setInputValue] = useState<string>("");
  const [Imprest, setImprest] = useState<NewImprest | null>(null);
  const [myImprest, setMyImprest] = useState<MyImprest[] | null>(null);

  function separateWithCommas(num: string): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const GetImprest = async () => {
    await fetch("/api/imprest/list")
      .then((res) => res.json())
      .then((data) => {
        setMyImprest(data);
        console.log(data);
      });
  };
  useEffect(() => {
    GetImprest();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    // Remove any non-numeric characters except spaces
    value = value.replace(/[^\d\s]/g, "");

    // Split input string by spaces and join with commas
    const formattedValue = separateWithCommas(value);
    setInputValue(formattedValue);

    // Update the Imprest cash field
    if (Imprest) {
      setImprest({ ...Imprest, cash: formattedValue });
    }
  };

  function SeperateDate(data: string) {
    var date = data.split("-");
    return date[0];
  }

  const months: string[] = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const handleSelectChange = (month: string) => {
    setImprest({ month, cash: inputValue });
  };
  const SubmitImprest = () => {
    fetch("/api/imprest/new", {
      method: "POST",
      body: JSON.stringify(Imprest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg == "Data stored") {
          GetImprest();
          toast({
            description: "درخواست مساعده با موفقیت ثبت شد.",
          });
        }
      });
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2>مساعده های من</h2>
        <Sheet>
          <SheetTrigger className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 px-7 py-3 w-fit rounded-xl">
            مساعده جدید
          </SheetTrigger>
          <SheetContent side={"left"} className="min-w-[500px]">
            <SheetHeader>
              <SheetTitle>درخواست مساعده جدید</SheetTitle>
            </SheetHeader>
            <div className="space-y-5 my-5">
              <div>
                <p className="text-sm mb-2">ماه مساعده</p>
                <Select dir="rtl" onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب ماه" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month: string, index: number) => (
                      <SelectItem value={month} key={index}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="border p-3 rounded-lg">
                <p className="text-sm mb-2">مبلغ مساعده (تومان)</p>
                <input
                  type="text"
                  name="cash"
                  value={inputValue}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                  onClick={SubmitImprest}
                >
                  ثبت مساعده
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {myImprest !== null && (
        <div className="grid grid-cols-3 gap-5">
          {myImprest.map((imprest: MyImprest, index: number) => (
            <div className="w-full" key={index}>
              <div className="border rounded-2xl p-3 space-y-3">
                <div className="flex items-center w-full">
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
                        {imprest.FullName}
                      </h3>
                      <p className="text-xs text-gray-400">{imprest.Title}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex items-start justify-end">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full w-fit py-1 px-3">
                      <p className="text-sm text-gray-400 mt-0.5">
                        {separateWithCommas(imprest.Cash)} تومان
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex !my-5">
                  {imprest.CEO === "0" ? (
                    <>
                      <div className="w-1/5 text-center">
                        <div className="size-5 border mx-auto border-dashed border-gray-400 rounded-full border-spacing-2"></div>
                        <p className="text-gray-400 text-sm mt-3">تایید مالی</p>
                      </div>
                      <div className="w-1/5 h-0.5 border-gray-300 mt-3 border-dashed border"></div>
                    </>
                  ) : imprest.CEO === "pending" ||
                    imprest.CEO === "accepted" ||
                    imprest.CEO === "rejected" ? (
                    <>
                      <div className="w-1/5 text-center">
                        <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-emerald-400 rounded-full bg-emerald-400"></div>
                        <p className="text-gray-400 text-sm mt-3">تایید مالی</p>
                      </div>
                      <div className="w-1/5 h-0.5 border-emerald-400 mt-3 border-dashed border"></div>
                    </>
                  ) : (
                    imprest.CEO === "2" && (
                      <>
                        <div className="w-1/5 text-center">
                          <div className="size-5 border mx-auto border-solid border-red-400 rounded-full bg-red-400"></div>
                          <p className="text-gray-400 text-sm mt-3">
                            تایید مالی
                          </p>
                        </div>
                        <div className="w-1/5 h-0.5 border-red-400 mt-3 border-dashed border"></div>
                      </>
                    )
                  )}
                  {imprest.CEO == "accepted" ? (
                    <>
                      <div className="w-1/5 text-center">
                        <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-emerald-400 rounded-full bg-emerald-400"></div>
                        <p className="text-gray-400 text-sm mt-3">
                          تایید مدیریت
                        </p>
                      </div>
                      <div className="w-1/5 h-0.5 border-emerald-300 mt-3 border-dashed border"></div>
                    </>
                  ) : imprest.CEO === "rejected" ? (
                    <>
                      <div className="w-1/5 text-center">
                        <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-red-400 rounded-full bg-red-400"></div>
                        <p className="text-gray-400 text-sm mt-3">
                          تایید مدیریت
                        </p>
                      </div>
                      <div className="w-1/5 h-0.5 border-gray-300 mt-3 border-dashed border"></div>
                    </>
                  ) : (
                    (imprest.CEO == "pending" || imprest.CEO == "0") && (
                      <>
                        <div className="w-1/5 text-center">
                          <div className="size-5 border mx-auto border-dashed border-gray-400 rounded-full border-spacing-2"></div>
                          <p className="text-gray-400 text-sm mt-3">
                            تایید مدیریت
                          </p>
                        </div>
                        <div className="w-1/5 h-0.5 border-gray-300 mt-3 border-dashed border"></div>
                      </>
                    )
                  )}
                  {imprest.Status == "pending" ? (
                    <div className="w-1/5 text-center">
                      <div className="size-5 border mx-auto border-dashed border-gray-400 rounded-full border-spacing-2"></div>
                      <p className="text-gray-400 text-sm mt-3">واریز وجه</p>
                    </div>
                  ) : (
                    <div className="w-1/5 text-center">
                      <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-red-400 rounded-full bg-red-400"></div>
                      <p className="text-gray-400 text-sm mt-3">واریز وجه</p>
                    </div>
                  )}
                </div>
                <div className="bg-gray-100 dark:bg-[#212121] text-center py-1 rounded-lg flex">
                  <div className="w-full text-sm">
                    <p>{imprest.Month + " " + SeperateDate(imprest.Date)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}

"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState, useEffect } from "react";

type ImprestProp = {
  ID: number
  User: string
  Username: string
  Ceo: string
  Month: string
  Cash: string
  Finalcash: string
  Info: string
  Status: string
  Date: string

}

export default function RequestTab() {
  const [permission, setPermission] = useState<boolean>(false)
  const [imprests, setImprests] = useState<ImprestProp[] | null>(null)

  function separateWithCommas(num: string): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const GetImprests = async () => {
    await fetch("/api/imprest/all")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPermission(true)
          setImprests(data)
        }
      })
  }
    function SeperateDate(data: string) {
    var date = data.split("-");
    return date[0];
  }


  useEffect(() => {
    GetImprests()
  }, [])
  if (permission) {


    return (
      <Tabs
        defaultValue="vacation"
        className="w-full border rounded-xl p-3 xl:p-5 max-h-[400px] h-[400px] bg-white dark:bg-[#121212]"
        dir="rtl"
      >
        <div className="mb-3">
          <h2 className="font-bold">درخواست های سازمان</h2>
        </div>
        <TabsList className="w-full">
          <TabsTrigger value="vacation">مرخصی</TabsTrigger>
          <TabsTrigger value="imprest">مساعده</TabsTrigger>
        </TabsList>
        <TabsContent
          value="vacation"
          className="space-y-3 max-h-[270px] overflow-auto hide-scroll"
        >
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
            <div>
              <div className="flex items-center justify-center gap-5 mt-1">
                <div className="w-1/2">
                  <button className="text-emerald-400 text-center w-full border-emerald-400 rounded-xl border py-2 hover:bg-emerald-400 hover:text-white duration-150">
                    <p>تایید</p>
                  </button>
                </div>
                <div className="w-1/2">
                  <button className="text-red-500 text-center w-full border-red-500 rounded-xl border py-2 hover:bg-red-500 hover:text-white duration-150">
                    <p>رد</p>
                  </button>
                </div>
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
        </TabsContent>
        <TabsContent value="imprest">
          {imprests && (
            imprests.map((imprest) => (
              <div className="w-full" key={imprest.ID}>
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
                          {imprest.Username}
                        </h3>
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
                    {imprest.Ceo === "0" ? (
                      <>
                        <div className="w-1/5 text-center">
                          <div className="size-5 border mx-auto border-dashed border-gray-400 rounded-full border-spacing-2"></div>
                          <p className="text-gray-400 text-sm mt-3">تایید مالی</p>
                        </div>
                        <div className="w-1/5 h-0.5 border-gray-300 mt-3 border-dashed border"></div>
                      </>
                    ) : imprest.Ceo === "pending" ||
                      imprest.Ceo === "accepted" ||
                      imprest.Ceo === "rejected" ? (
                      <>
                        <div className="w-1/5 text-center">
                          <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-emerald-400 rounded-full bg-emerald-400"></div>
                          <p className="text-gray-400 text-sm mt-3">تایید مالی</p>
                        </div>
                        <div className="w-1/5 h-0.5 border-emerald-400 mt-3 border-dashed border"></div>
                      </>
                    ) : (
                      imprest.Ceo === "2" && (
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
                    {imprest.Ceo == "accepted" ? (
                      <>
                        <div className="w-1/5 text-center">
                          <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-emerald-400 rounded-full bg-emerald-400"></div>
                          <p className="text-gray-400 text-sm mt-3">
                            تایید مدیریت
                          </p>
                        </div>
                        <div className="w-1/5 h-0.5 border-emerald-300 mt-3 border-dashed border"></div>
                      </>
                    ) : imprest.Ceo === "rejected" ? (
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
                      (imprest.Ceo == "pending" || imprest.Ceo == "0") && (
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
            ))
          )}
        </TabsContent>
      </Tabs>
    );
  } else {
    return null
  }
}

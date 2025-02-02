"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function SideBar() {
  return (
    <div className="h-screen w-full border-l">
      <div className="h-[10%] w-full p-3">
        <div className="flex items-center p-3 border rounded-xl">
          <div className="w-4/5 flex items-center gap-2">
            <div className="size-10 rounded-xl bg-gray-100"></div>
            <div>
              <h2 className="font-bold text-gray-700 md:text-sm">
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
                className="flex items-center gap-2 bg-red-500 p-2 rounded-xl text-gray-500"
              >
                <div className="size-10 flex items-center justify-center rounded-xl bg-red-100">
                  <i className="fi fi-sr-dashboard-panel mt-2 text-red-500"></i>
                </div>
                <p className="text-white">داشبورد</p>
              </Link>
            </li>

            <li>
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-2 text-gray-500 p-2 rounded-xl hover:bg-gray-100">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-gray-100">
                      <i className="fi fi-sr-building mt-2 text-red-500"></i>
                    </div>
                    <p>سازمان</p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className=" border-r p-2.5 mt-2 mr-5">
                  <Link
                    href={"/vacation"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>مرخصی</p>
                  </Link>
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>مساعده</p>
                  </Link>
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>مکاتبات</p>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </li>
            <li>
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-2 text-gray-500 p-2 rounded-xl hover:bg-gray-100">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-gray-100">
                      <i className="fi fi-sr-users-alt mt-2 text-red-500"></i>
                    </div>
                    <p>منابع انسانی</p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="border-r p-2.5 mt-2 mr-5">
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>پرسنل</p>
                  </Link>
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>فرم ها</p>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </li>
            <li>
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-2 text-gray-500 p-2 rounded-xl hover:bg-gray-100">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-gray-100">
                      <i className="fi fi-sr-world mt-2 text-red-500"></i>
                    </div>
                    <p>بازرگانی</p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="border-r p-2.5 mt-2 mr-5">
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>تامین کنندگان</p>
                  </Link>
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>کالاها</p>
                  </Link>
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>پرونده ها</p>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center gap-2 text-gray-500 p-2 rounded-xl hover:bg-gray-100"
              >
                <div className="size-10 flex items-center justify-center rounded-xl bg-gray-100">
                  <i className="fi fi-sr-list-check mt-2 text-red-500"></i>
                </div>
                <p>پروژه ها</p>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center gap-2 text-gray-500 p-2 rounded-xl hover:bg-gray-100"
              >
                <div className="size-10 flex items-center justify-center rounded-xl bg-gray-100">
                  <i className="fi fi-sr-inbox mt-2 text-red-500"></i>
                </div>
                <p>بایگانی</p>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex items-center gap-2 text-gray-500 p-2 rounded-xl hover:bg-gray-100"
              >
                <div className="size-10 flex items-center justify-center rounded-xl bg-gray-100">
                  <i className="fi fi-sr-settings mt-2 text-red-500"></i>
                </div>
                <p>تنظیمات</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-[10%] w-full p-5">
        <div className="flex items-center gap-2">
          <div className="w-3/4 flex items-center gap-2">
            <div className="size-12 rounded-lg">
              <Image
                src={"/img/default-user-icon.jpg"}
                width={200}
                height={200}
                alt="user profile pic"
                className="rounded-lg size-12"
              ></Image>
            </div>
            <div>
              <h2 className="text-sm">نیما نیک عمل</h2>
              <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                <p>مدیر فناوری اطلاعات</p>
              </div>
            </div>
          </div>
          <div className="w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

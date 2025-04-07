"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideBar() {
  const pathname = usePathname();
  const Office = ["vacation", "imprest", "chats"];
  const hr = ["personnel", "forms"];
  const site = ["products", "blog"];
  const [UserName, setUserName] = useState<string>("");
  const [UserTitle, setTitle] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const LocalData = localStorage.getItem("UserInfo");
      if (LocalData) {
        const userName = JSON.parse(LocalData);
        setUserName(userName.Fname + " " + userName.Lname);
        setTitle(userName.Title);
      } else {
        console.log("No user data found in localStorage");
      }
    }
  }, []);
  return (
    <div className="h-screen w-full border-l sticky top-0">
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
      <div className="max-h-[80%] w-full p-5">
        <h3 className="text-gray-500 text-sm">منو</h3>
        <div className="max-h-[600px] h-[600px] w-full mt-3 overflow-auto">
          <ul className="space-y-3">
            <li>
              <Link
                href={"/dashboard"}
                className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                  pathname.includes("/dashboard")
                    ? "bg-red-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`size-10 flex items-center justify-center rounded-xl ${
                    pathname.includes("/dashboard")
                      ? "bg-red-100"
                      : "bg-gray-100"
                  }`}
                >
                  <i className="fi fi-sr-dashboard-panel mt-2 text-red-500"></i>
                </div>
                <p
                  className={`${
                    pathname.includes("/dashboard")
                      ? "text-white"
                      : "text-gray-500"
                  }
                  `}
                >
                  داشبورد
                </p>
              </Link>
            </li>

            <li>
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      Office.some((element) => pathname.includes(element))
                        ? "bg-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`size-10 flex items-center justify-center rounded-xl ${
                        Office.some((element) => pathname.includes(element))
                          ? "bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <i className="fi fi-sr-building mt-2 text-red-500"></i>
                    </div>
                    <p
                      className={`${
                        Office.some((element) => pathname.includes(element))
                          ? "text-white"
                          : "text-gray-500"
                      }
                  `}
                    >
                      سازمان
                    </p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className=" border-r p-2.5 mt-2 mr-5">
                  <Link
                    href={"/vacation"}
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      pathname.includes("/vacation")
                        ? "bg-red-100 text-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p>مرخصی</p>
                  </Link>
                  <Link
                    href={"/imprest"}
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      pathname.includes("/imprest")
                        ? "bg-red-100 text-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p>مساعده</p>
                  </Link>
                  <Link
                    href={"/chats"}
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      pathname.includes("/chat")
                        ? "bg-red-100 text-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p>مکاتبات</p>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </li>
            <li>
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      hr.some((element) => pathname.includes(element))
                        ? "bg-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`size-10 flex items-center justify-center rounded-xl ${
                        hr.some((element) => pathname.includes(element))
                          ? "bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <i className="fi fi-sr-users-alt mt-2 text-red-500"></i>
                    </div>
                    <p
                      className={`${
                        hr.some((element) => pathname.includes(element))
                          ? "text-white"
                          : "text-gray-500"
                      }
                  `}
                    >
                      منابع انسانی
                    </p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="border-r p-2.5 mt-2 mr-5">
                  <Link
                    href={"/personnel"}
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      pathname.includes("/personnel")
                        ? "bg-red-100 text-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p>پرسنل</p>
                  </Link>
                  {/* <Link
                    href={"#"}
                    className="flex items-center gap-2 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100"
                  >
                    <p>فرم ها</p>
                  </Link> */}
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
            {/* <li>
              <Link
                href={"#"}
                className="flex items-center gap-2 text-gray-500 p-2 rounded-xl hover:bg-gray-100"
              >
                <div className="size-10 flex items-center justify-center rounded-xl bg-gray-100">
                  <i className="fi fi-sr-list-check mt-2 text-red-500"></i>
                </div>
                <p>پروژه ها</p>
              </Link>
            </li> */}
            <li>
              <Link
                href={"/aftersale"}
                className="flex items-center gap-2 text-gray-500 p-2 rounded-xl hover:bg-gray-100"
              >
                <div className="size-10 flex items-center justify-center rounded-xl bg-gray-100">
                  <i className="fi fi-br-customer-care mt-2 text-red-500"></i>
                </div>
                <p>خدمات پس از فروش</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/warehouse"}
                className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                  pathname.includes("/warehouse")
                    ? "bg-red-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`size-10 flex items-center justify-center rounded-xl ${
                    pathname.includes("/warehouse")
                      ? "bg-red-100"
                      : "bg-gray-100"
                  }`}
                >
                  <i className="fi fi-sr-warehouse-alt mt-2 text-red-500"></i>
                </div>
                <p
                  className={`${
                    pathname.includes("/warehouse")
                      ? "text-white"
                      : "text-gray-500"
                  }
                  `}
                >
                  انبار
                </p>
              </Link>
            </li>
            <li>
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      site.some((element) => pathname.includes(element))
                        ? "bg-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`size-10 flex items-center justify-center rounded-xl ${
                        site.some((element) => pathname.includes(element))
                          ? "bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <i className="fi fi-sr-users-alt mt-2 text-red-500"></i>
                    </div>
                    <p
                      className={`${
                        site.some((element) => pathname.includes(element))
                          ? "text-white"
                          : "text-gray-500"
                      }
                  `}
                    >
                      مدیریت سایت
                    </p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="border-r p-2.5 mt-2 mr-5">
                  <Link
                    href={"/site/products"}
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      pathname.includes("/site/products")
                        ? "bg-red-100 text-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p>محصولات</p>
                  </Link>
                  <Link
                    href={"/site/blog"}
                    className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                      pathname.includes("/site/blog")
                        ? "bg-red-100 text-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p>بلاگ</p>
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
                  <i className="fi fi-sr-inbox mt-2 text-red-500"></i>
                </div>
                <p>بایگانی</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/settings"}
                className={`flex items-center gap-2 p-2 rounded-xl text-gray-500 ${
                  pathname.includes("/settings")
                    ? "bg-red-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`size-10 flex items-center justify-center rounded-xl ${
                    pathname.includes("/settings")
                      ? "bg-red-100"
                      : "bg-gray-100"
                  }`}
                >
                  <i className="fi fi-sr-settings mt-2 text-red-500"></i>
                </div>
                <p
                  className={`${
                    pathname.includes("/settings")
                      ? "text-white"
                      : "text-gray-500"
                  }
                  `}
                >
                  تنظیمات
                </p>
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
              <h2 className="text-sm">{UserName}</h2>
              <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                <p>{UserTitle}</p>
              </div>
            </div>
          </div>
          <div className="w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

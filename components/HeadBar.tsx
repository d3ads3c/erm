"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeadBar() {
  const [UserName, setUserName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const LocalData = localStorage.getItem("UserInfo");
      if (LocalData) {
        const userName = JSON.parse(LocalData);
        setUserName(userName.Fname);
      } else {
        console.log("No user data found in localStorage");
      }
    }
  }, []);

  return (
    <>
      <div className="w-full py-5 bg-white xl:flex items-center border-b hidden">
        <div className="w-1/2">
          <h2>سلام {UserName}؛ خوش آمدی</h2>
          <p className="text-xs text-gray-400">شنبه 14 بهمن</p>
        </div>
        <div className="w-1/2 flex items-center justify-end gap-3">
          <div className="size-12 rounded-xl flex items-center justify-center bg-gray-100 text-gray-500 relative">
            <i className="fi fi-sr-bell mt-2"></i>
            <span className="absolute -top-0.5 -right-0.5 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span>
          </div>
        </div>
      </div>
      <div className="p-5 bg-red-600 rounded-b-[30px] xl:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">

            <div>
              <Image src={"/img/default-user-icon.jpg"} width={1000} height={1000} alt="User Image" className="max-w-[60px] rounded-2xl"></Image>
            </div>
            <div>
              <p className="text-xs text-white">خوش آمدید</p>
              <h2 className="font-bold text-white">نیما نیک عمل</h2>
            </div>
          </div>
          <div className="bg-white size-14 rounded-2xl flex items-center justify-center text-red-500 text-xl">
            <i className="fi fi-sr-bell mt-2"></i>
          </div>
        </div>
      </div>
    </>

  );
}

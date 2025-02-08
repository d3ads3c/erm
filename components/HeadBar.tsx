"use client";
import { useEffect, useState } from "react";

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
    <div className="w-full py-5 bg-white flex items-center border-b">
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
  );
}

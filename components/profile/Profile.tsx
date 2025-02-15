"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

interface UserProps {
  UserID: number;
}

interface UserInfo{
  Fname:"",
  Lname:"",
  Meli: "",
  Title:"",
  Phone:""
}


export default function ProfileComp({ UserID }: UserProps) {
  const [userData, setUser] = useState<UserInfo | null>(null);
  useEffect(() => {
    const GetUser = async () => {
      fetch("/api/personnel/get", {
        method: "POST",
        body: JSON.stringify({ ID: UserID }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
        });
    };
    GetUser();
  }, []);

  return (
    <div className="flex gap-5 !mt-10">
      <div className="w-1/6 border-l border-gray-200 h-[500px] max-h-[500px]">
        <div className="mb-5">
          <h1>ویرایش پرسنل </h1>
        </div>
        <ul className="space-y-7">
          <li>
            <Link
              href={"#"}
              className="bg-red-100 text-red-500 rounded-full py-2 px-5"
            >
              اطلاعات کاربر
            </Link>
          </li>
          <li>
            <Link
              href={"#"}
              className="text-gray-400 rounded-full py-2 px-5 hover:bg-gray-100"
            >
              دسترسی ها
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-5/6">
        <div className="mb-2">
          <h2>اطلاعات پایه</h2>
        </div>
        <div className="space-y-4 border border-gray-200 rounded-xl p-5">
          <div className="grid grid-cols-4 gap-5">
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">نام</p>
              <input
                type="text"
                defaultValue={userData?.Fname}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">نام خانوادگی</p>
              <input
                type="text"
                defaultValue={userData?.Lname}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">کدملی</p>
              <input
                type="text"
                defaultValue={userData?.Meli}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">شماره تماس</p>
              <input
                type="text"
                defaultValue={userData?.Phone}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">سمت شغلی</p>
              <input
                type="text"
                defaultValue={userData?.Title}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <button
              type="button"
              className="bg-teal-400 text-white rounded-xl py-2 px-3 hover:shadow-xl hover:shadow-teal-200 duration-150"
            >
              ثبت تغییرات
            </button>
          </div>
        </div>
        {/* Finacial */}
        <div className="mb-2 mt-5">
          <h2>اطلاعات مالی</h2>
        </div>
        <div className="space-y-4 border border-gray-200 rounded-xl p-5">
          <div className="grid grid-cols-4 gap-5">
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">بانک</p>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">شماره حساب</p>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">شماره کارت</p>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-sm mb-1">شماره شبا</p>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <button
              type="button"
              className="bg-teal-400 text-white rounded-xl py-2 px-3 hover:shadow-xl hover:shadow-teal-200 duration-150"
            >
              ثبت تغییرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

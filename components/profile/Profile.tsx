"use client";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

interface UserProps {
  UserID: number;
}

interface UserInfo {
  Fname: "",
  Lname: "",
  Meli: "",
  Title: "",
  Phone: ""
}


export default function ProfileComp({ UserID }: UserProps) {
  const { toast } = useToast();
  const [userData, setUser] = useState<UserInfo | null>(null);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    const GetUser = async () => {
      fetch("/api/personnel/get", {
        method: "POST",
        body: JSON.stringify({ ID: UserID }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    };
    GetUser();
  }, []);

  const NewPassword = async () => {
    await fetch("/api/user/password", {
      method: "POST",
      body: JSON.stringify({ Password: password })
    }).then((res) => res.json())
      .then((data) => {
        if (data.msg == "Changed") {
          setPassword("")
          setRepeatPassword("")
          toast({
            description: "رمز با موفقیت تغییر کرد.",
          });
        }
      })
  }

  return (
    <div className="gap-5 xl:mt-10 p-3 xl:p-0">
      <div className="mb-2">
        <h2>اطلاعات پایه</h2>
      </div>
      <div className="space-y-4 border border-gray-200 rounded-xl p-5">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="w-full space-y-1">
            <p className="text-sm mb-1">نام</p>
            <input
              type="text"
              disabled
              defaultValue={userData?.Fname}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full space-y-1">
            <p className="text-sm mb-1">نام خانوادگی</p>
            <input
              type="text"
              disabled
              defaultValue={userData?.Lname}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full space-y-1">
            <p className="text-sm mb-1">کدملی</p>
            <input
              type="text"
              disabled
              defaultValue={userData?.Meli}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full space-y-1">
            <p className="text-sm mb-1">شماره تماس</p>
            <input
              type="text"
              disabled
              defaultValue={userData?.Phone}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
        </div>
      </div>
      {/* Finacial */}
      <div className="mb-2 mt-5">
        <h2>رمز عبور</h2>
      </div>
      <div className="space-y-4 border border-gray-200 rounded-xl p-5">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="w-full space-y-1">
            <p className="text-sm mb-1">رمز جدید</p>
            <input
              type="password"
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full space-y-1">
            <p className="text-sm mb-1">تکرار رمز جدید</p>
            <input
              type="password"
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-3">
          <button
            type="button"
            onClick={NewPassword}
            className={`rounded-xl py-2 px-3 hover:shadow-xl hover:shadow-red-200 duration-150 text-white
    ${!password || !repeatPassword || password !== repeatPassword
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500"}
  `}
            disabled={!password || !repeatPassword || password !== repeatPassword}
          >
            ثبت تغییرات
          </button>
        </div>
      </div>
      <Toaster />

    </div>
  );
}

"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useState, useEffect } from "react";

type Permission = {
  ID: string;
  name: string;
};

type Permissions = {
  [key: string]: Permission[];
};

const Checkbox: React.FC<{
  id: string;
  className: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, className, checked, onChange }) => (
  <input
    type="checkbox"
    id={id}
    className={className}
    checked={checked}
    onChange={onChange}
  />
);

export default function PersonnelList() {
  const [permissions, setPermissions] = useState<Permissions>({});
  const [checkedPermissions, setCheckedPermissions] = useState<{
    [key: string]: boolean;
  }>({});
  const [permisisonModal, setModal] = useState<boolean>(false);
  const [personnels, setPersonnel] = useState<any[]>([]);
  const [managers, setManagers] = useState<[] | null>(null);
  const [bDay, setBday] = useState(moment());
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function GetPersonnel() {
      await fetch("/api/personnel/list")
        .then((res) => res.json())
        .then((data) => {
          setPersonnel(data);
        });
    }
    async function GetPermissions() {
      await fetch("/api/personnel/permissions")
        .then((res) => res.json())
        .then((data) => {
          setPermissions(data);
        });
    }
    GetPersonnel();
    GetPermissions();
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setCheckedPermissions((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const filteredPersonnels = personnels.filter((user) => {
    if (statusFilter === "all") return true;
    return user.Status === statusFilter;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2>لیست پرسنل ها</h2>
        <div className="gap-3 flex items-center">
          <button
            className={`${
              statusFilter === "all"
                ? "bg-emerald-400 text-white"
                : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm`}
            onClick={() => setStatusFilter("all")}
          >
            همه
          </button>
          <button
            className={`${
              statusFilter === "active"
                ? "bg-emerald-400 text-white"
                : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm`}
            onClick={() => setStatusFilter("active")}
          >
            فعال
          </button>
          <button
            className={`${
              statusFilter === "inactive"
                ? "bg-emerald-400 text-white"
                : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm`}
            onClick={() => setStatusFilter("inactive")}
          >
            غیرفعال
          </button>
          <button
            className={`${
              statusFilter === "suspend"
                ? "bg-emerald-400 text-white"
                : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm`}
            onClick={() => setStatusFilter("suspend")}
          >
            تعلیق شده
          </button>
          <button
            className={`${
              statusFilter === "exit"
                ? "bg-emerald-400 text-white"
                : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm`}
            onClick={() => setStatusFilter("exit")}
          >
            قطع همکاری
          </button>
        </div>
        <Sheet>
          <SheetTrigger className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 px-7 py-3 w-fit rounded-xl">
            پرسنل جدید
          </SheetTrigger>
          <SheetContent side={"left"} className="min-w-[500px]">
            <SheetHeader>
              <SheetTitle>ثبت پرسنل جدید</SheetTitle>
              <SheetDescription>
                تمام اطلاعات به صورت رمزنگاری شده و غیرقابل مشاهده ذخیره خواهند
                شد.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-5 my-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full">
                  <p className="text-sm mb-2">نام</p>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm mb-2">نام خانوادگی</p>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm mb-2">شماره همراه</p>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm mb-2">سمت شغلی</p>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div className="border p-3 rounded-lg">
                <p className="text-sm mb-2">تاریخ تولد (اختیاری)</p>
                <JalaliDatePicker
                  value={bDay}
                  name={"Bday"}
                  onChange={setBday}
                />
              </div>
              <div className="border p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm">دسترسی ها</p>
                  <button type="button" onClick={()=>setModal(true)} className="text-sm text-blue-400">افزودن</button>
                </div>
                <div className="grid grid-cols-5 gap-3 rounded-xl mt-3">
                  <div className="w-fit bg-gray-100 rounded-full py-1 px-2 text-xs text-gray-400 flex items-center gap-2">
                    <button className="mt-1" type="button">
                      X
                    </button>
                    <p>بایگانی</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">انتخاب سرپرست</p>
                <Select dir="rtl">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers?.map((month: string, index: number) => (
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
                  className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                >
                  ثبت مساعده
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <table className="w-full table mt-3">
          <thead className="bg-gray-100 rounded-xl text-gray-500 text-right">
            <tr>
              <th className="rounded-r-xl py-3 px-5">پرسنل</th>
              <th>سرپرست / مدیر</th>
              <th>واحد</th>
              <th>دسترسی ها</th>
              <th>عضویت</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-right">
            {filteredPersonnels.map((user: any, index: number) => (
              <tr className="border-b" key={index}>
                <td className="py-5 px-5">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={"/img/default-user-icon.jpg"}
                        width={45}
                        height={45}
                        alt="User Image"
                        className="rounded-xl"
                      ></Image>
                    </div>
                    <div>
                      <h2>{user.Fname + " " + user.Lname}</h2>
                      <p className="text-xs text-gray-400">{user.Title}</p>
                    </div>
                  </div>
                </td>
                <td>{user.Manager}</td>
                <td>
                  <div className="rounded-lg py-1 px-2 bg-cyan-100 text-cyan-500 w-fit text-sm">
                    {user.Departman}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg py-1 px-2 bg-emerald-100 text-emerald-500 w-fit text-sm">
                      {user.Permission}
                    </div>
                  </div>
                </td>
                <td>1401/03/02</td>

                <td>
                  {user.Status == "active" ? (
                    <div className="rounded-lg py-1 px-2 bg-emerald-100 text-emerald-500 w-fit text-sm flex items-center gap-1 justify-center">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400"></span>
                      </span>
                      <p>فعال</p>
                    </div>
                  ) : user.Status == "exit" ? (
                    <div className="rounded-lg py-1 px-2 bg-red-100 text-red-500 w-fit text-sm flex items-center gap-1 justify-center">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex size-2.5 rounded-full bg-red-400"></span>
                      </span>
                      <p>قطع همکاری</p>
                    </div>
                  ) : (
                    user.Status == "suspend" && (
                      <div className="rounded-lg py-1 px-2 bg-orange-100 text-orange-500 w-fit text-sm flex items-center gap-1 justify-center">
                        <span className="relative flex size-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex size-2.5 rounded-full bg-orange-400"></span>
                        </span>
                        <p>تعلیق شده</p>
                      </div>
                    )
                  )}
                </td>
                <td className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-gray-100 rounded-lg px-4 py-2 text-gray-500">
                      <p>گزینه ها</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] ml-12">
                      <DropdownMenuLabel>
                        {user.Fname + " " + user.Lname}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>پروفایل</DropdownMenuItem>
                      <DropdownMenuItem>تغییر دسترسی</DropdownMenuItem>
                      <DropdownMenuItem>تغییر وضعیت</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {permisisonModal && (
        <div className="fixed -top-5 left-0 w-full h-screen bg-black/30 flex items-center justify-center backdrop-blur-lg z-[99999]">
          <div className="w-[40%] h-[60%] bg-white shadow-xl rounded-2xl p-5">
            <div className="h-[5%] w-full">
              <h2>انتخاب سطح دسترسی کاربر</h2>
            </div>
            <div className="w-full max-h-[80%] h-[80%] overflow-auto">
              {Object.keys(permissions).map((main) => (
                <div key={main} className="my-5 border p-3 rounded-xl">
                  <div className="flex items-center gap-1">
                    <p className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {main}
                    </p>
                  </div>
                  <div className="mr-2 border-r mt-3 pr-4 space-y-3">
                    {permissions[main].map((sub) => (
                      <div key={sub.ID} className="flex items-center gap-1">
                        <Checkbox
                          id={sub.ID}
                          className="size-5"
                          checked={!!checkedPermissions[sub.ID]}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={sub.ID}
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {sub.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[15%] w-full flex items-end justify-end">
              <button type="button" onClick={()=>setModal(false)} className="text-white bg-emerald-400 py-2 px-4 w-fit rounded-xl">
                تایید دسترسی
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

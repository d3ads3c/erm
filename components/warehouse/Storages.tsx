"use client";
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
import { useEffect, useState } from "react";

interface NewStorage {
  name: string;
  manager: string;
}

export default function StoragesComp() {
  const [personnels, setPersonnel] = useState<any[] | null>(null);
  const [newStorage, setNewStorage] = useState<NewStorage>({
    name: "",
    manager: "",
  });

  useEffect(() => {
    async function GetPersonnel() {
      await fetch("/api/personnel/list")
        .then((res) => res.json())
        .then((data) => {
          setPersonnel(data);
        });
    }
    GetPersonnel();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStorage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const SubmitStorage = () => {
    console.log(newStorage);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>مدیریت انبار ها</h1>
        <Sheet>
          <SheetTrigger className="text-white bg-emerald-400 py-2 px-5 rounded-lg font-bold hover:shadow-xl hover:shadow-emerald-200 duration-150">
            افزودن انبار جدید
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>تعریف انبار جدید</SheetTitle>
            </SheetHeader>
            <div className="space-y-5 my-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="w-full">
                  <p className="text-sm mb-2">نام انبار</p>
                  <input
                    type="text"
                    name="name"
                    value={newStorage.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <p className="text-sm mb-2">انتخاب سرپرست</p>
                  <Select
                    dir="rtl"
                    onValueChange={(e) =>
                      setNewStorage((prevState) => ({
                        ...prevState,
                        manager: e,
                      }))
                    }
                    name="manager"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="انتخاب" />
                    </SelectTrigger>
                    <SelectContent>
                      {personnels?.map(
                        (personnel: any, index: number) =>
                          personnel.Status == "active" && (
                            <SelectItem value={personnel.ID} key={index}>
                              {personnel.Fname + " " + personnel.Lname}
                            </SelectItem>
                          )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={SubmitStorage}
                  className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                >
                  ثبت انبار جدید
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <table className="w-full relative table mt-3">
          <thead className="text-gray-500 text-sm border-b rounded-xl font-light text-right">
            <tr>
              <th className="rounded-r-xl py-3 px-5">شماره انبار</th>
              <th>نام انبار</th>
              <th>مسئول انبار</th>
              <th>موجودی کل</th>
              <th>ارزش انبار</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="max-h-[100px] overflow-auto text-right">
            <tr className="border-b border-gray-100">
              <td className="p-5">2518</td>
              <td>خدمات پس از فروش</td>
              <td>سینا شریفی</td>
              <td>250</td>
              <td>
                10.246.000.000{" "}
                <span className="text-xs text-gray-400">ریال</span>
              </td>
              <td>
                <div className="bg-emerald-100 text-emerald-400 rounded-full py-1 px-4 w-fit font-bold text-sm">
                  فعال
                </div>
              </td>
              <td>
                <button className="text-center w-full">مشاهده</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

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

interface NewCategory {
  name: string;
}

export default function CategoriesComp() {
  const [personnels, setPersonnel] = useState<any[] | null>(null);
  const [newCategory, setNewCategory] = useState<NewCategory>({
    name: "",
  });
  const [categoryList, setCategoryList] = useState<[] | null>(null);

  async function GetPersonnel() {
    await fetch("/api/personnel/list")
      .then((res) => res.json())
      .then((data) => {
        setPersonnel(data);
      });
  }
  async function GetCategories() {
    await fetch("/api/warehouse/categories/list")
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data);
      });
  }
  useEffect(() => {
    GetCategories();
    GetPersonnel();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const SubmitStorage = () => {
    fetch("/api/warehouse/categories/new", {
      method: "POST",
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>مدیریت دسته بندی ها</h1>
        <Sheet>
          <SheetTrigger className="text-white bg-emerald-400 py-2 px-5 rounded-lg font-bold hover:shadow-xl hover:shadow-emerald-200 duration-150">
            افزودن دسته بندی جدید
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>تعریف دسته بندی جدید</SheetTitle>
            </SheetHeader>
            <div className="space-y-5 my-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="w-full">
                  <p className="text-sm mb-2">نام دسته بندی</p>
                  <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={SubmitStorage}
                  className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                >
                  ثبت دسته بندی جدید
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
              <th className="rounded-r-xl py-3 px-5">شماره دسته بندی</th>
              <th>نام دسته بندی</th>
              <th>موجودی کل</th>
              <th>ارزش دسته بندی</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="max-h-[100px] overflow-auto text-right">
            {categoryList &&
              categoryList.map((category: any, index: number) => (
                <tr className="border-b border-gray-100" key={index}>
                  <td className="p-5">{category.ID}</td>
                  <td>{category.Name}</td>
                  <td>250</td>
                  <td>
                    10.246.000.000{" "}
                    <span className="text-xs text-gray-400">ریال</span>
                  </td>
                  <td>
                    <div className="bg-emerald-100 text-emerald-400 rounded-full py-1 px-4 w-fit font-bold text-sm">
                      {category.Status}
                    </div>
                  </td>
                  <td>
                    <button className="text-center w-full">مشاهده</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

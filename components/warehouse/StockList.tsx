"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import Link from "next/link";

interface NewProduct {
  name: string;
}

export default function StockList() {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
  });
  const [productList, setProductList] = useState<[] | null>(null);

  async function GetProducts() {
    await fetch("/api/warehouse/products/list")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
      });
  }
  useEffect(() => {
    GetProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const SubmitStorage = () => {
    fetch("/api/warehouse/products/new", {
      method: "POST",
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>مدیریت کالاها</h1>
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger className="text-white border border-emerald-400 bg-emerald-400 py-2 px-5 rounded-lg font-bold hover:shadow-xl hover:shadow-emerald-200 duration-150">
              افزودن کالای جدید
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>تعریف کالای جدید</SheetTitle>
              </SheetHeader>
              <div className="space-y-5 my-5">
                <div className="grid grid-cols-1 gap-5">
                  <div className="w-full">
                    <p className="text-sm mb-2">نام کالا</p>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
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
                    ثبت کالای جدید
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link
            href="./stocks/import"
            className="border border-emerald-400 text-emerald-400 py-1 px-5 rounded-lg font-bold hover:bg-emerald-400 hover:text-white duration-150 flex items-center justify-center gap-2"
          >
            <i className="fi fi-br-file-import mt-2"></i>
            حواله ورود به انبار
          </Link>
          <Link
            href="#"
            className="border border-red-500 text-red-500 py-1 px-5 rounded-lg font-bold hover:bg-red-500 hover:text-white duration-150 flex items-center justify-center gap-2"
          >
            <i className="fi fi-br-file-export mt-2"></i>
            حواله خروج به انبار
          </Link>
        </div>
      </div>
      <div className="w-full my-5">
        <input
          type="text"
          name="name"
          placeholder="جستوجو کالا ..."
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <table className="w-full relative table mt-3">
          <thead className="text-gray-500 text-sm border-b rounded-xl font-light text-right">
            <tr>
              <th className="rounded-r-xl py-3 px-5">شماره کالا</th>
              <th>نام کالا</th>
              <th>موجودی کل</th>
              <th>ارزش کالا</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="max-h-[100px] overflow-auto text-right">
            {productList &&
              productList.map((product: any, index: number) => (
                <tr className="border-b border-gray-100" key={index}>
                  <td className="p-5">{product.ID}</td>
                  <td>{product.Name}</td>
                  <td>250</td>
                  <td>
                    10.246.000.000{" "}
                    <span className="text-xs text-gray-400">ریال</span>
                  </td>
                  <td>
                    <div className="bg-emerald-100 text-emerald-400 rounded-full py-1 px-4 w-fit font-bold text-sm">
                      {product.Status}
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
